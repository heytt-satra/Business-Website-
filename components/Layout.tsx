import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Linkedin, Instagram, Youtube, Search, MessageSquare, ArrowUp, ChevronRight, ChevronDown, Sun, Moon } from 'lucide-react';
import { NAV_LINKS, COMPANY_NAME, SERVICES } from '../constants';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeContext';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

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

  // Logic for header transparency/dark mode
  const isDarkHeaderPage = ['/'].includes(location.pathname) || location.pathname.startsWith('/services');

  // Header Text Color Logic
  // If scrolled: Dark text in Light Mode, White text in Dark Mode
  // If not scrolled & darkHeaderPage: White text
  // If not scrolled & lightHeaderPage: Dark text (Light Mode), White text (Dark Mode)

  const getHeaderTextColor = () => {
    if (isScrolled) return 'text-slate-900 dark:text-white';
    if (isDarkHeaderPage) return 'text-white';
    return 'text-slate-900 dark:text-white';
  };

  const headerTextColor = getHeaderTextColor();

  const headerBg = isScrolled
    ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg shadow-lg border-b border-slate-200/50 dark:border-slate-800/50'
    : 'bg-transparent';

  // Adaptive Logo Logic
  const logoBgClass = isScrolled
    ? 'bg-gradient-to-br from-primary-600 to-primary-800'
    : (isDarkHeaderPage ? 'bg-white text-primary-700' : 'bg-gradient-to-br from-primary-600 to-primary-800');

  const logoTextClass = isScrolled
    ? 'text-white'
    : (isDarkHeaderPage ? 'text-primary-700' : 'text-white');

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 dark:bg-slate-950 overflow-x-hidden selection:bg-primary-500 selection:text-white transition-colors duration-300">
      {/* Sticky Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed w-full z-50 transition-all duration-300 ${headerBg} ${isScrolled ? 'py-3' : 'py-4 md:py-6'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo with Contrast Enhancement */}
            <Link to="/" className="flex items-center space-x-3 group relative z-50">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 ${logoBgClass}`}>
                <span className={`font-extrabold text-xl ${logoTextClass}`}>N</span>
              </div>
              <span className={`text-xl font-bold tracking-tight transition-colors duration-300 ${headerTextColor} drop-shadow-sm`}>
                NexGen
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-6">
              {/* Home Link */}
              <Link
                to="/"
                className={`text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 ${!isScrolled && isDarkHeaderPage
                    ? 'text-white/90 hover:text-white hover:drop-shadow-md'
                    : 'text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400'
                  }`}
              >
                Home
              </Link>

              {/* About Link */}
              <Link
                to="/about"
                className={`text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 ${!isScrolled && isDarkHeaderPage
                    ? 'text-white/90 hover:text-white hover:drop-shadow-md'
                    : 'text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400'
                  }`}
              >
                About
              </Link>

              {/* Services Dropdown */}
              <div className="relative group">
                <button
                  className={`flex items-center text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 ${!isScrolled && isDarkHeaderPage
                      ? 'text-white/90 hover:text-white hover:drop-shadow-md'
                      : 'text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400'
                    }`}
                >
                  Services <ChevronDown size={16} className="ml-1" />
                </button>
                <div className="absolute left-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 p-2">
                  {SERVICES.map(service => (
                    <Link
                      key={service.id}
                      to={`/services/${service.id}`}
                      className="flex items-center p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <div className="w-8 h-8 bg-primary-50 dark:bg-primary-900/30 rounded-lg flex items-center justify-center text-primary-600 dark:text-primary-400 mr-3">
                        <service.icon size={16} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900 dark:text-slate-100">{service.title}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{service.shortDescription.substring(0, 30)}...</div>
                      </div>
                    </Link>
                  ))}
                  <div className="border-t border-slate-100 dark:border-slate-800 mt-2 pt-2">
                    <Link to="/services" className="block text-center text-xs font-bold text-primary-600 dark:text-primary-400 hover:underline py-1">
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
                  className={`text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 ${!isScrolled && isDarkHeaderPage
                      ? 'text-white/90 hover:text-white hover:drop-shadow-md'
                      : 'text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400'
                    }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="h-6 w-px bg-slate-200 dark:bg-slate-700/50 mx-2"></div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors ${!isScrolled && isDarkHeaderPage
                    ? 'text-white hover:bg-white/10'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <button
                onClick={() => setShowSearch(!showSearch)}
                className={`p-2 rounded-full transition-colors ${!isScrolled && isDarkHeaderPage
                    ? 'hover:bg-white/10 text-white'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              <Button
                to="/contact"
                variant={!isScrolled && isDarkHeaderPage ? 'white' : 'primary'}
                className="py-2.5 px-5 text-sm rounded-lg shadow-lg hover:shadow-xl"
              >
                Book Consultation
              </Button>
            </nav>

            {/* Mobile Menu Buttons */}
            <div className="flex items-center gap-4 lg:hidden">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors relative z-50 ${!isScrolled && isDarkHeaderPage
                    ? 'text-white'
                    : 'text-slate-900 dark:text-white'
                  }`}
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <button
                className={`p-2 rounded-lg transition-colors relative z-50 ${isMobileMenuOpen
                    ? 'text-slate-900 dark:text-white'
                    : (!isScrolled && isDarkHeaderPage ? 'text-white' : 'text-slate-900 dark:text-white')
                  }`}
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
              className="absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xl p-6 z-40"
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
            className="fixed inset-0 z-40 bg-white dark:bg-slate-950 lg:hidden pt-24 px-6 overflow-y-auto"
          >
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-2xl font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">Home</Link>
              <Link to="/about" className="text-2xl font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">About</Link>

              {/* Mobile Services Dropdown */}
              <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                <button
                  onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                  className="flex items-center justify-between w-full text-2xl font-bold text-slate-900 dark:text-white"
                >
                  Services <ChevronDown className={`transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {servicesDropdownOpen && (
                  <div className="mt-4 space-y-3 pl-4">
                    {SERVICES.map(service => (
                      <Link key={service.id} to={`/services/${service.id}`} className="block text-lg font-medium text-slate-600 dark:text-slate-400">
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
                  className="block text-2xl font-bold text-slate-900 dark:text-white hover:text-primary-600 border-b border-slate-100 dark:border-slate-800 pb-4"
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
                <Button to="/contact" variant="primary" className="w-full justify-center text-lg py-4 shadow-lg">
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

        <div className="relative">
          <AnimatePresence>
            {showChat && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="absolute bottom-16 right-0 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden"
              >
                <div className="bg-primary-600 p-4 text-white flex justify-between items-center">
                  <span className="font-bold">Chat with us</span>
                  <button onClick={() => setShowChat(false)}><X size={16} /></button>
                </div>
                <div className="p-4 h-64 overflow-y-auto bg-slate-50 dark:bg-slate-950 flex flex-col space-y-3">
                  <div className="bg-white dark:bg-slate-800 p-3 rounded-tl-xl rounded-tr-xl rounded-br-xl shadow-sm text-sm text-slate-700 dark:text-slate-300 self-start max-w-[85%] border border-slate-100 dark:border-slate-700">
                    Hi! Need help choosing a service?
                  </div>
                </div>
                <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <input type="text" placeholder="Type a message..." className="w-full text-sm outline-none p-2 bg-transparent text-slate-900 dark:text-white" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={() => setShowChat(!showChat)}
            className="p-4 bg-primary-600 text-white rounded-full shadow-2xl hover:bg-primary-700 transition-all hover:scale-105"
            aria-label="Chat"
          >
            <MessageSquare size={24} fill="currentColor" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 border-t border-slate-800 relative overflow-hidden">
        {/* High contrast check: Dark background -> Light text */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-primary-700 to-primary-900"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl flex items-center justify-center text-white shadow-lg">
                  <span className="font-bold text-xl">N</span>
                </div>
                <span className="text-2xl font-bold text-white">{COMPANY_NAME}</span>
              </Link>
              <p className="text-slate-400 leading-relaxed text-sm">
                Bridging the gap between software, hardware, and brand identity. We engineer the future for bold companies in Mumbai and beyond.
              </p>
              <div className="flex space-x-4 pt-2">
                {[Linkedin, Instagram, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all duration-300 hover:scale-110 border border-slate-700">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-6">Services</h3>
              <ul className="space-y-3">
                {SERVICES.map(service => (
                  <li key={service.id}>
                    <Link to={`/services/${service.id}`} className="text-slate-400 hover:text-white transition-colors text-sm flex items-center group">
                      <ChevronRight size={14} className="mr-2 text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-6">Company</h3>
              <ul className="space-y-3">
                {NAV_LINKS.map(link => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-slate-400 hover:text-white transition-colors text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
                <li><Link to="/contact" className="text-slate-400 hover:text-white transition-colors text-sm">Careers</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-6">Newsletter</h3>
              <p className="text-slate-400 text-sm mb-4">Get the latest tech insights and automation tips.</p>
              <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-primary-500 outline-none text-sm placeholder:text-slate-500"
                />
                <Button variant="primary" className="w-full py-2.5 text-sm">Subscribe</Button>
              </form>
              <p className="text-xs text-slate-500 mt-2">No spam, unsubscribe anytime.</p>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
            <p>&copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/legal" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/legal" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};