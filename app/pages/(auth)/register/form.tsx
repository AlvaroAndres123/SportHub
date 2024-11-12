'use client';

import { FormEvent, useState } from 'react';
import React from 'react';
import { useRouter } from 'next/navigation'; 

const Form: React.FC = () => {
  const router = useRouter();
  const [isPlayer, setIsPlayer] = useState(false);
  const [isOrganizer, setIsOrganizer] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    if (!isPlayer && !isOrganizer) {
      setError('Por favor, seleccione al menos un rol (Jugador u Organizador).');
      return;
    }

    setError(null);

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        name: username,
        user_image: '/img/default-avatar.jpg', 
        role: isPlayer ? 'player' : isOrganizer ? 'organizer' : '', 
      }),
    });

    if (response.ok) {
      router.push('/'); 
    } else {
      console.log('Error creando cuenta:', response.statusText);
      setError('Hubo un error al crear la cuenta. Intente nuevamente.');
    }
  };


  const handlePlayerChange = () => {
    setIsPlayer(true);
    setIsOrganizer(false); 
  };

  const handleOrganizerChange = () => {
    setIsOrganizer(true);
    setIsPlayer(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-96 p-6 shadow-lg bg-white rounded-lg">
      <h1 className="subtitle text-center">Crea tu Usuario</h1>
      
   
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      <div className="mt-3">
        <label htmlFor="username" className="block text-base mb-2">Nombre de Usuario</label>
        <input
          name="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
          placeholder="Pon Tu Nombre de Usuario..."
        />
      </div>
      
      <div className="mt-3">
        <label htmlFor="email" className="block text-base mb-2">Correo Electrónico</label>
        <input
          name="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
          placeholder="Pon Tu Correo..."
        />
      </div>
      
      <div className="mt-3">
        <label htmlFor="password" className="block text-base mb-2">Contraseña</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
          placeholder="Pon Contraseña..."
        />
      </div>

   
      <div className="mt-4 flex space-x-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isPlayer"
            name="isPlayer"
            checked={isPlayer}
            onChange={handlePlayerChange}
            className="mr-2"
          />
          <label htmlFor="isPlayer" className="text-base">Es Jugador</label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="isOrganizer"
            name="isOrganizer"
            checked={isOrganizer}
            onChange={handleOrganizerChange}
            className="mr-2"
          />
          <label htmlFor="isOrganizer" className="text-base">Es Organizador</label>
        </div>
      </div>

      <div className="flex justify-center mt-3">
        <button
          type="submit"
          disabled={!username || !email || !password || (!isPlayer && !isOrganizer)}
          className={`bg-yellow-400 text-white py-2 px-4 sm:px-6 rounded-full hover:bg-yellow-500 transition-all duration-300 ${(!username || !email || !password || (!isPlayer && !isOrganizer)) ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Crear Cuenta
        </button>
      </div>
    </form>
  );
};

export default Form;
