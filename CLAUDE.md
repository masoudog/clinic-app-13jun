# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS (responsive, utility-first)
- **Backend/Auth**: AWS Amplify (Cognito for auth, S3 for storage)
- **Deployment**: AWS Amplify Hosting
- **Code Quality**: ESLint + Prettier

## Project Goals & Constraints

- **UI Design**: Keep UI implementation faithful to the Claude Design export (design source of truth)
- **Design Source**: Located in `./desgn-source/sana-clinic-mini-crm-copy/project/`
  - Use exported HTML/CSS/screenshots as the reference (not hardcoded exports)
  - Extract layout, colors, spacing, typography, and component patterns
  - Do not directly copy messy generated code; rebuild clean, production-ready components
- **Component Architecture**: Build reusable, modular components following Tailwind + TypeScript
- **Security**: Never hardcode AWS credentials or secrets in code (use `.env.local`)
- **Design Changes**: Ask before making major architectural or UI design decisions

## Common Development Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Build for production
npm run type-check   # Type-check without emitting
npm run lint         # ESLint check
npm run format       # Format with Prettier
npm run start        # Run production build locally
```

## Project Structure

```
src/
├── app/                 # Next.js App Router (pages, layouts)
├── components/          # Reusable UI components (Button, Card, etc.)
├── hooks/               # Custom React hooks (useAuth, etc.)
├── lib/                 # Config & utilities (Amplify init, helpers)
├── types/               # TypeScript interfaces & types
├── utils/               # Helper functions
└── globals.css          # Global Tailwind styles

public/                 # Static assets
amplify.yml             # AWS Amplify build config
tailwind.config.ts      # Tailwind design tokens
tsconfig.json           # TypeScript config with path aliases (@/*)
```

## Architecture Overview

### Component-Based UI
- **Reusable Components**: All UI is built from composable components in `src/components/`
- **Prop-Based Styling**: Use Tailwind classes; component variants defined as props (e.g., `Button` has `variant` and `size` props)
- **Responsive Design**: Mobile-first approach; use Tailwind breakpoints (md, lg, xl)

### Type Safety
- Strict TypeScript mode enabled
- All props and return types must be explicit
- API responses and data structures defined in `src/types/index.ts`

### AWS Amplify Integration
- **Auth**: `src/hooks/useAuth.ts` provides login/logout/session management via Cognito
- **Initialization**: `src/lib/amplify.ts` configures Amplify at startup
- **Credentials**: All AWS config in `.env.local` (never in code)

### Styling System
- Tailwind CSS for all styling (no CSS-in-JS or inline styles)
- Design tokens in `tailwind.config.ts` (colors, spacing, fonts)
- Global styles in `src/globals.css` (responsive typography, resets)

## Key Files to Know

- **`src/app/layout.tsx`**: Root layout; imports global CSS and metadata
- **`src/app/page.tsx`**: Home page entry point
- **`src/app/dashboard/page.tsx`**: Dashboard page (example)
- **`src/app/booking/page.tsx`**: Booking form (example)
- **`src/components/Button.tsx`**: Primary button component (reference for variant pattern)
- **`src/components/Card.tsx`**: Card component family (Card, CardHeader, CardBody, CardFooter)

## Path Aliases

TypeScript paths are configured for convenience:
- `@/*` → `src/*`
- `@/components/*` → `src/components/*`
- `@/lib/*` → `src/lib/*`
- `@/types/*` → `src/types/*`
- `@/hooks/*` → `src/hooks/*`
- `@/utils/*` → `src/utils/*`

## Code Standards

- **TypeScript**: Use strict types; avoid `any`
- **Components**: Functional components with `React.FC` or function signatures
- **Naming**: CamelCase for functions/vars, PascalCase for components
- **Tailwind**: Use utility classes; group related utilities logically
- **No Hardcoding**: Config, credentials, and API endpoints go in environment variables

## Environment Variables

Create `.env.local` from `.env.local.example`:
```
NEXT_PUBLIC_AWS_REGION=us-east-1
NEXT_PUBLIC_AWS_COGNITO_IDENTITY_POOL_ID=xxx
NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID=xxx
NEXT_PUBLIC_AWS_COGNITO_USER_POOL_WEB_CLIENT_ID=xxx
```

**Never commit `.env.local` or real credentials.**

## AWS Amplify Deployment

### First-Time Setup
```bash
npm install -g @aws-amplify/cli
amplify init      # Choose your AWS region and profile
amplify add hosting  # Set up Amplify Hosting
amplify publish   # Deploy to production
```

### Continuous Deployment
- Connect this GitHub repo to AWS Amplify Console for auto-deploy on push
- Environment variables set in Amplify Console

## Design System & Claude Design Export

**Design Source**: `./desgn-source/sana-clinic-mini-crm-copy/project/`

Key design files:
- **`styles.css`**: Color palette, spacing, typography, shadows, border-radius
- **`pages.css`, `booking.css`, `landing.css`**: Component and page-level styles
- **`screenshots/`**: Reference screenshots for layout and responsive behavior
- **`*.jsx` files**: Component structure and layout patterns (extract, don't copy)
- **`data.js`**: Mock data structure and Persian (RTL) date handling

Color palette (from `styles.css`):
- **Accent**: `#203AA2` (indigo blue) — primary CTAs and highlights
- **Pastels**: Sky (`#A8C5DA`), Sage (`#B8D4C2`), Beige (`#E8DCC4`), Lavender (`#C9BBD9`), Rose (`#E8C4C4`)
- **Neutrals**: Dark text (`#2C3138`), soft text (`#4B535F`), muted (`#6A7686`)
- **Backgrounds**: Main (`#F4F5F7`), elevated (`#FFFFFF`), soft (`#ECEEF2`)

Typography:
- **Font**: Vazirmatn (Persian/Farsi optimized), Estedad (for lighter weights)
- Responsive sizing in `src/globals.css`

Keep UI implementation faithful to the design; ask before deviating.

## Before Making Changes

- **Adding Components**: Follow the `Button` or `Card` pattern; export from `src/components/index.ts`
- **New Pages**: Create in `src/app/` as a directory with `page.tsx`
- **New Hooks**: Add to `src/hooks/`, following `useAuth` pattern
- **New Types**: Add to `src/types/index.ts`
- **Styling Tokens**: Update `tailwind.config.ts` and `src/globals.css` (not inline classes)

## Testing & Validation

- Type-check before pushing: `npm run type-check`
- Lint before committing: `npm run lint`
- Format code: `npm run format`
- Test responsive design on mobile/tablet using browser DevTools

## Common Patterns

### Form Submission
```tsx
'use client';
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  // form logic
};
```

### Using Amplify Auth
```tsx
import { useAuth } from '@/hooks/useAuth';
const { user, isAuthenticated, logout } = useAuth();
```

### Building a Reusable Component
```tsx
interface MyComponentProps {
  variant?: 'primary' | 'secondary';
  className?: string;
}
export function MyComponent({ variant = 'primary', className = '' }: MyComponentProps) {
  return <div className={`base ${variant} ${className}`}>{/* ... */}</div>;
}
```

## Troubleshooting

- **Build errors**: Run `npm install` and clear `.next/` cache (`rm -rf .next/`)
- **Type errors**: Check `tsconfig.json` path aliases and imports
- **Amplify not connecting**: Verify `.env.local` and AWS credentials are correct
- **Tailwind not applying**: Ensure `src/globals.css` is imported in root layout
