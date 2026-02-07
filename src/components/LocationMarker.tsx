import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';

interface LocationMarkerProps {
  position: THREE.Vector3;
  label: string;
  countryCode: string; // ISO 3166-1 alpha-2 (e.g., "IT", "GB", "US")
  isActive?: boolean;
}

export default function LocationMarker({
  position,
  label,
  countryCode,
  isActive = false,
}: LocationMarkerProps) {
  const groupRef = useRef<THREE.Group>(null);
  const flagRef = useRef<THREE.Mesh>(null);

  // Load flag texture from flagcdn.com (256x192 aspect ratio)
  const flagTexture = useLoader(
    THREE.TextureLoader,
    `https://flagcdn.com/w160/${countryCode.toLowerCase()}.png`
  );

  // Pulse effect when active
  useFrame((state) => {
    if (groupRef.current && isActive) {
      const pulse = 1 + Math.sin(state.clock.getElapsedTime() * 4) * 0.1;
      groupRef.current.scale.setScalar(pulse);
    } else if (groupRef.current) {
      groupRef.current.scale.setScalar(1);
    }
  });

  // Calculate orientation to face outward from globe
  const normal = position.clone().normalize();
  const up = new THREE.Vector3(0, 1, 0);
  const quaternion = new THREE.Quaternion().setFromUnitVectors(up, normal);

  return (
    <group ref={groupRef} position={position} quaternion={quaternion}>
      {/* Flag pole */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.005, 0.005, 0.3, 8]} />
        <meshStandardMaterial color="#333" />
      </mesh>

      {/* Flag cloth with country texture */}
      <mesh ref={flagRef} position={[0.06, 0.25, 0]} rotation={[0, 0, 0]}>
        <planeGeometry args={[0.12, 0.08]} />
        <meshStandardMaterial
          map={flagTexture}
          side={THREE.DoubleSide}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Label */}
      <Text
        position={[0, 0.35, 0]}
        fontSize={0.04}
        color="white"
        anchorX="center"
        anchorY="bottom"
        outlineWidth={0.002}
        outlineColor="#000"
      >
        {label}
      </Text>

      {/* Glowing base when active */}
      {isActive && (
        <mesh position={[0, 0.01, 0]}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshBasicMaterial color="#ff9b29" transparent opacity={0.6} />
        </mesh>
      )}
    </group>
  );
}
