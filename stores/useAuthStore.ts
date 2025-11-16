import { create } from 'zustand';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

interface AuthStore {
  user: User | null;
  avatarUrl: string | null;
  loading: boolean;

  // Actions
  setUser: (user: User | null) => void;
  setAvatarUrl: (url: string | null) => void;
  setLoading: (loading: boolean) => void;

  // Async actions
  initAuth: () => Promise<void>;
  updateAvatar: (avatarPath: string, croppedPath?: string) => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  avatarUrl: null,
  loading: true,

  setUser: (user) => set({ user }),
  setAvatarUrl: (url) => set({ avatarUrl: url }),
  setLoading: (loading) => set({ loading }),

  initAuth: async () => {
    const supabase = createClient();
    set({ loading: true });

    try {
      const { data: { user } } = await supabase.auth.getUser();
      set({ user });

      // Load avatar URL - prefer cropped version if it exists
      if (user) {
        const avatarPath = user.user_metadata?.avatar_cropped_url || user.user_metadata?.avatar_url;
        if (avatarPath) {
          const { data } = supabase.storage
            .from("avatars")
            .getPublicUrl(avatarPath);
          set({ avatarUrl: data.publicUrl });
        } else {
          set({ avatarUrl: null });
        }
      } else {
        set({ avatarUrl: null });
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
      set({ user: null, avatarUrl: null });
    } finally {
      set({ loading: false });
    }

    // Listen for auth changes
    supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user ?? null;
      set({ user });

      // Update avatar URL when auth state changes
      if (user) {
        const avatarPath = user.user_metadata?.avatar_cropped_url || user.user_metadata?.avatar_url;
        if (avatarPath) {
          const { data } = supabase.storage
            .from("avatars")
            .getPublicUrl(avatarPath);
          set({ avatarUrl: data.publicUrl });
        } else {
          set({ avatarUrl: null });
        }
      } else {
        set({ avatarUrl: null });
      }
    });
  },

  updateAvatar: (avatarPath: string, croppedPath?: string) => {
    const supabase = createClient();
    const { user } = get();

    if (!user) return;

    // Use cropped path if available, otherwise use original
    const displayPath = croppedPath || avatarPath;
    const { data } = supabase.storage
      .from("avatars")
      .getPublicUrl(displayPath);

    set({ avatarUrl: data.publicUrl });
  },
}));
