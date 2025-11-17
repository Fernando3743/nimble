import type { User } from "@supabase/supabase-js";
import { useProfileStore } from "@/stores/useProfileStore";
import {
  useUploadAvatar,
  useSaveCroppedAvatar,
} from "@/lib/react-query/hooks/useProfileMutations";
import { useAvatarUrl, useOriginalAvatarUrl } from "@/lib/react-query/hooks/useAuthQuery";
import { getErrorMessage } from "@/types";
import { showError, showLoading, updateToast } from "@/utils/toast";
import { FILE_UPLOAD } from "@/lib/constants";

export function useAvatarUpload(user: User | null) {
  const { setError, setSuccess } = useProfileStore();

  // Get avatar URLs from React Query instead of Zustand
  const { data: avatarUrl } = useAvatarUrl(user);
  const { data: originalAvatarUrl } = useOriginalAvatarUrl(user);

  const uploadAvatarMutation = useUploadAvatar();
  const saveCroppedAvatarMutation = useSaveCroppedAvatar();

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Validate file type
    if (!(FILE_UPLOAD.ALLOWED_IMAGE_TYPES as readonly string[]).includes(file.type)) {
      showError(`Please upload an image file (${FILE_UPLOAD.ALLOWED_IMAGE_EXTENSIONS.join(', ')})`);
      return;
    }

    // Validate file size
    if (file.size > FILE_UPLOAD.MAX_SIZE_BYTES) {
      showError(`Image size must be less than ${FILE_UPLOAD.MAX_SIZE_MB}MB`);
      return;
    }

    const toastId = showLoading("Uploading photo...");

    try {
      await uploadAvatarMutation.mutateAsync({
        userId: user.id,
        file,
      });

      updateToast(toastId, "success", "Photo uploaded! Click 'Adjust Photo' to position it 📸");
      // Note: Avatar URLs will be automatically updated via React Query cache invalidation
    } catch (err) {
      updateToast(toastId, "error", getErrorMessage(err) || "Failed to upload photo");
    }
  };

  const handleSaveCrop = async (croppedImageData: string) => {
    if (!user) return;

    const toastId = showLoading("Saving your perfect crop...");

    try {
      await saveCroppedAvatarMutation.mutateAsync({
        userId: user.id,
        croppedImageData,
        oldCroppedPath: user.user_metadata?.avatar_cropped_url,
      });

      updateToast(toastId, "success", "Photo position saved perfectly! 🎯");

      // Note: Avatar URL will be automatically updated via React Query cache invalidation
      // Optimistic updates are handled in the mutation itself
    } catch (err) {
      updateToast(toastId, "error", getErrorMessage(err) || "Failed to save position");
    }
  };

  return {
    uploading: uploadAvatarMutation.isPending,
    saving: saveCroppedAvatarMutation.isPending,
    avatarUrl: avatarUrl || null,
    originalAvatarUrl: originalAvatarUrl || null,
    handleAvatarUpload,
    handleSaveCrop,
  };
}