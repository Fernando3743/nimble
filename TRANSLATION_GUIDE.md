# Multi-Language Translation Guide

This guide explains how the multi-language system works and how to complete the remaining component translations.

## ✅ What's Been Implemented

### Infrastructure (100% Complete)
- ✅ Dictionary files: `/dictionaries/en.ts` and `/dictionaries/es.ts`
- ✅ Language Context: `/contexts/LanguageContext.tsx`
- ✅ Language Switcher Component: `/components/LanguageSwitcher.tsx`
- ✅ LanguageProvider integrated in root layout
- ✅ localStorage persistence for language preference

### Components Updated (Partial)
- ✅ Header component - Full translation support
- ✅ Sign In page - Full translation support
- ✅ Root layout - Updated metadata

### Translation Coverage
- **English (en)**: 300+ translation keys across all categories
- **Spanish (es)**: 300+ professionally translated keys

## 🔧 How It Works

### 1. Dictionary Structure
All translations are organized by feature/section:

```typescript
{
  nav: { /* Navigation items */ },
  signIn: { /* Sign in page */ },
  signUp: { /* Sign up page */ },
  profile: { /* Profile page */ },
  footer: { /* Footer content */ },
  // ... and more
}
```

### 2. Using Translations in Components

**Step 1: Import the hook**
```typescript
import { useTranslation } from "@/contexts/LanguageContext";
```

**Step 2: Get translations**
```typescript
export default function MyComponent() {
  const t = useTranslation();

  return <h1>{t.nav.title}</h1>;
}
```

**Step 3: Replace all hardcoded text**
```typescript
// Before
<button>Sign In</button>

// After
<button>{t.signIn.signInButton}</button>
```

### 3. Language Switcher

Already implemented and available in:
- Desktop: Top right of header (replaces country selector)
- Mobile: Bottom of mobile menu

Users can toggle between English (🇺🇸) and Spanish (🇪🇸).

## 📋 Remaining Components to Update

### High Priority (User-Facing Pages)

#### 1. Auth Pages (`/app/auth/`)
- ⏳ **signup/page.tsx** - Sign up form
  - Dictionary section: `t.signUp.*`
  - ~20 text items

- ⏳ **auth-code-error/page.tsx** - Auth error page
  - Dictionary section: `t.authError.*`
  - ~8 text items

#### 2. Profile Page (`/app/profile/`)
- ⏳ **components/ProfileHeader.tsx**
  - Dictionary section: `t.profile.title`, `t.profile.backToHome`

- ⏳ **components/ProfileSidebar.tsx**
  - Dictionary section: `t.profile.accountDetails`, `t.profile.orders`, etc.

- ⏳ **components/ProfilePhotoSection.tsx**
  - Dictionary section: `t.profile.photoTitle`, `t.profile.uploadNewPhoto`, etc.

- ⏳ **components/PersonalInformationSection.tsx**
  - Dictionary section: `t.profile.personalInfoTitle`, `t.profile.edit`, etc.

- ⏳ **hooks/useAvatarUpload.ts** - Toast messages
  - Dictionary section: `t.profile.toastUploading`, etc.

- ⏳ **hooks/useProfile.ts** - Toast messages
  - Dictionary section: `t.profile.toastSavingProfile`, etc.

#### 3. Footer Component
- ⏳ **components/Footer.tsx**
  - Dictionary section: `t.footer.*`
  - ~40 text items including newsletter, company links, etc.

### Medium Priority (Homepage Components)

All in `/components/dashboard/`:

- ⏳ **Hero.tsx** - `t.hero.*`
- ⏳ **NewArrivals.tsx** - `t.newArrivals.*`
- ⏳ **FlashSale.tsx** - `t.flashSale.*`
- ⏳ **FeaturedProducts.tsx** - `t.featuredProducts.*`
- ⏳ **ShopByCategory.tsx** - `t.shopByCategory.*`
- ⏳ **FeaturedCollections.tsx** - `t.featuredCollections.*`
- ⏳ **Testimonials.tsx** - `t.testimonials.*`
- ⏳ **InspiredSpaces.tsx** - `t.inspiredSpaces.*`
- ⏳ **PromoBanners.tsx** - `t.promoBanners.*`
- ⏳ **ShopOurOffers.tsx** - `t.shopOurOffers.*`
- ⏳ **ApproachFeatures.tsx** - `t.approachFeatures.*`
- ⏳ **MeetOurTeam.tsx** - `t.meetOurTeam.*`
- ⏳ **ClientTestimonials.tsx** - `t.clientTestimonials.*`
- ⏳ **InstagramFeed.tsx** - `t.instagram.*`
- ⏳ **CategoryChips.tsx** - `t.categoryChips.*`

## 🎯 Step-by-Step Update Pattern

### Example: Updating the Sign Up Page

**1. Read the current component**
```bash
cat app/auth/signup/page.tsx
```

**2. Identify all hardcoded text**
Look for:
- Button labels
- Form labels
- Placeholders
- Error/success messages
- Headings and descriptions

**3. Add the translation hook**
```typescript
import { useTranslation } from "@/contexts/LanguageContext";

export default function SignUpPage() {
  const t = useTranslation();
  // ... rest of component
}
```

**4. Replace text with dictionary keys**
```typescript
// Before
<h1>Create Account</h1>
<input placeholder="Enter your email" />
<button>Sign Up</button>

// After
<h1>{t.signUp.title}</h1>
<input placeholder={t.signUp.emailPlaceholder} />
<button>{t.signUp.createAccountButton}</button>
```

**5. Update toast messages**
```typescript
// Before
showLoading("Creating your account...");
updateToast(id, "success", "Account created!");

// After
showLoading(t.signUp.toastCreatingAccount);
updateToast(id, "success", t.signUp.toastAccountCreated);
```

## 🌍 Adding More Languages

To add a new language (e.g., French):

1. Create `/dictionaries/fr.ts`:
```typescript
import type { Dictionary } from "./en";

export const fr: Dictionary = {
  nav: {
    helpCenter: "Centre d'Aide",
    // ... translate all keys
  },
  // ... all other sections
};
```

2. Update `/dictionaries/index.ts`:
```typescript
import { fr } from "./fr";

export type Locale = "en" | "es" | "fr";

export const dictionaries = {
  en,
  es,
  fr,
} as const;
```

3. Update LanguageSwitcher component:
```typescript
const languages = {
  en: { name: "English", flag: "🇺🇸" },
  es: { name: "Español", flag: "🇪🇸" },
  fr: { name: "Français", flag: "🇫🇷" },
};
```

## 🧪 Testing Translations

1. **Start the dev server**
```bash
npm run dev
```

2. **Visit the app** at http://localhost:3000

3. **Test language switching**:
   - Click the language switcher (🇺🇸 English / 🇪🇸 Español)
   - Verify all translated text updates
   - Check that preference persists on page reload

4. **Test each page**:
   - Homepage - Check all sections
   - Sign in - All form labels and messages
   - Sign up - All form fields
   - Profile - All sections
   - Check toast notifications

## 📝 Translation Quality Checklist

When updating a component, ensure:

- [ ] All visible text is translated
- [ ] Placeholders are translated
- [ ] Button text is translated
- [ ] Toast/notification messages are translated
- [ ] Error messages are translated
- [ ] Form validation messages are translated
- [ ] No console errors when switching languages
- [ ] Text doesn't overflow containers in both languages
- [ ] Accessibility attributes (aria-label) are translated

## 🚀 Quick Reference

### Common Dictionary Paths
```typescript
t.nav.*              // Navigation items
t.common.*           // Common UI elements (buttons, etc.)
t.signIn.*           // Sign in page
t.signUp.*           // Sign up page
t.profile.*          // Profile page
t.footer.*           // Footer content
t.hero.*             // Hero section
// ... see dictionaries/en.ts for full structure
```

### Import Pattern
```typescript
// At top of file
import { useTranslation } from "@/contexts/LanguageContext";

// In component
const t = useTranslation();
```

### Usage Patterns
```typescript
// Simple text
<h1>{t.section.title}</h1>

// In attributes
<input placeholder={t.section.placeholder} />
<button aria-label={t.section.buttonLabel}>

// Conditional text
{loading ? t.common.loading : t.common.submit}

// In toast messages
showLoading(t.section.toastMessage);
```

## 🎨 Best Practices

1. **Keep keys semantic**: Use descriptive names like `emailLabel` not `label1`
2. **Group related keys**: Keep form fields together, buttons together, etc.
3. **Reuse common text**: Use `t.common.*` for repeated UI elements
4. **Test both languages**: Always verify both EN and ES work correctly
5. **Preserve emojis**: Keep emojis in translations for consistency (🎉, 📸, etc.)

## 📚 Resources

- Dictionary Files: `/dictionaries/en.ts` and `/dictionaries/es.ts`
- Language Context: `/contexts/LanguageContext.tsx`
- Example Updated Components:
  - `/components/Header.tsx`
  - `/app/auth/signin/page.tsx`

---

**Status**: 🟡 Partially Complete
- **Infrastructure**: ✅ 100% Complete
- **Component Updates**: 🟡 ~15% Complete (Header + Sign In)
- **Remaining Work**: ~25 components to update

**Estimated Time**: 2-3 hours to complete all remaining component updates
