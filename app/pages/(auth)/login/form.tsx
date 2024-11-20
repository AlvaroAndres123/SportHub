'use client';

import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import React from 'react';
import { useRouter } from 'next/navigation';

const Form: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); 

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    const response = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (response?.error) {
      setError('Correo o contraseña incorrectos.');
    } else {
      setError(null); 
      router.push('/');
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className='w-96 p-8 bg-white rounded-lg shadow-2xl'>
      <h1 className='text-3xl font-semibold text-center mb-6 text-gray-800'>Inicia Sesión</h1>

      {/* Mensaje de error */}
      {error && <div className="text-red-500 text-center mb-4 font-medium">{error}</div>}

      <div className='mt-4'>
        <label htmlFor="email" className='block text-sm font-medium text-gray-700 mb-2'>Correo Electrónico</label>
        <input
          name='email'
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='border w-full text-base px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300'
          placeholder='Pon tu correo...'
        />
      </div>
      
      <div className='mt-4'>
        <label htmlFor="password" className='block text-sm font-medium text-gray-700 mb-2'>Contraseña</label>
        <input
          name='password'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='border w-full text-base px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300'
          placeholder='Pon tu contraseña...'
        />
      </div>

      <div className='flex justify-center mt-6'>
        <button
          type='submit'
          disabled={!email || !password} 
          className={`bg-yellow-400 text-white py-2 px-6 rounded-full hover:bg-yellow-500 transition-all duration-300 ${(!email || !password) ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Iniciar Sesión
        </button>
      </div>
    </form>
  );
};

export default Form;
