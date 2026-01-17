import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Environment, Float } from "@react-three/drei";
import { Suspense, useMemo } from "react";

// 3D Building Component
const Building3D = ({ position, rotation, scale }: { position: [number, number, number]; rotation: [number, number, number]; scale: number }) => {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position} rotation={rotation} scale={scale}>
        {/* Main building structure */}
        <mesh>
          <boxGeometry args={[2, 4, 2]} />
          <meshStandardMaterial 
            color="#8B7355" 
            metalness={0.3} 
            roughness={0.7}
            emissive="#4A4A4A"
            emissiveIntensity={0.1}
          />
        </mesh>
        {/* Windows */}
        {[...Array(6)].map((_, i) => (
          <mesh key={i} position={[0.95, -1.5 + i * 0.6, 0]}>
            <boxGeometry args={[0.1, 0.4, 0.8]} />
            <meshStandardMaterial 
              color="#1a1a2e" 
              emissive="#2a2a4e"
              emissiveIntensity={0.3}
            />
          </mesh>
        ))}
        {/* Roof */}
        <mesh position={[0, 2.2, 0]} rotation={[0, 0, 0]}>
          <coneGeometry args={[1.5, 0.8, 4]} />
          <meshStandardMaterial color="#654321" metalness={0.4} roughness={0.6} />
        </mesh>
      </group>
    </Float>
  );
};

// 3D Construction Crane
const Crane3D = ({ position, rotation, scale }: { position: [number, number, number]; rotation: [number, number, number]; scale: number }) => {
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.4}>
      <group position={position} rotation={rotation} scale={scale}>
        {/* Base */}
        <mesh position={[0, -1, 0]}>
          <boxGeometry args={[0.5, 0.3, 0.5]} />
          <meshStandardMaterial color="#555555" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Mast */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.15, 2, 0.15]} />
          <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Boom */}
        <mesh position={[0.5, 0.8, 0]} rotation={[0, 0, -0.3]}>
          <boxGeometry args={[1, 0.1, 0.1]} />
          <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Counterweight */}
        <mesh position={[-0.3, 0.5, 0]}>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshStandardMaterial color="#333333" metalness={0.7} roughness={0.3} />
        </mesh>
      </group>
    </Float>
  );
};

// 3D Infrastructure Bridge
const Bridge3D = ({ position, rotation, scale }: { position: [number, number, number]; rotation: [number, number, number]; scale: number }) => {
  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.3}>
      <group position={position} rotation={rotation} scale={scale}>
        {/* Bridge deck */}
        <mesh>
          <boxGeometry args={[3, 0.2, 0.8]} />
          <meshStandardMaterial color="#666666" metalness={0.6} roughness={0.4} />
        </mesh>
        {/* Support pillars */}
        {[-1, 0, 1].map((x, i) => (
          <mesh key={i} position={[x, -0.5, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 1, 8]} />
            <meshStandardMaterial color="#888888" metalness={0.5} roughness={0.5} />
          </mesh>
        ))}
        {/* Cables */}
        {[...Array(8)].map((_, i) => (
          <mesh key={i} position={[-1.2 + i * 0.3, 0.3, 0]} rotation={[0, 0, 0.2]}>
            <cylinderGeometry args={[0.02, 0.02, 0.6, 6]} />
            <meshStandardMaterial color="#CCCCCC" metalness={0.9} roughness={0.1} />
          </mesh>
        ))}
      </group>
    </Float>
  );
};

// 3D Construction Tools
const Tool3D = ({ position, rotation, scale, type }: { position: [number, number, number]; rotation: [number, number, number]; scale: number; type: 'hammer' | 'wrench' }) => {
  return (
    <Float speed={2.5} rotationIntensity={0.6} floatIntensity={0.5}>
      <group position={position} rotation={rotation} scale={scale}>
        {type === 'hammer' ? (
          <>
            <mesh>
              <boxGeometry args={[0.1, 0.8, 0.1]} />
              <meshStandardMaterial color="#8B4513" roughness={0.8} />
            </mesh>
            <mesh position={[0, 0.5, 0]}>
              <boxGeometry args={[0.3, 0.2, 0.2]} />
              <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} />
            </mesh>
          </>
        ) : (
          <>
            <mesh>
              <torusGeometry args={[0.15, 0.05, 8, 16]} />
              <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[0, -0.3, 0]}>
              <boxGeometry args={[0.05, 0.4, 0.05]} />
              <meshStandardMaterial color="#8B4513" roughness={0.8} />
            </mesh>
          </>
        )}
      </group>
    </Float>
  );
};

const ConstructionInfrastructure3D = () => {
  const products = useMemo(() => [
    { type: 'building', position: [-3, -1, -2] as [number, number, number], rotation: [0, 0.5, 0] as [number, number, number], scale: 0.8 },
    { type: 'crane', position: [2, -0.5, -3] as [number, number, number], rotation: [0, -0.3, 0] as [number, number, number], scale: 0.6 },
    { type: 'bridge', position: [0, -1.5, -4] as [number, number, number], rotation: [0, 0.2, 0] as [number, number, number], scale: 0.7 },
    { type: 'building', position: [3.5, -1.2, -2.5] as [number, number, number], rotation: [0, -0.5, 0] as [number, number, number], scale: 0.9 },
    { type: 'hammer', position: [-2, 1, -3] as [number, number, number], rotation: [0.5, 0.3, 0.2] as [number, number, number], scale: 0.5 },
    { type: 'wrench', position: [2.5, 0.8, -2] as [number, number, number], rotation: [-0.3, 0.5, 0.4] as [number, number, number], scale: 0.5 },
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
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <pointLight position={[-5, -5, -5]} intensity={0.5} color="#FFA500" />
          
          {/* Render products */}
          {products.map((product, i) => {
            if (product.type === 'building') {
              return <Building3D key={i} position={product.position} rotation={product.rotation} scale={product.scale} />;
            } else if (product.type === 'crane') {
              return <Crane3D key={i} position={product.position} rotation={product.rotation} scale={product.scale} />;
            } else if (product.type === 'bridge') {
              return <Bridge3D key={i} position={product.position} rotation={product.rotation} scale={product.scale} />;
            } else if (product.type === 'hammer') {
              return <Tool3D key={i} position={product.position} rotation={product.rotation} scale={product.scale} type="hammer" />;
            } else if (product.type === 'wrench') {
              return <Tool3D key={i} position={product.position} rotation={product.rotation} scale={product.scale} type="wrench" />;
            }
            return null;
          })}

          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ConstructionInfrastructure3D;

