// User and authentication related types
export interface UserMetadata {
  first_name?: string;
  last_name?: string;
  phone?: string;
  avatar_url?: string;
  avatar_cropped_url?: string;
  // OAuth provider data
  full_name?: string;
  avatar?: string;
  picture?: string;
}

// Form data types
export interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

// Avatar related types
export interface AvatarUploadResult {
  path: string;
  url: string;
}

// Error types
export interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
}

// Helper function for type-safe error handling
export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as ApiError).message === "string"
  );
}

// Helper function to get error message
export function getErrorMessage(error: unknown): string {
  if (isApiError(error)) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  return "An unexpected error occurred";
}

// Helper function to get user's display name
export function getUserDisplayName(metadata?: UserMetadata, email?: string): string {
  if (metadata?.first_name) {
    return metadata.first_name;
  }
  if (metadata?.full_name) {
    return metadata.full_name.split(" ")[0];
  }
  if (email) {
    return email.split("@")[0];
  }
  return "User";
}

// Helper function to get avatar URL (preferring cropped version)
export function getAvatarUrl(metadata?: UserMetadata): string | null {
  return metadata?.avatar_cropped_url || metadata?.avatar_url || metadata?.avatar || metadata?.picture || null;
}