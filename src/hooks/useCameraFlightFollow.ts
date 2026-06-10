import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { useFlightStore } from '../store/flightStore';
import { experiencesLocations as experiences } from '../data/experiences';
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
