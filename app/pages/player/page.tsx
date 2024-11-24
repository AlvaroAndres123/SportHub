'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ProfileForm from '@/components/auth/ProfileForm';
import BackButton from '@/components/auth/backbutton';
import Loading from '@/app/loading';



const Configuracion = () => {
  const { data: session, status, update } = useSession(); // Incluye `update` para actualizar la sesión
  const router = useRouter();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session) {
      setUser(session.user);
    }
  }, [session]);

  const handleBackClick = () => {
    router.push('/');
  };

  const handleFormSubmit = async (formData: FormData) => {
    const name = formData.get('name');
    if (!name || !user?.id) {
      alert('Por favor, ingresa un nombre válido');
      return;
    }

    const data = {
      id: user?.id,
      name: name,
    };

    console.log('Datos enviados al backend:', data); 

    try {
      const response = await fetch('/api/users', {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser.data);
        await update();
      } else {
        const error = await response.json();
        console.error('Error en la respuesta del backend:', error);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };


  if (status === 'loading' || !session || !user) {
    return (
     <Loading/>
    );
  }
  
  

  return (
    <div className="bgimage min-h-screen py-8 px-4 sm:px-6 lg:px-8 relative">
      {/* Botón de Volver */}
      <BackButton
        onClick={handleBackClick}
        className="text-white font-extrabold absolute top-4 left-4 z-10"
      />

      {/* Título de la página */}
      <h1 className="text-3xl font-semibold text-center text-white mb-8 z-10">Configuración de Usuario</h1>

      {/* Contenido principal */}
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 z-10">
        {/* Sección de información básica del usuario */}
        <div className="mb-6">
          <h2 className="text-xl font-medium mb-4">Información Personal</h2>
          <p className="text-gray-600 mb-2">Nombre de usuario: <span className="font-semibold">{user?.name}</span></p>
          <p className="text-gray-600 mb-2">Correo Electrónico: <span className="font-semibold">{user?.email}</span></p>

          {/* Botón para editar perfil */}
          <button
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            className="bg-yellow-400 text-white py-2 px-4 rounded-full hover:bg-yellow-500 transition-all duration-300"
          >
            {isEditingProfile ? 'Cancelar' : 'Editar Perfil'}
          </button>
        </div>

        {isEditingProfile && (
          <div className="mt-6">
            <ProfileForm
              onSubmit={handleFormSubmit}
              initialValues={{ name: user?.name }}
              isLoading={isLoading}
            />
          </div>
        )}

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default Configuracion;
