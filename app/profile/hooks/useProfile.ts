import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { useProfileStore } from "@/stores/useProfileStore";
import { useUpdateProfile } from "@/lib/react-query/hooks/useProfileMutations";
import { useSignOut } from "@/lib/react-query/hooks/useAuthQuery";

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

    setError("");
    setSuccess("");

    try {
      await updateProfileMutation.mutateAsync({
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
      });

      setSuccess("Profile updated successfully!");
      setEditing(false);
    } catch (err: any) {
      setError(err.message || "Failed to update profile. Please try again.");
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
