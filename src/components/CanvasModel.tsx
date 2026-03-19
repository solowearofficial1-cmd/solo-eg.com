"use client";

import { Canvas } from '@react-three/fiber';
import { Center, Environment, OrbitControls, ContactShadows } from '@react-three/drei';
import Shirt from '@/components/Shirt';

export default function CanvasModel() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 1.8], fov: 25 }}
      gl={{ preserveDrawingBuffer: true, antialias: true }}
      className="w-full h-full bg-primary-dark"
    >
      <color attach="background" args={['#00171F']} />
      <fog attach="fog" args={['#00171F', 1, 3.2]} />
      
      <ambientLight intensity={0.1} />
      
      {/* Main Key Light - Strong focused light from front-right */}
      <spotLight 
        position={[3, 2, 3]} 
        angle={0.4} 
        penumbra={0.8} 
        intensity={3} 
        castShadow 
        color="#FFE4B5" // Warm cream light
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />
      
      {/* Rim Light - Creates edge definition from left */}
      <spotLight 
        position={[-3, 1, 2]} 
        angle={0.3} 
        penumbra={1} 
        intensity={2} 
        color="#FF6B6B" // Soft red rim light
      />
      
      {/* Top Fill Light - Soft overhead lighting */}
      <pointLight 
        position={[0, 4, 1]} 
        intensity={1.2} 
        color="#E8F4FD" // Cool blue-white
      />
      
      {/* Bottom Accent Light - Subtle uplighting */}
      <pointLight 
        position={[0, -2, 2]} 
        intensity={0.6} 
        color="#FFE66D" // Warm yellow accent
      />
      
      {/* Back Light - Separates model from background */}
      <spotLight 
        position={[0, 1, -3]} 
        angle={0.5} 
        penumbra={1} 
        intensity={1.5} 
        color="#C9E4CA" // Soft green back light
      />

      <Environment preset="city" />

      <Center>
        <Shirt />
      </Center>

      {/* Enhanced contact shadows with better quality */}
      <ContactShadows 
        position={[0, -0.8, 0]} 
        opacity={0.8} 
        scale={12} 
        blur={3} 
        far={1} 
        resolution={1024}
      />
      
      {/* Volumetric lighting effect */}
      <mesh position={[3, 2, 3]}>
        <planeGeometry args={[0.5, 0.5]} />
        <meshBasicMaterial color="#FFE4B5" transparent opacity={0.3} />
      </mesh>

      <OrbitControls 
        enablePan={false}
        enableZoom={false}
      />
    </Canvas>
  );
}
