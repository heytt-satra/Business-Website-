import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Linkedin, Target, Rocket, Lightbulb, Users, Zap, TrendingUp } from 'lucide-react';
import { Image } from '../components/ui/Image';
import { FOUNDERS } from '../constants';

export const About: React.FC = () => {
  return (
    <div className="bg-slate-900 overflow-hidden min-h-screen">
      {/* Single Unified Background - No dividers */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzNDQ1NSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-10"></div>

        {/* Floating gradient orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-primary-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[40%] right-[5%] w-[500px] h-[500px] bg-purple-500/15 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[20%] left-[30%] w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Main Content Container - Seamless flow */}
      <div className="relative z-10">

        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center pt-32 pb-24 px-4">
          <div className="max-w-6xl mx-auto text-center">
            {/* Animated Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-slate-300 text-sm font-medium">My Journey</span>
            </motion.div>

            {/* Main Heading - Fixed gradient visibility */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight"
            >
              <span className="text-white">From </span>
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">Passion</span>
              <br />
              <span className="text-white">to </span>
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-400">Impact</span>
            </motion.h1>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <p className="text-xl md:text-2xl text-slate-300 leading-relaxed mb-6 text-justify">
                  It started with late-night coding sessions and a simple belief:
                  <span className="text-white font-semibold"> great software deserves great branding</span>, and vice versa.
                </p>
                <p className="text-lg text-slate-400 leading-relaxed text-justify">
                  Tera Industries was built as a <span className="text-cyan-400 font-semibold">one-stop solution</span> - combining technical excellence with strategic brand thinking to help businesses truly stand out.
                </p>
              </div>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12"
            >
              {[
                { value: "2+", label: "Years Experience" },
                { value: "25+", label: "Projects Delivered" },
                { value: "100%", label: "Client Satisfaction" }
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Core Values Section - Slider on Mobile, Grid on Desktop */}
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-cyan-400 font-bold tracking-widest uppercase text-sm mb-4 block">What I Stand For</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Core Values</h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">The principles that drive every project I take on.</p>
            </motion.div>

            {/* Mobile Slider / Desktop Grid Container */}
            <div className="flex overflow-x-auto snap-x snaps-mandatory md:grid md:grid-cols-3 gap-6 pb-8 md:pb-0 px-2 md:px-0 no-scrollbar">
              {[
                {
                  icon: Lightbulb,
                  title: "Innovation First",
                  desc: "Every project is an opportunity to push boundaries and create something remarkable.",
                  gradient: "from-amber-500 to-orange-600"
                },
                {
                  icon: Zap,
                  title: "Speed & Quality",
                  desc: "Fast delivery without compromising on excellence. MVPs in weeks, not months.",
                  gradient: "from-blue-500 to-cyan-500"
                },
                {
                  icon: TrendingUp,
                  title: "Results Driven",
                  desc: "I optimize for business outcomes, not just beautiful designs or clean code.",
                  gradient: "from-green-500 to-emerald-500"
                }
              ].map((val, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.15 }}
                  viewport={{ once: true }}
                  className="min-w-[85%] md:min-w-0 snap-center"
                >
                  <div className="h-full bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:bg-white/10 flex flex-col items-start text-left">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${val.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform shrink-0`}>
                      <val.icon size={28} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{val.title}</h3>
                    <p className="text-slate-400 leading-relaxed text-justify">{val.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* The Founder Section - Seamless continuation */}
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-cyan-400 font-bold tracking-widest uppercase text-sm mb-4 block">The Person Behind Tera Industries</span>
              <h2 className="text-4xl font-bold text-white mb-4">Meet the Founder</h2>
              <p className="text-xl text-slate-400">The vision and expertise driving your success.</p>
            </motion.div>

            {/* Single Founder Profile */}
            <div className="max-w-5xl mx-auto">
              {FOUNDERS.map((founder) => (
                <motion.div
                  key={founder.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col lg:flex-row gap-12 items-center"
                >
                  {/* Image container - Fixed sizing */}
                  <div className="lg:w-1/2 w-full max-w-md mx-auto lg:mx-0">
                    <div className="relative group">
                      {/* Glow effect */}
                      <div className="absolute -inset-4 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity"></div>

                      {/* Image wrapper with fixed aspect ratio */}
                      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-[3/4]">
                        <Image
                          src={founder.image}
                          alt={founder.name}
                          className="w-full h-full object-cover object-top"
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                          <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" className="text-white font-bold flex items-center hover:text-cyan-400 transition-colors">
                            <Linkedin className="mr-2" /> Connect on LinkedIn
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:w-1/2 text-center lg:text-left">
                    <h3 className="text-4xl font-bold text-white mb-2">{founder.name}</h3>
                    <div className="text-cyan-400 font-bold text-xl mb-6">{founder.role}</div>
                    <p className="text-slate-300 text-lg leading-relaxed mb-8 text-justify">{founder.bio}</p>

                    <div className="mb-8">
                      <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Expertise</h4>
                      <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                        {founder.expertise?.map((skill, i) => (
                          <span key={i} className="px-4 py-2 bg-white/10 text-white rounded-xl text-sm font-medium border border-white/20 hover:bg-white/20 transition-colors">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-lg"
                    >
                      <Linkedin className="mr-2" size={20} /> Let's Connect
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Future Vision Section - Seamless continuation */}
        <section className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl mb-8 border border-white/20">
                <Rocket size={40} className="text-white" />
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">The Vision Ahead</h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed text-justify">
                Tera Industries is more than a service provider - it's a mission to democratize quality digital solutions for growing businesses.
                My goal is to help 100+ businesses transform their digital presence and brand identity by 2026.
              </p>

              <div className="flex overflow-x-auto snap-x snaps-mandatory md:grid md:grid-cols-3 gap-6 mt-16 pb-8 md:pb-0 px-2 md:px-0 no-scrollbar">
                {[
                  { number: "100+", label: "Businesses Transformed", icon: Users },
                  { number: "2026", label: "Vision Year", icon: Target },
                  { number: "∞", label: "Growth Potential", icon: TrendingUp }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="min-w-[85%] md:min-w-0 snap-center"
                  >
                    <div className="h-full bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-cyan-500/50 transition-colors flex flex-col items-center justify-center">
                      <div className="text-5xl md:text-6xl font-bold text-white mb-2">{item.number}</div>
                      <div className="text-slate-400 uppercase tracking-widest text-sm flex items-center justify-center gap-2">
                        <item.icon size={16} /> {item.label}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-cyan-600/20 to-purple-600/20 backdrop-blur-sm rounded-3xl p-12 border border-white/10"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Build Something Amazing?</h2>
              <p className="text-slate-300 text-lg mb-8">Let's discuss how I can help transform your business.</p>
              <Link
                to="/contact"
                className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-lg text-lg"
              >
                Work With Me <ArrowRight className="ml-2" />
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};