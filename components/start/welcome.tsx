import React from 'react';

const Welcome = () => {
  return (
    <div className="bg-gray-100 p-6 sm:p-8 lg:p-10 rounded-lg shadow-lg text-center max-w-4xl mx-auto mt-[-50px]">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
        ¡Bienvenido a SportHub!
      </h1>
      <p className="text-base sm:text-lg text-gray-600 mb-6">
        ¿Te interesa nuestra aplicación? SportHub es la plataforma ideal para llevar registros de jugadores, torneos y próximos eventos para cualquier deporte. ¡Organiza, compite y sigue tu progreso en un solo lugar!
      </p>
      <button className="bg-yellow-400 text-white py-2 px-4 sm:px-6 rounded-full hover:bg-yellow-500 transition-all duration-300">
        Conoce más
      </button>
    </div>
  );
};

export default Welcome;
