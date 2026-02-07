import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import Globe from './Globe';
import Lighting from './Lighting';

export default function Scene() {
  const { camera } = useThree();

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
          spherical.radius = Math.max(2.2, spherical.radius - zoomSpeed);
          break;
        case '-':
        case '_':
          // Zoom out (allontana)
          spherical.radius = Math.min(50, spherical.radius + zoomSpeed);
          break;
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
      <Globe />

      {/* Controlli mouse per ruotare e zoomare */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={2.2}
        maxDistance={50}
        zoomSpeed={1.5}
      />
    </>
  );
}
