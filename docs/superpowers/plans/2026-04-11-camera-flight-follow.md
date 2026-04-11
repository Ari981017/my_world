# Camera Flight Follow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Animate the camera during each flight with a zoom-out → arc-track → zoom-in sequence, with adaptive zoom depth based on the angular distance between locations.

**Architecture:** A new single-responsibility hook `useCameraFlightFollow` subscribes to the Zustand flight store, builds a GSAP timeline in spherical coordinates whenever `currentIndex` changes, and animates camera radius + theta/phi independently from the airplane animation.

**Tech Stack:** React, Three.js, GSAP, Zustand, TypeScript

---

## File Map

| Action | File | What changes |
|--------|------|-------------|
| Modify | `src/config/constants.ts` | Add `CAMERA_ZOOM_SCALE_FACTOR`, `CAMERA_MIN_EXTRA_ZOOM` |
| Create | `src/hooks/useCameraFlightFollow.ts` | New hook — full camera animation logic |
| Modify | `src/components/Scene.tsx` | Import + call `useCameraFlightFollow` |

---

### Task 1: Add constants to `constants.ts`

**Files:**
- Modify: `src/config/constants.ts`

- [ ] **Step 1: Add the two new camera animation constants**

Open `src/config/constants.ts` and append after the existing camera configuration block:

```ts
// Camera flight-follow animation
export const CAMERA_ZOOM_SCALE_FACTOR = 5; // extra camera distance per radian of arc
export const CAMERA_MIN_EXTRA_ZOOM = 1.5;  // minimum extra zoom even for short hops
```

- [ ] **Step 2: Commit**

```bash
git add src/config/constants.ts
git commit -m "feat: add camera zoom constants for flight follow"
```

---

### Task 2: Create `useCameraFlightFollow` hook

**Files:**
- Create: `src/hooks/useCameraFlightFollow.ts`

- [ ] **Step 1: Create the file with the full implementation**

Create `src/hooks/useCameraFlightFollow.ts` with this content:

```ts
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { useFlightStore } from '../store/flightStore';
import { experiences } from '../data/experiences';
import { latLonToVector3 } from '../utils/coordinates';
import {
  GLOBE_RADIUS,
  FLIGHT_DURATION,
  CAMERA_MAX_DISTANCE,
  CAMERA_ZOOM_SCALE_FACTOR,
  CAMERA_MIN_EXTRA_ZOOM,
} from '../config/constants';

interface UseCameraFlightFollowProps {
  camera: THREE.Camera;
}

export function useCameraFlightFollow({ camera }: UseCameraFlightFollowProps): void {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const currentIndex = useFlightStore((state) => state.currentIndex);
  const previousIndex = useFlightStore((state) => state.previousIndex);

  useEffect(() => {
    // Only animate on real transitions (not initial placement)
    if (previousIndex === null || previousIndex === currentIndex) return;

    const startExp = experiences[previousIndex];
    const endExp = experiences[currentIndex];

    // Direction vectors on the globe surface (normalized)
    const startDir = latLonToVector3(
      startExp.location.coordinates.lat,
      startExp.location.coordinates.lon,
      GLOBE_RADIUS
    ).normalize();

    const endDir = latLonToVector3(
      endExp.location.coordinates.lat,
      endExp.location.coordinates.lon,
      GLOBE_RADIUS
    ).normalize();

    // Angular distance between origin and destination (0 → π)
    const angularDist = Math.acos(Math.min(1, Math.max(-1, startDir.dot(endDir))));

    // Save the user's current camera radius to restore it at the end
    const savedRadius = camera.position.length();

    // Adaptive zoom-out: the farther the flight, the more we pull back
    const targetDist = Math.min(
      savedRadius + Math.max(CAMERA_MIN_EXTRA_ZOOM, angularDist * CAMERA_ZOOM_SCALE_FACTOR),
      CAMERA_MAX_DISTANCE
    );

    // Midpoint direction on the sphere (great-circle midpoint)
    const midDir = startDir.clone().add(endDir).normalize();

    // Current camera spherical coords (starting point for animation)
    const startSpherical = new THREE.Spherical().setFromVector3(camera.position);

    // Destination spherical angles (radius ignored — we manage radius separately)
    const destSpherical = new THREE.Spherical().setFromVector3(
      endDir.clone().multiplyScalar(savedRadius)
    );
    const midSpherical = new THREE.Spherical().setFromVector3(
      midDir.clone().multiplyScalar(savedRadius)
    );

    // Normalize theta to shortest-path rotation (avoids 360° spin)
    const shortestTheta = (from: number, to: number): number => {
      let delta = to - from;
      while (delta > Math.PI) delta -= 2 * Math.PI;
      while (delta < -Math.PI) delta += 2 * Math.PI;
      return from + delta;
    };

    const midTheta = shortestTheta(startSpherical.theta, midSpherical.theta);
    const destTheta = shortestTheta(midTheta, destSpherical.theta);

    // Kill any previous camera animation
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    // Mutable object that GSAP will tween
    const animObj = {
      r: startSpherical.radius,
      theta: startSpherical.theta,
      phi: startSpherical.phi,
    };

    const updateCamera = () => {
      camera.position.setFromSpherical(
        new THREE.Spherical(animObj.r, animObj.phi, animObj.theta)
      );
      camera.lookAt(0, 0, 0);
    };

    const tl = gsap.timeline();

    // Phase 1 (0–40% of flight): zoom out + rotate to arc midpoint
    tl.to(animObj, {
      r: targetDist,
      theta: midTheta,
      phi: midSpherical.phi,
      duration: FLIGHT_DURATION * 0.4,
      ease: 'power1.inOut',
      onUpdate: updateCamera,
    });

    // Phase 2 (40–70%): continue rotating to destination
    tl.to(animObj, {
      theta: destTheta,
      phi: destSpherical.phi,
      duration: FLIGHT_DURATION * 0.3,
      ease: 'power1.inOut',
      onUpdate: updateCamera,
    });

    // Phase 3 (70–100%): zoom back in to user's original radius
    tl.to(animObj, {
      r: savedRadius,
      duration: FLIGHT_DURATION * 0.3,
      ease: 'power1.inOut',
      onUpdate: updateCamera,
    });

    timelineRef.current = tl;

    return () => {
      tl.kill();
    };
  }, [currentIndex, previousIndex, camera]);
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npm run build 2>&1 | head -30
```

Expected: no errors related to `useCameraFlightFollow.ts`.

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useCameraFlightFollow.ts
git commit -m "feat: add useCameraFlightFollow hook with adaptive zoom"
```

---

### Task 3: Wire the hook into `Scene.tsx`

**Files:**
- Modify: `src/components/Scene.tsx`

- [ ] **Step 1: Add the import**

In `src/components/Scene.tsx`, add after the existing `useFlightAnimation` import:

```ts
import { useCameraFlightFollow } from '../hooks/useCameraFlightFollow';
```

- [ ] **Step 2: Call the hook inside `Scene()`**

Inside the `Scene` function body, after the existing `useFlightAnimation` call (line 28):

```ts
useCameraFlightFollow({ camera });
```

The full top of the function should now read:

```ts
export default function Scene() {
  const { camera } = useThree();
  const globeRef = useRef<THREE.Group>(null!);
  const airplaneRef = useRef<{ group: THREE.Group | null }>({ group: null });
  const isTransitioning = useFlightStore((state) => state.isTransitioning);

  useFlightAnimation({ airplaneRef, globeRef });
  useCameraFlightFollow({ camera });
  // ... rest unchanged
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npm run build 2>&1 | head -30
```

Expected: clean build, no errors.

- [ ] **Step 4: Manual smoke test**

```bash
npm run dev
```

1. Open `http://localhost:5173`
2. Click "INIZIA VIAGGIO"
3. Click the play button or press the next arrow
4. Verify: camera zooms out, arc becomes visible, then zooms back in centered on destination
5. Try a long-distance flight (e.g., dot 1 → dot 3, Reykjavik → Los Angeles) — zoom out should be noticeably greater than a short hop (e.g., Madrid → Las Palmas)
6. Verify OrbitControls still work normally after the animation completes

- [ ] **Step 5: Commit**

```bash
git add src/components/Scene.tsx
git commit -m "feat: wire camera flight follow into Scene"
```
