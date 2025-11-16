"use client";

import ProfileHeader from "./components/ProfileHeader";
import ProfileSidebar from "./components/ProfileSidebar";
import AlertMessages from "./components/AlertMessages";
import ProfilePhotoSection from "./components/ProfilePhotoSection";
import PersonalInformationSection from "./components/PersonalInformationSection";
import { useProfile } from "./hooks/useProfile";
import { useAvatarUpload } from "./hooks/useAvatarUpload";

export default function ProfilePage() {
  const {
    user,
    loading,
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
  } = useProfile();

  const {
    uploading,
    saving: avatarSaving,
    avatarUrl,
    originalAvatarUrl,
    handleAvatarUpload,
    handleSaveCrop,
  } = useAvatarUpload(user);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg text-dark-gray">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <ProfileHeader />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-4">
          <ProfileSidebar onSignOut={handleSignOut} />

          <div className="space-y-6 lg:col-span-3">
            <AlertMessages error={error} success={success} />

            <ProfilePhotoSection
              avatarUrl={avatarUrl}
              originalAvatarUrl={originalAvatarUrl}
              firstName={formData.firstName}
              uploading={uploading}
              saving={avatarSaving}
              onAvatarUpload={handleAvatarUpload}
              onSaveCrop={handleSaveCrop}
            />

            <PersonalInformationSection
              formData={formData}
              editing={editing}
              saving={saving}
              user={user}
              onEdit={() => setEditing(true)}
              onChange={handleChange}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
