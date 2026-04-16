import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { useProgress } from '@react-three/drei';
import Scene from './components/Scene';
import DotGrid from './components/DotGrid';
import WelcomeCard from './components/WelcomeCard';
import ExperienceCard from './components/ExperienceCard';
import FlightControls from './components/FlightControls';
import LoadingScreen from './components/LoadingScreen';
import AuroraBackground from './components/AuroraBackground';
import './App.css';

function LoadingOverlay() {
  const { active } = useProgress();
  return active ? <LoadingScreen /> : null;
}

export default function App() {
  return (
    <div className="App" style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <AuroraBackground />
      <DotGrid
        dotSize={5}
        gap={15}
        baseColor="#04030c"
        activeColor="#0ea5e9"
        proximity={120}
        shockRadius={250}
        shockStrength={5}
        returnDuration={1.5}
      >
        <Canvas camera={{ position: [0, 0, 9], fov: 75 }}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </DotGrid>

      <LoadingOverlay />
      <WelcomeCard />
      <ExperienceCard />
      <FlightControls />
    </div>
  );
}