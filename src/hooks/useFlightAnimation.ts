import { useRef, useEffect } from 'react';
import { useFlightStore } from '../store/flightStore';
import { experiences } from '../data/experiences';
import { latLonToVector3, GLOBE_RADIUS } from '../utils/coordinates';
import { gsap } from 'gsap';
import * as THREE from 'three';

interface UseFlightAnimationProps {
  airplaneRef: React.RefObject<{ group: THREE.Group | null }>;
  globeRef: React.RefObject<THREE.Group>;
}

export function useFlightAnimation({
  airplaneRef,
  globeRef,
}: UseFlightAnimationProps) {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const { currentIndex, isPlaying, setTransitioning, setShowCard } =
    useFlightStore();

  useEffect(() => {
    const airplane = airplaneRef.current?.group;
    if (!airplane) return;

    // Get current and next positions
    const currentExp = experiences[currentIndex];
    const nextIndex = (currentIndex + 1) % experiences.length;
    const nextExp = experiences[nextIndex];

    const startPos = latLonToVector3(
      currentExp.location.coordinates.lat,
      currentExp.location.coordinates.lon,
      GLOBE_RADIUS + 0.15 // Offset from surface
    );

    const endPos = latLonToVector3(
      nextExp.location.coordinates.lat,
      nextExp.location.coordinates.lon,
      GLOBE_RADIUS + 0.15
    );

    // Create curved path using quadratic bezier
    const midPoint = new THREE.Vector3()
      .addVectors(startPos, endPos)
      .multiplyScalar(0.5)
      .normalize()
      .multiplyScalar(GLOBE_RADIUS + 0.8); // Arc height

    const curve = new THREE.QuadraticBezierCurve3(startPos, midPoint, endPos);

    // Kill existing animation
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    // Create GSAP timeline
    const tl = gsap.timeline({
      paused: !isPlaying,
      onStart: () => setTransitioning(true),
      onComplete: () => {
        setTransitioning(false);
        setShowCard(true);
        // No more auto-advance - user controls navigation via "Continue" button
      },
    });

    // Animate along the curve
    tl.to(
      { t: 0 },
      {
        t: 1,
        duration: 3, // 3 seconds flight time
        ease: 'power1.inOut',
        onUpdate: function () {
          const t = (this.targets()[0] as { t: number }).t;
          const point = curve.getPoint(t);

          airplane.position.copy(point);

          // Orient airplane along the curve (look at next point)
          const nextT = Math.min(t + 0.01, 1);
          const nextPoint = curve.getPoint(nextT);
          airplane.lookAt(nextPoint);

          // Tilt airplane slightly for realism (bank angle)
          airplane.rotateZ(Math.PI * 0.1);
        },
      }
    );

    timelineRef.current = tl;

    return () => {
      tl.kill();
    };
  }, [currentIndex, airplaneRef, globeRef, isPlaying, setTransitioning, setShowCard]);

  // Handle play/pause
  useEffect(() => {
    if (timelineRef.current) {
      if (isPlaying) {
        timelineRef.current.play();
      } else {
        timelineRef.current.pause();
      }
    }
  }, [isPlaying]);
}
