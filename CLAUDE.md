# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 e-commerce application (Nimble) built with the App Router, featuring a modern furniture shopping experience with user authentication and profile management.

## Development Commands

```bash
# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Architecture

### State Management Strategy

The app uses a **hybrid state management** approach that separates concerns:

- **Zustand** (`stores/`): UI-only state (form inputs, editing modes, UI messages)
- **TanStack Query** (`lib/react-query/`): Server state (data fetching, caching, mutations)

**Why this matters**: Never put async data fetching in Zustand stores. All Supabase operations should use React Query hooks with automatic caching and invalidation.

### State Management Flow

```
Component
  ↓
Custom Hook (app/*/hooks/)
  ↓
├─→ Zustand Store (UI state)
└─→ React Query Hook (server state)
      ↓
    Supabase Client
```

Example: Profile page uses `useProfile` hook which:
1. Gets UI state from `useProfileStore` (Zustand)
2. Uses `useUpdateProfile` mutation (React Query) for API calls
3. React Query automatically invalidates caches and syncs data

### Authentication Architecture

**Supabase Auth** with session management:

- Client-side: `lib/supabase/client.ts` - For React components
- Server-side: `lib/supabase/server.ts` - For Server Components/Actions
- Middleware: `lib/supabase/middleware.ts` - For route protection

**Auth State**: Managed by `useAuthStore` (Zustand) + `useUser` query (React Query)
- Store initialized on app mount via `initAuth()`
- Listens to Supabase `onAuthStateChange` for real-time updates
- Avatar URLs prefer cropped version over original

### File Upload & Image Cropping

Avatar uploads use a **custom canvas-based cropper** (no external crop library dependency):

1. Upload original → Supabase Storage (`avatars` bucket)
2. Custom `ImageCropper` component for inline editing
3. Cropped version saved separately as `{userId}-cropped-{timestamp}.jpg`
4. User metadata stores both `avatar_url` (original) and `avatar_cropped_url`

**Optimistic Updates**: When saving cropped avatar:
- Immediately shows data URL in UI
- Uploads in background
- Auto-rollback on error

### React Query Patterns

**Query Keys** (in `lib/react-query/hooks/`):
```typescript
authKeys.user()           // Current user
authKeys.avatar(userId)   // Avatar URL per user
```

**Mutations with Cache Sync**:
- `useUpdateProfile`: Updates user profile → invalidates user cache
- `useUploadAvatar`: Uploads image → invalidates user + avatar caches
- `useSaveCroppedAvatar`: Optimistic update → background upload → cache sync

**Query Configuration**:
- Default staleTime: 1 minute
- No refetch on window focus
- Retry: 1 attempt
- DevTools enabled in development

### Component Structure

**Profile Page** (`app/profile/`):
```
page.tsx (orchestrator)
  ├─ components/
  │   ├─ ProfileHeader
  │   ├─ ProfileSidebar
  │   ├─ AlertMessages
  │   ├─ ProfilePhotoSection
  │   │   └─ ImageCropper (canvas-based)
  │   └─ PersonalInformationSection
  ├─ hooks/
  │   ├─ useProfile (combines store + mutations)
  │   └─ useAvatarUpload (handles uploads + crops)
  └─ [no utils/ - was removed, logic in hooks]
```

**Auth Pages** (`app/auth/signin`, `app/auth/signup`):
- Split-screen layout (mobile: stacked, desktop: side-by-side)
- Form on left, promotional image on right
- Direct Supabase auth calls (no abstraction needed for simple flows)

### Supabase Storage Structure

**Bucket: `avatars`**
- Original uploads: `{userId}-{timestamp}.{ext}`
- Cropped versions: `{userId}-cropped-{timestamp}.jpg`
- Old files deleted before new upload

**User Metadata Schema**:
```typescript
{
  first_name: string
  last_name: string
  phone: string
  avatar_url: string          // Original upload path
  avatar_cropped_url: string  // Cropped version path (preferred)
}
```

### Styling

- **Tailwind CSS 4** with custom config
- **Design System Constants** in `components/Header.tsx`:
  - Custom fonts: Instrument Sans
  - Color tokens: `dark`, `dark-gray`, `light-gray`, `primary`
  - Reusable patterns: `underlineAnimation`

### Key Conventions

1. **Client Components**: Mark with `"use client"` at top of file
2. **Query Invalidation**: Always invalidate related queries after mutations
3. **Error Handling**: Set error messages in Zustand stores, React Query handles retry
4. **Loading States**: Use `mutation.isPending` from React Query, not local useState
5. **Optimistic Updates**: Use React Query's `onMutate`/`onError`/`onSettled` pattern
6. **Avatar Display**: Always prefer `avatar_cropped_url` over `avatar_url`

### Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

### Important Patterns to Follow

**When adding new data fetching**:
1. Create mutation/query hook in `lib/react-query/hooks/`
2. Define query keys at top of file
3. Add cache invalidation in `onSuccess`/`onSettled`
4. Use the hook in custom hook (not directly in component)

**When adding new UI state**:
1. Add to appropriate Zustand store (`stores/`)
2. Keep it simple: primitives and setters only
3. No async logic in stores - use React Query

**When working with avatars**:
1. Always check for both `avatar_cropped_url` and `avatar_url`
2. Prefer cropped version for display
3. Keep original for re-cropping
4. Update both profile and auth stores on changes
