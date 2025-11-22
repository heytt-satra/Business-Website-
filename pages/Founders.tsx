import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import { FOUNDERS } from '../constants';
import { Linkedin, Mail } from 'lucide-react';
import { Image } from '../components/ui/Image';

// Add types for R3F elements to fix JSX IntrinsicElements errors
declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      boxGeometry: any;
      planeGeometry: any;
      meshStandardMaterial: any;
      ambientLight: any;
      spotLight: any;
      pointLight: any;
    }
  }
}

// Cast OrbitControls to allow props that might be missing in strict definitions
const Controls = OrbitControls as any;

// 3D Founder Card Component
function Founder3DCard({ position, founder, onClick }: any) {
  const meshRef = useRef<any>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(time * 0.5) * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(time) * 0.1;
    }
  });
  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5} position={position}>
      <group
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Card background */}
        <mesh>
          <boxGeometry args={[2, 2.8, 0.1]} />
          <meshStandardMaterial 
            color={hovered ? "#3b82f6" : "#1e293b"}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        
        {/* Note: Text3D requires font files. Using simple meshes/colors to represent card content for stability */}
        <mesh position={[0, 0.5, 0.1]}>
           <planeGeometry args={[1.5, 0.2]} />
           <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0, 0, 0.1]}>
           <planeGeometry args={[1.2, 1.2]} />
           <meshStandardMaterial color="#64748b" />
        </mesh>
        <mesh position={[0, -0.8, 0.1]}>
           <planeGeometry args={[1, 0.1]} />
           <meshStandardMaterial color="#94a3b8" />
        </mesh>
      </group>
    </Float>
  );
}

export const Founders: React.FC = () => {
  const [selectedFounder, setSelectedFounder] = useState(FOUNDERS[0]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero Section with 3D */}
      <section className="relative h-[80vh] overflow-hidden flex items-center justify-center">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <ambientLight intensity={0.3} />
            <spotLight position={[10, 10, 10]} angle={0.3} intensity={1} color="#60a5fa" />
            <spotLight position={[-10, -10, -10]} angle={0.3} intensity={0.5} color="#a78bfa" />
            
            <Founder3DCard 
              position={[-2.5, 0, 0]} 
              founder={FOUNDERS[0]}
              onClick={() => setSelectedFounder(FOUNDERS[0])}
            />
            <Founder3DCard 
              position={[2.5, 0, 0]} 
              founder={FOUNDERS[1]}
              onClick={() => setSelectedFounder(FOUNDERS[1])}
            />
            
            <Environment preset="city" />
            <Controls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </div>
        
        {/* Content Overlay - Light colors */}
        <div className="relative z-10 h-full flex items-center justify-center px-6 pointer-events-none">
          <div className="text-center pointer-events-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg"
            >
              Meet The
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Founders
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-slate-300 mb-8 font-light"
            >
              Two engineers. Four verticals. Infinite possibilities.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-slate-400 text-sm"
            >
              (Interactive 3D Scene)
            </motion.div>
          </div>
        </div>
      </section>

      {/* Detailed Founder Profiles */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {FOUNDERS.map((founder, index) => (
            <motion.div
              key={founder.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="mb-32 last:mb-0"
            >
              <div className={`grid lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                {/* Image Side */}
                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    {/* Animated background gradient */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-30 blur-2xl animate-pulse"></div>
                    
                    {/* Image container */}
                    <div className="relative bg-slate-800 rounded-3xl overflow-hidden border-2 border-slate-700 hover:border-blue-500 transition-all duration-300">
                      <div className="aspect-[3/4] relative">
                        <Image 
                          src={founder.image} 
                          alt={founder.name}
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Overlay with light content */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                          <a 
                            href={founder.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-xl font-semibold hover:bg-blue-500 hover:text-white transition w-fit"
                          >
                            <Linkedin size={20} />
                            Connect on LinkedIn
                          </a>
                        </div>
                      </div>
                    </div>
                    
                    {/* Floating badge */}
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -top-6 -right-6 bg-blue-600 text-white px-6 py-3 rounded-2xl shadow-2xl font-bold border border-blue-400 hidden md:block"
                    >
                      {founder.role}
                    </motion.div>
                  </motion.div>
                </div>

                {/* Content Side */}
                <div>
                  <h2 className="text-5xl font-bold text-white mb-4">
                    {founder.name}
                  </h2>
                  
                  <p className="text-2xl text-blue-400 mb-6 font-medium">
                    {founder.title}
                  </p>
                  
                  <p className="text-xl text-slate-300 mb-8 leading-relaxed font-light">
                    {founder.bio}
                  </p>
                  
                  {/* Expertise Tags */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-white mb-4 uppercase tracking-widest text-sm">Core Expertise</h3>
                    <div className="flex flex-wrap gap-3">
                      {founder.expertise?.map((skill, i) => (
                        <motion.span
                          key={i}
                          whileHover={{ scale: 1.05 }}
                          className="px-4 py-2 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg text-sm font-medium hover:border-blue-500 hover:text-blue-400 transition cursor-pointer"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Skills Progress Bars */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4 uppercase tracking-widest text-sm">Technical Proficiency</h3>
                    <div className="space-y-4">
                      {founder.skills?.map((skill, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <div className="flex justify-between mb-2">
                            <span className="text-slate-300 font-medium text-sm">{skill.name}</span>
                            <span className="text-blue-400 font-bold text-sm">{skill.level}%</span>
                          </div>
                          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: i * 0.1 }}
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Journey Timeline Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        {/* Background particles effect via CSS/SVG */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Journey</h2>
            <p className="text-xl text-slate-400">From college teammates to technical co-founders</p>
          </motion.div>

          <div className="relative">
             {/* Vertical Line */}
             <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-purple-600 transform md:-translate-x-1/2"></div>

             {[
              { year: "2021", title: "The Beginning", description: "Met during college rover team. Built autonomous navigation systems together.", side: "left" },
              { year: "2022", title: "First Projects", description: "Started freelancing. Delivered first websites and mechanical prototypes.", side: "right" },
              { year: "2023", title: "Vision Formed", description: "Realized the power of combining software, hardware, and business expertise.", side: "left" },
              { year: "2024", title: "NexGen Born", description: "Officially launched multi-vertical service company. First enterprise clients.", side: "right" },
             ].map((milestone, idx) => (
                <motion.div 
                   key={idx}
                   initial={{ opacity: 0, x: milestone.side === 'left' ? -50 : 50 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.6 }}
                   className={`flex flex-col md:flex-row gap-8 mb-12 items-center relative ${milestone.side === 'right' ? 'md:flex-row-reverse' : ''}`}
                >
                   <div className={`flex-1 w-full ${milestone.side === 'left' ? 'md:text-right' : 'md:text-left'} ml-16 md:ml-0`}>
                      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-blue-500 transition-all">
                         <h3 className="text-2xl font-bold text-white mb-2">{milestone.title}</h3>
                         <p className="text-slate-400">{milestone.description}</p>
                      </div>
                   </div>
                   
                   <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-12 h-12 bg-slate-950 border-4 border-blue-500 rounded-full flex items-center justify-center z-10 shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                   </div>

                   <div className={`flex-1 w-full ${milestone.side === 'right' ? 'md:text-right' : 'md:text-left'} ml-16 md:ml-0`}>
                      <span className="text-5xl font-bold text-slate-800/50 select-none">{milestone.year}</span>
                   </div>
                </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-xl text-slate-400">What drives us every day</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Speed", desc: "Move fast, iterate faster. Time is our most valuable resource.", color: "from-yellow-500 to-orange-500" },
              { title: "Excellence", desc: "Good enough isn't enough. We deliver exceptional quality.", color: "from-blue-500 to-cyan-500" },
              { title: "Partnership", desc: "Your success is our success. We're in this together.", color: "from-green-500 to-emerald-500" },
              { title: "Innovation", desc: "Question everything. Build what doesn't exist yet.", color: "from-purple-500 to-pink-500" }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                {/* Glowing background */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${value.color} rounded-2xl opacity-20 group-hover:opacity-40 blur-xl transition-opacity`}></div>
                
                <div className="relative bg-slate-800 border border-slate-700 p-8 rounded-2xl h-full hover:border-slate-600 transition-all">
                  <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{value.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};