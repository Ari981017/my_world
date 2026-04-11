# Camera Flight Follow — Design Spec

**Date:** 2026-04-11  
**Status:** Approved

## Overview

When the airplane flies from one location to another, the camera animates automatically to keep the user oriented: it zooms out to show the arc of the flight, then zooms back in centered on the destination.

## Behavior

Three phases, all within the existing `FLIGHT_DURATION` (3 seconds):

| Phase | Duration | Camera action |
|-------|----------|---------------|
| 1 — Reveal | 0% → 40% | Zoom out to adaptive distance + begin rotating toward arc midpoint |
| 2 — Track | 40% → 70% | Continue rotating toward destination |
| 3 — Arrive | 70% → 100% | Zoom in back to original distance, centered on destination |

**Adaptive zoom:** The zoom-out distance is proportional to the angular distance between origin and destination on the sphere:

```
angularDist = acos(startDir · endDir)   // 0 → π
extraZoom   = angularDist * CAMERA_ZOOM_SCALE_FACTOR
targetDist  = clamp(currentDist + extraZoom, currentDist + MIN_EXTRA_ZOOM, CAMERA_MAX_DISTANCE)
```

Where `CAMERA_ZOOM_SCALE_FACTOR` and `MIN_EXTRA_ZOOM` are new constants in `constants.ts`.

**Return zoom:** At the end of the flight, the camera returns to the exact radius the user had before the flight started (saved in a ref at animation start).

**Camera rotation:** Animated in spherical coordinates (theta, phi) to avoid cutting through the globe. Shortest-path normalization on theta to prevent 360° wraps.

## Architecture

### New file: `src/hooks/useCameraFlightFollow.ts`

Single-responsibility hook. Called from `Scene.tsx` alongside the existing `useFlightAnimation`.

**Interface:**
```ts
interface UseCameraFlightFollowProps {
  camera: THREE.Camera;
}

export function useCameraFlightFollow({ camera }: UseCameraFlightFollowProps): void
```

**Internal logic:**
- Subscribes to `currentIndex` and `previousIndex` from `useFlightStore`
- On `currentIndex` change (and `previousIndex !== null && previousIndex !== currentIndex`):
  1. Saves current `camera.position.length()` as `savedRadius`
  2. Computes `startPos` and `endPos` via `latLonToVector3`
  3. Computes adaptive `targetDist` from angular distance
  4. Computes midpoint direction for phase 1/2 rotation target
  5. Creates a GSAP timeline with 3 phases animating `{ r, theta, phi }` in spherical coords
  6. `onUpdate`: rebuilds `camera.position` from spherical + calls `camera.lookAt(0,0,0)`
- Kills previous timeline before creating a new one (same pattern as `useFlightAnimation`)

### Modified file: `src/components/Scene.tsx`

Add import and call:
```ts
import { useCameraFlightFollow } from '../hooks/useCameraFlightFollow';

// inside Scene():
useCameraFlightFollow({ camera });
```

### Modified file: `src/config/constants.ts`

Two new constants:
```ts
export const CAMERA_ZOOM_SCALE_FACTOR = 5; // extra distance per radian of arc
export const CAMERA_MIN_EXTRA_ZOOM = 1.5;  // minimum zoom out even for short hops
```

## Interaction with OrbitControls

`OrbitControls` is already disabled (`enabled={!isTransitioning}`) during flight. GSAP animates `camera.position` while controls are off. When `isTransitioning` returns to `false`, OrbitControls resumes from the camera's new position naturally.

## Out of scope

- Camera animation on the initial `startTour` (no previous location, airplane just appears)
- Mobile touch handling changes
- Any change to the airplane animation or globe mesh
