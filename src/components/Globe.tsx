import { forwardRef } from 'react'
import { TextureLoader } from 'three'
import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import earthTexture from '../assets/globe/8k_earth_daymap.jpg'
import {
  GLOBE_RADIUS,
  GLOBE_SEGMENTS,
  GLOBE_ATMOSPHERE_COLOR,
  GLOBE_ATMOSPHERE_OPACITY,
  GLOBE_ATMOSPHERE_SCALE
} from '../config/constants'

const Globe = forwardRef<THREE.Group>((_props, ref) => {
  const colorMap = useLoader(TextureLoader, earthTexture)

  return (
    <group ref={ref}>
      {/* Main Earth globe */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS, GLOBE_SEGMENTS, GLOBE_SEGMENTS]} />
        <meshStandardMaterial map={colorMap} />
      </mesh>

      {/* Blue outer atmosphere */}
      <mesh scale={[GLOBE_ATMOSPHERE_SCALE, GLOBE_ATMOSPHERE_SCALE, GLOBE_ATMOSPHERE_SCALE]}>
        <sphereGeometry args={[GLOBE_RADIUS, GLOBE_SEGMENTS, GLOBE_SEGMENTS]} />
        <meshBasicMaterial
          color={GLOBE_ATMOSPHERE_COLOR}
          transparent
          opacity={GLOBE_ATMOSPHERE_OPACITY}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
});

Globe.displayName = 'Globe';

export default Globe;
