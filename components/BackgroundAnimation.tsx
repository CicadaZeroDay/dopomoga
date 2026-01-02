import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, PerspectiveCamera, Stars } from '@react-three/drei';
import * as THREE from 'three';

const DNAStrand = ({ count = 40, radius = 2.5, height = 15, color1 = "#4A90B8", color2 = "#D4A574" }) => {
  // Generate points for the double helix
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const angle = t * Math.PI * 6; // 3 full turns
      const y = (t - 0.5) * height; // Center vertically
      
      // Strand 1 position
      const x1 = Math.cos(angle) * radius;
      const z1 = Math.sin(angle) * radius;
      
      // Strand 2 position (180 degrees offset)
      const x2 = Math.cos(angle + Math.PI) * radius;
      const z2 = Math.sin(angle + Math.PI) * radius;
      
      temp.push({ x1, y, z1, x2, z2, angle });
    }
    return temp;
  }, [count, radius, height]);

  return (
    <group>
      {particles.map((p, i) => (
        <group key={i}>
          {/* Strand 1 Particle */}
          <mesh position={[p.x1, p.y, p.z1]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial 
              color={color1} 
              emissive={color1} 
              emissiveIntensity={0.8} 
              roughness={0.2} 
              metalness={0.8} 
            />
          </mesh>
          
          {/* Strand 2 Particle */}
          <mesh position={[p.x2, p.y, p.z2]}>
             <sphereGeometry args={[0.15, 16, 16]} />
             <meshStandardMaterial 
               color={color2} 
               emissive={color2} 
               emissiveIntensity={0.8} 
               roughness={0.2} 
               metalness={0.8}
             />
          </mesh>

          {/* Base Pair Connection (The rungs of the ladder) */}
          <mesh 
            position={[0, p.y, 0]} 
            rotation={[0, -p.angle, 0]}
          >
            <cylinderGeometry args={[0.03, 0.03, radius * 2, 8]} />
            <meshStandardMaterial color="white" opacity={0.15} transparent />
            {/* Rotate cylinder to be horizontal relative to the y-axis, pointing to strands */}
            <group rotation={[0, 0, Math.PI / 2]} /> 
          </mesh>
          
          {/* Alternative connection visualization: Line */}
          <line>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([p.x1, p.y, p.z1, p.x2, p.y, p.z2])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="white" opacity={0.1} transparent />
          </line>
        </group>
      ))}
    </group>
  );
};

const Scene = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      
      // Continuous slow rotation of the DNA
      groupRef.current.rotation.y = t * 0.15;
      
      // Floating effect
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.5;

      // Parallax effect based on mouse position
      const { x, y } = state.mouse;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, Math.PI / 6 + (y * 0.2), 0.05);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, Math.PI / 6 + (x * 0.2), 0.05);
    }
  });

  return (
    <group ref={groupRef} rotation={[Math.PI / 6, 0, Math.PI / 6]}>
      {/* Main DNA Helix */}
      <DNAStrand radius={3} height={18} count={50} />
      
      {/* Floating particles around it */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <Stars radius={20} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
      </Float>
    </group>
  );
};

const BackgroundAnimation: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0">
       <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#0f1f3a] to-[#152a48] z-[-1]" />
      <Canvas dpr={[1, 2]} gl={{ antialias: true }}>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={45} />
          
          {/* Lighting setup for cool reflections */}
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#4A90B8" />
          <pointLight position={[-10, -10, -10]} intensity={1.5} color="#D4A574" />
          <spotLight position={[0, 10, 0]} intensity={0.8} angle={0.5} penumbra={1} />
          
          <Scene />
          
          {/* Post-processing or Environment for better look */}
          <Environment preset="night" blur={0.6} />
        </Suspense>
      </Canvas>
      
      {/* Dark overlay to ensure text is readable over the 3D elements */}
      <div className="absolute inset-0 bg-[#0A1628]/40 pointer-events-none" />
      
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0A1628_100%)] pointer-events-none opacity-60" />
    </div>
  );
};

export default BackgroundAnimation;