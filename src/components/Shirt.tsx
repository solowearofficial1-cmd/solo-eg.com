"use client";

import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';
import { easing } from 'maath';
import { useDesignStore } from '@/store/designStore';
import * as THREE from 'three';

export default function Shirt() {
  const { 
    color, logoDecal, fullDecal, isLogoTexture, isFullTexture, 
    scale, logoScale, logoPosition, 
    text, fontStyle, textScale, textPosition, textColor
  } = useDesignStore();
  
  // Load the downloaded GLB model
  const { nodes } = useGLTF('/shirt.glb') as any;
  
  const logoTexture = useTexture(logoDecal);
  const fullTexture = useTexture(fullDecal);

  // Create a canvas texture for the custom text
  const [textTexture, setTextTexture] = useState<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    if (text) {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = textColor;
        ctx.font = `bold 120px ${fontStyle}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text.toUpperCase(), canvas.width / 2, canvas.height / 2);
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        setTextTexture(texture);
      }
    } else {
      setTextTexture(null);
    }
  }, [text, fontStyle, textColor]);

  // We use a fresh standard material instead of the loaded one to strip all baked shadows
  const material = useRef(new THREE.MeshStandardMaterial({
    roughness: 1,
    metalness: 0,
    color: new THREE.Color(color),
    vertexColors: false, // Ensure vertex colors are not used
    side: THREE.DoubleSide // This makes the inside visible, making it look "filled"
  }));

  // Create a separate material for the interior if needed, or ensure the current is clean
  useEffect(() => {
    // Force set properties on mount
    material.current.map = null;
    material.current.aoMap = null;
    material.current.lightMap = null;
    material.current.emissiveMap = null;
    material.current.needsUpdate = true;
  }, []);

  useFrame((state, delta) => {
    // Smoothly update the color
    easing.dampC(material.current.color, color, 0.25, delta);
    
    // Toggle full texture map
    if (isFullTexture) {
      material.current.map = fullTexture;
    } else {
      material.current.map = null;
    }
    material.current.needsUpdate = true;
  });

  return (
    <group scale={scale}>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={material.current}
        dispose={null}
      >
        {isFullTexture && (
          <Decal 
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}

        {isLogoTexture && (
          <Decal 
            position={logoPosition}
            rotation={[0, 0, 0]}
            scale={logoScale}
            map={logoTexture}
          />
        )}

        {text && textTexture && (
          <Decal 
            position={textPosition}
            rotation={[0, 0, 0]}
            scale={textScale}
            map={textTexture}
          />
        )}
      </mesh>
    </group>
  );
}

useGLTF.preload('/shirt.glb');
