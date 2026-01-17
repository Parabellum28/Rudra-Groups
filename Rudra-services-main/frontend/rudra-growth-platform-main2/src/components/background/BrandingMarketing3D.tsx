import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Environment, Float } from "@react-three/drei";
import { Suspense, useMemo } from "react";

// 3D Billboard/Sign
const Billboard3D = ({ position, rotation, scale }: { position: [number, number, number]; rotation: [number, number, number]; scale: number }) => {
  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.4}>
      <group position={position} rotation={rotation} scale={scale}>
        {/* Billboard frame */}
        <mesh>
          <boxGeometry args={[2.5, 1.5, 0.1]} />
          <meshStandardMaterial 
            color="#FFFFFF" 
            metalness={0.2} 
            roughness={0.6}
            emissive="#FFFF00"
            emissiveIntensity={0.2}
          />
        </mesh>
        {/* Stand */}
        <mesh position={[0, -1, 0]}>
          <boxGeometry args={[0.1, 1.5, 0.1]} />
          <meshStandardMaterial color="#333333" metalness={0.5} roughness={0.5} />
        </mesh>
        {/* Glowing text area */}
        <mesh position={[0, 0, 0.06]}>
          <boxGeometry args={[2.2, 1.2, 0.02]} />
          <meshStandardMaterial 
            color="#FFD700" 
            emissive="#FFD700"
            emissiveIntensity={0.5}
            metalness={0.3}
            roughness={0.4}
          />
        </mesh>
      </group>
    </Float>
  );
};

// 3D Product Box
const ProductBox3D = ({ position, rotation, scale }: { position: [number, number, number]; rotation: [number, number, number]; scale: number }) => {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position} rotation={rotation} scale={scale}>
        {/* Box */}
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial 
            color="#FF6B6B" 
            metalness={0.1} 
            roughness={0.7}
          />
        </mesh>
        {/* Ribbon */}
        <mesh position={[0, 0.6, 0]} rotation={[Math.PI / 4, 0, 0]}>
          <boxGeometry args={[1.2, 0.1, 0.1]} />
          <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Shine effect */}
        <mesh position={[0.3, 0.3, 0.51]} rotation={[0, 0, Math.PI / 4]}>
          <planeGeometry args={[0.3, 0.3]} />
          <meshStandardMaterial 
            color="#FFFFFF" 
            transparent 
            opacity={0.6}
            emissive="#FFFFFF"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>
    </Float>
  );
};

// 3D Megaphone
const Megaphone3D = ({ position, rotation, scale }: { position: [number, number, number]; rotation: [number, number, number]; scale: number }) => {
  return (
    <Float speed={2.2} rotationIntensity={0.6} floatIntensity={0.4}>
      <group position={position} rotation={rotation} scale={scale}>
        {/* Cone body */}
        <mesh>
          <coneGeometry args={[0.4, 1.2, 8]} />
          <meshStandardMaterial 
            color="#FF4444" 
            metalness={0.3} 
            roughness={0.5}
            emissive="#FF0000"
            emissiveIntensity={0.2}
          />
        </mesh>
        {/* Handle */}
        <mesh position={[-0.3, -0.2, 0]} rotation={[0, 0, -0.3]}>
          <boxGeometry args={[0.1, 0.4, 0.1]} />
          <meshStandardMaterial color="#333333" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Sound waves */}
        {[...Array(3)].map((_, i) => (
          <mesh key={i} position={[0, 0.6, 0]} rotation={[0, 0, (i * Math.PI * 2) / 3]}>
            <ringGeometry args={[0.5 + i * 0.2, 0.52 + i * 0.2, 16]} />
            <meshStandardMaterial 
              color="#FFFF00" 
              transparent 
              opacity={0.3 - i * 0.1}
              emissive="#FFFF00"
              emissiveIntensity={0.2}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
};

// 3D Trophy/Award
const Trophy3D = ({ position, rotation, scale }: { position: [number, number, number]; rotation: [number, number, number]; scale: number }) => {
  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.3}>
      <group position={position} rotation={rotation} scale={scale}>
        {/* Base */}
        <mesh position={[0, -0.8, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.2, 16]} />
          <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Stem */}
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.6, 8]} />
          <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Cup */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.4, 0.6, 16]} />
          <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Handles */}
        {[-1, 1].map((x, i) => (
          <mesh key={i} position={[x * 0.3, 0.1, 0]} rotation={[0, 0, x * 0.3]}>
            <torusGeometry args={[0.15, 0.05, 8, 16]} />
            <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.1} />
          </mesh>
        ))}
        {/* Glow */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.35, 0.45, 0.65, 16]} />
          <meshStandardMaterial 
            color="#FFFF00" 
            transparent 
            opacity={0.2}
            emissive="#FFFF00"
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>
    </Float>
  );
};

// 3D Social Media Icon (Like/Heart)
const SocialIcon3D = ({ position, rotation, scale }: { position: [number, number, number]; rotation: [number, number, number]; scale: number }) => {
  return (
    <Float speed={2.5} rotationIntensity={0.7} floatIntensity={0.6}>
      <group position={position} rotation={rotation} scale={scale}>
        <mesh>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial 
            color="#FF69B4" 
            metalness={0.2} 
            roughness={0.6}
            emissive="#FF1493"
            emissiveIntensity={0.4}
          />
        </mesh>
        {/* Pulse effect */}
        <mesh>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshStandardMaterial 
            color="#FF69B4" 
            transparent 
            opacity={0.3}
            emissive="#FF1493"
            emissiveIntensity={0.2}
          />
        </mesh>
      </group>
    </Float>
  );
};

const BrandingMarketing3D = () => {
  const products = useMemo(() => [
    { type: 'billboard', position: [-3, 0, -3] as [number, number, number], rotation: [0, 0.3, 0] as [number, number, number], scale: 0.8 },
    { type: 'productBox', position: [2, -1, -2] as [number, number, number], rotation: [0.2, -0.4, 0.1] as [number, number, number], scale: 0.7 },
    { type: 'megaphone', position: [-1.5, 1, -2.5] as [number, number, number], rotation: [0.3, 0.5, -0.2] as [number, number, number], scale: 0.6 },
    { type: 'trophy', position: [3, 0.5, -3] as [number, number, number], rotation: [0, -0.5, 0] as [number, number, number], scale: 0.5 },
    { type: 'socialIcon', position: [0, 1.5, -2] as [number, number, number], rotation: [0.5, 0.3, 0.2] as [number, number, number], scale: 0.4 },
    { type: 'productBox', position: [-2.5, -1.5, -3.5] as [number, number, number], rotation: [-0.2, 0.6, -0.1] as [number, number, number], scale: 0.6 },
  ], []);

  return (
    <div className="absolute inset-0 pointer-events-none opacity-20">
      <Canvas>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <pointLight position={[-5, -5, -5]} intensity={0.6} color="#FFD700" />
          <spotLight position={[0, 5, 0]} intensity={0.9} angle={0.5} penumbra={0.5} color="#FFFF00" />
          
          {/* Render products */}
          {products.map((product, i) => {
            if (product.type === 'billboard') {
              return <Billboard3D key={i} position={product.position} rotation={product.rotation} scale={product.scale} />;
            } else if (product.type === 'productBox') {
              return <ProductBox3D key={i} position={product.position} rotation={product.rotation} scale={product.scale} />;
            } else if (product.type === 'megaphone') {
              return <Megaphone3D key={i} position={product.position} rotation={product.rotation} scale={product.scale} />;
            } else if (product.type === 'trophy') {
              return <Trophy3D key={i} position={product.position} rotation={product.rotation} scale={product.scale} />;
            } else if (product.type === 'socialIcon') {
              return <SocialIcon3D key={i} position={product.position} rotation={product.rotation} scale={product.scale} />;
            }
            return null;
          })}

          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default BrandingMarketing3D;

