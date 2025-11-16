import type { User } from "@supabase/supabase-js";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface PersonalInformationSectionProps {
  formData: FormData;
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
          <button
            onClick={onEdit}
            className="rounded-full border border-zinc-300 bg-white px-6 py-2 text-sm font-bold text-dark transition hover:bg-light-gray/50"
            type="button"
          >
            Edit
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* First Name */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-dark">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={onChange}
            disabled={!editing}
            className="w-full rounded-full border border-zinc-300 bg-white px-4 py-3 text-sm text-dark outline-none transition focus:border-dark focus:ring-2 focus:ring-dark/10 disabled:bg-zinc-50 disabled:text-dark-gray"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-dark">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={onChange}
            disabled={!editing}
            className="w-full rounded-full border border-zinc-300 bg-white px-4 py-3 text-sm text-dark outline-none transition focus:border-dark focus:ring-2 focus:ring-dark/10 disabled:bg-zinc-50 disabled:text-dark-gray"
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-dark">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            disabled
            className="w-full rounded-full border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-dark-gray outline-none"
          />
          <p className="mt-1 text-xs text-dark-gray">
            Email cannot be changed
          </p>
        </div>

        {/* Phone */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-dark">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={onChange}
            disabled={!editing}
            className="w-full rounded-full border border-zinc-300 bg-white px-4 py-3 text-sm text-dark outline-none transition focus:border-dark focus:ring-2 focus:ring-dark/10 disabled:bg-zinc-50 disabled:text-dark-gray"
          />
        </div>

        {/* Action Buttons */}
        {editing && (
          <div className="flex gap-3 pt-4">
            <button
              onClick={onSave}
              disabled={saving}
              className="flex-1 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              type="button"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button
              onClick={onCancel}
              className="flex-1 rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-bold text-dark transition hover:bg-light-gray/50"
              type="button"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
