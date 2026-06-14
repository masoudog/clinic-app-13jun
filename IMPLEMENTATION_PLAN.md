# Clinic CRM Implementation Plan

**Date**: June 14, 2026  
**Design Source**: `./desgn-source/sana-clinic-mini-crm-copy/project/`  
**Tech Stack**: Next.js 14 + TypeScript + Tailwind CSS

## Design Analysis Summary

### App Structure (RTL Persian/Farsi UI)
The Claude Design export is a **React-based clinic CRM** with these key pages:

1. **Landing Page** (`landing.jsx`)
   - Hero section with clinic information
   - Public-facing appointment booking form
   - Features/benefits section
   - Fully responsive design

2. **Dashboard** (`dashboard.jsx`)
   - Overview cards (appointments, patients, stats)
   - Quick actions sidebar
   - Recent activity/notifications

3. **Patients** (`patients.jsx`)
   - Patient list with search/filter
   - Patient profiles with session history
   - Tags (diagnosis/treatment categories)

4. **Calendar** (`calendar.jsx`)
   - Weekly/daily calendar grid
   - Drag-drop event scheduling
   - Therapist availability display

5. **Booking Requests** (`requests.jsx`)
   - Admin review queue for public bookings
   - Accept/reject workflow
   - New patient triage

6. **Booking Wizard** (`booking-wizard.jsx`)
   - Multi-step session booking
   - Slot availability display
   - Therapist assignment

### Design System (from `styles.css`)

**Colors:**
- **Accent**: `#203AA2` (primary blue for CTAs)
- **Pastels** (patient/therapist colors):
  - Sky: `#A8C5DA` / `#DCE8F0` (light)
  - Sage: `#B8D4C2` / `#DEEBE2` (light)
  - Beige: `#E8DCC4` / `#F2EBDB` (light)
  - Lavender: `#C9BBD9` / `#E5DDED` (light)
  - Rose: `#E8C4C4` / `#F2DCDC` (light)
- **Neutrals**:
  - Text: `#2C3138` (dark), `#4B535F` (soft), `#6A7686` (muted)
  - Backgrounds: `#F4F5F7` (main), `#FFFFFF` (elevated), `#ECEEF2` (soft)
- **Borders**: `#E2E4EA` (line), `#EEF0F4` (line-soft)

**Typography:**
- Font family: Vazirmatn (Persian) + Estedad (light weights)
- Base font size: 15px
- Font features: Persian stylistic sets

**Spacing & Radius:**
- Radius: 10px (sm), 16px (md), 22px (lg)
- Shadows: sm, standard, lg

**Layout:**
- RTL layout (`direction: rtl`)
- Sidebar + main content grid (240px sidebar)
- Sticky sidebar

---

## Implementation Phases

### Phase 1: Project Foundation
**Scope**: Set up design tokens and core layout

- [ ] **Tailwind Configuration**
  - Add color palette to `tailwind.config.ts`
  - Create custom spacing, border-radius, shadows
  - Configure RTL support (next-rtl or Tailwind RTL plugin)
  - Add Persian font (Vazirmatn, Estedad)

- [ ] **Global Styles** (`src/globals.css`)
  - Import fonts from Google Fonts
  - Reset and base styles
  - Responsive typography scale
  - RTL utilities

- [ ] **Core Layout Components**
  - `Sidebar.tsx` — sticky left sidebar with nav
  - `MainContent.tsx` — main content area
  - `AppLayout.tsx` — combines sidebar + main

### Phase 2: UI Component Library
**Scope**: Build reusable Tailwind components (extract from design, don't copy)

- [ ] **Form Components**
  - Input (text, email, tel, date, time)
  - Select / multi-select
  - Textarea
  - Checkbox / Radio
  - DatePicker (calendar)
  - TimeSlot picker

- [ ] **Display Components**
  - Badge (for patient tags, status)
  - Avatar (colored initials for therapists/patients)
  - Card / CardSection
  - Modal/Dialog
  - Toast notifications
  - Tabs
  - Table (for lists)

- [ ] **Action Components**
  - Button (primary, secondary, outline variants)
  - IconButton
  - Link

### Phase 3: Pages & Routing
**Scope**: Build main pages

- [ ] **Landing Page** (`src/app/(public)/page.tsx`)
  - Hero section
  - Public booking form
  - Info sections
  - Responsive mobile-first

- [ ] **Dashboard** (`src/app/(admin)/dashboard/page.tsx`)
  - Stats cards
  - Quick actions
  - Recent activity

- [ ] **Patients** (`src/app/(admin)/patients/page.tsx`)
  - Patient list + search
  - Patient detail view
  - Add/edit patient

- [ ] **Calendar** (`src/app/(admin)/calendar/page.tsx`)
  - Weekly grid
  - Event display
  - Drag-drop booking

- [ ] **Requests** (`src/app/(admin)/requests/page.tsx`)
  - Pending bookings queue
  - Accept/reject actions

### Phase 4: State Management & Logic
**Scope**: Add interactivity and state

- [ ] **Context/Hooks**
  - `useClinicData()` — mock data management
  - `useAuth()` — authentication state
  - `useToast()` — notifications

- [ ] **Features**
  - Clinic settings (online booking toggle, hours, etc.)
  - Patient search/filter
  - Calendar slot blocking
  - Session creation workflow

### Phase 5: Responsive & Polish
**Scope**: Mobile responsiveness and refinement

- [ ] **Mobile Layout**
  - Sidebar collapsible on mobile
  - Touch-friendly spacing
  - Stack layout below 640px

- [ ] **Accessibility**
  - Semantic HTML
  - ARIA labels
  - Keyboard navigation

- [ ] **Performance**
  - Image optimization
  - Code splitting by route

---

## Implementation Notes

### What to Extract from Design Source
1. **Color tokens** → Add to Tailwind config
2. **Layout structure** → Rebuild as clean Tailwind components
3. **Typography scale** → Define in globals.css
4. **Component patterns** → Rebuild with prop variants
5. **Mock data** → Use `data.js` as reference for types

### What NOT to Copy
- Messy generated JSX code with inline styles
- Mixed CSS-in-JS and CSS files
- Hardcoded domain logic in UI components
- Non-semantic HTML or accessibility issues

### Build Strategy
- **Component-driven**: Build small, reusable components first
- **Mobile-first**: Responsive Tailwind utilities, not CSS media queries
- **Type-safe**: Full TypeScript for props and data
- **Clean code**: No generated cruft; production-ready from day one

### Design System Tailwind Config Example
```typescript
// tailwind.config.ts
colors: {
  accent: '#203AA2',
  sky: '#A8C5DA',
  'sky-soft': '#DCE8F0',
  sage: '#B8D4C2',
  'sage-soft': '#DEEBE2',
  beige: '#E8DCC4',
  'beige-soft': '#F2EBDB',
  lavender: '#C9BBD9',
  'lavender-soft': '#E5DDED',
  rose: '#E8C4C4',
  'rose-soft': '#F2DCDC',
  // ... neutrals
}
```

---

## Success Criteria

- [ ] All pages render with correct layout and colors
- [ ] Responsive on mobile (375px), tablet (768px), desktop (1440px)
- [ ] RTL layout works correctly
- [ ] No console errors or warnings
- [ ] TypeScript strict mode (no `any` types)
- [ ] Component library can be reused across all pages
- [ ] Code is clean, readable, production-ready

