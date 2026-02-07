import * as THREE from 'three';
import { GLOBE_RADIUS } from '../config/constants';

/**
 * Converts latitude/longitude to 3D Cartesian coordinates on sphere surface
 * @param lat Latitude in degrees (-90 to 90)
 * @param lon Longitude in degrees (-180 to 180)
 * @param radius Sphere radius (default from constants)
 * @returns THREE.Vector3 position on sphere surface
 */
export function latLonToVector3(
  lat: number,
  lon: number,
  radius: number = GLOBE_RADIUS
): THREE.Vector3 {
  // Convert to radians
  // Latitude: 90° (North Pole) → 0 radians, 0° (Equator) → π/2, -90° (South) → π
  const phi = (90 - lat) * (Math.PI / 180);

  // Longitude: -180° (West) → 0, 0° (Prime Meridian) → π, 180° (East) → 2π
  const theta = (lon + 180) * (Math.PI / 180);

  // Spherical to Cartesian conversion
  // Adjusted for Three.js coordinate system (Y-up, Z-forward)
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}
