'use client'

import React from 'react';
import "@fortawesome/fontawesome-free/css/all.min.css"; 

interface BackButtonProps {
  onClick: () => void;
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick, className }) => {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center space-x-2 cursor-pointer p-3 bg-black bg-opacity-55  rounded-full transition-all duration-300 max-w-xl mx-auto ${className}`}
    >
      {/* Ícono de FontAwesome para la flecha */}
      <i className="fas fa-arrow-left text-white text-2xl"></i> 
      <h1 className="text-white font-extrabold text-lg tracking-wide hover:text-yellow-400 transition-all duration-300">
        Volver a la página Principal
      </h1>
    </div>
  );
};

export default BackButton;
