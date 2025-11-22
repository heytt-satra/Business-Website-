import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Linkedin } from 'lucide-react';
import { Image } from '../components/ui/Image';
import { FOUNDERS } from '../constants';

export const About: React.FC = () => {
  return (
    <div className="bg-slate-50 overflow-hidden">
      {/* Hero / Story */}
      <section className="pt-40 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-primary-600 font-bold tracking-widest uppercase text-sm mb-6 block">Our Origin Story</span>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-12 tracking-tight">
            Forged in the Lab. <br />Built for Business.
          </h1>
          
          <div className="max-w-4xl mx-auto text-xl md:text-2xl leading-relaxed text-slate-600 space-y-8 font-light">
            <p>
              It started with <strong className="text-slate-900 font-bold">college rovers</strong> and 3 AM debugging sessions. We realized that the silos between mechanical engineering, software, and branding were artificial barriers to innovation.
            </p>
            <p>
              NexGen wasn't built as a traditional agency. It was built as a <strong className="text-slate-900 font-bold">technical task force</strong>—bringing the integrated spirit of robotics competitions to the corporate world.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Values Grid */}
      <section className="py-20 bg-slate-900 border-y border-slate-800">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
               <h2 className="text-3xl font-bold text-white mb-4">Our Core Values</h2>
               <p className="text-slate-400">The principles that guide our engineering.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-12 text-center">
              {[
                { title: "Integrated", desc: "Hardware and software speaking the same language." },
                { title: "Agile", desc: "Prototypes in weeks, not months." },
                { title: "Bold", desc: "We don't just follow specs, we challenge them." }
              ].map((val, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  className="p-8 bg-slate-800 rounded-2xl border border-slate-700 hover:border-primary-500 transition-colors"
                >
                  <h3 className="text-2xl font-bold text-white mb-4">{val.title}</h3>
                  <p className="text-slate-400 text-lg">{val.desc}</p>
                </motion.div>
              ))}
            </div>
         </div>
      </section>

      {/* The Founders (Merged Section) */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Meet the Founders</h2>
              <p className="text-xl text-slate-600">Two engineers. Four verticals. Infinite possibilities.</p>
           </div>

           {/* Detailed Profiles */}
           <div className="space-y-24">
             {FOUNDERS.map((founder, index) => (
               <div key={founder.id} className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                 <div className="lg:w-1/2">
                   <div className="relative rounded-3xl overflow-hidden aspect-[3/4] shadow-2xl group">
                      <Image 
                        src={founder.image} 
                        alt={founder.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                        <a href={founder.linkedin} className="text-white font-bold flex items-center hover:text-primary-400 transition-colors">
                           <Linkedin className="mr-2" /> Connect on LinkedIn
                        </a>
                      </div>
                   </div>
                 </div>
                 <div className="lg:w-1/2">
                    <h3 className="text-4xl font-bold text-slate-900 mb-2">{founder.name}</h3>
                    <div className="text-primary-600 font-bold text-xl mb-6">{founder.role}</div>
                    <p className="text-slate-600 text-lg leading-relaxed mb-8">{founder.bio}</p>
                    
                    <div className="mb-8">
                       <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">Expertise</h4>
                       <div className="flex flex-wrap gap-2">
                          {founder.expertise?.map((skill, i) => (
                             <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium border border-slate-200">
                                {skill}
                             </span>
                          ))}
                       </div>
                    </div>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* Journey Timeline (Merged) */}
      <section className="py-20 bg-slate-900 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Journey</h2>
            <p className="text-xl text-slate-400">From college teammates to technical co-founders</p>
          </div>

          <div className="relative">
             {/* Vertical Line */}
             <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-primary-700 transform md:-translate-x-1/2"></div>

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
                      <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl hover:border-primary-500 transition-all">
                         <h3 className="text-2xl font-bold text-white mb-2">{milestone.title}</h3>
                         <p className="text-slate-400">{milestone.description}</p>
                      </div>
                   </div>
                   
                   <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-12 h-12 bg-slate-900 border-4 border-primary-500 rounded-full flex items-center justify-center z-10 shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                   </div>

                   <div className={`flex-1 w-full ${milestone.side === 'right' ? 'md:text-right' : 'md:text-left'} ml-16 md:ml-0`}>
                      <span className="text-5xl font-bold text-primary-500 select-none opacity-80">{milestone.year}</span>
                   </div>
                </motion.div>
             ))}
          </div>
        </div>
      </section>

      <section className="py-20 text-center bg-slate-50">
         <Link to="/contact" className="inline-flex items-center px-10 py-5 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg hover:shadow-primary-500/30 text-lg">
            Work With Us <ArrowRight className="ml-2" />
         </Link>
      </section>
    </div>
  );
};