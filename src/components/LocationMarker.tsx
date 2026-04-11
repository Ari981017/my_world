import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';
import {
  MARKER_FLAG_WIDTH,
  MARKER_FLAG_HEIGHT,
  MARKER_LABEL_SIZE,
  MARKER_PULSE_FREQUENCY,
  MARKER_PULSE_AMPLITUDE,
  MARKER_GLOW_SIZE,
  MARKER_GLOW_COLOR,
  FLAG_CDN_BASE_URL
} from '../config/constants';

interface LocationMarkerProps {
  position: THREE.Vector3;
  label: string;
  countryCode: string; // ISO 3166-1 alpha-2 (e.g., "IT", "GB", "US")
  isActive?: boolean;
}

// Global texture cache to avoid loading same flag multiple times
const flagTextureCache = new Map<string, THREE.Texture | null>();

export default function LocationMarker({
  position,
  label,
  countryCode,
  isActive = false,
}: LocationMarkerProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [flagTexture, setFlagTexture] = useState<THREE.Texture | null>(null);
  const loadingRef = useRef(false);

  // Load flag texture with error handling and caching
  useEffect(() => {
    const code = countryCode.toLowerCase();

    // Check cache first
    if (flagTextureCache.has(code)) {
      const cachedTexture = flagTextureCache.get(code)!;
      setFlagTexture(cachedTexture);
      return;
    }

    // Prevent multiple loads
    if (loadingRef.current) {
      return;
    }
    loadingRef.current = true;

    const loader = new THREE.TextureLoader();
    const flagUrl = `${FLAG_CDN_BASE_URL}/${code}.png`;

    loader.load(
      flagUrl,
      (texture) => {
        flagTextureCache.set(code, texture);
        setFlagTexture(texture);
        loadingRef.current = false;
      },
      undefined,
      (error) => {
        console.warn(`Failed to load flag for ${countryCode}:`, error);
        flagTextureCache.set(code, null);

        // Create fallback colored texture
        const canvas = document.createElement('canvas');
        canvas.width = 160;
        canvas.height = 120;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const gradient = ctx.createLinearGradient(0, 0, 160, 120);
          gradient.addColorStop(0, '#4A90E2');
          gradient.addColorStop(1, '#2C5F8D');
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, 160, 120);

          ctx.fillStyle = 'white';
          ctx.font = 'bold 40px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(countryCode, 80, 60);
        }

        const fallbackTexture = new THREE.CanvasTexture(canvas);
        setFlagTexture(fallbackTexture);
        loadingRef.current = false;
      }
    );
  }, [countryCode]);

  // Pulse effect when active
  useFrame((state) => {
    if (groupRef.current && isActive) {
      const pulse = 1 + Math.sin(state.clock.getElapsedTime() * MARKER_PULSE_FREQUENCY) * MARKER_PULSE_AMPLITUDE;
      groupRef.current.scale.setScalar(pulse);
    } else if (groupRef.current) {
      groupRef.current.scale.setScalar(1);
    }
  });

  // Orient the group so local Z (plane normal) points outward from globe center
  // This makes a default PlaneGeometry (XY plane, normal=Z) lie flat on the surface
  const normal = position.clone().normalize();
  const forward = new THREE.Vector3(0, 0, 1);
  const quaternion = new THREE.Quaternion().setFromUnitVectors(forward, normal);

  return (
    <group ref={groupRef} position={position} quaternion={quaternion}>
      {/* Flag laid flat on the globe surface, face pointing outward */}
      {flagTexture && (
        <mesh position={[0, 0, 0.02]}>
          <planeGeometry args={[MARKER_FLAG_WIDTH, MARKER_FLAG_HEIGHT]} />
          <meshStandardMaterial
            map={flagTexture}
            side={THREE.DoubleSide}
            transparent
            opacity={0.95}
          />
        </mesh>
      )}

      {/* Label above the flag */}
      <Text
        position={[0, 0, 0.15]}
        fontSize={MARKER_LABEL_SIZE}
        color="white"
        anchorX="center"
        anchorY="bottom"
        outlineWidth={0.003}
        outlineColor="#000"
      >
        {label}
      </Text>

      {/* Glowing dot when active */}
      {isActive && (
        <mesh position={[0, 0, 0.01]}>
          <sphereGeometry args={[MARKER_GLOW_SIZE, 16, 16]} />
          <meshBasicMaterial color={MARKER_GLOW_COLOR} transparent opacity={0.8} />
        </mesh>
      )}
    </group>
  );
}
