import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { WorkflowStep } from '../../types';

interface ServiceTimelineProps {
  workflow: WorkflowStep[];
  serviceColor?: 'blue' | 'purple' | 'green' | 'orange';
}

export const ServiceTimeline: React.FC<ServiceTimelineProps> = ({ workflow }) => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  return (
    <section ref={containerRef} className="py-20 bg-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Our Process</h2>
          <p className="text-lg text-slate-400">
            From initial consultation to final delivery
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto relative">
          {/* Central Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-700 md:-translate-x-1/2">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-primary-500 origin-top"
            />
          </div>

          <div className="space-y-12 md:space-y-0">
            {workflow.map((step, index) => (
              <div 
                key={index} 
                className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} md:justify-between md:-mb-8 last:mb-0`}
              >
                {/* Spacer for Desktop Alternating Layout */}
                <div className="hidden md:block w-[45%]" />

                {/* Center Marker / Number */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center z-20">
                   <div className="w-10 h-10 bg-slate-900 border-4 border-primary-500 rounded-full flex items-center justify-center shadow-lg shadow-primary-900/50">
                     <span className="text-white font-bold text-xs">{index + 1}</span>
                   </div>
                </div>

                {/* Content Card */}
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="ml-20 md:ml-0 w-full md:w-[45%] relative"
                >
                  <div className="bg-white p-6 rounded-xl shadow-xl border-l-4 border-primary-500 relative group hover:-translate-y-1 transition-transform duration-300">
                    
                    {/* Arrow Pointer (Desktop) */}
                    <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white transform rotate-45 ${index % 2 === 0 ? '-right-1.5 border-t border-r border-transparent' : '-left-1.5 border-b border-l border-transparent'}`}></div>

                    {/* Duration Badge - White Text as requested */}
                    <div className="absolute -top-3 right-4">
                       <span className="inline-block px-3 py-1 bg-primary-600 text-white text-xs font-bold rounded-full shadow-md">
                         {step.duration}
                       </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2 mt-1">
                      {step.title}
                    </h3>

                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      {step.description}
                    </p>

                    {/* Compact Deliverables */}
                    {step.deliverables && (
                      <div className="border-t border-slate-100 pt-3">
                         <div className="flex flex-wrap gap-2">
                           {step.deliverables.slice(0,3).map((item, i) => (
                             <span key={i} className="text-[10px] font-bold uppercase tracking-wide text-slate-500 bg-slate-100 px-2 py-1 rounded">
                               {item}
                             </span>
                           ))}
                         </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
          
          {/* Finish Line */}
          <div className="relative flex justify-center pt-12">
             <div className="w-4 h-4 bg-primary-500 rounded-full shadow-[0_0_10px_#3b82f6]"></div>
          </div>
        </div>
      </div>
    </section>
  );
};