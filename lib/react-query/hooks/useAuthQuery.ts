import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import { QUERY_CONFIG } from "@/lib/constants";

// Query keys
export const authKeys = {
  all: ['auth'] as const,
  user: () => [...authKeys.all, 'user'] as const,
  avatar: (userId: string) => [...authKeys.all, 'avatar', userId] as const,
  originalAvatar: (userId: string) => [...authKeys.all, 'original-avatar', userId] as const,
};

// Fetch current user
async function fetchUser(): Promise<User | null> {
  const supabase = createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error) throw error;
  return user;
}

// Fetch avatar URL for user
async function fetchAvatarUrl(user: User | null): Promise<string | null> {
  if (!user) return null;

  const supabase = createClient();
  const avatarPath = user.user_metadata?.avatar_cropped_url || user.user_metadata?.avatar_url;

  if (!avatarPath) return null;

  const { data } = supabase.storage
    .from("avatars")
    .getPublicUrl(avatarPath);

  return data.publicUrl;
}

// Fetch original avatar URL for user (uncropped)
async function fetchOriginalAvatarUrl(user: User | null): Promise<string | null> {
  if (!user) return null;

  const supabase = createClient();
  const avatarPath = user.user_metadata?.avatar_url;

  if (!avatarPath) return null;

  const { data } = supabase.storage
    .from("avatars")
    .getPublicUrl(avatarPath);

  return data.publicUrl;
}

// Hook to get current user
export function useUser() {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: fetchUser,
    staleTime: QUERY_CONFIG.STALE_TIME.USER,
  });
}

// Hook to get avatar URL
export function useAvatarUrl(user: User | null) {
  return useQuery({
    queryKey: authKeys.avatar(user?.id || ''),
    queryFn: () => fetchAvatarUrl(user),
    enabled: !!user,
    staleTime: QUERY_CONFIG.STALE_TIME.AVATAR,
  });
}

// Hook to get original avatar URL (uncropped)
export function useOriginalAvatarUrl(user: User | null) {
  return useQuery({
    queryKey: authKeys.originalAvatar(user?.id || ''),
    queryFn: () => fetchOriginalAvatarUrl(user),
    enabled: !!user,
    staleTime: QUERY_CONFIG.STALE_TIME.AVATAR,
  });
}

// Sign out mutation
export function useSignOut() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const supabase = createClient();
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
    onSuccess: () => {
      // Invalidate all auth queries
      queryClient.invalidateQueries({ queryKey: authKeys.all });
      // Clear user data
      queryClient.setQueryData(authKeys.user(), null);
    },
  });
}
