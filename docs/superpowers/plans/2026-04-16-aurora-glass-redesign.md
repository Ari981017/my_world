# Aurora Glass Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the frontend of my_world from an amber/near-black palette to a full Aurora Glass aesthetic — glassmorphism with animated cyan/violet/pink auroras, Syne typography, corner-card layout.

**Architecture:** Pure CSS/token replacement plus one new `AuroraBackground` component. No changes to 3D logic, store, hooks, or data. Each task is independent and produces a verifiable build.

**Tech Stack:** React 19, TypeScript, Vite, CSS custom properties, Google Fonts (Syne, DM Mono)

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `index.html` | Modify | Add Syne + DM Mono Google Fonts |
| `src/index.css` | Modify | Replace design tokens (remove amber, add aurora vars) |
| `src/components/AuroraBackground.tsx` | **Create** | 3 animated aurora spheres, fixed layer |
| `src/components/AuroraBackground.css` | **Create** | Sphere animations + reduced-motion support |
| `src/App.tsx` | Modify | Mount AuroraBackground, update DotGrid props |
| `src/components/WelcomeCard.tsx` | Modify | Add exit animation state + btn-arrow span + divider |
| `src/components/WelcomeCard.css` | Modify | Full redesign: corner card, aurora glass |
| `src/components/ExperienceCard.css` | Modify | Full redesign: right panel, aurora glass, pill badges |
| `src/components/FlightControls.css` | Modify | Full redesign: pill shape, dot glow |
| `src/components/LoadingScreen.tsx` | Modify | New structure + inline aurora background |
| `src/components/LoadingScreen.css` | **Create** | Aurora loading screen styles |

---

## Task 1: Fonts & Design Tokens

**Files:**
- Modify: `index.html`
- Modify: `src/index.css`

- [ ] **Step 1: Verify build passes at baseline**

```bash
cd /Users/ariannatoniolo/my_world && npm run build 2>&1 | tail -5
```
Expected: `✓ built in` with no errors.

- [ ] **Step 2: Update Google Fonts in index.html**

Replace the existing `<link>` font tag with one that also loads Syne and DM Mono:

```html
<!-- index.html — replace existing fonts <link> -->
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@700;800&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
```

- [ ] **Step 3: Replace design tokens in src/index.css**

Full file replacement:

```css
/* src/index.css */
:root {
  --color-bg:             #04030c;
  --color-aurora-cyan:    #0ea5e9;
  --color-aurora-violet:  #a855f7;
  --color-aurora-pink:    #f472b6;
  --color-surface:        rgba(168, 85, 247, 0.07);
  --color-border:         rgba(168, 85, 247, 0.22);
  --color-border-top:     rgba(255, 255, 255, 0.15);
  --color-text:           #f1f5f9;
  --color-text-muted:     #94a3b8;
}

html,
body {
  margin: 0;
  overflow: hidden;
  font-family: 'Space Grotesk', sans-serif;
  background-color: var(--color-bg);
}

.App {
  width: 100vw;
  height: 100vh;
}
```

- [ ] **Step 4: Verify build passes**

```bash
cd /Users/ariannatoniolo/my_world && npm run build 2>&1 | tail -5
```
Expected: `✓ built in` with no errors.

- [ ] **Step 5: Commit**

```bash
cd /Users/ariannatoniolo/my_world && git add index.html src/index.css && git commit -m "feat: update design tokens and fonts for Aurora Glass redesign"
```

---

## Task 2: AuroraBackground Component

**Files:**
- Create: `src/components/AuroraBackground.tsx`
- Create: `src/components/AuroraBackground.css`

- [ ] **Step 1: Create AuroraBackground.css**

```css
/* src/components/AuroraBackground.css */
.aurora-background {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.aurora-sphere {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.35;
}

.aurora-cyan {
  width: 300px;
  height: 300px;
  background: var(--color-aurora-cyan);
  top: -80px;
  left: -60px;
  animation: auroraMoveA 20s ease-in-out infinite alternate;
}

.aurora-violet {
  width: 400px;
  height: 400px;
  background: var(--color-aurora-violet);
  top: -100px;
  right: -80px;
  animation: auroraMoveB 25s ease-in-out infinite alternate;
}

.aurora-pink {
  width: 200px;
  height: 200px;
  background: var(--color-aurora-pink);
  bottom: -40px;
  left: 30%;
  animation: auroraPulse 15s ease-in-out infinite;
}

@keyframes auroraMoveA {
  0%   { transform: translate(0, 0)     scale(1);    }
  50%  { transform: translate(60px, 40px)  scale(1.1);  }
  100% { transform: translate(20px, 80px)  scale(0.95); }
}

@keyframes auroraMoveB {
  0%   { transform: translate(0, 0)      scale(1);    }
  50%  { transform: translate(-50px, 50px) scale(1.05); }
  100% { transform: translate(-20px, 100px) scale(0.9); }
}

@keyframes auroraPulse {
  0%, 100% { opacity: 0.25; transform: scale(1);   }
  50%       { opacity: 0.45; transform: scale(1.2); }
}

@media (prefers-reduced-motion: reduce) {
  .aurora-sphere { animation: none !important; }
}
```

- [ ] **Step 2: Create AuroraBackground.tsx**

```tsx
// src/components/AuroraBackground.tsx
import './AuroraBackground.css';

export default function AuroraBackground() {
  return (
    <div className="aurora-background" aria-hidden="true">
      <div className="aurora-sphere aurora-cyan" />
      <div className="aurora-sphere aurora-violet" />
      <div className="aurora-sphere aurora-pink" />
    </div>
  );
}
```

- [ ] **Step 3: Verify build passes**

```bash
cd /Users/ariannatoniolo/my_world && npm run build 2>&1 | tail -5
```
Expected: `✓ built in` with no errors. (Component not mounted yet — import check only.)

- [ ] **Step 4: Commit**

```bash
cd /Users/ariannatoniolo/my_world && git add src/components/AuroraBackground.tsx src/components/AuroraBackground.css && git commit -m "feat: add AuroraBackground component with animated spheres"
```

---

## Task 3: Wire AuroraBackground into App.tsx

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Update App.tsx**

Full file replacement:

```tsx
// src/App.tsx
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { useProgress } from '@react-three/drei';
import Scene from './components/Scene';
import DotGrid from './components/DotGrid';
import WelcomeCard from './components/WelcomeCard';
import ExperienceCard from './components/ExperienceCard';
import FlightControls from './components/FlightControls';
import LoadingScreen from './components/LoadingScreen';
import AuroraBackground from './components/AuroraBackground';
import './App.css';

function LoadingOverlay() {
  const { active } = useProgress();
  return active ? <LoadingScreen /> : null;
}

export default function App() {
  return (
    <div className="App" style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <AuroraBackground />
      <DotGrid
        dotSize={5}
        gap={15}
        baseColor="#04030c"
        activeColor="#0ea5e9"
        proximity={120}
        shockRadius={250}
        shockStrength={5}
        returnDuration={1.5}
      >
        <Canvas camera={{ position: [0, 0, 9], fov: 75 }}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </DotGrid>

      <LoadingOverlay />
      <WelcomeCard />
      <ExperienceCard />
      <FlightControls />
    </div>
  );
}
```

- [ ] **Step 2: Verify build passes**

```bash
cd /Users/ariannatoniolo/my_world && npm run build 2>&1 | tail -5
```
Expected: `✓ built in` with no errors.

- [ ] **Step 3: Commit**

```bash
cd /Users/ariannatoniolo/my_world && git add src/App.tsx && git commit -m "feat: mount AuroraBackground and switch DotGrid to cyan accent"
```

---

## Task 4: WelcomeCard Redesign (Corner Card)

**Files:**
- Modify: `src/components/WelcomeCard.tsx`
- Modify: `src/components/WelcomeCard.css`

- [ ] **Step 1: Update WelcomeCard.tsx**

Add exit animation state, divider element, and btn-arrow span:

```tsx
// src/components/WelcomeCard.tsx
import { useState } from 'react';
import { useFlightStore } from '../store/flightStore';
import './WelcomeCard.css';

export default function WelcomeCard() {
  const hasStarted = useFlightStore((state) => state.hasStarted);
  const startTour  = useFlightStore((state) => state.startTour);
  const [isExiting, setIsExiting] = useState(false);

  if (hasStarted) return null;

  const handleStart = () => {
    setIsExiting(true);
    setTimeout(() => startTour(), 300);
  };

  return (
    <div className={`welcome-card${isExiting ? ' exit' : ''}`}>
      <div className="welcome-content">
        <h1 className="welcome-title">Arianna Toniolo</h1>
        <p className="welcome-subtitle">Full Stack Developer</p>
        <div className="welcome-divider" />

        <div className="welcome-description">
          <p>Full Stack Developer con 5 anni di esperienza su applicazioni web aziendali scalabili.</p>
          <ul className="welcome-bullets">
            <li>PHP, TypeScript, Vue 3, Node.js, PostgreSQL</li>
            <li>Architetture a microservizi, API REST, automazione flussi</li>
            <li>AWS S3, Redis, Agile — orientata alla qualità del codice</li>
          </ul>
        </div>

        <button
          className="start-journey-button"
          onClick={handleStart}
          aria-label="Inizia il viaggio"
        >
          INIZIA VIAGGIO <span className="btn-arrow" aria-hidden="true">──→</span>
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Replace WelcomeCard.css**

```css
/* src/components/WelcomeCard.css */
.welcome-card {
  position: fixed;
  bottom: 24px;
  left: 24px;
  width: 300px;
  z-index: 10;
  background: var(--color-surface);
  backdrop-filter: blur(32px);
  -webkit-backdrop-filter: blur(32px);
  border: 1px solid var(--color-border);
  border-top: 1px solid var(--color-border-top);
  border-radius: 20px 20px 20px 6px;
  box-shadow:
    0 0 80px rgba(168, 85, 247, 0.18),
    0 0 40px rgba(14, 165, 233, 0.10),
    0 24px 60px rgba(0, 0, 0, 0.60);
  padding: 24px;
  overflow: hidden;
  animation: slideInCorner 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
}

/* Grain texture */
.welcome-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  opacity: 0.025;
  pointer-events: none;
  border-radius: inherit;
  z-index: 0;
}

.welcome-card.exit {
  animation: exitCorner 0.3s ease-in forwards;
}

@keyframes slideInCorner {
  from { transform: translateY(40px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}

@keyframes exitCorner {
  to { transform: scale(0.95) translateY(10px); opacity: 0; }
}

.welcome-content {
  position: relative;
  z-index: 1;
}

.welcome-title {
  font-family: 'Syne', sans-serif;
  font-size: 1.3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #fff 0%, #f0abfc 50%, #67e8f9 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 4px;
  line-height: 1.2;
}

.welcome-subtitle {
  font-family: 'DM Mono', monospace;
  font-size: 0.68rem;
  font-weight: 400;
  color: rgba(14, 165, 233, 0.75);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin: 0 0 14px;
}

.welcome-divider {
  height: 1px;
  background: linear-gradient(90deg, rgba(14,165,233,0.5), rgba(168,85,247,0.5), transparent);
  margin-bottom: 14px;
}

.welcome-description {
  margin-bottom: 20px;
}

.welcome-description p {
  font-size: 0.77rem;
  color: var(--color-text-muted);
  line-height: 1.65;
  margin: 0;
}

.welcome-bullets {
  list-style: none;
  padding: 0;
  margin: 8px 0 0;
}

.welcome-bullets li {
  font-size: 0.74rem;
  color: var(--color-text-muted);
  line-height: 1.65;
  padding-left: 14px;
  position: relative;
}

.welcome-bullets li::before {
  content: '·';
  position: absolute;
  left: 0;
  color: var(--color-aurora-violet);
  opacity: 0.8;
}

.start-journey-button {
  width: 100%;
  padding: 11px 16px;
  background: linear-gradient(135deg, rgba(14,165,233,0.25), rgba(168,85,247,0.35));
  border: 1px solid rgba(168, 85, 247, 0.50);
  border-radius: 10px;
  color: var(--color-text);
  font-family: 'DM Mono', monospace;
  font-size: 0.70rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 0 0 24px rgba(168, 85, 247, 0.25);
  transition: box-shadow 0.25s, background 0.25s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.start-journey-button:hover {
  background: linear-gradient(135deg, rgba(14,165,233,0.35), rgba(168,85,247,0.50));
  box-shadow: 0 0 40px rgba(168, 85, 247, 0.40);
}

.start-journey-button:hover .btn-arrow {
  transform: translateX(4px);
}

.start-journey-button:active {
  transform: scale(0.98);
}

.btn-arrow {
  display: inline-block;
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.welcome-card::-webkit-scrollbar        { width: 3px; }
.welcome-card::-webkit-scrollbar-track  { background: transparent; }
.welcome-card::-webkit-scrollbar-thumb  { background: rgba(168,85,247,0.3); border-radius: 2px; }

@media (max-width: 768px) {
  .welcome-card {
    left: 16px;
    right: 16px;
    bottom: 16px;
    width: auto;
    border-radius: 16px 16px 4px 4px;
  }
}
```

- [ ] **Step 3: Verify build passes**

```bash
cd /Users/ariannatoniolo/my_world && npm run build 2>&1 | tail -5
```
Expected: `✓ built in` with no errors.

- [ ] **Step 4: Commit**

```bash
cd /Users/ariannatoniolo/my_world && git add src/components/WelcomeCard.tsx src/components/WelcomeCard.css && git commit -m "feat: redesign WelcomeCard as aurora glass corner card"
```

---

## Task 5: ExperienceCard Redesign (Right Panel)

**Files:**
- Modify: `src/components/ExperienceCard.css`

> JSX is unchanged — only CSS changes in this task.

- [ ] **Step 1: Replace ExperienceCard.css**

```css
/* src/components/ExperienceCard.css */
.experience-card {
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  width: 380px;
  z-index: 10;
  background: rgba(168, 85, 247, 0.06);
  backdrop-filter: blur(32px);
  -webkit-backdrop-filter: blur(32px);
  border-left: 1px solid rgba(168, 85, 247, 0.28);
  border-top: 1px solid var(--color-border-top);
  border-radius: 20px 0 0 20px;
  box-shadow: -16px 0 80px rgba(168,85,247,0.15), -4px 0 24px rgba(14,165,233,0.08);
  overflow-y: auto;
  overflow-x: hidden;
  padding: 32px 24px 32px;
  animation: slideInRight 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
}

/* Grain texture */
.experience-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  opacity: 0.02;
  pointer-events: none;
  z-index: 0;
}

@keyframes slideInRight {
  from { transform: translateX(100%); }
  to   { transform: translateX(0); }
}

/* Staggered content animations */
.location-header  { animation: fadeUp 0.4s cubic-bezier(0.16,1,0.3,1) 0.10s both; }
.lavoro-section   { animation: fadeUp 0.4s cubic-bezier(0.16,1,0.3,1) 0.18s both; }
.technologies     { animation: fadeUp 0.4s cubic-bezier(0.16,1,0.3,1) 0.26s both; }
.responsibilities { animation: fadeUp 0.4s cubic-bezier(0.16,1,0.3,1) 0.32s both; }
.card-actions     { animation: fadeUp 0.4s cubic-bezier(0.16,1,0.3,1) 0.38s both; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Ensure all children are above grain pseudo-element */
.location-header,
.section,
.lavoro-section,
.technologies,
.card-actions,
.close-button {
  position: relative;
  z-index: 1;
}

/* Location header */
.location-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 0;
  padding-bottom: 16px;
  border-bottom: 1px solid;
  border-image: linear-gradient(90deg, rgba(14,165,233,0.4), rgba(168,85,247,0.4), transparent) 1;
}

.country-flag {
  width: 28px;
  height: 20px;
  object-fit: cover;
  border-radius: 3px;
  flex-shrink: 0;
}

.location-name {
  font-family: 'Syne', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0;
  letter-spacing: 0.02em;
}

/* Work section */
.work-meta {
  margin-bottom: 16px;
}

.job-title {
  font-family: 'Syne', sans-serif;
  font-size: 1.1rem;
  font-weight: 800;
  background: linear-gradient(135deg, #fff 0%, #f0abfc 50%, #67e8f9 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 16px 0 4px;
  line-height: 1.3;
}

.company {
  font-family: 'DM Mono', monospace;
  font-size: 0.70rem;
  color: rgba(14, 165, 233, 0.80);
  margin: 0 0 2px;
  letter-spacing: 0.05em;
}

.period {
  font-size: 0.73rem;
  color: var(--color-text-muted);
  margin: 0 0 16px;
}

/* Description */
.work-description {
  font-size: 0.78rem;
  color: var(--color-text-muted);
  line-height: 1.70;
  margin: 0 0 20px;
}

/* Responsibilities */
.responsibilities h5 {
  font-family: 'DM Mono', monospace;
  font-size: 0.62rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  opacity: 0.6;
  margin: 0 0 10px;
}

.responsibilities ul {
  list-style: none;
  padding: 0;
  margin: 0 0 20px;
}

.responsibilities li {
  font-size: 0.77rem;
  color: var(--color-text-muted);
  line-height: 1.65;
  padding-left: 16px;
  position: relative;
  margin-bottom: 6px;
}

.responsibilities li::before {
  content: '·';
  position: absolute;
  left: 0;
  color: var(--color-aurora-violet);
  opacity: 0.8;
  font-size: 1.2em;
  line-height: 1.4;
}

/* Tech badges */
.technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.tech-badge {
  font-family: 'DM Mono', monospace;
  font-size: 0.65rem;
  color: var(--color-text-muted);
  padding: 4px 12px;
  border-radius: 20px;
  border: 1px solid rgba(168, 85, 247, 0.35);
  background: transparent;
  transition: background 0.2s, border-color 0.2s;
  white-space: nowrap;
}

.tech-badge:hover {
  background: rgba(168, 85, 247, 0.10);
  border-color: rgba(168, 85, 247, 0.55);
}

/* Video */
.work-video {
  margin-bottom: 20px;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid var(--color-border);
}

.work-video-player {
  width: 100%;
  display: block;
  border-radius: 10px;
}

/* Close button */
.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--color-text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  z-index: 20;
}

.close-button:hover {
  background: rgba(168, 85, 247, 0.20);
  color: var(--color-text);
}

/* Continue button */
.card-actions {
  padding-top: 8px;
  padding-bottom: 8px;
}

.continue-button {
  width: 100%;
  padding: 11px 16px;
  background: linear-gradient(135deg, rgba(14,165,233,0.25), rgba(168,85,247,0.35));
  border: 1px solid rgba(168, 85, 247, 0.50);
  border-radius: 10px;
  color: var(--color-text);
  font-family: 'DM Mono', monospace;
  font-size: 0.70rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 0 0 24px rgba(168, 85, 247, 0.20);
  transition: box-shadow 0.25s, background 0.25s;
}

.continue-button:hover {
  background: linear-gradient(135deg, rgba(14,165,233,0.35), rgba(168,85,247,0.50));
  box-shadow: 0 0 40px rgba(168, 85, 247, 0.35);
}

.continue-button:active {
  transform: scale(0.98);
}

/* Scrollbar */
.experience-card::-webkit-scrollbar        { width: 3px; }
.experience-card::-webkit-scrollbar-track  { background: transparent; }
.experience-card::-webkit-scrollbar-thumb  { background: rgba(168,85,247,0.3); border-radius: 2px; }
.experience-card::-webkit-scrollbar-thumb:hover { background: rgba(168,85,247,0.5); }

/* Mobile: bottom sheet */
@media (max-width: 768px) {
  .experience-card {
    width: 100%;
    height: 65vh;
    top: auto;
    bottom: 0;
    right: 0;
    border-radius: 20px 20px 0 0;
    border-left: none;
    border-top: 1px solid rgba(168,85,247,0.28);
    box-shadow: 0 -8px 60px rgba(168,85,247,0.15);
    animation: slideUpMobile 0.5s cubic-bezier(0.16,1,0.3,1) both;
  }

  @keyframes slideUpMobile {
    from { transform: translateY(100%); }
    to   { transform: translateY(0); }
  }

  .location-name { font-size: 0.9rem; }
}
```

- [ ] **Step 2: Verify build passes**

```bash
cd /Users/ariannatoniolo/my_world && npm run build 2>&1 | tail -5
```
Expected: `✓ built in` with no errors.

- [ ] **Step 3: Commit**

```bash
cd /Users/ariannatoniolo/my_world && git add src/components/ExperienceCard.css && git commit -m "feat: redesign ExperienceCard as aurora glass right panel"
```

---

## Task 6: FlightControls Redesign (Pill Shape)

**Files:**
- Modify: `src/components/FlightControls.css`

- [ ] **Step 1: Replace FlightControls.css**

```css
/* src/components/FlightControls.css */
.flight-controls {
  position: fixed;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 20px;
  background: rgba(168, 85, 247, 0.08);
  backdrop-filter: blur(28px);
  -webkit-backdrop-filter: blur(28px);
  border: 1px solid rgba(168, 85, 247, 0.22);
  border-top: 1px solid var(--color-border-top);
  border-radius: 60px;
  box-shadow: 0 0 40px rgba(168,85,247,0.18), 0 8px 40px rgba(0,0,0,0.50);
  white-space: nowrap;
}

.progress-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
}

.current-location {
  font-family: 'Syne', sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  background: linear-gradient(90deg, var(--color-aurora-cyan), var(--color-aurora-violet));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 0.03em;
}

.position-counter {
  font-family: 'DM Mono', monospace;
  font-size: 0.65rem;
  color: var(--color-text-muted);
  opacity: 0.6;
}

.control-buttons {
  display: flex;
  align-items: center;
  gap: 6px;
}

.control-buttons button {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(168, 85, 247, 0.20);
  color: var(--color-text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.70rem;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.15s;
}

.control-buttons button:hover:not(:disabled) {
  background: rgba(168, 85, 247, 0.15);
  color: var(--color-text);
  box-shadow: 0 0 12px rgba(168, 85, 247, 0.25);
  transform: scale(1.08);
}

.control-buttons button:disabled {
  opacity: 0.25;
  cursor: default;
}

.control-buttons .play-pause {
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, rgba(14,165,233,0.20), rgba(168,85,247,0.30));
  border-color: rgba(168, 85, 247, 0.40);
  color: var(--color-text);
  box-shadow: 0 0 16px rgba(168, 85, 247, 0.20);
}

.control-buttons .play-pause:hover:not(:disabled) {
  background: linear-gradient(135deg, rgba(14,165,233,0.35), rgba(168,85,247,0.50));
  box-shadow: 0 0 28px rgba(168, 85, 247, 0.40);
  transform: scale(1.08);
}

.location-dots {
  display: flex;
  align-items: center;
  gap: 6px;
}

.location-dots .dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(241, 245, 249, 0.20);
  border: none;
  padding: 0;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
}

.location-dots .dot:hover:not(:disabled) {
  background: rgba(168, 85, 247, 0.50);
  transform: scale(1.3);
}

.location-dots .dot.active {
  background: var(--color-aurora-cyan);
  transform: scale(1.4);
  box-shadow: 0 0 10px rgba(14, 165, 233, 0.80), 0 0 4px rgba(14, 165, 233, 1);
}

.location-dots .dot:disabled {
  opacity: 0.25;
  cursor: default;
}

@media (max-width: 600px) {
  .flight-controls {
    bottom: 16px;
    padding: 8px 14px;
    gap: 8px;
    max-width: calc(100vw - 32px);
  }

  .current-location {
    font-size: 0.70rem;
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .control-buttons button       { width: 28px; height: 28px; }
  .control-buttons .play-pause  { width: 38px; height: 38px; }
}
```

- [ ] **Step 2: Verify build passes**

```bash
cd /Users/ariannatoniolo/my_world && npm run build 2>&1 | tail -5
```
Expected: `✓ built in` with no errors.

- [ ] **Step 3: Commit**

```bash
cd /Users/ariannatoniolo/my_world && git add src/components/FlightControls.css && git commit -m "feat: redesign FlightControls as aurora glass pill"
```

---

## Task 7: LoadingScreen Redesign

**Files:**
- Modify: `src/components/LoadingScreen.tsx`
- Create: `src/components/LoadingScreen.css`

- [ ] **Step 1: Create LoadingScreen.css**

```css
/* src/components/LoadingScreen.css */
.loading-screen {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Inline aurora — AuroraBackground lives below this layer */
  background:
    radial-gradient(ellipse at 20% 10%, rgba(14,165,233,0.35)  0%, transparent 50%),
    radial-gradient(ellipse at 80% 15%, rgba(168,85,247,0.45)  0%, transparent 45%),
    radial-gradient(ellipse at 50% 90%, rgba(244,114,182,0.25) 0%, transparent 40%),
    var(--color-bg);
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.loading-star {
  font-size: 1.5rem;
  background: linear-gradient(135deg, var(--color-aurora-cyan), var(--color-aurora-violet), var(--color-aurora-pink));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: rotateStar 8s linear infinite;
  display: block;
  line-height: 1;
}

@keyframes rotateStar {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.loading-title {
  font-family: 'Syne', sans-serif;
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 800;
  background: linear-gradient(135deg, #fff 0%, #f0abfc 45%, #67e8f9 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  letter-spacing: -0.02em;
  line-height: 1;
}

.loading-progress {
  width: clamp(160px, 30vw, 240px);
  height: 1px;
  background: rgba(168, 85, 247, 0.20);
  border-radius: 1px;
  overflow: hidden;
}

.loading-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--color-aurora-cyan), var(--color-aurora-violet));
  animation: progressSweep 2s ease-in-out infinite;
}

@keyframes progressSweep {
  0%   { transform: scaleX(0); transform-origin: left;  }
  49%  { transform: scaleX(1); transform-origin: left;  }
  50%  { transform: scaleX(1); transform-origin: right; }
  100% { transform: scaleX(0); transform-origin: right; }
}

.loading-text {
  font-family: 'DM Mono', monospace;
  font-size: 0.70rem;
  letter-spacing: 0.3em;
  color: var(--color-text-muted);
  opacity: 0.5;
  margin: 0;
}

@media (prefers-reduced-motion: reduce) {
  .loading-star          { animation: none; }
  .loading-progress-bar  { animation: none; transform: scaleX(0.6); transform-origin: left; }
}
```

- [ ] **Step 2: Update LoadingScreen.tsx**

```tsx
// src/components/LoadingScreen.tsx
import './LoadingScreen.css';

export default function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <span className="loading-star" aria-hidden="true">✦</span>
        <h1 className="loading-title">MY WORLD</h1>
        <div className="loading-progress" aria-hidden="true">
          <div className="loading-progress-bar" />
        </div>
        <p className="loading-text">CARICAMENTO</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify build passes**

```bash
cd /Users/ariannatoniolo/my_world && npm run build 2>&1 | tail -5
```
Expected: `✓ built in` with no errors.

- [ ] **Step 4: Commit**

```bash
cd /Users/ariannatoniolo/my_world && git add src/components/LoadingScreen.tsx src/components/LoadingScreen.css && git commit -m "feat: redesign LoadingScreen with aurora hero and progress line"
```

---

## Task 8: Final Verification

- [ ] **Step 1: Full production build**

```bash
cd /Users/ariannatoniolo/my_world && npm run build 2>&1
```
Expected: `✓ built in` — no TypeScript errors, no missing imports.

- [ ] **Step 2: Run dev server and verify visually**

```bash
cd /Users/ariannatoniolo/my_world && npm run dev
```

Open `http://localhost:5173` and check:
- [ ] LoadingScreen shows "MY WORLD" Syne hero with animated progress line
- [ ] WelcomeCard appears in bottom-left corner with aurora glass styling
- [ ] "INIZIA VIAGGIO" button has aurora gradient + `──→` arrow animates on hover
- [ ] Clicking the button triggers exit animation before tour starts
- [ ] 3 aurora spheres visible in background (top-left cyan, top-right violet, bottom pink)
- [ ] DotGrid dots light up in cyan (not amber) on mouse move
- [ ] ExperienceCard slides in from right with stagger animation
- [ ] Tech badges are pill-shaped with violet border
- [ ] FlightControls appears as centered pill at bottom
- [ ] Active location dot glows cyan
- [ ] No visual regressions on the 3D globe, airplane, or location markers

- [ ] **Step 3: Check mobile layout (resize to 375px width)**

- [ ] WelcomeCard fills width with minimal margins
- [ ] ExperienceCard appears as bottom sheet (65vh, slides from bottom)
- [ ] FlightControls fits in narrow viewport

- [ ] **Step 4: Final commit**

```bash
cd /Users/ariannatoniolo/my_world && git add -A && git status
# Verify no unexpected files staged, then:
git commit -m "feat: complete Aurora Glass frontend redesign" --allow-empty-message || true
# (Only if there are uncommitted changes from verification fixes)
```
