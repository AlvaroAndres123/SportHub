'use client';

import React from 'react';
import Button from '@/components/button'; 
import 'animate.css';

const Welcome = () => {
  return (
    <div className="bg-black bg-opacity-55  p-8 sm:p-10 lg:p-12 rounded-lg shadow-xl text-center max-w-4xl mx-auto mt-[-120px] sm:mt-[-80px] lg:mt-[-70px]">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 animate__animated animate__fadeIn animate__delay-1s">
        ¡Bienvenido a SportHub!
      </h1>
      <p className="text-lg sm:text-xl lg:text-2xl font-medium text-gray-300 mb-8 opacity-90 animate__animated animate__fadeIn animate__delay-2s">
        ¿Te interesa nuestra aplicación? SportHub es la plataforma ideal para llevar registros de jugadores, torneos y próximos eventos para cualquier deporte. ¡Organiza, compite y sigue tu progreso en un solo lugar!
      </p>
      
      {/* Botón de acción */}
      <Button 
        text="Descubre más" 
        className="bg-yellow-500 text-white py-3 px-8 rounded-full text-xl font-semibold hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105 animate__animated animate__fadeIn animate__delay-3s"
        onClick={() => alert('¡El Sukrol Es mi Pasion!')}
      />
    </div>
  );
};

export default Welcome;
