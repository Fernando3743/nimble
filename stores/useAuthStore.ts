import { create } from 'zustand';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import { getAvatarUrl } from '@/types';

interface AuthStore {
  user: User | null;
  loading: boolean;

  // Actions
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;

  // Async actions
  initAuth: () => Promise<void>;

  // Computed values
  getAvatarUrl: () => string | null;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  loading: true,

  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),

  initAuth: async () => {
    const supabase = createClient();
    set({ loading: true });

    try {
      const { data: { user } } = await supabase.auth.getUser();
      set({ user });
    } catch (error) {
      console.error('Error initializing auth:', error);
      set({ user: null });
    } finally {
      set({ loading: false });
    }

    // Listen for auth changes
    supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user ?? null;
      set({ user });
    });
  },

  // Compute avatar URL from user metadata
  getAvatarUrl: () => {
    const { user } = get();
    if (!user) return null;

    const avatarPath = getAvatarUrl(user.user_metadata);
    if (!avatarPath) return null;

    // If it's a data URL, return it directly
    if (avatarPath.startsWith('data:')) {
      return avatarPath;
    }

    // Otherwise, get the public URL from Supabase storage
    const supabase = createClient();
    const { data } = supabase.storage
      .from("avatars")
      .getPublicUrl(avatarPath);

    return data.publicUrl;
  },
}));
