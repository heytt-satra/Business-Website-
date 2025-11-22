import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'white' | 'gradient';
  to?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  to, 
  onClick, 
  className = '',
  type = 'button',
  icon
}) => {
  const baseStyles = "inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-lg hover:shadow-xl transform relative overflow-hidden group";
  
  const variants = {
    primary: "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-primary-500/30",
    secondary: "bg-white text-primary-700 border border-primary-100 hover:bg-primary-50 focus:ring-primary-500",
    outline: "bg-transparent border-2 border-white text-white hover:bg-white/10 focus:ring-white",
    white: "bg-white text-slate-900 hover:bg-slate-50 focus:ring-white shadow-slate-200/50",
    gradient: "bg-gradient-to-r from-primary-600 via-accent-purple to-primary-700 text-white shadow-primary-500/40 hover:shadow-primary-600/50"
  };

  const classes = `${baseStyles} ${variants[variant]} ${className}`;

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon && <span className="group-hover:translate-x-1 transition-transform">{icon}</span>}
      </span>
      {variant === 'primary' || variant === 'gradient' ? (
         <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/20" />
      ) : null}
    </>
  );

  if (to) {
    return (
      <Link to={to}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={classes}
        >
          {content}
        </motion.div>
      </Link>
    );
  }

  return (
    <motion.button 
      type={type} 
      onClick={onClick} 
      className={classes}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  );
};