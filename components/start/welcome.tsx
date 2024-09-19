import React from 'react';

const Welcome = () => {
  return (
    <div className="bg-gray-100 p-8  rounded-lg shadow-lg text-center max-w-4xl mx-auto mt-[-50px]">
      <h1 className="text_head">
        ¡Bienvenido a SportHub!
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        ¿Te interesa nuestra aplicación? SportHub es la plataforma ideal para llevar registros de jugadores, torneos y próximos eventos para cualquier deporte. ¡Organiza, compite y sigue tu progreso en un solo lugar!
      </p>
      <button className="bg-yellow-400 text-white py-2 px-6 rounded-full hover:bg-yellow-500 transition-all duration-300">
        Conoce más
      </button>
    </div>
  );
};

export default Welcome;
