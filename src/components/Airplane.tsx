import { useRef, forwardRef, useImperativeHandle } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
  AIRPLANE_SCALE,
  AIRPLANE_BOBBING_FREQUENCY,
  AIRPLANE_BOBBING_AMPLITUDE
} from '../config/constants';
import { useFlightStore } from '../store/flightStore';

export interface AirplaneHandle {
  group: THREE.Group | null;
}

interface AirplaneProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

const Airplane = forwardRef<AirplaneHandle, AirplaneProps>(
  ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = AIRPLANE_SCALE }, ref) => {
    const groupRef = useRef<THREE.Group>(null);
    const { scene } = useGLTF('/models/airplane.glb');
    const isTransitioning = useFlightStore((state) => state.isTransitioning);

    useImperativeHandle(ref, () => ({
      group: groupRef.current,
    }));

    // Subtle bobbing animation for realism
    useFrame((state) => {
      if (groupRef.current) {
        const time = state.clock.getElapsedTime();

        // Store current position (set by flight animation)
        const currentX = groupRef.current.position.x;
        const currentY = groupRef.current.position.y;
        const currentZ = groupRef.current.position.z;

        // Calculate subtle vertical oscillation
        const offset = Math.sin(time * AIRPLANE_BOBBING_FREQUENCY) * AIRPLANE_BOBBING_AMPLITUDE;

        // Only apply bobbing during active flight animation
        if (isTransitioning) {
          groupRef.current.position.set(currentX, currentY + offset, currentZ);
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
