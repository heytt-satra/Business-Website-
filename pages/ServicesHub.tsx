import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SERVICES } from '../constants';
import { Image } from '../components/ui/Image';
import { motion } from 'framer-motion';

// Service-specific images
const SERVICE_IMAGES: Record<string, string> = {
  'software': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
  'branding': 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&q=80&w=800',
};

export const ServicesHub: React.FC = () => {
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
      <div className="relative z-10 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-24"
          >
            <h1 className="text-4xl md:text-7xl font-bold mb-8 tracking-tight">
              <span className="text-white">Our </span>
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">Services</span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Two powerful verticals working together to transform your business. We provide the comprehensive technical infrastructure you need to scale.
            </p>
          </motion.div>

          {/* Services Grid */}
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
                  <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl border border-white/10">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-500"></div>
                    <Image
                      src={SERVICE_IMAGES[service.id] || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800'}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                    />

                    {/* Floating Icon */}
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-slate-900 rounded-full flex items-center justify-center border-4 border-slate-800 z-20 shadow-xl">
                      <service.icon size={48} className="text-white" />
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="lg:w-1/2 w-full">
                  <div className="flex items-center space-x-3 mb-6">
                    <span className="h-px w-12 bg-cyan-500"></span>
                    <span className="text-cyan-400 font-bold uppercase tracking-widest text-sm">
                      0{index + 1} — {service.id}
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">{service.title}</h2>
                  <p className="text-slate-300 text-lg mb-10 leading-relaxed">
                    {service.fullDescription}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-10">
                    {service.subServices.map((sub, idx) => (
                      <div key={idx} className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:bg-white/10 hover:border-cyan-500/50 transition-colors">
                        <div className="flex items-center mb-2">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 shadow-[0_0_10px_#22d3ee]"></div>
                          <span className="text-white font-bold">{sub.title}</span>
                        </div>
                        <p className="text-slate-400 text-sm pl-5">{sub.description}</p>
                      </div>
                    ))}
                  </div>

                  <Link
                    to={`/services/${service.id}`}
                    className="inline-flex items-center bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg"
                  >
                    View Details & Pricing <ArrowRight className="ml-2" size={20} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-32 bg-gradient-to-br from-cyan-600/20 to-purple-600/20 backdrop-blur-sm rounded-3xl p-12 text-center border border-white/10"
          >
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl font-bold text-white mb-6">Don't see exactly what you need?</h3>
              <p className="text-slate-300 mb-8 text-lg">
                Our superpower is custom integration. We build hybrid solutions that don't fit into standard boxes.
              </p>
              <Link to="/contact" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-lg">
                Let's discuss a custom solution <ArrowRight className="ml-2" size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};