"use client";

import { useState, useEffect, useCallback, memo } from "react";
import ImageCropper from "./ImageCropper";
import { useTranslations } from "next-intl";
import { IMAGE_CROPPER } from "@/lib/constants";
import {
  ZOOM_BUTTON_SIZE,
  ZOOM_BUTTON_STYLES,
  AVATAR_SIZE_MOBILE,
  AVATAR_SIZE_DESKTOP,
  BUTTON_WIDTH_MOBILE,
  BUTTON_WIDTH_DESKTOP,
  HAPTIC_DURATION
} from "../constants";

interface ProfilePhotoSectionProps {
  avatarUrl: string | null;
  originalAvatarUrl: string | null;
  firstName: string;
  uploading: boolean;
  saving: boolean;
  onAvatarUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSaveCrop: (croppedImageData: string) => void;
}

const ProfilePhotoSection = memo(function ProfilePhotoSection({
  avatarUrl,
  originalAvatarUrl,
  firstName,
  uploading,
  saving,
  onAvatarUpload,
  onSaveCrop,
}: ProfilePhotoSectionProps) {
  const t = useTranslations("profile");
  const [adjustingPhoto, setAdjustingPhoto] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [minZoom, setMinZoom] = useState<number>(IMAGE_CROPPER.MIN_ZOOM); // Dynamic min based on image size
  const [croppedImageData, setCroppedImageData] = useState<string | null>(null);

  // Handle keyboard shortcuts for zoom
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!adjustingPhoto) return;

      if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        setZoom((prev) => Math.min(IMAGE_CROPPER.MAX_ZOOM, prev + IMAGE_CROPPER.ZOOM_STEP));
      } else if (e.key === '-' || e.key === '_') {
        e.preventDefault();
        setZoom((prev) => Math.max(minZoom, prev - IMAGE_CROPPER.ZOOM_STEP));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [adjustingPhoto, minZoom]);

  const handleCropComplete = useCallback((data: string) => {
    setCroppedImageData(data);
  }, []);

  // Safe zoom percentage calculation (prevents division by zero)
  const getZoomPercentage = useCallback(() => {
    const zoomRange = IMAGE_CROPPER.MAX_ZOOM - minZoom;
    if (zoomRange <= 0) return 0;
    return Math.round(((zoom - minZoom) / zoomRange) * 100);
  }, [zoom, minZoom]);

  // Add haptic feedback for mobile devices
  const triggerHapticFeedback = useCallback(() => {
    if ('vibrate' in navigator && window.innerWidth < 640) {
      navigator.vibrate(HAPTIC_DURATION);
    }
  }, []);

  const handleSaveCrop = () => {
    if (croppedImageData) {
      onSaveCrop(croppedImageData);
      setAdjustingPhoto(false);
    }
  };

  const handleCancel = () => {
    setAdjustingPhoto(false);
    // Reset to defaults
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setMinZoom(IMAGE_CROPPER.MIN_ZOOM); // Reset minZoom to default
    setCroppedImageData(null); // Clear any cropped data
  };

  return (
    <div className="rounded-lg bg-white p-4 sm:p-6 shadow-sm">
      <h2 className="mb-4 sm:mb-6 text-lg sm:text-xl font-black text-dark">{t("avatar")}</h2>

      <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4 sm:gap-6">
        {/* Profile Photo or Cropper */}
        {!adjustingPhoto ? (
          <div className={`relative ${AVATAR_SIZE_MOBILE} ${AVATAR_SIZE_DESKTOP} flex-shrink-0 overflow-hidden rounded-full bg-light-gray`}>
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={t("avatar")}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-4xl sm:text-5xl font-black text-dark-gray">
                {firstName?.[0]?.toUpperCase() || "?"}
              </div>
            )}
          </div>
        ) : (
          <div className="flex justify-center">
            <ImageCropper
              imageSrc={originalAvatarUrl || avatarUrl || ''}
              scale={zoom}
              onScaleChange={setZoom}
              onMinScaleChange={setMinZoom}
              position={crop}
              onPositionChange={setCrop}
              onCropComplete={handleCropComplete}
              saving={saving}
            />
          </div>
        )}

        {/* Controls */}
        <div className="flex-1 w-full sm:w-auto">
          <input
            type="file"
            accept="image/*"
            onChange={onAvatarUpload}
            className="hidden"
            id="avatar-upload"
            disabled={uploading || adjustingPhoto}
          />
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3">
            <label
              htmlFor="avatar-upload"
              className={`${BUTTON_WIDTH_MOBILE} ${BUTTON_WIDTH_DESKTOP} text-center rounded-full border border-zinc-300 bg-white px-4 sm:px-6 py-2 text-sm font-bold text-dark transition ${
                uploading || adjustingPhoto
                  ? 'cursor-not-allowed opacity-50'
                  : 'cursor-pointer hover:bg-light-gray/50'
              }`}
            >
              {uploading ? t("uploading") : t("uploadPhoto")}
            </label>
            {avatarUrl && (
              <button
                onClick={() => {
                  triggerHapticFeedback();
                  setAdjustingPhoto(true);
                }}
                disabled={adjustingPhoto}
                className={`${BUTTON_WIDTH_MOBILE} ${BUTTON_WIDTH_DESKTOP} rounded-full border border-zinc-300 bg-white px-4 sm:px-6 py-2 text-sm font-bold text-dark transition ${
                  adjustingPhoto
                    ? 'cursor-not-allowed opacity-50'
                    : 'hover:bg-light-gray/50'
                }`}
                type="button"
              >
                {t("cropPhoto")}
              </button>
            )}
          </div>
          <p className="mt-2 text-xs text-dark-gray text-center sm:text-left">
            JPG, PNG or GIF. Max size 2MB.
          </p>

          {/* Adjustment Controls - Show when adjusting */}
          {adjustingPhoto && (
            <div className="mt-4 space-y-3">
              <p className="hidden lg:block text-xs text-dark-gray text-left">
                Drag to reposition • Use +/− keys to zoom
              </p>

              {/* Zoom Controls */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-dark">
                  Zoom: {getZoomPercentage()}%
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      triggerHapticFeedback();
                      setZoom((prev) => Math.max(minZoom, prev - IMAGE_CROPPER.ZOOM_STEP));
                    }}
                    disabled={saving || zoom <= minZoom}
                    className={`${ZOOM_BUTTON_SIZE} ${ZOOM_BUTTON_STYLES}`}
                    type="button"
                    aria-label="Zoom out"
                  >
                    −
                  </button>
                  <div className="flex-1 h-1 bg-light-gray rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-200"
                      style={{
                        width: `${getZoomPercentage()}%`
                      }}
                    />
                  </div>
                  <button
                    onClick={() => {
                      triggerHapticFeedback();
                      setZoom((prev) => Math.min(IMAGE_CROPPER.MAX_ZOOM, prev + IMAGE_CROPPER.ZOOM_STEP));
                    }}
                    disabled={saving || zoom >= IMAGE_CROPPER.MAX_ZOOM}
                    className={`${ZOOM_BUTTON_SIZE} ${ZOOM_BUTTON_STYLES}`}
                    type="button"
                    aria-label="Zoom in"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 items-center">
                <button
                  onClick={() => {
                    triggerHapticFeedback();
                    handleSaveCrop();
                  }}
                  disabled={saving}
                  className={`${BUTTON_WIDTH_MOBILE} ${BUTTON_WIDTH_DESKTOP} rounded-full bg-primary px-4 sm:px-6 py-2 text-sm font-bold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50`}
                  type="button"
                >
                  {saving ? t("cropping") : t("savePhoto")}
                </button>
                <button
                  onClick={() => {
                    triggerHapticFeedback();
                    handleCancel();
                  }}
                  disabled={saving}
                  className={`${BUTTON_WIDTH_MOBILE} ${BUTTON_WIDTH_DESKTOP} rounded-full border border-zinc-300 bg-white px-4 sm:px-6 py-2 text-sm font-bold text-dark transition hover:bg-light-gray/50 disabled:cursor-not-allowed disabled:opacity-50`}
                  type="button"
                >
                  {t("cancelCrop")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default ProfilePhotoSection;