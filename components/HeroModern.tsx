import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';

const Arrow = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`w-6 h-6 text-cyan-500 ${className}`}
    >
        <path d="M12 19V5" />
        <path d="M5 12l7 7 7-7" />
    </svg>
);

export const HeroModern: React.FC = () => {

    return (
        <div className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden pt-32 pb-20">

            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-900/20 rounded-full blur-3xl pointer-events-none" />

            {/* Floating Tags - RELOCATED TO OUTER CONTAINER FOR BETTER POSITIONING */}

            {/* Top Left */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute top-28 left-2 md:top-1/4 md:left-[5%] flex flex-col gap-2 items-start md:items-end scale-75 md:scale-100 origin-top-left md:origin-top-right z-0"
            >
                <div className="px-4 py-1.5 md:px-5 md:py-2 rounded-full border border-slate-800 bg-slate-900/80 text-cyan-400 text-xs md:text-sm font-bold shadow-lg shadow-cyan-900/10 backdrop-blur-md">
                    UI/UX Design
                </div>
                <Arrow className="rotate-[135deg] ml-8 mt-1 md:mr-8 md:mt-2 opacity-40 md:opacity-60 hidden md:block" />
            </motion.div>

            {/* Bottom Left */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute bottom-12 left-2 md:bottom-[20%] md:left-[5%] flex flex-col gap-2 items-start md:items-end scale-75 md:scale-100 origin-bottom-left md:origin-top-right z-0"
            >
                <div className="px-4 py-1.5 md:px-5 md:py-2 rounded-full border border-slate-800 bg-slate-900/80 text-cyan-400 text-xs md:text-sm font-bold shadow-lg shadow-cyan-900/10 backdrop-blur-md">
                    App Development
                </div>
                <Arrow className="rotate-[45deg] ml-8 mb-1 md:mr-8 md:mb-2 opacity-40 md:opacity-60 hidden md:block" />
            </motion.div>

            {/* Top Right */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute top-28 right-2 md:top-1/4 md:right-[5%] flex flex-col gap-2 items-end md:items-start scale-75 md:scale-100 origin-top-right md:origin-top-left z-0"
            >
                <div className="px-4 py-1.5 md:px-5 md:py-2 rounded-full border border-slate-800 bg-slate-900/80 text-cyan-400 text-xs md:text-sm font-bold shadow-lg shadow-cyan-900/10 backdrop-blur-md">
                    Data Insights
                </div>
                <Arrow className="rotate-[-135deg] mr-8 mt-1 md:ml-8 md:mt-2 opacity-40 md:opacity-60 hidden md:block" />
            </motion.div>

            {/* Bottom Right */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute bottom-12 right-2 md:bottom-[20%] md:right-[5%] flex flex-col gap-2 items-end md:items-start scale-75 md:scale-100 origin-bottom-right md:origin-top-left z-0"
            >
                <div className="px-4 py-1.5 md:px-5 md:py-2 rounded-full border border-slate-800 bg-slate-900/80 text-cyan-400 text-xs md:text-sm font-bold shadow-lg shadow-cyan-900/10 backdrop-blur-md">
                    Digital Marketing
                </div>
                <Arrow className="rotate-[-45deg] mr-8 mb-1 md:ml-8 md:mb-2 opacity-40 md:opacity-60 hidden md:block" />
            </motion.div>

            {/* Main Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">

                {/* Center Headline */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-20 max-w-4xl mx-auto mt-0 md:mt-0"
                >
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight mb-8">
                        We Build Digital <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                            Experiences
                        </span> <br />
                        That Grow Brands
                    </h1>

                    <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed text-center px-4">
                        We Help Brands Grow Through Data-Driven Strategies, Creative Design, And Cutting-Edge Digital Technology
                    </p>

                    {/* Email Capture / CTA */}
                    <div className="max-w-md mx-auto relative w-full px-4">
                        <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full opacity-20"></div>
                        <form onSubmit={(e) => e.preventDefault()} className="relative flex items-center bg-slate-900/90 border border-slate-700/50 p-1.5 md:p-2 rounded-full shadow-2xl backdrop-blur-sm group hover:border-cyan-500/30 transition-colors w-full">
                            <input
                                type="email"
                                placeholder="Enter Your Email"
                                className="flex-1 bg-transparent px-4 md:px-6 text-white text-sm md:text-base placeholder:text-slate-500 outline-none w-full min-w-0"
                            />
                            <Button variant="primary" className="rounded-full px-6 py-2 md:px-8 md:py-3 bg-cyan-600 hover:bg-cyan-500 text-white text-sm md:text-base font-bold transition-all shadow-lg hover:shadow-cyan-500/25 shrink-0">
                                Subscribe
                            </Button>

                            {/* Decorative corner markers for the input box */}
                            <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-500/50 rounded-tl-lg" />
                            <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-cyan-500/50 rounded-tr-lg" />
                            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-cyan-500/50 rounded-bl-lg" />
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-500/50 rounded-br-lg" />
                        </form>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};
