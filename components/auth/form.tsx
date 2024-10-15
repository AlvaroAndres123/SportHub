'use client'

import React from 'react';
import Button from '@/components/button';

const Form: React.FC = () => {
  const handleButtonClick = () => {
    console.log("Botón clicado");
  };

  return (
    <div className='w-96 p-6 shadow-lg bg-white rounded-lg'>
      <h1 className='subtitle text-center'>Crea tu Usuario</h1>
      <div className='mt-3'>
        <label htmlFor="username" className='block text-base mb-2'>Nombre de Usuario</label>
        <input
          type="text"
          className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600'
          placeholder='Pon Nombre De Usuario...'
        />
      </div>
      <div className='mt-3'>
        <label htmlFor="password" className='block text-base mb-2'>Contraseña</label>
        <input
          type="text"
          className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600'
          placeholder='Pon Contraseña...'
        />
      </div>

      <div className='flex justify-center mt-3'>
        <Button
          text={"Crear Cuenta"}
          onClick={handleButtonClick}
          className=''
        />
      </div>

    </div>
  );
};

export default Form;
