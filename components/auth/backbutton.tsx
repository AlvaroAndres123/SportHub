'use client'

import React from 'react';

interface BackButtonProps {
  onClick: () => void;
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick, className }) => {
  return (
    <div className="flex items-center space-x-2 cursor-pointer">
      <svg 
        onClick={onClick} 
        className={`h-6 w-6 text-white ${className}`} 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M15 19l-7-7 7-7"
        />
      </svg>
      <h1 
        onClick={onClick} 
        className={`text-white font-extrabold ${className}`}
      >
        Volver a la página Principal
      </h1>
    </div>
  );
};

export default BackButton;
