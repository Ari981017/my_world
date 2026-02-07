import { forwardRef } from 'react'
import { TextureLoader } from 'three'
import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import earthTexture from '../assets/globe/8k_earth_daymap.jpg'

const Globe = forwardRef<THREE.Group>((_props, ref) => {
  const colorMap = useLoader(TextureLoader, earthTexture)
  const globeRadius = 4.7;

  return (
    <group ref={ref}>
      {/* Globo terrestre principale */}
      <mesh>
        <sphereGeometry args={[globeRadius, 64, 64]} />
        <meshStandardMaterial map={colorMap} />
      </mesh>

      {/* Alone blu esterno */}
      <mesh scale={[1.01, 1.01, 1.01]}>
        <sphereGeometry args={[globeRadius, 64, 64]} />
        <meshBasicMaterial
          color="#4A90E2"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
});

Globe.displayName = 'Globe';

export default Globe;
