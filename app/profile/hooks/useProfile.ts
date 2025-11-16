import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { useProfileStore } from "@/stores/useProfileStore";
import { useUpdateProfile } from "@/lib/react-query/hooks/useProfileMutations";
import { useSignOut } from "@/lib/react-query/hooks/useAuthQuery";
import { getErrorMessage } from "@/types";
import { showSuccess, showError, toastPromise } from "@/utils/toast";

export function useProfile() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuthStore();

  const {
    formData,
    editing,
    error,
    success,
    setFormData,
    setEditing,
    setError,
    setSuccess,
    loadUserProfile,
    resetForm,
  } = useProfileStore();

  const updateProfileMutation = useUpdateProfile();
  const signOutMutation = useSignOut();

  // Load user profile when user is available
  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      router.push("/auth/signin");
      return;
    }

    loadUserProfile(user);
  }, [user, authLoading, router, loadUserProfile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  const handleSave = async () => {
    if (!user) return;

    // Clear old messages
    setError("");
    setSuccess("");

    const updatePromise = updateProfileMutation.mutateAsync({
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone: formData.phone,
    });

    toastPromise(
      updatePromise,
      {
        pending: "Saving profile...",
        success: "Profile updated successfully! 🎉",
        error: (err) => getErrorMessage(err) || "Failed to update profile. Please try again.",
      }
    );

    try {
      await updatePromise;
      setEditing(false);
    } catch (err) {
      // Error is already shown by toastPromise
    }
  };

  const handleCancel = () => {
    if (!user) return;
    resetForm(user);
  };

  const handleSignOut = async () => {
    await signOutMutation.mutateAsync();
    router.push("/");
  };

  return {
    user,
    loading: authLoading,
    editing,
    saving: updateProfileMutation.isPending,
    error,
    success,
    formData,
    setEditing,
    setError,
    setSuccess,
    handleChange,
    handleSave,
    handleCancel,
    handleSignOut,
  };
}
