import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export function useAvatarUpload(user: User | null, setError: (error: string) => void, setSuccess: (success: string) => void) {
  const supabase = createClient();

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [originalAvatarUrl, setOriginalAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    // Load avatar URLs
    // Original for editing
    if (user.user_metadata?.avatar_url) {
      const { data: originalData } = supabase.storage
        .from("avatars")
        .getPublicUrl(user.user_metadata.avatar_url);
      setOriginalAvatarUrl(originalData.publicUrl);
    }

    // Cropped for display (fallback to original if no crop exists)
    const displayPath = user.user_metadata?.avatar_cropped_url || user.user_metadata?.avatar_url;
    if (displayPath) {
      const { data } = supabase.storage
        .from("avatars")
        .getPublicUrl(displayPath);
      setAvatarUrl(data.publicUrl);
    }
  }, [user, supabase.storage]);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }

    // Validate file size (2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError("Image size must be less than 2MB");
      return;
    }

    setUploading(true);
    setError("");

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

      if (uploadError) {
        throw uploadError;
      }

      // Update user metadata with new avatar path
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          avatar_url: filePath,
        },
      });

      if (updateError) {
        throw updateError;
      }

      // Get public URL
      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
      setAvatarUrl(data.publicUrl);
      setOriginalAvatarUrl(data.publicUrl);

      setSuccess("Profile photo updated successfully! Click 'Adjust Photo' to position it.");
      setUploading(false);
    } catch (err: any) {
      setError(err.message || "Failed to upload photo. Please try again.");
      setUploading(false);
    }
  };

  const handleSaveCrop = async (croppedImageData: string) => {
    if (!user || !croppedImageData) return;

    setSaving(true);
    setError("");

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

      if (uploadError) {
        throw uploadError;
      }

      // Update user metadata with cropped avatar path
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          avatar_cropped_url: filePath,
        },
      });

      if (updateError) {
        throw updateError;
      }

      // Update displayed avatar to cropped version
      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
      setAvatarUrl(data.publicUrl);

      setSuccess("Photo position saved!");
      setSaving(false);
    } catch (err: any) {
      setError(err.message || "Failed to save position. Please try again.");
      setSaving(false);
    }
  };

  return {
    uploading,
    saving,
    avatarUrl,
    originalAvatarUrl,
    handleAvatarUpload,
    handleSaveCrop,
  };
}
