import {
  AMBIENT_LIGHT_INTENSITY,
  DIRECTIONAL_LIGHT_INTENSITY,
  DIRECTIONAL_LIGHT_POSITIONS
} from '../config/constants'

export default function Lighting() {
  return (
    <>
      <ambientLight intensity={AMBIENT_LIGHT_INTENSITY} />
      <directionalLight
        position={DIRECTIONAL_LIGHT_POSITIONS[0]}
        intensity={DIRECTIONAL_LIGHT_INTENSITY}
      />
      <directionalLight
        position={DIRECTIONAL_LIGHT_POSITIONS[1]}
        intensity={DIRECTIONAL_LIGHT_INTENSITY}
      />
    </>
  );
}
