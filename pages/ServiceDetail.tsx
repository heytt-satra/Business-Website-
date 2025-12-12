import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Check, ArrowRight, Box, Rocket, Info, ChevronRight } from 'lucide-react';
import { SERVICES } from '../constants';
import { Button } from '../components/ui/Button';
import { Image } from '../components/ui/Image';
import { ServiceTimeline } from '../components/ui/ServiceTimeline';
import { motion } from 'framer-motion';

export const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const service = SERVICES.find(s => s.id === id);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Modern Hero */}
      <div className="relative bg-slate-900 pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={`https://picsum.photos/seed/${service.id}/1920/1080`}
            alt="Background"
            className="w-full h-full object-cover opacity-20 blur-sm scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/90 to-slate-50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2 text-primary-400 font-medium mb-8 text-sm uppercase tracking-widest"
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
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl font-light leading-relaxed">
              {service.fullDescription}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 -mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">

          {/* Content Column */}
          <div className="lg:col-span-2 space-y-20">

            {/* Sub Services Cards */}
            <section>
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-3xl font-bold text-slate-900 mb-8"
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
                    className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:border-primary-200 transition-all duration-300 group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors">{sub.title}</h3>
                      <div className="bg-primary-50 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                        <Info size={18} className="text-primary-600" />
                      </div>
                    </div>
                    <p className="text-slate-600 mb-6 leading-relaxed">{sub.description}</p>
                    <div className="flex flex-wrap gap-3">
                      {sub.tools.map((tool, tIdx) => (
                        <span key={tIdx} className="bg-slate-50 text-slate-600 border border-slate-200 text-xs font-bold uppercase px-3 py-1.5 rounded-md tracking-wide">
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
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 rounded-2xl text-center shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/20 rounded-full blur-2xl"></div>
              <h3 className="text-2xl font-bold mb-4 relative z-10">Start Your Project</h3>
              <p className="text-slate-300 text-sm mb-8 relative z-10">
                Ready to build? Get a comprehensive audit and roadmap.
              </p>
              <Button to="/contact" variant="primary" className="w-full justify-center relative z-10">
                Book Consultation
              </Button>
            </div>

            {/* Audience Card */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-6 flex items-center text-lg">
                <Box className="mr-3 text-primary-600" size={24} />
                Ideal For
              </h3>
              <ul className="space-y-4">
                {service.targetAudience.map((audience, idx) => (
                  <li key={idx} className="flex items-start text-slate-700">
                    <div className="mt-1 mr-3 bg-green-100 p-1 rounded-full">
                      <Check size={12} className="text-green-600" />
                    </div>
                    <span className="font-medium">{audience}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Out of Box Card */}
            <div className="bg-primary-50 p-8 rounded-2xl border border-primary-100">
              <h3 className="font-bold text-primary-900 mb-6 flex items-center text-lg">
                <Rocket className="mr-3 text-primary-600" size={24} />
                Quick Launch
              </h3>
              <ul className="space-y-3">
                {service.outOfBox.map((item, idx) => (
                  <li key={idx} className="flex items-center text-primary-800 text-sm font-bold bg-white p-3 rounded-lg shadow-sm border border-primary-100/50">
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
  );
};