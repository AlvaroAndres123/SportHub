'use client'

import React from 'react';

interface ButtonProps {
  text: string;
  onClick: () => void; 
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, className }) => {
  return (
    <button
      onClick={onClick} 
      className={`bg-yellow-400 text-white py-2 px-4 sm:px-6 rounded-full hover:bg-yellow-500 transition-all duration-300 ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
