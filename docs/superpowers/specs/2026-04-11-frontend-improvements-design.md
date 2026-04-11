# Frontend Improvements — Design Spec

**Date:** 2026-04-11
**Status:** Approved

## Overview

Nine targeted frontend improvements to elevate the portfolio's visual quality, UX clarity, and code maintainability. All changes are additive or replacements of existing CSS/components — no new data structures or state management needed.

## Changes

### 1. Font — Space Grotesk

Add Google Fonts link in `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

Apply globally in `index.css`:
```css
body {
  font-family: 'Space Grotesk', sans-serif;
}
```

### 2. CSS Custom Properties

Add to `:root` in `index.css`:
```css
:root {
  --color-accent: #ff9b29;
  --color-bg: #110d21;
  --color-text: #ddd;
  --color-text-muted: #888;
  --color-border: rgba(255, 155, 41, 0.3);
  --color-surface: rgba(17, 13, 33, 0.95);
}
```

Replace all hardcoded color values across `WelcomeCard.css`, `ExperienceCard.css`, `FlightControls.css` with the corresponding CSS variables.

### 3. ExperienceCard — Side Panel Layout

**Desktop (> 768px):**
- `position: fixed; right: 0; top: 0; width: 380px; height: 100vh`
- `overflow-y: auto`
- `border-radius: 0` (full-height panel, no rounded corners on right edge)
- `border-left: 1px solid var(--color-border)` (only left border)
- Entry animation: `slideInRight` (slides in from right edge)

**Mobile (≤ 768px):**
- `position: fixed; bottom: 0; left: 0; right: 0; max-height: 70vh`
- `border-radius: 16px 16px 0 0`
- Entry animation: `slideUp` (existing)

**Files modified:** `ExperienceCard.css`

### 4. VIAGGIO / LAVORO Tabs in ExperienceCard

Add local state to `ExperienceCard.tsx`:
```tsx
const [activeTab, setActiveTab] = useState<'viaggio' | 'lavoro'>('lavoro');
```

Default to `'lavoro'` tab (content is complete; viaggio has placeholders).

Tab UI: two buttons below the location header, styled with active indicator using `var(--color-accent)`. Only the active section renders.

**Files modified:** `ExperienceCard.tsx`, `ExperienceCard.css`

### 5. FlightControls — Hidden Before Tour Starts

In `FlightControls.tsx`, add early return:
```tsx
const hasStarted = useFlightStore((state) => state.hasStarted);
if (!hasStarted) return null;
```

**Files modified:** `FlightControls.tsx`

### 6. Loading State for 3D Canvas

Create `src/components/LoadingScreen.tsx`:
```tsx
export default function LoadingScreen() {
  return (
    <div style={{
      position: 'fixed', inset: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#110d21', color: '#ff9b29',
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: '1rem', letterSpacing: '2px'
    }}>
      CARICAMENTO...
    </div>
  );
}
```

In `App.tsx`: replace `fallback={null}` with `fallback={<LoadingScreen />}`.

**Files modified:** `App.tsx`
**Files created:** `src/components/LoadingScreen.tsx`

### 7. WelcomeCard — Condensed Text

Replace the three `<p>` paragraphs in `WelcomeCard.tsx` with one short intro sentence and three bullet points:

```
Full Stack Developer con 4+ anni di esperienza.

• PHP, Vue.js, PostgreSQL, API RESTful
• Integrazione sistemi, automazione flussi, cloud (AWS)
• Appassionata di problem solving e innovazione
```

**Files modified:** `WelcomeCard.tsx`

### 8. Close Button — Icon

In `ExperienceCard.tsx`, replace the `×` character with `<FaTimes />` from `react-icons/fa` (already a project dependency). Add import:
```tsx
import { FaTimes } from 'react-icons/fa';
```

**Files modified:** `ExperienceCard.tsx`

### 9. ExperienceCard — Responsive (already covered in change #3)

Mobile layout handled via the `@media (max-width: 768px)` block in change #3.

## File Map

| Action | File |
|--------|------|
| Modify | `index.html` — add Google Fonts link |
| Modify | `src/index.css` — font + CSS custom properties |
| Modify | `src/components/WelcomeCard.tsx` — condensed text |
| Modify | `src/components/WelcomeCard.css` — use CSS variables |
| Modify | `src/components/ExperienceCard.tsx` — tabs, FaTimes icon |
| Modify | `src/components/ExperienceCard.css` — side panel layout, tabs, CSS variables |
| Modify | `src/components/FlightControls.tsx` — hide before tour starts |
| Modify | `src/components/FlightControls.css` — use CSS variables |
| Create | `src/components/LoadingScreen.tsx` |
| Modify | `src/App.tsx` — Suspense fallback |

## Out of Scope

- Changes to the 3D globe, airplane, or marker components
- Dark/light mode toggle
- Animations beyond what is described above
