"use client";

import type { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import type { ProfileFormData } from "@/types";
import { useTranslations } from "next-intl";

interface PersonalInformationSectionProps {
  formData: ProfileFormData;
  editing: boolean;
  saving: boolean;
  user: User | null;
  onEdit: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function PersonalInformationSection({
  formData,
  editing,
  saving,
  user,
  onEdit,
  onChange,
  onSave,
  onCancel,
}: PersonalInformationSectionProps) {
  const t = useTranslations("profile");
  const tCommon = useTranslations("common");

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-black text-dark">{t("personalInfo")}</h2>
        {!editing && (
          <Button
            onClick={onEdit}
            variant="outline"
            size="sm"
          >
            {tCommon("edit")}
          </Button>
        )}
      </div>

      <div className="space-y-4">
        <FormField
          label={t("firstName")}
          name="firstName"
          value={formData.firstName}
          onChange={onChange}
          disabled={!editing}
        />

        <FormField
          label={t("lastName")}
          name="lastName"
          value={formData.lastName}
          onChange={onChange}
          disabled={!editing}
        />

        <FormField
          label={t("email")}
          type="email"
          name="email"
          value={formData.email}
          disabled
          helperText="Email cannot be changed"
        />

        <FormField
          label={t("phone")}
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={onChange}
          disabled={!editing}
        />

        {/* Action Buttons */}
        {editing && (
          <div className="flex gap-3 pt-4">
            <Button
              onClick={onSave}
              loading={saving}
              fullWidth
            >
              {t("saveChanges")}
            </Button>
            <Button
              onClick={onCancel}
              variant="outline"
              fullWidth
            >
              {tCommon("cancel")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
