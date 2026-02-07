import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react';
import Scene from './components/Scene';
import DotGrid from './components/DotGrid';
import WelcomeCard from './components/WelcomeCard';
import ExperienceCard from './components/ExperienceCard';
import FlightControls from './components/FlightControls';
import './App.css';

export default function App() {
  return (
    <div className="App" style={{ width: '100%', height: '100vh', position: 'relative' }}>
        <DotGrid
          dotSize={5}
          gap={15}
          baseColor="#110d21"
          activeColor="#ff9b29"
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

        <WelcomeCard />
        <ExperienceCard />
        <FlightControls />
      </div>
  );
}
