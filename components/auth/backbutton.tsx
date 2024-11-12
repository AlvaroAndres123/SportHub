'use client'

import React from 'react';

interface BackButtonProps {
  onClick: () => void;
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick, className }) => {
  return (
    <div className="flex items-center p-5 space-x-2 cursor-pointer">
      
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
