'use client'

import React from 'react';
import Button from '@/components/button'; 

const Welcome = () => {
 
  const HandleTest = () => {
   console.log('Test Click')
  }


  return (
    <div className="bg-gray-100 p-6 sm:p-8 lg:p-10 rounded-lg shadow-lg text-center max-w-4xl mx-auto mt-[-120px] sm:mt-[-80px] lg:mt-[-70px]">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
        ¡Bienvenido a SportHub!
      </h1>
      <p className="ptext">
        ¿Te interesa nuestra aplicación? SportHub es la plataforma ideal para llevar registros de jugadores, torneos y próximos eventos para cualquier deporte. ¡Organiza, compite y sigue tu progreso en un solo lugar!
      </p>
      <Button 
        text="Conoce más" 
        onClick={HandleTest}
        className=""
      />
    </div>
  );
};

export default Welcome;
