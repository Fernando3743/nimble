import type { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import type { ProfileFormData } from "@/types";

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
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-black text-dark">Personal Information</h2>
        {!editing && (
          <Button
            onClick={onEdit}
            variant="outline"
            size="sm"
          >
            Edit
          </Button>
        )}
      </div>

      <div className="space-y-4">
        <FormField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={onChange}
          disabled={!editing}
        />

        <FormField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={onChange}
          disabled={!editing}
        />

        <FormField
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          disabled
          helperText="Email cannot be changed"
        />

        <FormField
          label="Phone Number"
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
              Save Changes
            </Button>
            <Button
              onClick={onCancel}
              variant="outline"
              fullWidth
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
