import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Box, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Image } from '../components/ui/Image';
import { SERVICES, CASE_STUDIES, TESTIMONIALS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { Hero3D } from '../components/Hero3D';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: "easeOut" as const }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export const Home: React.FC = () => {
  const [selectorStep, setSelectorStep] = useState(0);
  const [selectedGoal, setSelectedGoal] = useState("");
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 overflow-x-hidden transition-colors duration-300">
      {/* 3D Immersive Hero Section */}
      <Hero3D />

      {/* Service Selector Widget */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950 relative z-20 -mt-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 p-8 md:p-12 text-center relative overflow-hidden transition-colors">
             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-500 to-primary-700"></div>
             
             {selectorStep === 0 && (
               <motion.div initial={{opacity: 0}} animate={{opacity: 1}}>
                 <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Not sure where to start?</h2>
                 <p className="text-slate-600 dark:text-slate-300 mb-8 text-lg">Tell us your primary goal, and we'll point you to the right team.</p>
                 <div className="grid md:grid-cols-2 gap-4">
                    {['Automate a process', 'Build a digital product', 'Manufacture a prototype', 'Grow my brand'].map((goal) => (
                      <button 
                        key={goal}
                        onClick={() => { setSelectedGoal(goal); setSelectorStep(1); }}
                        className="p-4 rounded-xl border-2 border-slate-100 dark:border-slate-800 hover:border-primary-500 dark:hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all font-bold text-slate-700 dark:text-slate-200 text-left flex items-center group"
                      >
                        <div className="w-6 h-6 rounded-full border-2 border-slate-300 dark:border-slate-600 mr-3 flex-shrink-0 group-hover:border-primary-500"></div>
                        {goal}
                      </button>
                    ))}
                 </div>
               </motion.div>
             )}

             {selectorStep === 1 && (
               <motion.div initial={{opacity: 0}} animate={{opacity: 1}}>
                 <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Great choice.</h2>
                 <p className="text-slate-600 dark:text-slate-300 mb-8 text-lg">Based on "{selectedGoal}", we recommend exploring:</p>
                 <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button to="/services" variant="primary">View Recommended Services</Button>
                  <button onClick={() => setSelectorStep(0)} className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium px-6 py-3">Start Over</button>
                 </div>
               </motion.div>
             )}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Integrated Capabilities</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Bridging four critical domains under one roof.
            </p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {SERVICES.map((service) => (
              <motion.div 
                key={service.id}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  show: { opacity: 1, y: 0 }
                }}
              >
                <Link 
                  to={`/services/${service.id}`}
                  className="group relative block h-full bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-slate-800 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-900/20 dark:to-primary-800/20 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-700"></div>
                  
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-xl shadow-md flex items-center justify-center text-primary-600 dark:text-primary-400 mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 border border-slate-100 dark:border-slate-700">
                      <service.icon size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{service.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8 opacity-80">
                      {service.shortDescription}
                    </p>
                    <div className="flex items-center text-primary-600 dark:text-primary-400 font-bold text-sm group-hover:translate-x-2 transition-transform">
                      Explore <ArrowRight size={16} className="ml-2" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Value Prop - Dark Section with Contrast Fixes */}
      <section className="py-32 bg-slate-900 dark:bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div {...fadeInUp}>
              <div className="inline-block px-4 py-1 rounded-full border border-primary-500/30 bg-primary-500/10 text-primary-300 text-xs font-bold uppercase tracking-wider mb-6">
                Why NexGen?
              </div>
              {/* Explicit white text */}
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                Founders Building <br /> For Founders.
              </h2>
              {/* Explicit light gray text */}
              <p className="text-slate-300 text-lg mb-10 leading-relaxed">
                We aren't a typical agency outsourcing tickets. We are engineers and product owners who treat your project with the same rigor as our own startups.
              </p>
              <div className="space-y-6">
                {[
                  { title: "Integrated Thinking", desc: "Hardware constraints inform software logic, and brand story drives product design." },
                  { title: "Rapid Prototyping", desc: "We move from sketch to functional MVP faster than traditional siloed teams." },
                  { title: "ROI Focused", desc: "We optimize for business outcomes, not just technical specifications." }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start">
                    {/* Lighter Icon Color for dark background */}
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white mr-6 flex-shrink-0 border border-white/20">
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl text-white mb-2">{item.title}</h4>
                      <p className="text-slate-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl blur-2xl opacity-30 animate-pulse"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                 {/* Image component with fallback */}
                 <Image 
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000" 
                    alt="Engineering Collaboration" 
                    className="w-full h-[600px] object-cover"
                    fallbackText="Engineering Lab"
                 />
                 {/* Overlay for better text contrast if we put text over image */}
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Case Studies */}
      <section className="py-32 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <motion.div {...fadeInUp} className="max-w-2xl">
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Proven Results</h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg">Real challenges solved with precision engineering.</p>
            </motion.div>
            <Button to="/case-studies" variant="outline" className="hidden md:inline-flex border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 mt-4 md:mt-0">
              View All Case Studies
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {CASE_STUDIES.slice(0, 3).map((study, idx) => (
              <motion.div 
                key={study.id} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="group cursor-pointer flex flex-col h-full"
              >
                <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[4/3] shadow-md border border-slate-100 dark:border-slate-800">
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-colors duration-300 z-10 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 border border-white/30">
                      <ArrowRight size={24} />
                    </div>
                  </div>
                  <Image 
                    src={study.imageUrl} 
                    alt={study.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 bg-white/95 backdrop-blur text-slate-900 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                      {study.category}
                    </span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{study.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 leading-relaxed flex-grow">{study.summary}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Stats (Moved Here) */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950 border-y border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-200 dark:divide-slate-800 mb-16"
          >
            {[
              { label: "Projects Delivered", value: "50+" },
              { label: "Client Satisfaction", value: "100%" },
              { label: "Lines of Code", value: "1M+" },
              { label: "Robots Deployed", value: "20+" },
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
                className="p-4"
              >
                <div className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-2 font-sans">{stat.value}</div>
                <div className="text-sm uppercase tracking-widest text-slate-500 dark:text-slate-400 font-semibold">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <div className="pt-4">
             <p className="text-center text-slate-400 text-sm font-bold uppercase tracking-widest mb-8">Trusted By Innovators</p>
             <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Dummy Logos - Using text as per instruction if no SVG */}
                {['FreshMart', 'MegaStock', 'CircuitCraft', 'CloudKompass'].map(logo => (
                  <div key={logo} className="text-2xl font-black text-slate-400 dark:text-slate-600 hover:text-slate-800 dark:hover:text-slate-300 cursor-default transition-colors">{logo}</div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* Testimonials Slider */}
      <section className="py-24 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16 text-slate-900 dark:text-white">What Our Clients Say</h2>
          
          <div className="relative">
            <div className="overflow-hidden relative rounded-3xl bg-slate-50 dark:bg-slate-800 p-8 md:p-12 border border-slate-100 dark:border-slate-700 shadow-lg transition-colors">
               <AnimatePresence mode="wait">
                 <motion.div
                   key={currentTestimonial}
                   initial={{ opacity: 0, x: 50 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -50 }}
                   transition={{ duration: 0.5 }}
                   className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
                 >
                   <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex-shrink-0 border-4 border-white dark:border-slate-600 shadow-md">
                     <Image 
                       src={TESTIMONIALS[currentTestimonial].avatarUrl || ""} 
                       alt={TESTIMONIALS[currentTestimonial].name}
                       className="w-full h-full object-cover"
                     />
                   </div>
                   <div className="flex-1 text-center md:text-left">
                     <div className="flex justify-center md:justify-start items-center mb-4 text-amber-400">
                       {[...Array(5)].map((_, i) => (
                         <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                           <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                         </svg>
                       ))}
                     </div>
                     <blockquote className="text-xl md:text-2xl text-slate-700 dark:text-slate-200 italic font-light mb-6">
                       "{TESTIMONIALS[currentTestimonial].quote}"
                     </blockquote>
                     <div>
                       <div className="font-bold text-slate-900 dark:text-white text-lg">{TESTIMONIALS[currentTestimonial].name}</div>
                       <div className="text-sm text-slate-500 dark:text-slate-400">
                         {TESTIMONIALS[currentTestimonial].role}, {TESTIMONIALS[currentTestimonial].company}
                       </div>
                       <div className="mt-2 inline-block px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wide">
                          {TESTIMONIALS[currentTestimonial].projectType}
                       </div>
                     </div>
                   </div>
                 </motion.div>
               </AnimatePresence>
            </div>

            {/* Slider Controls */}
            <button 
              onClick={prevTestimonial}
              className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:scale-110 transition-all z-10"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextTestimonial}
              className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:scale-110 transition-all z-10"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="flex justify-center mt-8 gap-2">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentTestimonial(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${idx === currentTestimonial ? 'bg-primary-600 w-6' : 'bg-slate-300 dark:bg-slate-600 hover:bg-slate-400'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-slate-50 dark:bg-slate-950">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto bg-gradient-to-br from-primary-900 to-slate-900 rounded-3xl overflow-hidden shadow-2xl relative"
        >
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
          <div className="relative z-10 p-12 md:p-20 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to disrupt your industry?</h2>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">Book a strategy call to discuss your project needs.</p>
            <Button to="/contact" variant="white" className="text-lg px-12 py-5 shadow-xl">
              Book Your Strategy Call
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};