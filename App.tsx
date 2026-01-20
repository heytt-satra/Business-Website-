import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ThemeProvider } from './components/ThemeContext';

// Lazy load page components for performance
const Home = React.lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const About = React.lazy(() => import('./pages/About').then(module => ({ default: module.About })));
const ServicesHub = React.lazy(() => import('./pages/ServicesHub').then(module => ({ default: module.ServicesHub })));
const ServiceDetail = React.lazy(() => import('./pages/ServiceDetail').then(module => ({ default: module.ServiceDetail })));
const Blog = React.lazy(() => import('./pages/Blog').then(module => ({ default: module.Blog })));
const Contact = React.lazy(() => import('./pages/Contact').then(module => ({ default: module.Contact })));
const BlogPostDetail = React.lazy(() => import('./pages/BlogPostDetail').then(module => ({ default: module.BlogPostDetail })));
const NotFound = React.lazy(() => import('./pages/NotFound').then(module => ({ default: module.NotFound })));

const Legal: React.FC = () => (
  <div className="pt-32 pb-20 max-w-4xl mx-auto px-4">
    <h1 className="text-4xl font-bold mb-8 dark:text-white">Legal & Policy</h1>
    <p className="text-slate-600 dark:text-slate-400">This is a placeholder for Privacy Policy, Terms of Service, and other legal documents.</p>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <React.Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-slate-950">
              <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<ServicesHub />} />
              <Route path="/services/:id" element={<ServiceDetail />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPostDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/legal" element={<Legal />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </React.Suspense>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;