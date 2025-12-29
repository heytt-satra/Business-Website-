import React, { useState } from 'react';
import { CASE_STUDIES, PORTFOLIO_ITEMS } from '../constants';
import { ServiceCategory } from '../types';
import { ArrowUpRight } from 'lucide-react';
import { Image } from '../components/ui/Image';
import { motion, AnimatePresence } from 'framer-motion';

export const CaseStudies: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');

  // Filter to only show Software and Branding categories
  const availableCategories = ['all', ServiceCategory.SOFTWARE, ServiceCategory.BRANDING];
  // Comment out Robotics and Mechanical
  // const allCategories = ['all', ServiceCategory.SOFTWARE, ServiceCategory.ROBOTICS, ServiceCategory.MECHANICAL, ServiceCategory.BRANDING];

  // Filter case studies to only show Software and Branding
  const softwareAndBrandingStudies = CASE_STUDIES.filter(
    s => s.category === ServiceCategory.SOFTWARE || s.category === ServiceCategory.BRANDING
  );

  const filteredStudies = filter === 'all'
    ? softwareAndBrandingStudies
    : softwareAndBrandingStudies.filter(s => s.category === filter);

  // Filter portfolio items to only show Software and Branding
  const softwareAndBrandingPortfolio = PORTFOLIO_ITEMS.filter(
    p => p.category === ServiceCategory.SOFTWARE || p.category === ServiceCategory.BRANDING
  );

  const filteredPortfolio = filter === 'all'
    ? softwareAndBrandingPortfolio
    : softwareAndBrandingPortfolio.filter(p => p.category === filter);

  return (
    <div className="bg-slate-900 min-h-screen overflow-hidden">
      {/* Unified Background - Same as other pages */}
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
          {/* Header */}
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-6xl font-bold text-white mb-6"
            >
              Case Studies
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
            >
              Tangible results across industries. See how we solve complex engineering and business challenges.
            </motion.p>
          </div>

          {/* Filter Tabs - Only Software and Branding */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {availableCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 uppercase tracking-wide ${filter === cat
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg scale-105'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20 border border-white/20'
                  }`}
              >
                {cat === 'all' ? 'All Projects' : cat}
              </button>
            ))}
          </div>

          {/* Detailed Case Studies Grid */}
          <div className="mb-24">
            <h2 className="text-2xl font-bold text-white mb-8">Featured Success Stories</h2>
            <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              <AnimatePresence>
                {filteredStudies.map((study) => (
                  <motion.div
                    layout
                    key={study.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:border-cyan-500/50 transition-all duration-500 group flex flex-col"
                  >
                    <div className="relative h-[300px] overflow-hidden">
                      <Image
                        src={study.imageUrl}
                        alt={study.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute top-6 left-6 z-20">
                        <span className="px-4 py-1.5 bg-white/95 backdrop-blur text-slate-900 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                          {study.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 md:p-10 flex-grow flex flex-col">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h2 className="text-2xl md:text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors">{study.title}</h2>
                          <p className="text-sm text-slate-500 font-medium mt-1">{study.clientType}</p>
                        </div>
                        <ArrowUpRight className="text-slate-500 group-hover:text-cyan-400 transition-colors transform group-hover:translate-x-1 group-hover:-translate-y-1" size={28} />
                      </div>

                      <p className="text-slate-400 mb-8 text-lg leading-relaxed flex-grow">{study.summary}</p>

                      <div className="space-y-6 bg-white/5 p-6 rounded-xl border border-white/10 mb-8">
                        <div>
                          <h4 className="font-bold text-slate-500 text-xs uppercase tracking-widest mb-2">Challenge</h4>
                          <p className="text-slate-300 text-sm font-medium">{study.challenge}</p>
                        </div>
                        <div className="h-px bg-white/10 w-full"></div>
                        <div>
                          <h4 className="font-bold text-slate-500 text-xs uppercase tracking-widest mb-2">Impact</h4>
                          <div className="flex flex-wrap gap-2">
                            {study.impact.map((imp, i) => (
                              <span key={i} className="bg-cyan-500/20 text-cyan-400 text-xs px-2 py-1 rounded font-bold">
                                {imp}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Portfolio Grid */}
          <div className="pt-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">More Selected Work</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredPortfolio.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="group bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-cyan-500/50 transition-all"
                >
                  <div className="h-48 overflow-hidden relative">
                    <Image src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white p-4 text-center text-sm font-medium">
                      {item.description}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-white">{item.title}</h3>
                    <p className="text-xs text-slate-500 mb-3">{item.clientType}</p>
                    <div className="flex flex-wrap gap-1">
                      {item.serviceTags.slice(0, 2).map((tag, i) => (
                        <span key={i} className="text-[10px] font-bold uppercase bg-white/10 text-slate-400 px-2 py-1 rounded">{tag}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};