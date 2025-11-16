import { useState, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";
import type { Area } from "react-easy-crop";

interface ProfilePhotoSectionProps {
  avatarUrl: string | null;
  originalAvatarUrl: string | null;
  firstName: string;
  uploading: boolean;
  saving: boolean;
  onAvatarUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSaveCrop: (croppedAreaPixels: Area) => void;
}

export default function ProfilePhotoSection({
  avatarUrl,
  originalAvatarUrl,
  firstName,
  uploading,
  saving,
  onAvatarUpload,
  onSaveCrop,
}: ProfilePhotoSectionProps) {
  const [adjustingPhoto, setAdjustingPhoto] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  // Handle keyboard shortcuts for zoom
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!adjustingPhoto) return;

      if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        setZoom((prev) => Math.min(3, prev + 0.1));
      } else if (e.key === '-' || e.key === '_') {
        e.preventDefault();
        setZoom((prev) => Math.max(1, prev - 0.1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [adjustingPhoto]);

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSaveCrop = () => {
    if (croppedAreaPixels) {
      onSaveCrop(croppedAreaPixels);
      setAdjustingPhoto(false);
    }
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-black text-dark">Profile Photo</h2>

      <div className="flex items-start gap-6">
        {/* Profile Photo or Cropper */}
        {!adjustingPhoto ? (
          <div className="relative h-40 w-40 flex-shrink-0 overflow-hidden rounded-full bg-light-gray">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-5xl font-black text-dark-gray">
                {firstName?.[0]?.toUpperCase() || "?"}
              </div>
            )}
          </div>
        ) : (
          <div className="relative h-40 w-40 flex-shrink-0 overflow-hidden">
            <div className="absolute h-[280px] w-[280px] -left-[60px] -top-[60px] bg-white">
              {saving && (
                <div className="absolute left-[60px] top-[60px] z-10 flex h-40 w-40 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/20 border-t-white"></div>
                </div>
              )}
              <Cropper
                image={originalAvatarUrl || avatarUrl || ''}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                cropSize={{ width: 160, height: 160 }}
                onCropChange={saving ? () => {} : setCrop}
                onZoomChange={saving ? () => {} : setZoom}
                onCropComplete={onCropComplete}
                disableAutomaticStylesInjection={false}
                zoomWithScroll={false}
                style={{
                  containerStyle: {
                    pointerEvents: saving ? 'none' : 'auto',
                  },
                  cropAreaStyle: {
                    color: 'rgba(255, 255, 255, 1)',
                  },
                }}
              />
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex-1">
          <input
            type="file"
            accept="image/*"
            onChange={onAvatarUpload}
            className="hidden"
            id="avatar-upload"
            disabled={uploading || adjustingPhoto}
          />
          <label
            htmlFor="avatar-upload"
            className={`inline-block rounded-full border border-zinc-300 bg-white px-6 py-2 text-sm font-bold text-dark transition ${
              uploading || adjustingPhoto
                ? 'cursor-not-allowed opacity-50'
                : 'cursor-pointer hover:bg-light-gray/50'
            }`}
          >
            {uploading ? "Uploading..." : "Upload New Photo"}
          </label>
          {avatarUrl && (
            <button
              onClick={() => setAdjustingPhoto(true)}
              disabled={adjustingPhoto}
              className={`ml-3 rounded-full border border-zinc-300 bg-white px-6 py-2 text-sm font-bold text-dark transition ${
                adjustingPhoto
                  ? 'cursor-not-allowed opacity-50'
                  : 'hover:bg-light-gray/50'
              }`}
              type="button"
            >
              Adjust Photo
            </button>
          )}
          <p className="mt-2 text-xs text-dark-gray">
            JPG, PNG or GIF. Max size 2MB.
          </p>

          {/* Adjustment Controls - Show when adjusting */}
          {adjustingPhoto && (
            <div className="mt-4 space-y-3">
              <p className="text-xs text-dark-gray">
                Drag to reposition • Use +/− keys to zoom
              </p>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={handleSaveCrop}
                  disabled={saving}
                  className="rounded-full bg-primary px-6 py-2 text-sm font-bold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                  type="button"
                >
                  {saving ? "Saving..." : "Save Position"}
                </button>
                <button
                  onClick={() => setAdjustingPhoto(false)}
                  disabled={saving}
                  className="rounded-full border border-zinc-300 bg-white px-6 py-2 text-sm font-bold text-dark transition hover:bg-light-gray/50 disabled:cursor-not-allowed disabled:opacity-50"
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
