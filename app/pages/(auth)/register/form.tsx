'use client'

import { FormEvent } from 'react';
import React from 'react';

const Form: React.FC = () => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.get('email'),
        password: formData.get('password'),
        username: formData.get('username'),
        user_image: '/img/avatar-default.png', 
      }),
    });

    console.log({ response });
  };

  return (
    <form onSubmit={handleSubmit} className="w-96 p-6 shadow-lg bg-white rounded-lg">
      <h1 className="subtitle text-center">Crea tu Usuario</h1>
      <div className="mt-3">
        <label htmlFor="username" className="block text-base mb-2">Nombre de Usuario</label>
        <input
          name="username"
          type="text"
          className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
          placeholder="Pon Tu Nombre de Usuario..."
        />
      </div>
      <div className="mt-3">
        <label htmlFor="email" className="block text-base mb-2">Correo Electrónico</label>
        <input
          name="email"
          type="text"
          className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
          placeholder="Pon Tu Correo..."
        />
      </div>
      <div className="mt-3">
        <label htmlFor="password" className="block text-base mb-2">Contraseña</label>
        <input
          name="password"
          type="password"
          className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
          placeholder="Pon Contraseña..."
        />
      </div>
      <div className="flex justify-center mt-3">
        <button type="submit" className="bg-yellow-400 text-white py-2 px-4 sm:px-6 rounded-full hover:bg-yellow-500 transition-all duration-300">
          Crear Cuenta
        </button>
      </div>
    </form>
  );
};

export default Form;
