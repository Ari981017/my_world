import { useRef, useEffect } from 'react';
import { useFlightStore } from '../store/flightStore';
import { experiences } from '../data/experiences';
import { latLonToVector3 } from '../utils/coordinates';
import {
  GLOBE_RADIUS,
  FLIGHT_DURATION,
  FLIGHT_HEIGHT_OFFSET,
  FLIGHT_ARC_HEIGHT,
  FLIGHT_BANK_ANGLE
} from '../config/constants';
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
  const { currentIndex, previousIndex, isPlaying, setTransitioning, setShowCard } =
    useFlightStore();

  useEffect(() => {
    const airplane = airplaneRef.current?.group;
    if (!airplane) return;

    // CASE 1: Initial positioning (previousIndex is null)
    if (previousIndex === null) {
      const firstExp = experiences[currentIndex];
      const startPos = latLonToVector3(
        firstExp.location.coordinates.lat,
        firstExp.location.coordinates.lon,
        GLOBE_RADIUS + FLIGHT_HEIGHT_OFFSET
      );

      // Position airplane without animation
      airplane.position.copy(startPos);

      // Update store to mark airplane as positioned
      useFlightStore.setState({ previousIndex: currentIndex });
      return;
    }

    // CASE 2: No animation needed (already at destination)
    if (previousIndex === currentIndex) {
      return;
    }

    // CASE 3: Animate FROM previousIndex TO currentIndex
    const startExp = experiences[previousIndex];
    const endExp = experiences[currentIndex];

    const startPos = latLonToVector3(
      startExp.location.coordinates.lat,
      startExp.location.coordinates.lon,
      GLOBE_RADIUS + FLIGHT_HEIGHT_OFFSET
    );

    const endPos = latLonToVector3(
      endExp.location.coordinates.lat,
      endExp.location.coordinates.lon,
      GLOBE_RADIUS + FLIGHT_HEIGHT_OFFSET
    );

    // Create curved path using quadratic bezier
    const midPoint = new THREE.Vector3()
      .addVectors(startPos, endPos)
      .multiplyScalar(0.5)
      .normalize()
      .multiplyScalar(GLOBE_RADIUS + FLIGHT_ARC_HEIGHT);

    const curve = new THREE.QuadraticBezierCurve3(startPos, midPoint, endPos);

    // Kill existing animation
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    // Create GSAP timeline
    const tl = gsap.timeline({
      paused: !isPlaying,
      onStart: () => {
        setTransitioning(true);
      },
      onComplete: () => {
        setTransitioning(false);
        setShowCard(true);
        // Update previousIndex to mark airplane's new position
        useFlightStore.setState({
          previousIndex: currentIndex,
          isPlaying: false
        });
      },
    });

    // Animate along the curve
    tl.to(
      { t: 0 },
      {
        t: 1,
        duration: FLIGHT_DURATION,
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
          airplane.rotateZ(FLIGHT_BANK_ANGLE);
        },
      }
    );

    timelineRef.current = tl;

    return () => {
      tl.kill();
    };
  }, [currentIndex, previousIndex, airplaneRef, globeRef, isPlaying, setTransitioning, setShowCard]);

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
