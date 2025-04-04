
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

const Logo: React.FC<LogoProps> = ({ size = 'medium' }) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'h-6 w-6';
      case 'large':
        return 'h-12 w-12';
      case 'medium':
      default:
        return 'h-8 w-8';
    }
  };

  return (
    <Link 
      to="/" 
      className="flex items-center gap-2 transition-transform hover:scale-105"
    >
      <div className={`${getSizeClasses()} bg-gradient-to-br from-brand-teal to-brand-blue rounded-md flex items-center justify-center shadow-md`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-2/3 h-2/3 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
          <path d="M9 14h6"></path>
          <path d="M9 18h6"></path>
          <path d="M12 9v9"></path>
        </svg>
      </div>
      <span className="text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-teal to-brand-blue">
        Shasthoporibesh
      </span>
    </Link>
  );
};

export default Logo;
