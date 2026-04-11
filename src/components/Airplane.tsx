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
    const basePosRef = useRef(new THREE.Vector3());
    const { scene } = useGLTF('/models/airplane.glb');
    const isTransitioning = useFlightStore((state) => state.isTransitioning);

    useImperativeHandle(ref, () => ({
      group: groupRef.current,
    }));

    // Subtle bobbing animation for realism
    useFrame((state) => {
      if (groupRef.current) {
        const time = state.clock.getElapsedTime();

        // Only apply bobbing during active flight animation
        if (isTransitioning) {
          // Snapshot the base position set by GSAP this frame, then apply offset on top
          basePosRef.current.copy(groupRef.current.position);
          const offset = Math.sin(time * AIRPLANE_BOBBING_FREQUENCY) * AIRPLANE_BOBBING_AMPLITUDE;
          groupRef.current.position.y = basePosRef.current.y + offset;
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
