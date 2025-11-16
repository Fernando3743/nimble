import { create } from 'zustand';
import type { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface ProfileStore {
  // Form state
  formData: FormData;
  editing: boolean;

  // Avatar state
  avatarUrl: string | null;
  originalAvatarUrl: string | null;

  // Message state
  error: string;
  success: string;

  // Actions
  setFormData: (data: Partial<FormData>) => void;
  setEditing: (editing: boolean) => void;
  setAvatarUrl: (url: string | null) => void;
  setOriginalAvatarUrl: (url: string | null) => void;
  setError: (error: string) => void;
  setSuccess: (success: string) => void;

  // Helper actions
  loadUserProfile: (user: User) => void;
  resetForm: (user: User) => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  // Initial state
  formData: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  },
  editing: false,
  avatarUrl: null,
  originalAvatarUrl: null,
  error: '',
  success: '',

  // Simple setters
  setFormData: (data) => set((state) => ({
    formData: { ...state.formData, ...data }
  })),
  setEditing: (editing) => set({ editing }),
  setAvatarUrl: (url) => set({ avatarUrl: url }),
  setOriginalAvatarUrl: (url) => set({ originalAvatarUrl: url }),
  setError: (error) => set({ error }),
  setSuccess: (success) => set({ success }),

  // Load user profile data
  loadUserProfile: (user: User) => {
    const supabase = createClient();

    set({
      formData: {
        firstName: user.user_metadata?.first_name || '',
        lastName: user.user_metadata?.last_name || '',
        email: user.email || '',
        phone: user.user_metadata?.phone || '',
      },
    });

    // Load avatar URLs
    if (user.user_metadata?.avatar_url) {
      const { data: originalData } = supabase.storage
        .from("avatars")
        .getPublicUrl(user.user_metadata.avatar_url);
      set({ originalAvatarUrl: originalData.publicUrl });
    }

    const displayPath = user.user_metadata?.avatar_cropped_url || user.user_metadata?.avatar_url;
    if (displayPath) {
      const { data } = supabase.storage
        .from("avatars")
        .getPublicUrl(displayPath);
      set({ avatarUrl: data.publicUrl });
    }
  },

  // Reset form to user data
  resetForm: (user: User) => {
    set({
      formData: {
        firstName: user.user_metadata?.first_name || '',
        lastName: user.user_metadata?.last_name || '',
        email: user.email || '',
        phone: user.user_metadata?.phone || '',
      },
      editing: false,
    });
  },
}));
