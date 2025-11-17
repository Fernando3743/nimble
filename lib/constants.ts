/**
 * Application-wide constants
 */

// File upload constraints
export const FILE_UPLOAD = {
  MAX_SIZE_BYTES: 5 * 1024 * 1024, // 5MB
  MAX_SIZE_MB: 5,
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  ALLOWED_IMAGE_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.webp'],
} as const;

// Image cropping settings
export const IMAGE_CROPPER = {
  CROP_SIZE: 160, // Default crop size in pixels
  DEFAULT_ZOOM: 1,
  MIN_ZOOM: 1,
  MAX_ZOOM: 3,
  ZOOM_STEP: 0.1,
  JPEG_QUALITY: 0.95,
  THROTTLE_MS: 16, // ~60fps
} as const;

// React Query configuration
export const QUERY_CONFIG = {
  STALE_TIME: {
    DEFAULT: 60 * 1000, // 1 minute
    USER: 5 * 60 * 1000, // 5 minutes
    AVATAR: 5 * 60 * 1000, // 5 minutes
  },
  RETRY: {
    DEFAULT: 1,
  },
} as const;

// Toast notification durations
export const TOAST_DURATION = {
  SUCCESS: 4000,
  ERROR: 5000,
  INFO: 4000,
  WARNING: 4000,
} as const;
