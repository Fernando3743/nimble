import { create } from 'zustand';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

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
  saving: boolean;
  uploading: boolean;

  // Avatar state
  avatarUrl: string | null;
  originalAvatarUrl: string | null;

  // Message state
  error: string;
  success: string;

  // Actions
  setFormData: (data: Partial<FormData>) => void;
  setEditing: (editing: boolean) => void;
  setSaving: (saving: boolean) => void;
  setUploading: (uploading: boolean) => void;
  setAvatarUrl: (url: string | null) => void;
  setOriginalAvatarUrl: (url: string | null) => void;
  setError: (error: string) => void;
  setSuccess: (success: string) => void;

  // Async actions
  loadUserProfile: (user: User) => void;
  saveProfile: (user: User) => Promise<void>;
  uploadAvatar: (user: User, file: File) => Promise<void>;
  saveCroppedAvatar: (user: User, croppedImageData: string) => Promise<void>;
  resetForm: (user: User) => void;
}

export const useProfileStore = create<ProfileStore>((set, get) => ({
  // Initial state
  formData: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  },
  editing: false,
  saving: false,
  uploading: false,
  avatarUrl: null,
  originalAvatarUrl: null,
  error: '',
  success: '',

  // Simple setters
  setFormData: (data) => set((state) => ({
    formData: { ...state.formData, ...data }
  })),
  setEditing: (editing) => set({ editing }),
  setSaving: (saving) => set({ saving }),
  setUploading: (uploading) => set({ uploading }),
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

  // Save profile changes
  saveProfile: async (user: User) => {
    const supabase = createClient();
    const { formData } = get();

    set({ error: '', success: '', saving: true });

    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
        },
      });

      if (error) throw error;

      set({ success: 'Profile updated successfully!', editing: false });
    } catch (err: any) {
      set({ error: err.message || 'Failed to update profile. Please try again.' });
    } finally {
      set({ saving: false });
    }
  },

  // Upload new avatar
  uploadAvatar: async (user: User, file: File) => {
    const supabase = createClient();

    // Validate file type
    if (!file.type.startsWith("image/")) {
      set({ error: "Please upload an image file" });
      return;
    }

    // Validate file size (2MB)
    if (file.size > 2 * 1024 * 1024) {
      set({ error: "Image size must be less than 2MB" });
      return;
    }

    set({ uploading: true, error: '' });

    try {
      // Create unique file name
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = fileName;

      // Delete old avatar if exists
      if (user.user_metadata?.avatar_url) {
        await supabase.storage.from("avatars").remove([user.user_metadata.avatar_url]);
      }

      // Upload new avatar
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Update user metadata with new avatar path
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          avatar_url: filePath,
        },
      });

      if (updateError) throw updateError;

      // Get public URL
      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
      set({
        avatarUrl: data.publicUrl,
        originalAvatarUrl: data.publicUrl,
        success: "Profile photo updated successfully! Click 'Adjust Photo' to position it.",
      });
    } catch (err: any) {
      set({ error: err.message || "Failed to upload photo. Please try again." });
    } finally {
      set({ uploading: false });
    }
  },

  // Save cropped avatar
  saveCroppedAvatar: async (user: User, croppedImageData: string) => {
    const supabase = createClient();
    const { originalAvatarUrl } = get();

    if (!croppedImageData) return;

    set({ saving: true, error: '' });

    try {
      // Convert data URL to blob
      const response = await fetch(croppedImageData);
      const croppedImageBlob = await response.blob();

      // Create file name for cropped version
      const fileName = `${user.id}-cropped-${Date.now()}.jpg`;
      const filePath = fileName;

      // Delete old cropped avatar if exists
      if (user.user_metadata?.avatar_cropped_url) {
        await supabase.storage.from("avatars").remove([user.user_metadata.avatar_cropped_url]);
      }

      // Upload cropped image
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, croppedImageBlob, {
          cacheControl: "3600",
          upsert: false,
          contentType: "image/jpeg",
        });

      if (uploadError) throw uploadError;

      // Update user metadata with cropped avatar path
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          avatar_cropped_url: filePath,
        },
      });

      if (updateError) throw updateError;

      // Update displayed avatar to cropped version
      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
      set({
        avatarUrl: data.publicUrl,
        success: "Photo position saved!",
      });
    } catch (err: any) {
      set({ error: err.message || "Failed to save position. Please try again." });
    } finally {
      set({ saving: false });
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
