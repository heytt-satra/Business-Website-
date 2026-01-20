import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Linkedin, Instagram, Youtube, Search, ArrowUp, ChevronRight, ChevronDown } from 'lucide-react';
import { NAV_LINKS, COMPANY_NAME, SERVICES } from '../constants';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const location = useLocation();
  // Theme context removed - Dark mode enforced

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Header Logic - Simplified for Global Dark Mode
  const headerBg = isScrolled
    ? 'bg-slate-900/95 backdrop-blur-lg shadow-lg border-b border-slate-800/50'
    : 'bg-transparent';

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-950 overflow-x-hidden selection:bg-primary-500 selection:text-white transition-colors duration-300">
      {/* Sticky Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed w-full z-50 transition-all duration-300 ${headerBg} ${isScrolled ? 'py-3' : 'py-4 md:py-6'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo with Contrast Enhancement - Always White */}
            <Link to="/" className="flex items-center group relative z-50">
              <img
                src="/images/tera-header-logo.png"
                alt="Tera Industries"
                className="h-10 sm:h-12 md:h-14 lg:h-14 object-contain transition-all duration-300 group-hover:scale-105 brightness-0 invert"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-6">
              {/* Home Link */}
              <Link
                to="/"
                className="text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 text-white/90 hover:text-white hover:drop-shadow-md"
              >
                Home
              </Link>

              {/* About Link */}
              <Link
                to="/about"
                className="text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 text-white/90 hover:text-white hover:drop-shadow-md"
              >
                About
              </Link>

              {/* Services Dropdown */}
              <div className="relative group">
                <button
                  className="flex items-center text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 text-white/90 hover:text-white hover:drop-shadow-md"
                >
                  Services <ChevronDown size={16} className="ml-1" />
                </button>
                <div className="absolute left-0 mt-2 w-64 bg-slate-950 rounded-xl shadow-xl border border-slate-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 p-2">
                  {SERVICES.map(service => (
                    <Link
                      key={service.id}
                      to={`/services/${service.id}`}
                      className="flex items-center p-3 rounded-lg hover:bg-slate-900 transition-colors group"
                    >
                      <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-cyan-400 group-hover:text-white group-hover:bg-cyan-500 transition-all duration-300 mr-3">
                        <service.icon size={16} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">{service.title}</div>
                        <div className="text-xs text-slate-300 group-hover:text-slate-200 transition-colors">{service.shortDescription.substring(0, 30)}...</div>
                      </div>
                    </Link>
                  ))}
                  <div className="border-t border-slate-800 mt-2 pt-2">
                    <Link to="/services" className="block text-center text-xs font-bold text-cyan-400 hover:text-white hover:underline py-1 transition-colors">
                      View All Services
                    </Link>
                  </div>
                </div>
              </div>

              {/* Other Links */}
              {NAV_LINKS.filter(l => l.name !== 'Home' && l.name !== 'About').map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 text-white/90 hover:text-white hover:drop-shadow-md"
                >
                  {link.name}
                </Link>
              ))}

              <div className="h-6 w-px bg-slate-700/50 mx-2"></div>

              {/* Theme Toggle Removed - Enforced Dark Mode */}

              <button
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 rounded-full transition-colors hover:bg-white/10 text-white"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              <Button
                to="/contact"
                variant="white"
                className="py-2.5 px-5 text-sm rounded-lg shadow-lg hover:shadow-xl"
              >
                Book Consultation
              </Button>
            </nav>

            {/* Mobile Menu Buttons */}
            <div className="flex items-center gap-4 lg:hidden">
              {/* Mobile Theme Toggle Removed */}

              <button
                className="p-2 rounded-lg transition-colors relative z-50 text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Search Overlay */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-slate-900 border-b border-slate-800 shadow-xl p-6 z-40"
            >
              <div className="max-w-3xl mx-auto flex items-center">
                <Search className="text-slate-400 mr-4" />
                <input
                  type="text"
                  placeholder="Search services, case studies, insights..."
                  className="flex-grow p-2 outline-none text-xl text-slate-900 dark:text-white bg-transparent placeholder:text-slate-400"
                  autoFocus
                />
                <button onClick={() => setShowSearch(false)} className="text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white ml-4">
                  Close
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 z-40 bg-slate-950 lg:hidden pt-24 px-6 overflow-y-auto"
          >
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-2xl font-bold text-white border-b border-slate-800 pb-4">Home</Link>
              <Link to="/about" className="text-2xl font-bold text-white border-b border-slate-800 pb-4">About</Link>

              {/* Mobile Services Dropdown */}
              <div className="border-b border-slate-800 pb-4">
                <div className="flex items-center justify-between w-full text-2xl font-bold text-white">
                  <Link
                    to="/services"
                    className="hover:text-cyan-400 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Services
                  </Link>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setServicesDropdownOpen(!servicesDropdownOpen);
                    }}
                    className="p-2 -mr-2"
                    aria-label="Toggle Services Menu"
                  >
                    <ChevronDown className={`transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>
                {servicesDropdownOpen && (
                  <div className="mt-4 space-y-3 pl-4">
                    {SERVICES.map(service => (
                      <Link key={service.id} to={`/services/${service.id}`} className="block text-lg font-medium text-slate-400 hover:text-cyan-400 transition-colors">
                        {service.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {NAV_LINKS.filter(l => l.name !== 'Home' && l.name !== 'About').map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block text-2xl font-bold text-white hover:text-cyan-400 border-b border-slate-800 pb-4 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-4"
              >
                <Button to="/contact" variant="primary" className="w-full justify-center text-lg py-4 shadow-lg bg-cyan-600 hover:bg-cyan-500 text-white border-0">
                  Book Consultation
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow relative dark:bg-slate-950">
        {children}
      </main>

      {/* Live Chat & Back To Top */}
      <div className="fixed bottom-8 right-8 z-40 flex flex-col items-end space-y-4">
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              onClick={scrollToTop}
              className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-xl border border-slate-100 dark:border-slate-700 text-slate-400 hover:text-primary-600 hover:scale-110 transition-all duration-300"
              aria-label="Back to top"
            >
              <ArrowUp size={24} />
            </motion.button>
          )}
        </AnimatePresence>


      </div>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-300 border-t border-slate-800/50 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Top Gradient Border */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary-500/50 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">

            {/* Brand Column (Spans 5 columns) */}
            <div className="lg:col-span-5 space-y-6">
              <Link to="/" className="inline-block">
                <img
                  src="/images/new-footer-logo.png"
                  alt="Tera Industries"
                  className="h-14 w-auto object-contain"
                />
              </Link>
              <p className="text-slate-400 leading-relaxed text-base max-w-md">
                Tera Industries is the high-scale engineering firm architecting the intelligence and infrastructure of the future.
              </p>
              <div className="flex space-x-4 pt-4">
                {[Linkedin, Instagram, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="group w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-gradient-to-br hover:from-primary-600 hover:to-cyan-600 hover:border-transparent transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25">
                    <Icon size={20} className="text-slate-400 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Spacer Column */}
            <div className="hidden lg:block lg:col-span-1"></div>

            {/* Services Column */}
            <div className="lg:col-span-3">
              <h3 className="text-white font-bold text-lg mb-6 flex items-center">
                <span className="w-8 h-1 bg-gradient-to-r from-primary-500 to-cyan-500 mr-3 rounded-full"></span>
                Services
              </h3>
              <ul className="space-y-4">
                {SERVICES.map(service => (
                  <li key={service.id}>
                    <Link to={`/services/${service.id}`} className="text-slate-400 hover:text-cyan-400 transition-colors text-sm flex items-center group">
                      <ChevronRight size={14} className="mr-2 text-slate-600 group-hover:text-cyan-500 transition-colors" />
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div className="lg:col-span-3">
              <h3 className="text-white font-bold text-lg mb-6 flex items-center">
                <span className="w-8 h-1 bg-gradient-to-r from-primary-500 to-cyan-500 mr-3 rounded-full"></span>
                Company
              </h3>
              <ul className="space-y-4">
                {NAV_LINKS.map(link => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-slate-400 hover:text-cyan-400 transition-colors text-sm flex items-center group">
                      <span className="w-1 h-1 bg-slate-600 rounded-full mr-3 group-hover:bg-cyan-500 transition-colors"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/contact" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm flex items-center group">
                    <span className="w-1 h-1 bg-slate-600 rounded-full mr-3 group-hover:bg-cyan-500 transition-colors"></span>
                    Careers
                  </Link>
                </li>
              </ul>
            </div>

          </div>

          <div className="border-t border-slate-800/50 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
            <p>&copy; {new Date().getFullYear()} {COMPANY_NAME}. <span className="hidden sm:inline">All rights reserved.</span></p>
            <div className="flex space-x-8 mt-4 md:mt-0">
              <Link to="/legal" className="hover:text-cyan-400 transition-colors hover:underline decoration-cyan-500/30 underline-offset-4">Privacy Policy</Link>
              <Link to="/legal" className="hover:text-cyan-400 transition-colors hover:underline decoration-cyan-500/30 underline-offset-4">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};