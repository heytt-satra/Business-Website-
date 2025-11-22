import React, { useState } from 'react';
import { CASE_STUDIES, PORTFOLIO_ITEMS } from '../constants';
import { ServiceCategory } from '../types';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Image } from '../components/ui/Image';
import { motion, AnimatePresence } from 'framer-motion';

export const CaseStudies: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');

  const filteredStudies = filter === 'all' 
    ? CASE_STUDIES 
    : CASE_STUDIES.filter(s => s.category === filter);

  const filteredPortfolio = filter === 'all'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter(p => p.category === filter);

  return (
    <div className="bg-slate-50 pt-32 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">Case Studies</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Tangible results across industries. See how we solve complex engineering and business challenges.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {['all', ServiceCategory.SOFTWARE, ServiceCategory.ROBOTICS, ServiceCategory.MECHANICAL, ServiceCategory.BRANDING].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 uppercase tracking-wide ${
                filter === cat 
                  ? 'bg-slate-900 text-white shadow-lg scale-105' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat === 'all' ? 'All Projects' : cat}
            </button>
          ))}
        </div>

        {/* Detailed Case Studies Grid */}
        <div className="mb-24">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Featured Success Stories</h2>
          <motion.div layout className="grid lg:grid-cols-2 gap-12">
            <AnimatePresence>
              {filteredStudies.map((study) => (
                <motion.div 
                  layout
                  key={study.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-shadow duration-500 group flex flex-col"
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

                  <div className="p-8 md:p-10 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                       <div>
                         <h2 className="text-2xl md:text-3xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors">{study.title}</h2>
                         <p className="text-sm text-slate-500 font-medium mt-1">{study.clientType}</p>
                       </div>
                       <ArrowUpRight className="text-slate-300 group-hover:text-primary-600 transition-colors transform group-hover:translate-x-1 group-hover:-translate-y-1" size={28} />
                    </div>
                    
                    <p className="text-slate-600 mb-8 text-lg leading-relaxed flex-grow">{study.summary}</p>
                    
                    <div className="space-y-6 bg-slate-50 p-6 rounded-xl border border-slate-100 mb-8">
                      <div>
                        <h4 className="font-bold text-slate-400 text-xs uppercase tracking-widest mb-2">Challenge</h4>
                        <p className="text-slate-800 text-sm font-medium">{study.challenge}</p>
                      </div>
                      <div className="h-px bg-slate-200 w-full"></div>
                      <div>
                        <h4 className="font-bold text-slate-400 text-xs uppercase tracking-widest mb-2">Impact</h4>
                        <div className="flex flex-wrap gap-2">
                          {study.impact.map((imp, i) => (
                            <span key={i} className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-bold">
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
        <div className="border-t border-slate-200 pt-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">More Selected Work</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
             {filteredPortfolio.map((item) => (
               <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all"
               >
                 <div className="h-48 overflow-hidden relative">
                    <Image src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white p-4 text-center text-sm font-medium">
                      {item.description}
                    </div>
                 </div>
                 <div className="p-5">
                    <h3 className="font-bold text-slate-900">{item.title}</h3>
                    <p className="text-xs text-slate-500 mb-3">{item.clientType}</p>
                    <div className="flex flex-wrap gap-1">
                      {item.serviceTags.slice(0,2).map((tag, i) => (
                        <span key={i} className="text-[10px] font-bold uppercase bg-slate-100 text-slate-500 px-2 py-1 rounded">{tag}</span>
                      ))}
                    </div>
                 </div>
               </motion.div>
             ))}
          </div>
        </div>

      </div>
    </div>
  );
};