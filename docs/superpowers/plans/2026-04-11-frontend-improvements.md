# Frontend Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevate the portfolio's visual quality with Space Grotesk font, CSS custom properties, side panel layout for ExperienceCard, VIAGGIO/LAVORO tabs, conditional FlightControls, and a loading screen.

**Architecture:** Pure CSS/TSX changes — no new state management or routing. Changes are layered: foundation (font + variables) first, then component rewrites that consume those variables, then UX logic changes on top.

**Tech Stack:** React 19, TypeScript, CSS (no CSS-in-JS), react-icons (already installed)

---

## Task 1: Font + CSS Custom Properties

**Files:**
- Modify: `index.html`
- Modify: `src/index.css`

- [ ] **Step 1: Add Google Fonts to `index.html`**

Replace `index.html` content with:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Arianna Toniolo — Portfolio</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 2: Add font + CSS variables to `src/index.css`**

Replace `src/index.css` with:

```css
:root {
  --color-accent: #ff9b29;
  --color-accent-hover: #ffab29;
  --color-bg: #110d21;
  --color-surface: rgba(17, 13, 33, 0.95);
  --color-text: #ddd;
  --color-text-muted: #888;
  --color-border: rgba(255, 155, 41, 0.3);
  --color-border-strong: #ff9b29;
}

html,
body {
  margin: 0;
  overflow: hidden;
  font-family: 'Space Grotesk', sans-serif;
}

.App {
  width: 100vw;
  height: 100vh;
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build 2>&1 | head -20
```

Expected: clean build, no errors.

- [ ] **Step 4: Commit**

```bash
git add index.html src/index.css
git commit -m "feat: add Space Grotesk font and CSS custom properties"
```

---

## Task 2: Update existing CSS files to use CSS variables

**Files:**
- Modify: `src/components/WelcomeCard.css`
- Modify: `src/components/FlightControls.css`

- [ ] **Step 1: Update `src/components/WelcomeCard.css`**

Replace file content with:

```css
.welcome-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--color-surface);
  backdrop-filter: blur(10px);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 40px;
  max-width: 560px;
  width: 90%;
  max-height: 85vh;
  overflow-y: auto;
  z-index: 1000;
  animation: fadeInScale 0.6s ease-out;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

.welcome-content {
  text-align: center;
}

.welcome-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-accent);
  margin: 0 0 8px 0;
  letter-spacing: 1px;
}

.welcome-subtitle {
  font-size: 1.1rem;
  color: var(--color-text);
  margin: 0 0 28px 0;
  font-weight: 300;
}

.welcome-description {
  text-align: left;
  margin: 0 0 32px 0;
}

.welcome-description p {
  color: var(--color-text);
  line-height: 1.7;
  margin: 0 0 16px 0;
  font-size: 1rem;
}

.welcome-bullets {
  list-style: none;
  padding: 0;
  margin: 12px 0 0 0;
  text-align: left;
}

.welcome-bullets li {
  color: var(--color-text);
  padding-left: 1.5rem;
  position: relative;
  margin-bottom: 0.5rem;
  line-height: 1.5;
  font-size: 0.95rem;
}

.welcome-bullets li::before {
  content: "▹";
  position: absolute;
  left: 0;
  color: var(--color-accent);
}

.start-journey-button {
  background: linear-gradient(135deg, var(--color-accent) 0%, #ff7b29 100%);
  color: white;
  border: none;
  padding: 16px 48px;
  font-size: 1.1rem;
  font-weight: 600;
  font-family: 'Space Grotesk', sans-serif;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 155, 41, 0.4);
  letter-spacing: 1px;
}

.start-journey-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 155, 41, 0.6);
  background: linear-gradient(135deg, var(--color-accent-hover) 0%, #ff8b29 100%);
}

.start-journey-button:active {
  transform: translateY(0);
}

.welcome-card::-webkit-scrollbar { width: 8px; }
.welcome-card::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 4px; }
.welcome-card::-webkit-scrollbar-thumb { background: rgba(255,155,41,0.5); border-radius: 4px; }
.welcome-card::-webkit-scrollbar-thumb:hover { background: rgba(255,155,41,0.7); }

@media (max-width: 768px) {
  .welcome-card { padding: 24px; }
  .welcome-title { font-size: 2rem; }
  .welcome-subtitle { font-size: 1rem; margin-bottom: 20px; }
  .start-journey-button { padding: 14px 36px; font-size: 1rem; }
}
```

- [ ] **Step 2: Update `src/components/FlightControls.css`**

Replace file content with:

```css
.flight-controls {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(17, 13, 33, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  z-index: 100;
}

.progress-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.current-location {
  color: var(--color-accent);
  font-size: 0.9rem;
  font-weight: 500;
}

.position-counter {
  color: var(--color-text-muted);
  font-size: 0.75rem;
}

.control-buttons {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.control-buttons button {
  background: rgba(255, 155, 41, 0.1);
  border: 1px solid var(--color-border);
  color: var(--color-accent);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
}

.control-buttons button:hover:not(:disabled) {
  background: rgba(255, 155, 41, 0.2);
  border-color: var(--color-border-strong);
  transform: scale(1.1);
}

.control-buttons button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.control-buttons .play-pause {
  width: 50px;
  height: 50px;
  background: rgba(255, 155, 41, 0.2);
  font-size: 1rem;
}

.control-buttons .play-pause:hover:not(:disabled) {
  background: rgba(255, 155, 41, 0.3);
}

.location-dots {
  display: flex;
  gap: 0.5rem;
}

.location-dots .dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 155, 41, 0.3);
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
  padding: 0;
}

.location-dots .dot:hover:not(:disabled) {
  background: rgba(255, 155, 41, 0.5);
  transform: scale(1.2);
}

.location-dots .dot.active {
  background: var(--color-accent);
  border-color: #fff;
  transform: scale(1.3);
}

.location-dots .dot:disabled {
  cursor: not-allowed;
}

@media (max-width: 600px) {
  .flight-controls { padding: 0.75rem 1rem; bottom: 1rem; }
  .current-location { font-size: 0.8rem; }
  .control-buttons button { width: 36px; height: 36px; }
  .control-buttons .play-pause { width: 44px; height: 44px; }
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build 2>&1 | head -20
```

Expected: clean build.

- [ ] **Step 4: Commit**

```bash
git add src/components/WelcomeCard.css src/components/FlightControls.css
git commit -m "refactor: use CSS custom properties in WelcomeCard and FlightControls"
```

---

## Task 3: ExperienceCard — side panel layout, tabs, FaTimes icon

**Files:**
- Modify: `src/components/ExperienceCard.tsx`
- Modify: `src/components/ExperienceCard.css`

- [ ] **Step 1: Rewrite `src/components/ExperienceCard.css`**

Replace file content with:

```css
/* === Side panel layout (desktop) === */
.experience-card {
  position: fixed;
  right: 0;
  top: 0;
  width: 380px;
  height: 100vh;
  background: var(--color-surface);
  backdrop-filter: blur(10px);
  border-left: 1px solid var(--color-border);
  padding: 2rem 1.5rem;
  overflow-y: auto;
  animation: slideInRight 0.35s ease-out;
  z-index: 1000;
  box-shadow: -8px 0 40px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  gap: 0;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Location Header */
.location-header {
  text-align: center;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid var(--color-border);
}

.country-flag {
  width: 42px;
  height: auto;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  margin-bottom: 0.5rem;
}

.location-name {
  color: var(--color-accent);
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;
  letter-spacing: 0.5px;
}

/* Tab navigation */
.tab-nav {
  display: flex;
  gap: 0;
  margin-bottom: 1.25rem;
  border-bottom: 1px solid var(--color-border);
}

.tab-btn {
  flex: 1;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  padding: 0.6rem 0;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 1px;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn:hover {
  color: var(--color-text);
}

.tab-btn.active {
  color: var(--color-accent);
  border-bottom-color: var(--color-accent);
}

/* Section Container */
.section {
  padding: 0.25rem 0;
}

/* Section Headers */
.section-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.section-header h3 {
  color: var(--color-accent);
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  letter-spacing: 1px;
}

.section-icon {
  font-size: 1.2rem;
}

/* VIAGGIO Section */
.viaggio-section .travel-description {
  color: var(--color-text);
  line-height: 1.7;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
}

.visit-info {
  color: var(--color-text-muted);
  font-size: 0.88rem;
  margin-bottom: 0.4rem;
}

.visit-info strong {
  color: var(--color-accent);
}

.travel-highlights {
  list-style: none;
  padding: 0;
  margin: 0.75rem 0;
}

.travel-highlights li {
  color: var(--color-text);
  padding-left: 1.6rem;
  position: relative;
  margin-bottom: 0.5rem;
  line-height: 1.5;
  font-size: 0.92rem;
}

.travel-highlights li::before {
  content: "✈";
  position: absolute;
  left: 0;
  color: var(--color-accent);
  font-size: 1rem;
}

.trip-type {
  color: var(--color-text-muted);
  font-style: italic;
  font-size: 0.88rem;
  margin-top: 0.75rem;
}

/* LAVORO Section */
.lavoro-section .work-meta {
  margin-bottom: 0.75rem;
}

.lavoro-section .job-title {
  color: #fff;
  font-size: 1.05rem;
  font-weight: 600;
  margin: 0 0 0.3rem 0;
}

.lavoro-section .company {
  color: var(--color-text);
  font-size: 0.95rem;
  margin: 0 0 0.25rem 0;
}

.lavoro-section .period {
  color: var(--color-text-muted);
  font-size: 0.82rem;
  margin: 0;
}

.lavoro-section .work-description {
  color: var(--color-text);
  line-height: 1.6;
  margin: 0.75rem 0;
  font-size: 0.92rem;
}

.lavoro-section .responsibilities h5 {
  color: var(--color-accent);
  font-size: 0.88rem;
  margin: 0.75rem 0 0.4rem 0;
  font-weight: 600;
}

/* Technologies */
.technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0.75rem 0;
}

.tech-badge {
  background: rgba(255, 155, 41, 0.15);
  color: var(--color-accent);
  padding: 0.25rem 0.65rem;
  border-radius: 20px;
  font-size: 0.8rem;
  border: 1px solid var(--color-border);
  font-weight: 500;
}

/* Responsibilities */
.responsibilities ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.responsibilities li {
  color: var(--color-text);
  padding-left: 1.4rem;
  position: relative;
  margin-bottom: 0.4rem;
  line-height: 1.5;
  font-size: 0.9rem;
}

.responsibilities li::before {
  content: "▹";
  position: absolute;
  left: 0;
  color: var(--color-accent);
  font-size: 1.1rem;
}

/* Close Button */
.close-button {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: transparent;
  border: none;
  color: var(--color-text-muted);
  font-size: 1rem;
  cursor: pointer;
  line-height: 1;
  transition: color 0.2s;
  padding: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

.close-button:hover {
  color: var(--color-accent);
  background: rgba(255, 155, 41, 0.1);
}

/* Continue button */
.card-actions {
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
  display: flex;
  justify-content: center;
}

.continue-button {
  background: linear-gradient(135deg, var(--color-accent) 0%, #ff7b29 100%);
  color: #fff;
  border: none;
  padding: 0.7rem 1.75rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  font-family: 'Space Grotesk', sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 155, 41, 0.3);
  width: 100%;
}

.continue-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 155, 41, 0.4);
}

.continue-button:active {
  transform: translateY(0);
}

/* Scrollbar */
.experience-card::-webkit-scrollbar { width: 6px; }
.experience-card::-webkit-scrollbar-track { background: rgba(255,255,255,0.03); }
.experience-card::-webkit-scrollbar-thumb { background: rgba(255,155,41,0.3); border-radius: 3px; }
.experience-card::-webkit-scrollbar-thumb:hover { background: rgba(255,155,41,0.5); }

/* Mobile: bottom sheet */
@media (max-width: 768px) {
  .experience-card {
    position: fixed;
    right: 0;
    left: 0;
    bottom: 0;
    top: auto;
    width: 100%;
    height: auto;
    max-height: 75vh;
    border-left: none;
    border-top: 1px solid var(--color-border);
    border-radius: 16px 16px 0 0;
    animation: slideUp 0.35s ease-out;
    box-shadow: 0 -8px 40px rgba(0, 0, 0, 0.4);
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(40px); }
    to   { opacity: 1; transform: translateY(0); }
  }
}
```

- [ ] **Step 2: Rewrite `src/components/ExperienceCard.tsx`**

Replace file content with:

```tsx
import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useFlightStore } from '../store/flightStore';
import { experiences } from '../data/experiences';
import { UI_TEXT } from '../config/constants';
import './ExperienceCard.css';

export default function ExperienceCard() {
  const { currentIndex, showCard } = useFlightStore();
  const [activeTab, setActiveTab] = useState<'viaggio' | 'lavoro'>('lavoro');

  if (!showCard) return null;

  const exp = experiences[currentIndex];

  const formatPeriod = (start: string, end: string): string => {
    try {
      const datePattern = /^\d{4}-\d{2}$/;
      if (!datePattern.test(start)) return 'Invalid date range';
      const startDate = new Date(start + '-01');
      if (isNaN(startDate.getTime())) return 'Invalid date range';

      let endStr = UI_TEXT.present;
      if (end !== 'present') {
        if (!datePattern.test(end)) return 'Invalid date range';
        const endDate = new Date(end + '-01');
        if (isNaN(endDate.getTime())) return 'Invalid date range';
        endStr = endDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      }

      return `${startDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} — ${endStr}`;
    } catch {
      return 'Invalid date range';
    }
  };

  return (
    <div className="experience-card">
      <button
        className="close-button"
        onClick={() => useFlightStore.getState().setShowCard(false)}
        aria-label={UI_TEXT.close}
      >
        <FaTimes />
      </button>

      {/* Location Header */}
      <div className="location-header">
        <img
          src={`https://flagcdn.com/w80/${exp.countryCode.toLowerCase()}.png`}
          alt={exp.countryCode}
          className="country-flag"
        />
        <h2 className="location-name">{exp.location.name}</h2>
      </div>

      {/* Tab navigation */}
      <div className="tab-nav">
        <button
          className={`tab-btn ${activeTab === 'viaggio' ? 'active' : ''}`}
          onClick={() => setActiveTab('viaggio')}
        >
          🌍 {UI_TEXT.viaggio}
        </button>
        <button
          className={`tab-btn ${activeTab === 'lavoro' ? 'active' : ''}`}
          onClick={() => setActiveTab('lavoro')}
        >
          💼 {UI_TEXT.lavoro}
        </button>
      </div>

      {/* VIAGGIO Tab */}
      {activeTab === 'viaggio' && (
        <div className="section viaggio-section">
          <p className="travel-description">{exp.viaggio.description}</p>

          {exp.viaggio.visitDate && (
            <p className="visit-info">
              <strong>Periodo visita:</strong> {exp.viaggio.visitDate}
            </p>
          )}

          {exp.viaggio.visitDuration && (
            <p className="visit-info">
              <strong>Durata:</strong> {exp.viaggio.visitDuration}
            </p>
          )}

          {exp.viaggio.highlights && exp.viaggio.highlights.length > 0 && (
            <ul className="travel-highlights">
              {exp.viaggio.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          )}

          {exp.viaggio.tripType && (
            <p className="trip-type"><em>{exp.viaggio.tripType}</em></p>
          )}
        </div>
      )}

      {/* LAVORO Tab */}
      {activeTab === 'lavoro' && (
        <div className="section lavoro-section">
          <div className="work-meta">
            <h4 className="job-title">{exp.lavoro.jobTitle}</h4>
            <p className="company">{exp.lavoro.company}</p>
            <p className="period">{formatPeriod(exp.lavoro.period.start, exp.lavoro.period.end)}</p>
          </div>

          <div className="technologies">
            {exp.lavoro.technologies.map((tech) => (
              <span key={tech} className="tech-badge">{tech}</span>
            ))}
          </div>

          <p className="work-description">{exp.lavoro.description}</p>

          <div className="responsibilities">
            <h5>{UI_TEXT.keyResponsibilities}</h5>
            <ul>
              {exp.lavoro.responsibilities.map((resp, idx) => (
                <li key={idx}>{resp}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Continue button */}
      <div className="card-actions">
        <button
          className="continue-button"
          onClick={() => {
            const { setShowCard, nextLocation } = useFlightStore.getState();
            setShowCard(false);
            nextLocation();
          }}
          aria-label="Continue to next location"
        >
          {currentIndex === experiences.length - 1 ? UI_TEXT.restart : UI_TEXT.continue}
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build 2>&1 | head -20
```

Expected: clean build, no TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/ExperienceCard.tsx src/components/ExperienceCard.css
git commit -m "feat: ExperienceCard side panel layout with VIAGGIO/LAVORO tabs"
```

---

## Task 4: FlightControls — hidden before tour starts

**Files:**
- Modify: `src/components/FlightControls.tsx`

- [ ] **Step 1: Add `hasStarted` guard**

In `src/components/FlightControls.tsx`, add `hasStarted` to the destructured store values and add an early return. The top of the component becomes:

```tsx
export default function FlightControls() {
  const {
    currentIndex,
    isPlaying,
    isTransitioning,
    hasStarted,
    play,
    pause,
    nextLocation,
    previousLocation,
  } = useFlightStore();

  if (!hasStarted) return null;

  // rest of component unchanged
```

- [ ] **Step 2: Verify build**

```bash
npm run build 2>&1 | head -20
```

Expected: clean build.

- [ ] **Step 3: Commit**

```bash
git add src/components/FlightControls.tsx
git commit -m "feat: hide FlightControls until tour starts"
```

---

## Task 5: Loading screen for 3D canvas

**Files:**
- Create: `src/components/LoadingScreen.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create `src/components/LoadingScreen.tsx`**

```tsx
export default function LoadingScreen() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#110d21',
      color: '#ff9b29',
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: '0.9rem',
      fontWeight: 500,
      letterSpacing: '3px',
    }}>
      CARICAMENTO...
    </div>
  );
}
```

- [ ] **Step 2: Update `src/App.tsx` to use `LoadingScreen`**

Replace the `Suspense` fallback:

```tsx
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react';
import Scene from './components/Scene';
import DotGrid from './components/DotGrid';
import WelcomeCard from './components/WelcomeCard';
import ExperienceCard from './components/ExperienceCard';
import FlightControls from './components/FlightControls';
import LoadingScreen from './components/LoadingScreen';
import './App.css';

export default function App() {
  return (
    <div className="App" style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <DotGrid
        dotSize={5}
        gap={15}
        baseColor="#110d21"
        activeColor="#ff9b29"
        proximity={120}
        shockRadius={250}
        shockStrength={5}
        returnDuration={1.5}
      >
        <Canvas camera={{ position: [0, 0, 9], fov: 75 }}>
          <Suspense fallback={<LoadingScreen />}>
            <Scene />
          </Suspense>
        </Canvas>
      </DotGrid>

      <WelcomeCard />
      <ExperienceCard />
      <FlightControls />
    </div>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build 2>&1 | head -20
```

Expected: clean build.

- [ ] **Step 4: Commit**

```bash
git add src/components/LoadingScreen.tsx src/App.tsx
git commit -m "feat: add loading screen for 3D canvas"
```

---

## Task 6: WelcomeCard — condensed text

**Files:**
- Modify: `src/components/WelcomeCard.tsx`

- [ ] **Step 1: Replace the description section in `src/components/WelcomeCard.tsx`**

Replace the entire file with:

```tsx
import { useFlightStore } from '../store/flightStore';
import './WelcomeCard.css';

export default function WelcomeCard() {
  const hasStarted = useFlightStore((state) => state.hasStarted);
  const startTour = useFlightStore((state) => state.startTour);

  if (hasStarted) return null;

  return (
    <div className="welcome-card">
      <div className="welcome-content">
        <h1 className="welcome-title">Arianna Toniolo</h1>
        <p className="welcome-subtitle">Full Stack Developer</p>

        <div className="welcome-description">
          <p>
            Benvenuta nel mio portfolio interattivo — un viaggio in 3D attraverso
            le mie esperienze professionali e i luoghi del mondo.
          </p>
          <ul className="welcome-bullets">
            <li>PHP, Vue.js, PostgreSQL, API RESTful</li>
            <li>Integrazione sistemi, automazione flussi, cloud (AWS)</li>
            <li>4+ anni di esperienza full stack</li>
          </ul>
        </div>

        <button
          className="start-journey-button"
          onClick={startTour}
          aria-label="Inizia il viaggio"
        >
          INIZIA VIAGGIO
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build 2>&1 | head -20
```

Expected: clean build.

- [ ] **Step 3: Manual smoke test**

```bash
npm run dev
```

1. Open `http://localhost:5173`
2. Verify Space Grotesk font is applied everywhere
3. Verify WelcomeCard shows condensed text (1 paragraph + 3 bullets)
4. Verify FlightControls are NOT visible on WelcomeCard
5. Click "INIZIA VIAGGIO" — verify FlightControls appear
6. Navigate to a location — verify ExperienceCard slides in from the right
7. Verify VIAGGIO / LAVORO tabs switch content
8. Verify close button shows icon (not ×)
9. Resize browser to mobile width — verify ExperienceCard becomes bottom sheet

- [ ] **Step 4: Commit**

```bash
git add src/components/WelcomeCard.tsx
git commit -m "feat: condense WelcomeCard text with bullet points"
```
