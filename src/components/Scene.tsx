import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import Globe from './Globe';
import Lighting from './Lighting';
import Airplane from './Airplane';
import LocationMarkers from './LocationMarkers';
import { useFlightAnimation } from '../hooks/useFlightAnimation';
import { useFlightStore } from '../store/flightStore';

export default function Scene() {
  const { camera } = useThree();
  const globeRef = useRef<THREE.Group>(null!);
  const airplaneRef = useRef<{ group: THREE.Group | null }>({ group: null });
  const isTransitioning = useFlightStore((state) => state.isTransitioning);

  // Initialize flight animation system
  useFlightAnimation({ airplaneRef, globeRef });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const rotationSpeed = 0.05;
      const phi = 0.05;
      const zoomSpeed = 0.5;

      // Converti posizione camera in coordinate sferiche
      const spherical = new THREE.Spherical();
      spherical.setFromVector3(camera.position);

      switch (e.key) {
        case 'ArrowLeft':
          spherical.theta += rotationSpeed;
          break;
        case 'ArrowRight':
          spherical.theta -= rotationSpeed;
          break;
        case 'ArrowUp':
          spherical.phi -= phi;
          break;
        case 'ArrowDown':
          spherical.phi += phi;
          break;
        case '+':
        case '=':
          // Zoom in (avvicina)
          spherical.radius = Math.max(5.0, spherical.radius - zoomSpeed);
          break;
        case '-':
        case '_':
          // Zoom out (allontana)
          spherical.radius = Math.min(50, spherical.radius + zoomSpeed);
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

      // Limiti verticali per evitare gimbal lock
      spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi));

      // Aggiorna posizione camera
      camera.position.setFromSpherical(spherical);
      camera.lookAt(0, 0, 0);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [camera]);

  return (
    <>
      <Lighting />

      {/* Globo controllabile con mouse e tastiera */}
      <Globe ref={globeRef} />

      {/* Airplane that flies between locations */}
      <Airplane ref={airplaneRef} />

      {/* Animated flag markers at each location */}
      <LocationMarkers />

      {/* Controlli mouse per ruotare e zoomare */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={5.0}
        maxDistance={50}
        zoomSpeed={1.5}
        enabled={!isTransitioning}
      />
    </>
  );
}
