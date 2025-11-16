import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import { authKeys } from "./useAuthQuery";

interface UpdateProfileData {
  first_name: string;
  last_name: string;
  phone: string;
}

interface UploadAvatarParams {
  userId: string;
  file: File;
}

interface SaveCroppedAvatarParams {
  userId: string;
  croppedImageData: string;
  oldCroppedPath?: string;
}

// Update user profile
async function updateProfile(data: UpdateProfileData): Promise<User> {
  const supabase = createClient();

  const { data: userData, error } = await supabase.auth.updateUser({
    data: {
      first_name: data.first_name,
      last_name: data.last_name,
      phone: data.phone,
    },
  });

  if (error) throw error;
  if (!userData.user) throw new Error("No user returned");

  return userData.user;
}

// Upload avatar
async function uploadAvatar({ userId, file }: UploadAvatarParams): Promise<{ path: string; url: string }> {
  const supabase = createClient();

  // Create unique file name
  const fileExt = file.name.split(".").pop();
  const fileName = `${userId}-${Date.now()}.${fileExt}`;
  const filePath = fileName;

  // Upload file
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) throw uploadError;

  // Update user metadata
  const { error: updateError } = await supabase.auth.updateUser({
    data: { avatar_url: filePath },
  });

  if (updateError) throw uploadError;

  // Get public URL
  const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

  return { path: filePath, url: data.publicUrl };
}

// Save cropped avatar
async function saveCroppedAvatar({
  userId,
  croppedImageData,
  oldCroppedPath,
}: SaveCroppedAvatarParams): Promise<{ path: string; url: string }> {
  const supabase = createClient();

  // Convert data URL to blob
  const response = await fetch(croppedImageData);
  const blob = await response.blob();

  // Create file name
  const fileName = `${userId}-cropped-${Date.now()}.jpg`;
  const filePath = fileName;

  // Delete old cropped avatar if exists
  if (oldCroppedPath) {
    await supabase.storage.from("avatars").remove([oldCroppedPath]);
  }

  // Upload cropped image
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, blob, {
      cacheControl: "3600",
      upsert: false,
      contentType: "image/jpeg",
    });

  if (uploadError) throw uploadError;

  // Update user metadata
  const { error: updateError } = await supabase.auth.updateUser({
    data: { avatar_cropped_url: filePath },
  });

  if (updateError) throw updateError;

  // Get public URL
  const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

  return { path: filePath, url: data.publicUrl };
}

// Delete avatar
async function deleteAvatar(path: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.storage.from("avatars").remove([path]);
  if (error) throw error;
}

// Hooks
export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (user) => {
      // Update user in cache
      queryClient.setQueryData(authKeys.user(), user);
      queryClient.invalidateQueries({ queryKey: authKeys.user() });
    },
  });
}

export function useUploadAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadAvatar,
    onSuccess: (_, variables) => {
      // Invalidate user and avatar queries
      queryClient.invalidateQueries({ queryKey: authKeys.user() });
      queryClient.invalidateQueries({ queryKey: authKeys.avatar(variables.userId) });
    },
  });
}

export function useSaveCroppedAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveCroppedAvatar,
    onSuccess: (_, variables) => {
      // Invalidate user and avatar queries
      queryClient.invalidateQueries({ queryKey: authKeys.user() });
      queryClient.invalidateQueries({ queryKey: authKeys.avatar(variables.userId) });
    },
  });
}

export function useDeleteAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.all });
    },
  });
}
