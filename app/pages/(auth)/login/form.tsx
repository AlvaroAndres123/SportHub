'use client';
import { FormEvent } from 'react';
import { signIn } from 'next-auth/react';
import React from 'react';
import { useRouter } from 'next/navigation';

const Form: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await signIn('credentials', {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    console.log({ response });
    if (!response?.error) {
      router.push("/");
      router.refresh();
    }
  };

  return (


    <form onSubmit={handleSubmit} className='w-96 p-6 shadow-lg bg-white rounded-lg'>
      <h1 className='subtitle text-center'>Inicia Sesión</h1>
      <div className='mt-3'>
        <label htmlFor="email" className='block text-base mb-2'>Correo Electrónico</label>
        <input 
          name='email'
          type="text"
          className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600'
          placeholder='Pon tu correo...'
        />
      </div>
      <div className='mt-3'>
        <label htmlFor="password" className='block text-base mb-2'>Contraseña</label>
        <input 
          name='password'
          type="password"
          className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600'
          placeholder='Pon tu contraseña...'
        />
      </div>
      <div className='flex justify-center mt-3'>
       <button type='submit' className='bg-yellow-400 text-white py-2 px-4 sm:px-6 rounded-full hover:bg-yellow-500 transition-all duration-300'>
         Iniciar Sesión
       </button>
      </div>
    </form>

  );
};

export default Form;
