import * as THREE from 'three';

// Must match the radius in Globe.tsx sphereGeometry
export const GLOBE_RADIUS = 4.7;

/**
 * Converts latitude/longitude to 3D Cartesian coordinates on sphere surface
 * @param lat Latitude in degrees (-90 to 90)
 * @param lon Longitude in degrees (-180 to 180)
 * @param radius Sphere radius (default 3.7, matching Globe.tsx)
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

/**
 * Calculates the normal vector (outward direction) at a point on the sphere
 * Useful for orienting objects to face outward from the globe
 * @param position Position vector on the sphere
 * @returns Normalized vector pointing outward from sphere center
 */
export function getNormalAtPoint(position: THREE.Vector3): THREE.Vector3 {
  return position.clone().normalize();
}

/**
 * Gets the "up" direction for positioning objects on sphere surface
 * This ensures flags/markers point outward from the globe
 * @param position Position vector on the sphere
 * @returns Normalized vector pointing outward (same as normal)
 */
export function getUpVectorAtPoint(position: THREE.Vector3): THREE.Vector3 {
  return getNormalAtPoint(position);
}
