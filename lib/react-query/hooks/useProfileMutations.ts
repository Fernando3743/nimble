import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import { authKeys } from "./useAuthQuery";
import { FILE_UPLOAD } from "@/lib/constants";

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

  // Validate file type
  if (!(FILE_UPLOAD.ALLOWED_IMAGE_TYPES as readonly string[]).includes(file.type)) {
    throw new Error(`Invalid file type. Please upload an image file (${FILE_UPLOAD.ALLOWED_IMAGE_EXTENSIONS.join(', ')}).`);
  }

  // Validate file size
  if (file.size > FILE_UPLOAD.MAX_SIZE_BYTES) {
    throw new Error(`File size too large. Please upload an image smaller than ${FILE_UPLOAD.MAX_SIZE_MB}MB.`);
  }

  // Create unique file name with proper extension handling
  const fileExtMatch = file.name.match(/\.([^.]+)$/);
  const fileExt = fileExtMatch ? fileExtMatch[1] : file.type.split('/')[1] || 'jpg';
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

  if (updateError) throw updateError;

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
      queryClient.invalidateQueries({ queryKey: authKeys.originalAvatar(variables.userId) });
    },
  });
}

export function useSaveCroppedAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveCroppedAvatar,
    // Optimistic update - immediately show the cropped image
    onMutate: async (variables) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: authKeys.avatar(variables.userId) });

      // Snapshot the previous value
      const previousAvatar = queryClient.getQueryData(authKeys.avatar(variables.userId));

      // Optimistically update to the new cropped image
      queryClient.setQueryData(authKeys.avatar(variables.userId), variables.croppedImageData);

      // Return context with the previous value
      return { previousAvatar };
    },
    // On error, roll back to the previous value
    onError: (_err, variables, context) => {
      if (context?.previousAvatar) {
        queryClient.setQueryData(authKeys.avatar(variables.userId), context.previousAvatar);
      }
    },
    // Always refetch after error or success
    onSettled: (_, __, variables) => {
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
