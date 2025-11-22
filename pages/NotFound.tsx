import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Home, Search } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="text-center max-w-lg">
        <h1 className="text-9xl font-extrabold text-slate-900 mb-4 tracking-tighter">404</h1>
        <div className="w-24 h-1 bg-primary-600 mx-auto mb-8"></div>
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Page Not Found</h2>
        <p className="text-slate-600 mb-8 text-lg">
          The page you are looking for doesn't exist or has been moved. 
          Let's get you back on track.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button to="/" variant="primary">
            <Home size={18} className="mr-2" /> Back to Home
          </Button>
          <Button to="/contact" variant="secondary">
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
};