import type { User } from "@supabase/supabase-js";
import { useProfileStore } from "@/stores/useProfileStore";
import {
  useUploadAvatar,
  useSaveCroppedAvatar,
} from "@/lib/react-query/hooks/useProfileMutations";
import { getErrorMessage } from "@/types";
import { showSuccess, showError, showLoading, updateToast } from "@/utils/toast";

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
      showError("Please upload an image file");
      return;
    }

    // Validate file size (2MB)
    if (file.size > 2 * 1024 * 1024) {
      showError("Image size must be less than 2MB");
      return;
    }

    const toastId = showLoading("Uploading photo...");

    try {
      const result = await uploadAvatarMutation.mutateAsync({
        userId: user.id,
        file,
      });

      setAvatarUrl(result.url);
      setOriginalAvatarUrl(result.url);

      updateToast(toastId, "success", "Photo uploaded! Click 'Adjust Photo' to position it 📸");
      // Note: Avatar URL will be automatically updated via React Query cache invalidation
    } catch (err) {
      updateToast(toastId, "error", getErrorMessage(err) || "Failed to upload photo");
    }
  };

  const handleSaveCrop = async (croppedImageData: string) => {
    if (!user) return;

    // Optimistically update the avatar URL immediately in the profile store
    setAvatarUrl(croppedImageData);

    const toastId = showLoading("Saving your perfect crop...");

    try {
      const result = await saveCroppedAvatarMutation.mutateAsync({
        userId: user.id,
        croppedImageData,
        oldCroppedPath: user.user_metadata?.avatar_cropped_url,
      });

      // Update with the actual uploaded URL
      setAvatarUrl(result.url);
      updateToast(toastId, "success", "Photo position saved perfectly! 🎯");

      // Note: Avatar URL will be automatically updated via React Query cache invalidation
    } catch (err) {
      // Rollback to original on error
      setAvatarUrl(originalAvatarUrl);
      updateToast(toastId, "error", getErrorMessage(err) || "Failed to save position");
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