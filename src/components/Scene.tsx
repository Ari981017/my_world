import { useEffect, useRef, useCallback } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import Globe from './Globe';
import Lighting from './Lighting';
import Airplane from './Airplane';
import LocationMarkers from './LocationMarkers';
import { useFlightAnimation } from '../hooks/useFlightAnimation';
import { useFlightStore } from '../store/flightStore';
import {
  CAMERA_ROTATION_SPEED,
  CAMERA_PHI_SPEED,
  CAMERA_ZOOM_SPEED,
  CAMERA_MIN_DISTANCE,
  CAMERA_MAX_DISTANCE,
  CAMERA_PHI_MIN,
  CAMERA_PHI_MAX
} from '../config/constants';

export default function Scene() {
  const { camera } = useThree();
  const globeRef = useRef<THREE.Group>(null!);
  const airplaneRef = useRef<{ group: THREE.Group | null }>({ group: null });
  const isTransitioning = useFlightStore((state) => state.isTransitioning);

  // Initialize flight animation system
  useFlightAnimation({ airplaneRef, globeRef });

  // Memoize keyboard handler to prevent recreating on every render
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Convert camera position to spherical coordinates
    const spherical = new THREE.Spherical();
    spherical.setFromVector3(camera.position);

    switch (e.key) {
      case 'ArrowLeft':
        spherical.theta += CAMERA_ROTATION_SPEED;
        break;
      case 'ArrowRight':
        spherical.theta -= CAMERA_ROTATION_SPEED;
        break;
      case 'ArrowUp':
        spherical.phi -= CAMERA_PHI_SPEED;
        break;
      case 'ArrowDown':
        spherical.phi += CAMERA_PHI_SPEED;
        break;
      case '+':
      case '=':
        // Zoom in (closer)
        spherical.radius = Math.max(CAMERA_MIN_DISTANCE, spherical.radius - CAMERA_ZOOM_SPEED);
        break;
      case '-':
      case '_':
        // Zoom out (farther)
        spherical.radius = Math.min(CAMERA_MAX_DISTANCE, spherical.radius + CAMERA_ZOOM_SPEED);
        break;
      case ' ':
        {
          // Spacebar to toggle play/pause
          e.preventDefault();
          const { isPlaying, play, pause } = useFlightStore.getState();
          if (isPlaying) {
            pause();
          } else {
            play();
          }
          return;
        }
      default:
        return;
    }

    // Vertical limits to avoid gimbal lock
    spherical.phi = Math.max(CAMERA_PHI_MIN, Math.min(CAMERA_PHI_MAX, spherical.phi));

    // Update camera position
    camera.position.setFromSpherical(spherical);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      <Lighting />

      {/* Globe controllable with mouse and keyboard */}
      <Globe ref={globeRef} />

      {/* Airplane that flies between locations */}
      <Airplane ref={airplaneRef} />

      {/* Animated flag markers at each location */}
      <LocationMarkers />

      {/* Mouse controls for rotating and zooming */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={CAMERA_MIN_DISTANCE}
        maxDistance={CAMERA_MAX_DISTANCE}
        zoomSpeed={CAMERA_ZOOM_SPEED}
        enabled={!isTransitioning}
      />
    </>
  );
}
