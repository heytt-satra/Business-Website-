import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { ServicesHub } from './pages/ServicesHub';
import { ServiceDetail } from './pages/ServiceDetail';
import { CaseStudies } from './pages/CaseStudies';
import { Blog } from './pages/Blog';
import { Contact } from './pages/Contact';
import { BlogPostDetail } from './pages/BlogPostDetail';
import { NotFound } from './pages/NotFound';
import { ThemeProvider } from './components/ThemeContext';

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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<ServicesHub />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPostDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;