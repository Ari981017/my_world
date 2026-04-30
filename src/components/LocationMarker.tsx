import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { MARKER_LABEL_SIZE } from '../config/constants';

interface LocationMarkerProps {
  position: THREE.Vector3;
  label: string;
  countryCode: string;
  isActive?: boolean;
  onClick?: () => void;
}

const POLE_HEIGHT = 0.22;
const POLE_RADIUS = 0.014;
const BEACON_R    = 0.038;
const RING_R      = 0.08;
const RING_TUBE   = 0.005;
const FLAG_W      = 0.20;
const FLAG_H      = 0.13;

const VIOLET = new THREE.Color('#a855f7');
const PINK   = new THREE.Color('#ec4899');
const MUTED  = new THREE.Color('#6b7280');

const flagCache = new Map<string, THREE.Texture | null>();

export default function LocationMarker({
  position,
  label,
  countryCode,
  isActive = false,
  onClick,
}: LocationMarkerProps) {
  const groupRef  = useRef<THREE.Group>(null);
  const beaconRef = useRef<THREE.Mesh>(null);
  const glowRef   = useRef<THREE.Mesh>(null);
  const ring1Ref  = useRef<THREE.Mesh>(null);
  const ring2Ref  = useRef<THREE.Mesh>(null);
  const ring3Ref  = useRef<THREE.Mesh>(null);
  const flagRef   = useRef<THREE.Mesh>(null);
  const loadingRef = useRef(false);

  const [flagTexture, setFlagTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const code = countryCode.toLowerCase();
    if (flagCache.has(code)) { setFlagTexture(flagCache.get(code)!); return; }
    if (loadingRef.current) return;
    loadingRef.current = true;

    new THREE.TextureLoader().load(
      `https://flagcdn.com/w160/${code}.png`,
      (tex) => { flagCache.set(code, tex); setFlagTexture(tex); loadingRef.current = false; },
      undefined,
      () => { flagCache.set(code, null); loadingRef.current = false; }
    );
  }, [countryCode]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (beaconRef.current) {
      const f = isActive ? Math.sin(t * 2.2) * 0.012 : 0;
      beaconRef.current.position.z = POLE_HEIGHT + f;
      if (glowRef.current) glowRef.current.position.z = POLE_HEIGHT + f;
    }

    [ring1Ref, ring2Ref, ring3Ref].forEach((ref, i) => {
      if (!ref.current) return;
      const mat = ref.current.material as THREE.MeshBasicMaterial;
      if (!isActive) { mat.opacity = 0; return; }
      const progress = ((t * 0.75) + i * 0.33) % 1;
      ref.current.scale.set(1 + progress * 4.5, 1 + progress * 4.5, 1);
      mat.opacity = (1 - progress) * 0.55;
    });

    // Flag wave animation
    if (flagRef.current && !isActive) {
      const pos = flagRef.current.geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const xNorm = (x + FLAG_W / 2) / FLAG_W; // 0 at pole, 1 at free end
        const wave = Math.sin(x * 14 + t * 3.5) * 0.018 * xNorm
                   + Math.sin(x * 8  + t * 2.2) * 0.009 * xNorm;
        pos.setZ(i, wave);
      }
      pos.needsUpdate = true;
    }
  });

  const normal     = position.clone().normalize();
  const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);

  return (
    <group
      ref={groupRef}
      position={position}
      quaternion={quaternion}
      onClick={onClick}
      onPointerOver={() => { if (onClick) document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { document.body.style.cursor = 'auto'; }}
    >
      {/* Base ring */}
      <mesh position={[0, 0, 0.005]}>
        <torusGeometry args={[RING_R * 0.6, RING_TUBE * 0.7, 8, 32]} />
        <meshBasicMaterial
          color={isActive ? VIOLET : MUTED}
          transparent
          opacity={isActive ? 0.6 : 0.35}
        />
      </mesh>

      {/* Sonar rings (active only) */}
      {[ring1Ref, ring2Ref, ring3Ref].map((ref, i) => (
        <mesh key={i} ref={ref} position={[0, 0, 0.006]}>
          <torusGeometry args={[RING_R, RING_TUBE, 8, 32]} />
          <meshBasicMaterial color={PINK} transparent opacity={0} />
        </mesh>
      ))}

      {/* Pole + flag (inactive only) */}
      {!isActive && (
        <>
          <mesh position={[0, 0, POLE_HEIGHT / 2]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[POLE_RADIUS, POLE_RADIUS * 1.5, POLE_HEIGHT, 6]} />
            <meshBasicMaterial color="#00ffff" transparent opacity={0.70} />
          </mesh>

          {flagTexture && (
            <mesh ref={flagRef} position={[FLAG_W / 2, 0, POLE_HEIGHT - FLAG_H / 2]} rotation={[Math.PI / 2, 0, 0]}>
              <planeGeometry args={[FLAG_W, FLAG_H, 16, 8]} />
              <meshBasicMaterial
                map={flagTexture}
                side={THREE.DoubleSide}
                transparent
                opacity={0.95}
              />
            </mesh>
          )}
        </>
      )}

      {/* Glow halo */}
      <mesh ref={glowRef} position={[0, 0, POLE_HEIGHT]}>
        <sphereGeometry args={[BEACON_R * 2.5, 16, 16]} />
        <meshBasicMaterial color={VIOLET} transparent opacity={isActive ? 0.22 : 0} />
      </mesh>

      {/* Beacon */}
      <mesh ref={beaconRef} position={[0, 0, POLE_HEIGHT]}>
        <sphereGeometry args={[BEACON_R, 16, 16]} />
        <meshBasicMaterial color={VIOLET} transparent opacity={isActive ? 1 : 0} />
      </mesh>

      {/* Label (active only) */}
      {isActive && (
        <Text
          position={[0, 0, POLE_HEIGHT + 0.09]}
          fontSize={MARKER_LABEL_SIZE}
          color="#f1f5f9"
          anchorX="center"
          anchorY="bottom"
          outlineWidth={0.003}
          outlineColor="#000"
        >
          {label}
        </Text>
      )}
    </group>
  );
}
