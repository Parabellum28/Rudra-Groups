import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Environment, Float, MeshDistortMaterial } from "@react-three/drei";
import { Suspense, useMemo } from "react";

// 3D Server/Data Center
const Server3D = ({ position, rotation, scale }: { position: [number, number, number]; rotation: [number, number, number]; scale: number }) => {
  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.3}>
      <group position={position} rotation={rotation} scale={scale}>
        {/* Main chassis */}
        <mesh>
          <boxGeometry args={[1.5, 2, 1]} />
          <meshStandardMaterial 
            color="#1a1a1a" 
            metalness={0.9} 
            roughness={0.1}
            emissive="#00FFFF"
            emissiveIntensity={0.1}
          />
        </mesh>
        {/* Server racks */}
        {[...Array(4)].map((_, i) => (
          <mesh key={i} position={[0, -0.75 + i * 0.4, 0.51]}>
            <boxGeometry args={[1.3, 0.2, 0.02]} />
            <meshStandardMaterial 
              color="#00FFFF" 
              emissive="#00FFFF"
              emissiveIntensity={0.3}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        ))}
        {/* Status LEDs */}
        {[...Array(6)].map((_, i) => (
          <mesh key={i} position={[-0.7, -1 + i * 0.3, 0.51]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial 
              color="#00FF00" 
              emissive="#00FF00"
              emissiveIntensity={1}
            />
          </mesh>
        ))}
        {/* Cooling vents */}
        {[...Array(8)].map((_, i) => (
          <mesh key={i} position={[0.76, -1 + i * 0.25, 0]}>
            <boxGeometry args={[0.02, 0.15, 0.3]} />
            <meshStandardMaterial color="#333333" metalness={0.7} roughness={0.3} />
          </mesh>
        ))}
      </group>
    </Float>
  );
};

// 3D Energy Bolt/Lightning
const EnergyBolt3D = ({ position, rotation, scale }: { position: [number, number, number]; rotation: [number, number, number]; scale: number }) => {
  return (
    <Float speed={2.5} rotationIntensity={0.8} floatIntensity={0.6}>
      <group position={position} rotation={rotation} scale={scale}>
        {/* Main bolt */}
        <mesh>
          <coneGeometry args={[0.2, 1.5, 3]} />
          <meshStandardMaterial 
            color="#FFFF00" 
            emissive="#FFFF00"
            emissiveIntensity={1}
            metalness={0.5}
            roughness={0.3}
          />
        </mesh>
        {/* Energy particles */}
        {[...Array(8)].map((_, i) => (
          <mesh 
            key={i} 
            position={[
              Math.sin(i * Math.PI / 4) * 0.3,
              -0.5 + i * 0.2,
              Math.cos(i * Math.PI / 4) * 0.3
            ]}
          >
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial 
              color="#00FFFF" 
              emissive="#00FFFF"
              emissiveIntensity={0.8}
            />
          </mesh>
        ))}
        {/* Glow effect */}
        <mesh>
          <coneGeometry args={[0.3, 1.6, 3]} />
          <meshStandardMaterial 
            color="#FFFF00" 
            transparent 
            opacity={0.3}
            emissive="#FFFF00"
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>
    </Float>
  );
};

// 3D Cloud/Cloud Computing
const Cloud3D = ({ position, rotation, scale }: { position: [number, number, number]; rotation: [number, number, number]; scale: number }) => {
  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.5}>
      <group position={position} rotation={rotation} scale={scale}>
        {/* Main cloud body */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.4, 16, 16]} />
          <MeshDistortMaterial 
            color="#E0E0E0" 
            distort={0.3} 
            speed={2}
            metalness={0.1}
            roughness={0.8}
            emissive="#FFFFFF"
            emissiveIntensity={0.2}
          />
        </mesh>
        {/* Cloud parts */}
        {[
          { x: -0.3, y: 0.2, s: 0.3 },
          { x: 0.3, y: 0.2, s: 0.35 },
          { x: 0, y: -0.2, s: 0.3 },
          { x: -0.2, y: -0.1, s: 0.25 },
          { x: 0.2, y: -0.1, s: 0.25 },
        ].map((part, i) => (
          <mesh key={i} position={[part.x, part.y, 0]}>
            <sphereGeometry args={[part.s, 16, 16]} />
            <MeshDistortMaterial 
              color="#F0F0F0" 
              distort={0.2} 
              speed={1.5}
              metalness={0.1}
              roughness={0.8}
              emissive="#FFFFFF"
              emissiveIntensity={0.15}
            />
          </mesh>
        ))}
        {/* Data streams */}
        {[...Array(5)].map((_, i) => (
          <mesh 
            key={i} 
            position={[
              Math.sin(i * Math.PI * 2 / 5) * 0.5,
              Math.cos(i * Math.PI * 2 / 5) * 0.5,
              -0.2
            ]}
          >
            <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
            <meshStandardMaterial 
              color="#00FFFF" 
              emissive="#00FFFF"
              emissiveIntensity={0.6}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
};

// 3D Circuit Board
const CircuitBoard3D = ({ position, rotation, scale }: { position: [number, number, number]; rotation: [number, number, number]; scale: number }) => {
  return (
    <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.4}>
      <group position={position} rotation={rotation} scale={scale}>
        {/* Board */}
        <mesh>
          <boxGeometry args={[2, 1.5, 0.05]} />
          <meshStandardMaterial color="#2D5016" metalness={0.3} roughness={0.7} />
        </mesh>
        {/* Circuit traces */}
        {[
          { x: -0.8, y: 0, w: 1.6, h: 0.05 },
          { x: 0, y: -0.6, w: 0.05, h: 1.2 },
          { x: 0.8, y: 0.3, w: 0.4, h: 0.05 },
          { x: -0.6, y: -0.4, w: 0.05, h: 0.6 },
        ].map((trace, i) => (
          <mesh key={i} position={[trace.x, trace.y, 0.03]}>
            <boxGeometry args={[trace.w, trace.h, 0.02]} />
            <meshStandardMaterial 
              color="#FFD700" 
              emissive="#FFD700"
              emissiveIntensity={0.4}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        ))}
        {/* Components */}
        {[
          { x: -0.5, y: 0.5 },
          { x: 0.5, y: 0.5 },
          { x: -0.5, y: -0.5 },
          { x: 0.5, y: -0.5 },
        ].map((comp, i) => (
          <mesh key={i} position={[comp.x, comp.y, 0.04]}>
            <boxGeometry args={[0.2, 0.2, 0.1]} />
            <meshStandardMaterial 
              color="#333333" 
              metalness={0.7} 
              roughness={0.3}
              emissive="#00FF00"
              emissiveIntensity={0.2}
            />
          </mesh>
        ))}
        {/* Glowing nodes */}
        {[...Array(12)].map((_, i) => (
          <mesh 
            key={i} 
            position={[
              -0.9 + (i % 4) * 0.6,
              -0.7 + Math.floor(i / 4) * 0.5,
              0.06
            ]}
          >
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial 
              color="#00FFFF" 
              emissive="#00FFFF"
              emissiveIntensity={0.8}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
};

// 3D Growth/Scaling Arrow
const ScalingArrow3D = ({ position, rotation, scale }: { position: [number, number, number]; rotation: [number, number, number]; scale: number }) => {
  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={0.5}>
      <group position={position} rotation={rotation} scale={scale}>
        {/* Arrow shaft */}
        <mesh position={[0, -0.5, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.1, 1.5, 0.1]} />
          <meshStandardMaterial 
            color="#00FF00" 
            emissive="#00FF00"
            emissiveIntensity={0.5}
            metalness={0.6}
            roughness={0.4}
          />
        </mesh>
        {/* Arrow head */}
        <mesh position={[0.5, 0.5, 0]} rotation={[0, 0, Math.PI / 4]}>
          <coneGeometry args={[0.2, 0.4, 3]} />
          <meshStandardMaterial 
            color="#00FF00" 
            emissive="#00FF00"
            emissiveIntensity={0.7}
            metalness={0.6}
            roughness={0.4}
          />
        </mesh>
        {/* Growth particles */}
        {[...Array(10)].map((_, i) => (
          <mesh 
            key={i} 
            position={[
              Math.sin(i * Math.PI / 5) * 0.3,
              -0.8 + i * 0.15,
              Math.cos(i * Math.PI / 5) * 0.3
            ]}
          >
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial 
              color="#00FF00" 
              emissive="#00FF00"
              emissiveIntensity={0.6}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
};

const EnergyTechnology3D = () => {
  const products = useMemo(() => [
    { type: 'server', position: [-3, -1, -3] as [number, number, number], rotation: [0, 0.4, 0] as [number, number, number], scale: 0.8 },
    { type: 'energyBolt', position: [2, 1, -2.5] as [number, number, number], rotation: [0.3, -0.5, 0.2] as [number, number, number], scale: 0.6 },
    { type: 'cloud', position: [0, 0.5, -4] as [number, number, number], rotation: [0, 0.2, 0] as [number, number, number], scale: 0.7 },
    { type: 'circuitBoard', position: [3, -1.5, -2] as [number, number, number], rotation: [0.1, -0.3, 0.1] as [number, number, number], scale: 0.6 },
    { type: 'scalingArrow', position: [-2, 1.5, -2.5] as [number, number, number], rotation: [-0.2, 0.5, -0.3] as [number, number, number], scale: 0.5 },
    { type: 'server', position: [2.5, -0.5, -3.5] as [number, number, number], rotation: [0, -0.4, 0] as [number, number, number], scale: 0.7 },
  ], []);

  return (
    <div className="absolute inset-0 pointer-events-none opacity-20">
      <Canvas
        dpr={[1, 1.5]}
        frameloop="demand"
        performance={{ min: 0.5 }}
        gl={{ 
          alpha: true, 
          antialias: false,
          powerPreference: "high-performance"
        }}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={0.9} />
          <pointLight position={[-5, -5, -5]} intensity={0.7} color="#00FFFF" />
          <spotLight position={[0, 5, 0]} intensity={0.8} angle={0.6} penumbra={0.5} color="#00FF00" />
          
          {/* Render products */}
          {products.map((product, i) => {
            if (product.type === 'server') {
              return <Server3D key={i} position={product.position} rotation={product.rotation} scale={product.scale} />;
            } else if (product.type === 'energyBolt') {
              return <EnergyBolt3D key={i} position={product.position} rotation={product.rotation} scale={product.scale} />;
            } else if (product.type === 'cloud') {
              return <Cloud3D key={i} position={product.position} rotation={product.rotation} scale={product.scale} />;
            } else if (product.type === 'circuitBoard') {
              return <CircuitBoard3D key={i} position={product.position} rotation={product.rotation} scale={product.scale} />;
            } else if (product.type === 'scalingArrow') {
              return <ScalingArrow3D key={i} position={product.position} rotation={product.rotation} scale={product.scale} />;
            }
            return null;
          })}

          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default EnergyTechnology3D;

