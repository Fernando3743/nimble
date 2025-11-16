import type { User } from "@supabase/supabase-js";
import { useProfileStore } from "@/stores/useProfileStore";
import {
  useUploadAvatar,
  useSaveCroppedAvatar,
} from "@/lib/react-query/hooks/useProfileMutations";
import { getErrorMessage } from "@/types";

export function useAvatarUpload(user: User | null) {
  const {
    avatarUrl,
    originalAvatarUrl,
    setAvatarUrl,
    setOriginalAvatarUrl,
    setError,
    setSuccess,
  } = useProfileStore();

  const uploadAvatarMutation = useUploadAvatar();
  const saveCroppedAvatarMutation = useSaveCroppedAvatar();

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

    setError("");

    try {
      const result = await uploadAvatarMutation.mutateAsync({
        userId: user.id,
        file,
      });

      setAvatarUrl(result.url);
      setOriginalAvatarUrl(result.url);
      setSuccess("Profile photo updated successfully! Click 'Adjust Photo' to position it.");

      // Note: Avatar URL will be automatically updated via React Query cache invalidation
    } catch (err) {
      setError(getErrorMessage(err) || "Failed to upload photo. Please try again.");
    }
  };

  const handleSaveCrop = async (croppedImageData: string) => {
    if (!user) return;

    setError("");

    // Optimistically update the avatar URL immediately in the profile store
    setAvatarUrl(croppedImageData);

    try {
      const result = await saveCroppedAvatarMutation.mutateAsync({
        userId: user.id,
        croppedImageData,
        oldCroppedPath: user.user_metadata?.avatar_cropped_url,
      });

      // Update with the actual uploaded URL
      setAvatarUrl(result.url);
      setSuccess("Photo position saved!");

      // Note: Avatar URL will be automatically updated via React Query cache invalidation
    } catch (err) {
      // Rollback to original on error
      setAvatarUrl(originalAvatarUrl);
      setError(getErrorMessage(err) || "Failed to save position. Please try again.");
    }
  };

  return {
    uploading: uploadAvatarMutation.isPending,
    saving: saveCroppedAvatarMutation.isPending,
    avatarUrl,
    originalAvatarUrl,
    handleAvatarUpload,
    handleSaveCrop,
  };
}