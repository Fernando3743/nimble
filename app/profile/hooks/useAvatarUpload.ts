import type { User } from "@supabase/supabase-js";
import { useProfileStore } from "@/stores/useProfileStore";
import { useAuthStore } from "@/stores/useAuthStore";
import {
  useUploadAvatar,
  useSaveCroppedAvatar,
} from "@/lib/react-query/hooks/useProfileMutations";

export function useAvatarUpload(user: User | null) {
  const {
    avatarUrl,
    originalAvatarUrl,
    setAvatarUrl,
    setOriginalAvatarUrl,
    setError,
    setSuccess,
  } = useProfileStore();

  const { updateAvatar } = useAuthStore();

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

      // Update auth store avatar
      updateAvatar(result.path);
    } catch (err: any) {
      setError(err.message || "Failed to upload photo. Please try again.");
    }
  };

  const handleSaveCrop = async (croppedImageData: string) => {
    if (!user) return;

    setError("");

    try {
      const result = await saveCroppedAvatarMutation.mutateAsync({
        userId: user.id,
        croppedImageData,
        oldCroppedPath: user.user_metadata?.avatar_cropped_url,
      });

      setAvatarUrl(result.url);
      setSuccess("Photo position saved!");

      // Update auth store with cropped avatar
      updateAvatar(user.user_metadata?.avatar_url, result.path);
    } catch (err: any) {
      setError(err.message || "Failed to save position. Please try again.");
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
