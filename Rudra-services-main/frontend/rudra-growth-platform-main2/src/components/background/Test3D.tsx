import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Float } from "@react-three/drei";
import { Suspense } from "react";

// Simple test cube
const TestCube = () => {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
          color="#FF0000" 
          emissive="#FF0000"
          emissiveIntensity={0.5}
        />
      </mesh>
    </Float>
  );
};

const Test3D = () => {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%', zIndex: 0 }}>
      <Canvas
        style={{ width: '100%', height: '100%' }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <TestCube />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Test3D;








