// Globe configuration
export const GLOBE_RADIUS = 4.7;
export const GLOBE_SEGMENTS = 64;
export const GLOBE_ATMOSPHERE_COLOR = '#4A90E2';
export const GLOBE_ATMOSPHERE_OPACITY = 0.1;
export const GLOBE_ATMOSPHERE_SCALE = 1.01;

// Animation configuration
export const FLIGHT_DURATION = 3; // seconds
export const FLIGHT_HEIGHT_OFFSET = 0.15; // Distance from globe surface
export const FLIGHT_ARC_HEIGHT = 0.8; // Height of flight arc
export const FLIGHT_BANK_ANGLE = Math.PI * 0.1;

// Airplane configuration
export const AIRPLANE_SCALE = 0.5;
export const AIRPLANE_BOBBING_FREQUENCY = 2;
export const AIRPLANE_BOBBING_AMPLITUDE = 0.02;

// Marker configuration
export const MARKER_POLE_HEIGHT = 0.3;
export const MARKER_POLE_RADIUS = 0.005;
export const MARKER_FLAG_WIDTH = 0.12;
export const MARKER_FLAG_HEIGHT = 0.08;
export const MARKER_LABEL_SIZE = 0.04;
export const MARKER_PULSE_FREQUENCY = 4;
export const MARKER_PULSE_AMPLITUDE = 0.1;
export const MARKER_GLOW_SIZE = 0.03;
export const MARKER_GLOW_COLOR = '#ff9b29';

// Camera configuration
export const CAMERA_MIN_DISTANCE = 5.0;
export const CAMERA_MAX_DISTANCE = 50;
export const CAMERA_ZOOM_SPEED = 1.5;
export const CAMERA_ROTATION_SPEED = 0.05;
export const CAMERA_PHI_SPEED = 0.05;
export const CAMERA_PHI_MIN = 0.1;
export const CAMERA_PHI_MAX = Math.PI - 0.1;

// Lighting configuration
export const AMBIENT_LIGHT_INTENSITY = 1.5;
export const DIRECTIONAL_LIGHT_INTENSITY = 0.5;
export const DIRECTIONAL_LIGHT_POSITIONS = [
  [5, 3, 5] as [number, number, number],
  [-5, -3, -5] as [number, number, number]
];

// External API configuration
export const FLAG_CDN_BASE_URL = 'https://flagcdn.com/w160';

// DotGrid configuration
export const DOT_GRID_DEFAULTS = {
  dotSize: 16,
  gap: 32,
  baseColor: '#5227FF',
  activeColor: '#5227FF',
  proximity: 150,
  speedTrigger: 100,
  shockRadius: 250,
  shockStrength: 5,
  maxSpeed: 5000,
  resistance: 750,
  returnDuration: 1.5,
  throttleDelay: 50
};

// UI Text (all English)
export const UI_TEXT = {
  continue: 'Continue',
  restart: 'Restart',
  close: 'Close',
  keyResponsibilities: 'Key Responsibilities',
  present: 'Present'
};
