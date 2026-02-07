# Prompt per Ricreare "My World" in React

## Descrizione dell'Applicazione

Crea un'applicazione web 3D interattiva chiamata "My World" usando **React 18+** e **TypeScript**. L'applicazione è un portfolio/CV interattivo innovativo dove l'utente pilota un aereo 3D in uno spazio tridimensionale, volando attorno a un globo terrestre per scoprire milestone della carriera, competenze, progetti ed esperienze educative.

---

## Concept e Esperienza Utente

### Flusso dell'Applicazione

1. **Avvio immediato**: All'apertura, l'utente vede immediatamente una scena 3D con:
   - Un globo terrestre blu che ruota liberamente
   - Un aereo 3D rosso/arancione controllabile
   - Un HUD (Head-Up Display) con telemetria di volo
   - Pannello aiuto controlli

2. **Interazione**: L'utente controlla l'aereo con la tastiera:
   - **W/↑**: Accelera in avanti
   - **S/↓**: Decelera/accelera indietro
   - **A/←**: Imbardata sinistra (yaw)
   - **D/→**: Imbardata destra (yaw)
   - **Q**: Rollio sinistra (bank left)
   - **E**: Rollio destra (bank right)
   - **Shift**: Boost velocità (max speed × 1.875)
   - **Space**: Freno rapido (speed × 0.95)

3. **Esplorazione**: Volando attorno al globo, l'utente scopre 8 località geografiche che rappresentano:
   - Esperienze lavorative (San Francisco, Berlin, London)
   - Competenze tecniche (Paris, Tokyo, New York)
   - Progetti significativi (Chicago)
   - Educazione (Toronto)

4. **Feedback visivo**:
   - HUD mostra velocità, altitudine, direzione (heading 0-360°)
   - Indicatore località più vicina
   - Ciclo giorno/notte animato

---

## Stack Tecnologico React

### Core Framework

```json
{
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "typescript": "^5.9.0",

    "three": "^0.182.0",
    "@react-three/fiber": "^8.18.0",
    "@react-three/drei": "^9.114.0",

    "zustand": "^4.5.0",
    "gsap": "^3.12.0",
    "howler": "^2.2.4",

    "@types/three": "^0.182.0",
    "@types/howler": "^2.2.11"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.0",
    "vite": "^7.2.4",
    "@types/node": "^24.10.1"
  }
}
```

### Librerie 3D: React Three Fiber

- **@react-three/fiber**: Renderer React per Three.js (equivalente a @tresjs/core)
- **@react-three/drei**: Helpers e componenti 3D pronti (equivalente a @tresjs/cientos)
- **three**: Motore 3D core

### State Management: Zustand

Usa **Zustand** invece di Pinia (più leggero e ideale per React):

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
```

---

## Architettura dei File

```text
src/
├── App.tsx                          # Componente root con Canvas 3D
├── main.tsx                         # Entry point
├── index.css                        # Stili globali
│
├── components/
│   ├── scene/
│   │   ├── Globe.tsx               # Globo terrestre
│   │   ├── Plane.tsx               # Aereo 3D
│   │   └── Scene.tsx               # Wrapper scena con luci
│   ├── ui/
│   │   ├── HUD.tsx                 # Heads-Up Display
│   │   └── ControlsHelp.tsx       # Pannello aiuto
│
├── stores/
│   ├── useGameStore.ts             # Stato gioco (aereo, località)
│   ├── useUIStore.ts               # Stato UI (modals, HUD)
│   └── useSettingsStore.ts         # Impostazioni (persistente)
│
├── hooks/
│   ├── useFlightPhysics.ts         # Fisica volo + controlli
│   └── useAnimationLoop.ts         # Loop animazione
│
├── utils/
│   ├── coordinates.ts              # Conversioni lat/lng → Vector3
│   ├── easing.ts                   # Funzioni interpolazione
│   └── deviceDetect.ts             # Rilevamento dispositivo
│
├── data/
│   ├── locations.ts                # 8 località portfolio
│   └── tutorialSteps.ts            # Passi tutorial
│
└── types/
    ├── location.ts                 # Interfacce località
    ├── plane.ts                    # Stato aereo
    └── controls.ts                 # Input controlli
```

---

## Implementazione Dettagliata

### 1. Setup Vite + React

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three'],
          'r3f': ['@react-three/fiber', '@react-three/drei'],
          'vendor': ['react', 'react-dom', 'zustand', 'gsap']
        }
      }
    }
  }
})
```

### 2. Componente Root (App.tsx)

```typescript
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { useRef, useEffect } from 'react'
import { Vector3, Euler } from 'three'
import Scene from './components/scene/Scene'
import Globe from './components/scene/Globe'
import Plane from './components/scene/Plane'
import HUD from './components/ui/HUD'
import ControlsHelp from './components/ui/ControlsHelp'
import { useGameStore } from './stores/useGameStore'
import { useFlightPhysics } from './hooks/useFlightPhysics'
import { locations } from './data/locations'
import { latLongToVector3 } from './utils/coordinates'

const GLOBE_RADIUS = 10

export default function App() {
  const { planeState, updatePlaneState, updateDayNightCycle, setNearestLocation } = useGameStore()
  const { updateControls } = useFlightPhysics()
  const lastTimeRef = useRef(performance.now())
  const animationFrameRef = useRef<number>()
  const cameraRef = useRef<any>()

  // Calculate 3D positions for locations
  useEffect(() => {
    locations.forEach(location => {
      location.position3D = latLongToVector3(
        location.coordinates.lat,
        location.coordinates.lng,
        GLOBE_RADIUS + 0.1
      )
    })
  }, [])

  // Animation loop
  useEffect(() => {
    const animate = () => {
      const currentTime = performance.now()
      const deltaTime = Math.min((currentTime - lastTimeRef.current) / 1000, 0.1)
      lastTimeRef.current = currentTime

      // Update controls and physics
      const controls = updateControls()
      const newState = updatePlanePhysics(planeState, controls, deltaTime)
      updatePlaneState(newState)

      // Update day/night cycle
      updateDayNightCycle(deltaTime * 0.01)

      // Update camera to follow plane
      if (cameraRef.current) {
        const offset = new Vector3(
          planeState.position.x * 1.2,
          planeState.position.y + 5,
          planeState.position.z * 1.2 + 10
        )
        cameraRef.current.position.copy(offset)
        cameraRef.current.lookAt(planeState.position)
      }

      // Find nearest location
      let nearest = null
      let minDistance = Infinity
      locations.forEach(loc => {
        if (loc.position3D) {
          const dist = planeState.position.distanceTo(loc.position3D)
          if (dist < minDistance) {
            minDistance = dist
            nearest = loc
          }
        }
      })
      setNearestLocation(nearest)

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <div id="app" style={{ width: '100vw', height: '100vh' }}>
      {/* 3D Canvas */}
      <Canvas
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance'
        }}
      >
        <PerspectiveCamera
          ref={cameraRef}
          makeDefault
          fov={75}
          near={0.1}
          far={1000}
          position={[0, 5, 20]}
        />

        <Scene />
        <Globe radius={GLOBE_RADIUS} />
        <Plane
          position={planeState.position}
          rotation={planeState.rotation}
        />
      </Canvas>

      {/* UI Overlay */}
      <HUD />
      <ControlsHelp />
    </div>
  )
}
```

### 3. Globo 3D (components/scene/Globe.tsx)

```typescript
import { useRef } from 'react'
import { Mesh } from 'three'

interface GlobeProps {
  radius?: number
  segments?: number
}

export default function Globe({ radius = 10, segments = 32 }: GlobeProps) {
  const meshRef = useRef<Mesh>(null)

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[radius, segments, segments]} />
      <meshBasicMaterial color="#2266AA" />
    </mesh>
  )
}
```

**NOTA CRITICA**: Usa `meshBasicMaterial` con 32 segmenti per performance ottimali (caricamento < 2 secondi). Se serve illuminazione, usa `meshLambertMaterial` (caricamento ~5-10s).

### 4. Aereo 3D (components/scene/Plane.tsx)

```typescript
import { useRef } from 'react'
import { Group, Vector3, Euler } from 'three'

interface PlaneProps {
  position: Vector3
  rotation: Euler
  scale?: number
}

export default function Plane({ position, rotation, scale = 0.05 }: PlaneProps) {
  const groupRef = useRef<Group>(null)

  return (
    <group
      ref={groupRef}
      position={[position.x, position.y, position.z]}
      rotation={[rotation.x, rotation.y, rotation.z]}
      scale={scale}
    >
      {/* Fusoliera */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 0.5, 1]} />
        <meshBasicMaterial color="#FF6B6B" />
      </mesh>

      {/* Ala sinistra */}
      <mesh position={[-1.5, 0, 0]}>
        <boxGeometry args={[2, 0.1, 0.8]} />
        <meshBasicMaterial color="#FF6B6B" />
      </mesh>

      {/* Ala destra */}
      <mesh position={[1.5, 0, 0]}>
        <boxGeometry args={[2, 0.1, 0.8]} />
        <meshBasicMaterial color="#FF6B6B" />
      </mesh>

      {/* Coda */}
      <mesh position={[0, 0.3, -0.8]}>
        <boxGeometry args={[0.1, 0.6, 0.4]} />
        <meshBasicMaterial color="#FF6B6B" />
      </mesh>
    </group>
  )
}
```

### 5. Scena con Luci (components/scene/Scene.tsx)

```typescript
export default function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
    </>
  )
}
```

### 6. Store Zustand - Game State (stores/useGameStore.ts)

```typescript
import { create } from 'zustand'
import { Vector3, Euler } from 'three'
import { Location } from '../types/location'

interface PlaneState {
  position: Vector3
  velocity: Vector3
  rotation: Euler
  speed: number
  altitude: number
  heading: number
  pitch: number
  roll: number
  isLanded: boolean
}

interface GameState {
  planeState: PlaneState
  currentLocation: Location | null
  nearestLocation: Location | null
  visitedLocations: string[]
  isFlying: boolean
  dayNightTime: number
  weatherCondition: 'clear' | 'cloudy' | 'rain'

  updatePlaneState: (newState: Partial<PlaneState>) => void
  landAtLocation: (location: Location) => void
  takeOff: () => void
  updateDayNightCycle: (delta: number) => void
  setNearestLocation: (location: Location | null) => void
  setWeather: (condition: 'clear' | 'cloudy' | 'rain') => void
}

export const useGameStore = create<GameState>((set, get) => ({
  planeState: {
    position: new Vector3(0, 11, 0),
    velocity: new Vector3(0, 0, 0),
    rotation: new Euler(0, 0, 0, 'YXZ'),
    speed: 0,
    altitude: 11,
    heading: 0,
    pitch: 0,
    roll: 0,
    isLanded: false
  },
  currentLocation: null,
  nearestLocation: null,
  visitedLocations: [],
  isFlying: false,
  dayNightTime: 0.5,
  weatherCondition: 'clear',

  updatePlaneState: (newState) => set((state) => ({
    planeState: { ...state.planeState, ...newState },
    isFlying: newState.speed ? newState.speed > 0.001 : state.isFlying
  })),

  landAtLocation: (location) => set((state) => ({
    currentLocation: location,
    visitedLocations: [...state.visitedLocations, location.id],
    planeState: { ...state.planeState, isLanded: true }
  })),

  takeOff: () => set((state) => ({
    currentLocation: null,
    planeState: { ...state.planeState, isLanded: false }
  })),

  updateDayNightCycle: (delta) => set((state) => ({
    dayNightTime: (state.dayNightTime + delta) % 1
  })),

  setNearestLocation: (location) => set({ nearestLocation: location }),

  setWeather: (condition) => set({ weatherCondition: condition })
}))
```

### 7. Store Zustand - UI State (stores/useUIStore.ts)

```typescript
import { create } from 'zustand'

interface UIState {
  showHUD: boolean
  showTutorial: boolean
  tutorialStep: number
  showLocationModal: boolean
  showNavigationMenu: boolean
  showMiniMap: boolean
  showAudioControls: boolean
  isLoading: boolean
  loadingProgress: number

  toggleHUD: () => void
  startTutorial: () => void
  nextTutorialStep: () => void
  closeTutorial: () => void
  openLocationModal: () => void
  closeLocationModal: () => void
  toggleNavigationMenu: () => void
  toggleMiniMap: () => void
  toggleAudioControls: () => void
  setLoading: (isLoading: boolean) => void
  setLoadingProgress: (progress: number) => void
}

export const useUIStore = create<UIState>((set) => ({
  showHUD: true,
  showTutorial: false,
  tutorialStep: 0,
  showLocationModal: false,
  showNavigationMenu: false,
  showMiniMap: false,
  showAudioControls: false,
  isLoading: false,
  loadingProgress: 0,

  toggleHUD: () => set((state) => ({ showHUD: !state.showHUD })),
  startTutorial: () => set({ showTutorial: true, tutorialStep: 0 }),
  nextTutorialStep: () => set((state) => ({ tutorialStep: state.tutorialStep + 1 })),
  closeTutorial: () => set({ showTutorial: false }),
  openLocationModal: () => set({ showLocationModal: true }),
  closeLocationModal: () => set({ showLocationModal: false }),
  toggleNavigationMenu: () => set((state) => ({ showNavigationMenu: !state.showNavigationMenu })),
  toggleMiniMap: () => set((state) => ({ showMiniMap: !state.showMiniMap })),
  toggleAudioControls: () => set((state) => ({ showAudioControls: !state.showAudioControls })),
  setLoading: (isLoading) => set({ isLoading }),
  setLoadingProgress: (progress) => set({ loadingProgress: progress })
}))
```

### 8. Store Zustand - Settings (stores/useSettingsStore.ts)

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SettingsState {
  audio: {
    masterVolume: number
    musicVolume: number
    sfxVolume: number
    musicEnabled: boolean
    sfxEnabled: boolean
  }
  graphics: {
    quality: 'auto' | 'low' | 'medium' | 'high'
    shadowsEnabled: boolean
    postProcessingEnabled: boolean
    antialiasingEnabled: boolean
    lodDistance: number
  }
  controls: {
    sensitivity: number
    invertY: boolean
    useGyroscope: boolean
  }

  setMasterVolume: (volume: number) => void
  setMusicVolume: (volume: number) => void
  setSfxVolume: (volume: number) => void
  toggleMusic: () => void
  toggleSfx: () => void
  setQuality: (quality: 'auto' | 'low' | 'medium' | 'high') => void
  toggleShadows: () => void
  togglePostProcessing: () => void
  setSensitivity: (sensitivity: number) => void
  toggleInvertY: () => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      audio: {
        masterVolume: 0.7,
        musicVolume: 0.5,
        sfxVolume: 0.8,
        musicEnabled: true,
        sfxEnabled: true
      },
      graphics: {
        quality: 'auto',
        shadowsEnabled: true,
        postProcessingEnabled: true,
        antialiasingEnabled: true,
        lodDistance: 100
      },
      controls: {
        sensitivity: 1.0,
        invertY: false,
        useGyroscope: false
      },

      setMasterVolume: (volume) => set((state) => ({
        audio: { ...state.audio, masterVolume: volume }
      })),
      setMusicVolume: (volume) => set((state) => ({
        audio: { ...state.audio, musicVolume: volume }
      })),
      setSfxVolume: (volume) => set((state) => ({
        audio: { ...state.audio, sfxVolume: volume }
      })),
      toggleMusic: () => set((state) => ({
        audio: { ...state.audio, musicEnabled: !state.audio.musicEnabled }
      })),
      toggleSfx: () => set((state) => ({
        audio: { ...state.audio, sfxEnabled: !state.audio.sfxEnabled }
      })),
      setQuality: (quality) => set((state) => ({
        graphics: { ...state.graphics, quality }
      })),
      toggleShadows: () => set((state) => ({
        graphics: { ...state.graphics, shadowsEnabled: !state.graphics.shadowsEnabled }
      })),
      togglePostProcessing: () => set((state) => ({
        graphics: { ...state.graphics, postProcessingEnabled: !state.graphics.postProcessingEnabled }
      })),
      setSensitivity: (sensitivity) => set((state) => ({
        controls: { ...state.controls, sensitivity }
      })),
      toggleInvertY: () => set((state) => ({
        controls: { ...state.controls, invertY: !state.controls.invertY }
      }))
    }),
    {
      name: 'my-world-settings'
    }
  )
)
```

### 9. Hook Fisica Volo (hooks/useFlightPhysics.ts)

```typescript
import { useEffect, useRef } from 'react'
import { Vector3, Euler } from 'three'
import { useGameStore } from '../stores/useGameStore'
import { useSettingsStore } from '../stores/useSettingsStore'

const ACCELERATION = 0.001
const DRAG = 0.98
const MAX_SPEED = 0.08
const MAX_SPEED_BOOST = 0.15
const ROTATION_SPEED = 0.02
const ROLL_SPEED = 0.03
const MAX_PITCH = Math.PI / 4 // 45 degrees
const MAX_ROLL = Math.PI / 6  // 30 degrees

interface Controls {
  forward: boolean
  backward: boolean
  left: boolean
  right: boolean
  rollLeft: boolean
  rollRight: boolean
  boost: boolean
  brake: boolean
}

export function useFlightPhysics() {
  const controlsRef = useRef<Controls>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    rollLeft: false,
    rollRight: false,
    boost: false,
    brake: false
  })

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      switch (key) {
        case 'w':
        case 'arrowup':
          controlsRef.current.forward = true
          break
        case 's':
        case 'arrowdown':
          controlsRef.current.backward = true
          break
        case 'a':
        case 'arrowleft':
          controlsRef.current.left = true
          break
        case 'd':
        case 'arrowright':
          controlsRef.current.right = true
          break
        case 'q':
          controlsRef.current.rollLeft = true
          break
        case 'e':
          controlsRef.current.rollRight = true
          break
        case 'shift':
          controlsRef.current.boost = true
          break
        case ' ':
          controlsRef.current.brake = true
          e.preventDefault()
          break
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      switch (key) {
        case 'w':
        case 'arrowup':
          controlsRef.current.forward = false
          break
        case 's':
        case 'arrowdown':
          controlsRef.current.backward = false
          break
        case 'a':
        case 'arrowleft':
          controlsRef.current.left = false
          break
        case 'd':
        case 'arrowright':
          controlsRef.current.right = false
          break
        case 'q':
          controlsRef.current.rollLeft = false
          break
        case 'e':
          controlsRef.current.rollRight = false
          break
        case 'shift':
          controlsRef.current.boost = false
          break
        case ' ':
          controlsRef.current.brake = false
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  const updateControls = () => {
    return controlsRef.current
  }

  return { updateControls }
}

export function updatePlanePhysics(
  planeState: any,
  controls: Controls,
  deltaTime: number
) {
  const sensitivity = useSettingsStore.getState().controls.sensitivity
  const newState = { ...planeState }
  const maxSpeed = controls.boost ? MAX_SPEED_BOOST : MAX_SPEED

  // Calculate thrust
  let thrust = 0
  if (controls.forward) thrust += ACCELERATION
  if (controls.backward) thrust -= ACCELERATION

  // Update velocity
  const forward = new Vector3(0, 0, -1)
  forward.applyEuler(newState.rotation)
  forward.multiplyScalar(thrust * deltaTime * 60)

  newState.velocity.add(forward)
  newState.velocity.multiplyScalar(DRAG)

  // Brake
  if (controls.brake) {
    newState.velocity.multiplyScalar(0.95)
  }

  // Calculate speed
  newState.speed = newState.velocity.length()
  if (newState.speed > maxSpeed) {
    newState.velocity.normalize().multiplyScalar(maxSpeed)
    newState.speed = maxSpeed
  }

  // Update rotation (yaw, pitch, roll)
  const rotationSpeed = ROTATION_SPEED * sensitivity * (newState.speed / MAX_SPEED)

  if (controls.left) newState.rotation.y += rotationSpeed
  if (controls.right) newState.rotation.y -= rotationSpeed

  // Roll
  if (controls.rollLeft) {
    newState.roll = Math.max(newState.roll - ROLL_SPEED, -MAX_ROLL)
  } else if (controls.rollRight) {
    newState.roll = Math.min(newState.roll + ROLL_SPEED, MAX_ROLL)
  } else {
    // Return to level
    newState.roll *= 0.95
  }
  newState.rotation.z = newState.roll

  // Update position
  newState.position.add(newState.velocity)

  // Maintain orbit around globe (keep altitude)
  const GLOBE_RADIUS = 10
  const currentDistance = newState.position.length()
  const targetDistance = GLOBE_RADIUS + 1 + (newState.speed * 5)

  if (currentDistance !== targetDistance) {
    newState.position.normalize().multiplyScalar(targetDistance)
  }

  // Calculate altitude and heading
  newState.altitude = newState.position.length() - GLOBE_RADIUS
  newState.heading = ((Math.atan2(newState.position.x, newState.position.z) * 180 / Math.PI) + 360) % 360

  return newState
}
```

### 10. Dati Località (data/locations.ts)

```typescript
import { Vector3 } from 'three'

export interface Location {
  id: string
  type: 'work' | 'skill' | 'education' | 'project'
  title: string
  company?: string
  description: string
  technologies: string[]
  period: string
  coordinates: {
    lat: number
    lng: number
  }
  position3D?: Vector3
  icon: string
  color: string
  images?: string[]
  links?: {
    github?: string
    website?: string
    demo?: string
  }
}

export const locations: Location[] = [
  {
    id: 'sf-senior-fe',
    type: 'work',
    title: 'Senior Frontend Developer',
    company: 'Tech Corp',
    description: 'Led development of enterprise-scale web applications using React and TypeScript',
    technologies: ['React', 'TypeScript', 'Redux', 'GraphQL', 'Jest'],
    period: '2022 - Present',
    coordinates: { lat: 37.7749, lng: -122.4194 },
    icon: '💼',
    color: '#4A90E2'
  },
  {
    id: 'paris-3d-webgl',
    type: 'skill',
    title: '3D Graphics & WebGL',
    description: 'Expert in creating immersive 3D web experiences with Three.js and WebGL',
    technologies: ['Three.js', 'WebGL', 'GLSL', 'React Three Fiber'],
    period: 'Mastered 2020-2023',
    coordinates: { lat: 48.8566, lng: 2.3522 },
    icon: '🎨',
    color: '#E91E63'
  },
  {
    id: 'berlin-fullstack',
    type: 'work',
    title: 'Full-Stack Developer',
    company: 'StartupHub GmbH',
    description: 'Built scalable microservices and modern web applications',
    technologies: ['Node.js', 'React', 'MongoDB', 'Docker', 'AWS'],
    period: '2020 - 2022',
    coordinates: { lat: 52.5200, lng: 13.4050 },
    icon: '🚀',
    color: '#FF9800'
  },
  {
    id: 'tokyo-ui-ux',
    type: 'skill',
    title: 'UI/UX Design & Animation',
    description: 'Creating beautiful, accessible interfaces with smooth animations',
    technologies: ['Figma', 'GSAP', 'CSS Animations', 'Design Systems'],
    period: 'Mastered 2019-2023',
    coordinates: { lat: 35.6762, lng: 139.6503 },
    icon: '✨',
    color: '#9C27B0'
  },
  {
    id: 'london-frontend',
    type: 'work',
    title: 'Frontend Engineer',
    company: 'Digital Agency Ltd',
    description: 'Developed responsive web applications for international clients',
    technologies: ['Vue.js', 'TypeScript', 'SCSS', 'Webpack'],
    period: '2018 - 2020',
    coordinates: { lat: 51.5074, lng: -0.1278 },
    icon: '💻',
    color: '#00BCD4'
  },
  {
    id: 'nyc-cloud-devops',
    type: 'skill',
    title: 'Cloud Architecture & DevOps',
    description: 'Expertise in cloud infrastructure, CI/CD, and containerization',
    technologies: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions'],
    period: 'Mastered 2021-2023',
    coordinates: { lat: 40.7128, lng: -74.0060 },
    icon: '☁️',
    color: '#607D8B'
  },
  {
    id: 'chicago-dataviz',
    type: 'project',
    title: 'Interactive Data Visualization Platform',
    description: 'Real-time analytics dashboard with 3D visualizations',
    technologies: ['D3.js', 'Three.js', 'React', 'WebSockets', 'PostgreSQL'],
    period: '2023',
    coordinates: { lat: 41.8781, lng: -87.6298 },
    icon: '📊',
    color: '#4CAF50',
    links: {
      github: 'https://github.com/user/dataviz-platform',
      demo: 'https://demo.dataviz.com'
    }
  },
  {
    id: 'toronto-education',
    type: 'education',
    title: 'Computer Science Degree',
    company: 'University of Toronto',
    description: 'Bachelor of Science in Computer Science with honors',
    technologies: ['Algorithms', 'Data Structures', 'Computer Graphics', 'AI/ML'],
    period: '2014 - 2018',
    coordinates: { lat: 43.6532, lng: -79.3832 },
    icon: '🎓',
    color: '#795548'
  }
]
```

### 11. Utility Coordinate (utils/coordinates.ts)

```typescript
import { Vector3 } from 'three'

/**
 * Converte coordinate geografiche (latitudine, longitudine) in Vector3 3D
 * su una sfera di raggio specificato
 */
export function latLongToVector3(lat: number, lng: number, radius: number): Vector3 {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)

  const x = -radius * Math.sin(phi) * Math.cos(theta)
  const y = radius * Math.cos(phi)
  const z = radius * Math.sin(phi) * Math.sin(theta)

  return new Vector3(x, y, z)
}

/**
 * Converte Vector3 3D in coordinate geografiche
 */
export function vector3ToLatLong(vector: Vector3, radius: number): { lat: number; lng: number } {
  const normalized = vector.clone().normalize()
  const lat = 90 - (Math.acos(normalized.y) * 180 / Math.PI)
  const lng = ((Math.atan2(normalized.z, -normalized.x) * 180 / Math.PI) - 180)

  return { lat, lng }
}

/**
 * Calcola distanza euclidea tra due punti 3D
 */
export function getDistanceBetweenPoints(v1: Vector3, v2: Vector3): number {
  return v1.distanceTo(v2)
}

/**
 * Normalizza angolo a range [-180, 180]
 */
export function normalizeAngle(angle: number): number {
  while (angle > 180) angle -= 360
  while (angle < -180) angle += 360
  return angle
}
```

### 12. Componente HUD (components/ui/HUD.tsx)

```typescript
import { useGameStore } from '../../stores/useGameStore'
import { useUIStore } from '../../stores/useUIStore'
import './HUD.css'

export default function HUD() {
  const { planeState, nearestLocation } = useGameStore()
  const { showHUD } = useUIStore()

  if (!showHUD) return null

  return (
    <div className="hud">
      <div className="hud-item">
        <span className="hud-label">Speed:</span>
        <span className="hud-value">{(planeState.speed * 1000).toFixed(1)} km/h</span>
      </div>

      <div className="hud-item">
        <span className="hud-label">Altitude:</span>
        <span className="hud-value">{planeState.altitude.toFixed(1)} km</span>
      </div>

      <div className="hud-item">
        <span className="hud-label">Heading:</span>
        <span className="hud-value">{Math.round(planeState.heading)}°</span>
      </div>

      {nearestLocation && (
        <div className="hud-item nearest-location">
          <span className="hud-label">Nearest:</span>
          <span className="hud-value" style={{ color: nearestLocation.color }}>
            {nearestLocation.icon} {nearestLocation.title}
          </span>
        </div>
      )}
    </div>
  )
}
```

### 13. Stili HUD (components/ui/HUD.css)

```css
.hud {
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: 8px;
  color: white;
  font-family: 'Courier New', monospace;
  min-width: 250px;
  z-index: 100;
}

.hud-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 14px;
}

.hud-item:last-child {
  margin-bottom: 0;
}

.hud-label {
  color: #888;
  margin-right: 15px;
}

.hud-value {
  color: #0ff;
  font-weight: bold;
}

.nearest-location .hud-value {
  display: flex;
  align-items: center;
  gap: 8px;
}
```

### 14. Pannello Controlli (components/ui/ControlsHelp.tsx)

```typescript
import './ControlsHelp.css'

export default function ControlsHelp() {
  return (
    <div className="controls-help">
      <h3>Flight Controls</h3>
      <div className="controls-grid">
        <div className="control-item">
          <kbd>W</kbd> <span>Accelerate</span>
        </div>
        <div className="control-item">
          <kbd>S</kbd> <span>Decelerate</span>
        </div>
        <div className="control-item">
          <kbd>A</kbd> <span>Yaw Left</span>
        </div>
        <div className="control-item">
          <kbd>D</kbd> <span>Yaw Right</span>
        </div>
        <div className="control-item">
          <kbd>Q</kbd> <span>Roll Left</span>
        </div>
        <div className="control-item">
          <kbd>E</kbd> <span>Roll Right</span>
        </div>
        <div className="control-item">
          <kbd>Shift</kbd> <span>Boost</span>
        </div>
        <div className="control-item">
          <kbd>Space</kbd> <span>Brake</span>
        </div>
      </div>
    </div>
  )
}
```

### 15. Stili Controlli (components/ui/ControlsHelp.css)

```css
.controls-help {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: 8px;
  color: white;
  max-width: 300px;
  z-index: 100;
}

.controls-help h3 {
  margin: 0 0 15px 0;
  font-size: 16px;
  color: #0ff;
}

.controls-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.control-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
}

.control-item kbd {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  padding: 4px 8px;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  min-width: 40px;
  text-align: center;
}

.control-item span {
  color: #ccc;
}
```

### 16. Stili Globali (index.css)

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #root {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #000;
  color: #fff;
}

#app {
  position: relative;
  width: 100vw;
  height: 100vh;
}

canvas {
  display: block;
  width: 100%;
  height: 100%;
}
```

---

## Types (types/)

### types/location.ts

```typescript
import { Vector3 } from 'three'

export interface Location {
  id: string
  type: 'work' | 'skill' | 'education' | 'project'
  title: string
  company?: string
  description: string
  technologies: string[]
  period: string
  coordinates: {
    lat: number
    lng: number
  }
  position3D?: Vector3
  icon: string
  color: string
  images?: string[]
  links?: {
    github?: string
    website?: string
    demo?: string
  }
}
```

### types/plane.ts

```typescript
import { Vector3, Euler } from 'three'

export interface PlaneState {
  position: Vector3
  velocity: Vector3
  rotation: Euler
  speed: number
  altitude: number
  heading: number
  pitch: number
  roll: number
  isLanded: boolean
}
```

### types/controls.ts

```typescript
export interface Controls {
  forward: boolean
  backward: boolean
  left: boolean
  right: boolean
  rollLeft: boolean
  rollRight: boolean
  boost: boolean
  brake: boolean
}
```

---

## Ottimizzazioni Chiave

### 1. Performance

- **MeshBasicMaterial**: Usa materiali semplici per caricamento rapido (< 2s)
- **32 segmenti**: Globe con 32×32 segmenti invece di 128×128 (16,384 → 1,024 facce)
- **Code splitting**: Separa Three.js, R3F, e vendor in chunks
- **powerPreference**: Forza GPU dedicata se disponibile

### 2. Build Configuration

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    target: 'esnext',
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three'],
          'r3f': ['@react-three/fiber', '@react-three/drei'],
          'vendor': ['react', 'react-dom', 'zustand']
        }
      }
    }
  }
})
```

### 3. State Management

- **Zustand** con middleware `persist` per settings
- Separazione chiara: gameState, uiState, settingsState
- Computed values come getters

---

## Features da Implementare (Opzionali)

1. **Sistema Audio**: Usare Howler.js per musica e SFX
2. **Post-processing**: `@react-three/postprocessing` per bloom, vignette
3. **Modelli 3D**: Caricare .glb/.gltf con `useGLTF` di drei
4. **Texture**: Aggiungere earth day/night map con `<meshStandardMaterial map={texture} />`
5. **Mini-mappa**: Canvas 2D con indicatori località
6. **Modal località**: Overlay con dettagli quando si avvicina a location
7. **Tutorial**: Step-by-step overlay per nuovi utenti
8. **Responsive**: Touch controls per mobile
9. **Analytics**: Tracciamento località visitate

---

## Testing

```bash
# Installa Vitest per testing
npm install -D vitest @testing-library/react @testing-library/jest-dom

# Test esempio
import { describe, it, expect } from 'vitest'
import { latLongToVector3 } from './utils/coordinates'

describe('Coordinates', () => {
  it('converts lat/long to Vector3', () => {
    const result = latLongToVector3(0, 0, 10)
    expect(result.y).toBeCloseTo(0)
    expect(result.length()).toBeCloseTo(10)
  })
})
```

---

## Deployment

```bash
# Build per produzione
npm run build

# Deploy su Vercel
npx vercel

# Deploy su Netlify
npm install -g netlify-cli
netlify deploy --prod
```

---

## Note Finali

### Differenze Chiave Vue → React

| Vue 3 | React Equivalent |
|-------|------------------|
| `@tresjs/core` | `@react-three/fiber` |
| `@tresjs/cientos` | `@react-three/drei` |
| Pinia | Zustand |
| Composition API | Hooks (useState, useEffect, useRef) |
| `<script setup>` | Function components |
| `computed()` | `useMemo()` |
| `watch()` | `useEffect()` |
| `ref()` | `useRef()` / `useState()` |

### Performance Targets

- **First load**: < 3 secondi
- **Time to Interactive**: < 5 secondi
- **FPS**: 60fps costanti
- **Bundle size**: < 500KB (gzipped)

### Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile: iOS 14+, Android Chrome 90+

### WebGL Requirements

- WebGL 2.0 support
- Min 2GB RAM
- Hardware acceleration enabled

---

## Conclusione

Questa applicazione è un portfolio interattivo 3D che dimostra competenze in:

- React + TypeScript moderno
- Grafica 3D con Three.js e React Three Fiber
- State management con Zustand
- Fisica e matematica 3D
- Performance optimization
- UI/UX design

Il risultato finale è un'esperienza immersiva dove l'utente pilota un aereo 3D attorno a un globo, scoprendo località che rappresentano milestone della carriera, con controlli responsivi e telemetria in tempo reale.
