import type { User } from "@supabase/supabase-js";
import { useProfileStore } from "@/stores/useProfileStore";
import { useAuthStore } from "@/stores/useAuthStore";

export function useAvatarUpload(user: User | null) {
  const {
    uploading,
    saving,
    avatarUrl,
    originalAvatarUrl,
    uploadAvatar,
    saveCroppedAvatar,
  } = useProfileStore();

  const { updateAvatar } = useAuthStore();

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    await uploadAvatar(user, file);

    // Update auth store avatar
    if (user.user_metadata?.avatar_url) {
      updateAvatar(user.user_metadata.avatar_url);
    }
  };

  const handleSaveCrop = async (croppedImageData: string) => {
    if (!user) return;

    await saveCroppedAvatar(user, croppedImageData);

    // Update auth store with cropped avatar
    if (user.user_metadata?.avatar_cropped_url) {
      updateAvatar(
        user.user_metadata.avatar_url,
        user.user_metadata.avatar_cropped_url
      );
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
