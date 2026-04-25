import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';
import {
  MARKER_LABEL_SIZE,
  MARKER_PULSE_FREQUENCY,
  MARKER_PULSE_AMPLITUDE,
  MARKER_GLOW_SIZE,
  MARKER_GLOW_COLOR,
} from '../config/constants';

interface LocationMarkerProps {
  position: THREE.Vector3;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const PIN_SIZE = 0.22;

function createPinTexture(active: boolean): THREE.CanvasTexture {
  const w = 128;
  const h = 192;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;

  const cx = w / 2;
  const r = w * 0.40;
  const pinCY = r + 10;
  const tip = h - 8;

  // Drop shadow
  ctx.shadowColor = 'rgba(0,0,0,0.45)';
  ctx.shadowBlur = 14;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 4;

  // Teardrop shape via arc + bezier curves
  ctx.beginPath();
  ctx.moveTo(cx, tip);
  ctx.bezierCurveTo(cx - r * 0.25, tip - h * 0.18, cx - r, pinCY + r * 0.55, cx - r, pinCY);
  ctx.arc(cx, pinCY, r, Math.PI, 0, false);
  ctx.bezierCurveTo(cx + r, pinCY + r * 0.55, cx + r * 0.25, tip - h * 0.18, cx, tip);
  ctx.closePath();

  ctx.fillStyle = active ? '#EA4335' : '#5b8dd9';
  ctx.fill();

  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  // Darker inner ring for depth
  ctx.beginPath();
  ctx.arc(cx, pinCY, r * 0.46, 0, Math.PI * 2);
  ctx.fillStyle = active ? 'rgba(180,30,20,0.6)' : 'rgba(40,70,140,0.5)';
  ctx.fill();

  // White center dot
  ctx.beginPath();
  ctx.arc(cx, pinCY, r * 0.28, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.95)';
  ctx.fill();

  return new THREE.CanvasTexture(canvas);
}

const activePinTexture = createPinTexture(true);
const inactivePinTexture = createPinTexture(false);


export default function LocationMarker({
  position,
  label,
  isActive = false,
  onClick,
}: LocationMarkerProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current && isActive) {
      const pulse = 1 + Math.sin(state.clock.getElapsedTime() * MARKER_PULSE_FREQUENCY) * MARKER_PULSE_AMPLITUDE;
      groupRef.current.scale.setScalar(pulse);
    } else if (groupRef.current) {
      groupRef.current.scale.setScalar(1);
    }
  });

  const normal = position.clone().normalize();
  const forward = new THREE.Vector3(0, 0, 1);
  const quaternion = new THREE.Quaternion().setFromUnitVectors(forward, normal);

  return (
    <group
      ref={groupRef}
      position={position}
      quaternion={quaternion}
      onClick={onClick}
      onPointerOver={() => { if (onClick) document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { document.body.style.cursor = 'auto'; }}
    >
      <sprite position={[0, 0, 0.04]} scale={[PIN_SIZE, PIN_SIZE * 1.5, 1]}>
        <spriteMaterial
          map={isActive ? activePinTexture : inactivePinTexture}
          transparent
          opacity={isActive ? 1 : 0.75}
        />
      </sprite>

      <Text
        position={[0, 0, 0.28]}
        fontSize={MARKER_LABEL_SIZE}
        color="white"
        anchorX="center"
        anchorY="bottom"
        outlineWidth={0.003}
        outlineColor="#000"
      >
        {label}
      </Text>

      {isActive && (
        <mesh position={[0, 0, 0.01]}>
          <sphereGeometry args={[MARKER_GLOW_SIZE, 16, 16]} />
          <meshBasicMaterial color={MARKER_GLOW_COLOR} transparent opacity={0.8} />
        </mesh>
      )}
    </group>
  );
}
