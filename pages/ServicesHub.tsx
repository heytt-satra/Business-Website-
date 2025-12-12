import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers, Zap, Cpu, PenTool } from 'lucide-react';
import { SERVICES } from '../constants';
import { Image } from '../components/ui/Image';
import { motion } from 'framer-motion';

export const ServicesHub: React.FC = () => {
  return (
    <div className="bg-slate-950 min-h-screen pt-32 pb-20 overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent-purple/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-24"
        >
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-8 tracking-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-teal">Expertise</span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            Four distinct verticals. One integrated vision. We provide the comprehensive technical infrastructure your business needs to scale.
          </p>
        </motion.div>

        <div className="space-y-32">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col lg:flex-row gap-16 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Visual Side */}
              <div className="lg:w-1/2 w-full group">
                <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl border border-white/10 bg-slate-900/50">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-purple/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-500"></div>
                  <Image
                    src={`https://picsum.photos/seed/${service.id}/800/600`}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  />

                  {/* Floating Icon */}
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-slate-900 rounded-full flex items-center justify-center border-8 border-slate-950 z-20">
                    <service.icon size={48} className="text-white" />
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="lg:w-1/2 w-full">
                <div className="flex items-center space-x-3 mb-6">
                  <span className="h-px w-12 bg-primary-500"></span>
                  <span className="text-primary-400 font-bold uppercase tracking-widest text-sm">
                    0{index + 1} — {service.id}
                  </span>
                </div>

                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">{service.title}</h2>
                <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                  {service.fullDescription}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-10">
                  {service.subServices.map((sub, idx) => (
                    <div key={idx} className="glass p-4 rounded-xl hover:bg-white/5 transition-colors">
                      <div className="flex items-center mb-2">
                        <div className="w-2 h-2 bg-accent-teal rounded-full mr-3 shadow-[0_0_10px_#14b8a6]"></div>
                        <span className="text-white font-bold">{sub.title}</span>
                      </div>
                      <p className="text-slate-500 text-sm pl-5">{sub.description}</p>
                    </div>
                  ))}
                </div>

                <Link
                  to={`/services/${service.id}`}
                  className="inline-flex items-center bg-white text-slate-950 px-8 py-4 rounded-xl font-bold hover:bg-primary-50 transition-colors shadow-lg shadow-white/10"
                >
                  View Details & Pricing <ArrowRight className="ml-2" size={20} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-32 relative rounded-3xl overflow-hidden p-12 text-center border border-white/10"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900"></div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-6">Don't see exactly what you need?</h3>
            <p className="text-slate-400 mb-8 text-lg">
              Our superpower is custom integration. We build hybrid solutions that don't fit into standard boxes.
            </p>
            <Link to="/contact" className="inline-block text-primary-400 font-bold border-b border-primary-400 hover:text-white hover:border-white transition-colors pb-1 text-lg">
              Let's discuss a custom solution
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};