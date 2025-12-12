import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../types';

// Cast OrbitControls to allow props that might be missing in strict definitions
const Controls = OrbitControls as any;

// Animated Sphere Component
const AnimatedSphere = () => {
  const meshRef = useRef<any>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.2;
      meshRef.current.rotation.y = time * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1, 100, 100]} scale={2.2}>
        <MeshDistortMaterial
          color="#60a5fa"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
};

// Secondary shapes for background interest
const BackgroundShapes = () => {
  return (
    <>
      <Float speed={1.5} rotationIntensity={2} floatIntensity={1} position={[3, 2, -2]}>
        <mesh>
          <torusGeometry args={[0.5, 0.2, 16, 100]} />
          <meshStandardMaterial color="#8b5cf6" wireframe />
        </mesh>
      </Float>
      <Float speed={1} rotationIntensity={1.5} floatIntensity={1.5} position={[-3, -2, -1]}>
        <mesh>
          <octahedronGeometry args={[0.8]} />
          <meshStandardMaterial color="#14b8a6" wireframe />
        </mesh>
      </Float>
    </>
  )
}

const Hero3DContent: React.FC = () => {
  return (
    <section className="relative h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }} dpr={[1, 2]}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#a78bfa" />

          <AnimatedSphere />
          <BackgroundShapes />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

          <Controls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </div>

      {/* Content Overlay - ALL LIGHT COLORS */}
      <div className="relative z-10 h-full flex items-center justify-center px-6 pointer-events-none">
        <div className="text-center max-w-5xl pointer-events-auto">
          {/* Light colored text on dark background */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 text-white tracking-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">
                Polymath
              </span>
              <br />
              <span className="text-white">Engineering</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto font-light leading-relaxed"
          >
            Multi-vertical service excellence across Software, Robotics, Mechanical, and Branding
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {/* Light background buttons */}
            <Link to="/contact">
              <button className="px-8 py-4 bg-white text-slate-900 rounded-xl font-bold text-lg hover:bg-blue-50 hover:scale-105 transition-all shadow-xl shadow-blue-900/20">
                Start Your Project
              </button>
            </Link>

            {/* Outline button with light colors */}
            <Link to="/services">
              <button className="px-8 py-4 border border-slate-500 bg-slate-800/50 backdrop-blur-md text-white rounded-xl font-bold text-lg hover:bg-slate-700 hover:border-white transition-all">
                Explore Services
              </button>
            </Link>
          </motion.div>

          {/* Stats with light colors */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto border-t border-white/10 pt-8"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-slate-400 text-sm uppercase tracking-widest">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">4</div>
              <div className="text-slate-400 text-sm uppercase tracking-widest">Verticals</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">100%</div>
              <div className="text-slate-400 text-sm uppercase tracking-widest">Satisfaction</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - Light colored */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1.2, duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="w-6 h-10 border-2 border-slate-500 rounded-full flex justify-center p-2">
          <div className="w-1 h-1 bg-white rounded-full"></div>
        </div>
      </motion.div>
    </section>
  );
};

// Error Boundary for WebGL Context Loss or R3F issues
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("3D Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback to a CSS gradient if 3D fails
      return (
        <div className="relative h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-center px-4">
          <div className="max-w-4xl z-10">
            <h1 className="text-6xl font-bold text-white mb-6">Polymath Engineering</h1>
            <p className="text-xl text-slate-300 mb-8">Integrated Technical Excellence</p>
            <button className="px-8 py-4 bg-white text-slate-900 rounded-xl font-bold">Get Started</button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export const Hero3D = () => (
  <ErrorBoundary>
    <Hero3DContent />
  </ErrorBoundary>
);