import React from 'react';

interface AddButtonProps {
  onClick: () => void;
  className?: string; 
}

const AddButton: React.FC<AddButtonProps> = ({ onClick, className }) => {
  return (
    <div 
      onClick={onClick} 
      className={`flex items-center justify-center w-12 h-12 bg-yellow-400 rounded-full cursor-pointer shadow-md hover:bg-yellow-300 transition-colors ${className}`}
      aria-label="Add"
    >
      <span className="text-white text-2xl font-bold">+</span>
    </div>
  );
};

export default AddButton;
