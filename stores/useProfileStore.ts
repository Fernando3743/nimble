import { create } from 'zustand';
import type { User } from '@supabase/supabase-js';
import type { ProfileFormData } from '@/types';

interface ProfileStore {
  // Form state
  formData: ProfileFormData;
  editing: boolean;

  // Message state
  error: string;
  success: string;

  // Actions
  setFormData: (data: Partial<ProfileFormData>) => void;
  setEditing: (editing: boolean) => void;
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
  error: '',
  success: '',

  // Simple setters
  setFormData: (data) => set((state) => ({
    formData: { ...state.formData, ...data }
  })),
  setEditing: (editing) => set({ editing }),
  setError: (error) => set({ error }),
  setSuccess: (success) => set({ success }),

  // Load user profile data (UI state only, no async operations)
  loadUserProfile: (user: User) => {
    set({
      formData: {
        firstName: user.user_metadata?.first_name || '',
        lastName: user.user_metadata?.last_name || '',
        email: user.email || '',
        phone: user.user_metadata?.phone || '',
      },
    });
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
