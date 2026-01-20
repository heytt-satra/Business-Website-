'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Points, PointMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Starfield Background Component
function StarField() {
  const starsRef = useRef<THREE.Points>(null);

  // Create random star positions
  const starPositions = useMemo(() => {
    const count = 800; // Reduced from 3000 for performance
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Spread stars in a large sphere around the scene
      const radius = 50 + Math.random() * 100;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, []);

  // Slow rotation for parallax effect
  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = state.clock.elapsedTime * 0.01;
      starsRef.current.rotation.x = state.clock.elapsedTime * 0.005;
    }
  });

  return (
    <>
      {/* Primary star layer - bright stars */}
      <Points ref={starsRef} positions={starPositions}>
        <PointMaterial
          color="#ffffff"
          size={0.15}
          transparent
          opacity={0.8}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>

      {/* Secondary star layer - dimmer, more numerous */}
      <Stars
        radius={80}
        depth={100}
        count={1500} // Reduced from 5000
        factor={3}
        saturation={0}
        fade
        speed={0.5}
      />

      {/* Blue-tinted distant stars */}
      <Stars
        radius={120}
        depth={80}
        count={800} // Reduced from 2000
        factor={2}
        saturation={1}
        fade
        speed={0.3}
      />
    </>
  );
}

// Conspiracy Scientific Object - Geodesic Sphere with Particles
function ConspiracyObject() {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Create particle positions around the sphere
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(150 * 3); // Slightly reduced
    for (let i = 0; i < 150; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.5 + Math.random() * 1.5;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  // Create orbit ring particles
  const orbitParticles = useMemo(() => {
    const positions = new Float32Array(80 * 3); // Slightly reduced
    for (let i = 0; i < 80; i++) {
      const angle = (i / 80) * Math.PI * 2;
      const r = 2.8;
      positions[i * 3] = Math.cos(angle) * r;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.3;
      positions[i * 3 + 2] = Math.sin(angle) * r;
    }
    return positions;
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Smooth constant rotation for the main group
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.1; // Gentle continuous rotation
      groupRef.current.rotation.x = 0; // Keep stable
    }

    // Counter-rotation for inner layers adds depth
    if (innerRef.current) {
      innerRef.current.rotation.y = -time * 0.15;
      innerRef.current.rotation.z = time * 0.05;
    }

    // Different speed for outer layer
    if (outerRef.current) {
      outerRef.current.rotation.y = time * 0.08;
    }

    // Particles drift smoothly
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.02;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef}>
        {/* Inner geodesic sphere - more detailed */}
        <mesh ref={innerRef}>
          <icosahedronGeometry args={[1.5, 0]} /> {/* Reduced detail from 1 to 0 */}
          <meshBasicMaterial
            color="#00A3FF"
            wireframe
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Middle geodesic sphere */}
        <mesh ref={outerRef}>
          <icosahedronGeometry args={[1.8, 1]} /> {/* Reduced detail from 2 to 1 */}
          <meshBasicMaterial
            color="#00A3FF"
            wireframe
            transparent
            opacity={0.4}
          />
        </mesh>

        {/* Outer geodesic sphere - low detail, subtle */}
        <mesh>
          <icosahedronGeometry args={[2.2, 0]} /> {/* Reduced detail from 1 to 0 */}
          <meshBasicMaterial
            color="#00A3FF"
            wireframe
            transparent
            opacity={0.15}
          />
        </mesh>

        {/* Glowing vertices/nodes */}
        <Points positions={new Float32Array(new THREE.IcosahedronGeometry(1.5, 1).attributes.position.array)}>
          <PointMaterial
            color="#00A3FF"
            size={0.08}
            transparent
            opacity={0.9}
            sizeAttenuation
          />
        </Points>

        {/* Scattered particles around the sphere */}
        <Points ref={particlesRef} positions={particlePositions}>
          <PointMaterial
            color="#00A3FF"
            size={0.03}
            transparent
            opacity={0.5}
            sizeAttenuation
          />
        </Points>

        {/* Orbit ring particles */}
        <Points positions={orbitParticles}>
          <PointMaterial
            color="#00A3FF"
            size={0.02}
            transparent
            opacity={0.3}
            sizeAttenuation
          />
        </Points>

        {/* Inner core glow */}
        <mesh>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshBasicMaterial
            color="#00A3FF"
            transparent
            opacity={0.3}
          />
        </mesh>

        {/* Core bright point */}
        <mesh>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>
    </Float>
  );
}

function Scene() {
  return (
    <>
      {/* 3D Starfield Background */}
      <StarField />

      {/* Minimal lighting for glow effects */}
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#00A3FF" />

      {/* Main conspiracy object */}
      <ConspiracyObject />
    </>
  );
}

// Renamed to Hero3D for compatibility with existing imports
export function Hero3D() {
  return (
    // Added mt-16 for spacing from header
    <div className="w-full h-[500px] relative mt-16">
      <Canvas
        camera={{ position: [0, 0.5, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}