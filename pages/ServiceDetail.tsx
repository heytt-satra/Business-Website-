import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Check, ArrowRight, Box, Rocket, Info, ChevronRight } from 'lucide-react';
import { SERVICES } from '../constants';
import { Button } from '../components/ui/Button';
import { Image } from '../components/ui/Image';
import { ServiceTimeline } from '../components/ui/ServiceTimeline';
import { motion } from 'framer-motion';

// Service-specific images
const SERVICE_IMAGES: Record<string, string> = {
  'software': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1920',
  'branding': 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&q=80&w=1920',
};

export const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const service = SERVICES.find(s => s.id === id);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  return (
    <div className="bg-slate-900 min-h-screen overflow-hidden">
      {/* Unified Background - Same as About page */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzNDQ1NSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-10"></div>

        {/* Floating gradient orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[40%] right-[5%] w-[500px] h-[500px] bg-purple-500/15 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[20%] left-[30%] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="pt-40 pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2 text-cyan-400 font-medium mb-8 text-sm uppercase tracking-widest"
            >
              <Link to="/services" className="hover:text-white transition-colors">Services</Link>
              <ChevronRight size={14} />
              <span className="text-white">{service.title}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-md rounded-xl text-white mb-6 border border-white/20 shadow-lg">
                <service.icon size={32} />
              </div>
              <h1 className="text-4xl md:text-7xl font-bold text-white mb-8">{service.title}</h1>
              <p className="text-xl md:text-2xl text-slate-300 max-w-3xl font-light leading-relaxed text-justify">
                {service.fullDescription}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">

            {/* Content Column */}
            <div className="lg:col-span-2 space-y-20">

              {/* Sub Services Cards */}
              <section>
                <motion.h2
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="text-3xl font-bold text-white mb-8"
                >
                  Core Capabilities
                </motion.h2>
                <div className="grid gap-6">
                  {service.subServices.map((sub, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-cyan-500/50 transition-all duration-300 group"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{sub.title}</h3>
                        <div className="bg-cyan-500/20 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                          <Info size={18} className="text-cyan-400" />
                        </div>
                      </div>
                      <p className="text-slate-400 mb-6 leading-relaxed text-justify">{sub.description}</p>
                      <div className="flex flex-wrap gap-3">
                        {sub.tools.map((tool, tIdx) => (
                          <span key={tIdx} className="bg-white/10 text-slate-300 border border-white/20 text-xs font-bold uppercase px-3 py-1.5 rounded-md tracking-wide">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

            </div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-8 lg:sticky lg:top-32 h-fit"
            >

              {/* CTA Card */}
              <div className="bg-gradient-to-br from-cyan-600/20 to-purple-600/20 backdrop-blur-sm text-white p-8 rounded-2xl text-center border border-white/10">
                <h3 className="text-2xl font-bold mb-4">Start Your Project</h3>
                <p className="text-slate-300 text-sm mb-8">
                  Ready to build? Get a comprehensive audit and roadmap.
                </p>
                <Button to="/contact" variant="primary" className="w-full justify-center bg-gradient-to-r from-cyan-500 to-blue-500 border-0">
                  Book Consultation
                </Button>
              </div>

              {/* Audience Card */}
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
                <h3 className="font-bold text-white mb-6 flex items-center text-lg">
                  <Box className="mr-3 text-cyan-400" size={24} />
                  Ideal For
                </h3>
                <ul className="space-y-4">
                  {service.targetAudience.map((audience, idx) => (
                    <li key={idx} className="flex items-start text-slate-300">
                      <div className="mt-1 mr-3 bg-cyan-500/20 p-1 rounded-full">
                        <Check size={12} className="text-cyan-400" />
                      </div>
                      <span className="font-medium">{audience}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Out of Box Card */}
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
                <h3 className="font-bold text-white mb-6 flex items-center text-lg">
                  <Rocket className="mr-3 text-cyan-400" size={24} />
                  Quick Launch
                </h3>
                <ul className="space-y-3">
                  {service.outOfBox.map((item, idx) => (
                    <li key={idx} className="flex items-center text-slate-300 text-sm font-bold bg-white/10 p-3 rounded-lg border border-white/10">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

            </motion.div>
          </div>
        </div>

        {/* Animated Timeline Section */}
        {service.detailedWorkflow && (
          <ServiceTimeline
            workflow={service.detailedWorkflow}
            serviceColor={service.colorTheme}
          />
        )}
      </div>
    </div>
  );
};