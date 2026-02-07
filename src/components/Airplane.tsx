import { useRef, forwardRef, useImperativeHandle } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export interface AirplaneHandle {
  group: THREE.Group | null;
}

interface AirplaneProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

const Airplane = forwardRef<AirplaneHandle, AirplaneProps>(
  ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 0.5 }, ref) => {
    const groupRef = useRef<THREE.Group>(null);
    const { scene } = useGLTF('/models/airplane.glb');

    useImperativeHandle(ref, () => ({
      group: groupRef.current,
    }));

    // Optional: Add subtle bobbing animation for realism
    useFrame((state) => {
      if (groupRef.current) {
        const time = state.clock.getElapsedTime();
        // Subtle vertical oscillation
        const baseY = groupRef.current.position.y;
        const offset = Math.sin(time * 2) * 0.001;
        // Don't interfere with main animation position
        if (Math.abs(offset) < 0.01) {
          groupRef.current.position.y = baseY + offset;
        }
      }
    });

    return (
      <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
        <primitive object={scene.clone()} />
      </group>
    );
  }
);

Airplane.displayName = 'Airplane';

// Preload the model to prevent loading delays
useGLTF.preload('/models/airplane.glb');

export default Airplane;
