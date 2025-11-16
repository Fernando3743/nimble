import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { useProfileStore } from "@/stores/useProfileStore";

export function useProfile() {
  const router = useRouter();
  const { user, loading: authLoading, signOut } = useAuthStore();

  const {
    formData,
    editing,
    saving,
    error,
    success,
    setFormData,
    setEditing,
    setError,
    setSuccess,
    loadUserProfile,
    saveProfile,
    resetForm,
  } = useProfileStore();

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
    await saveProfile(user);
  };

  const handleCancel = () => {
    if (!user) return;
    resetForm(user);
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return {
    user,
    loading: authLoading,
    editing,
    saving,
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
