'use client';

import React, { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';

interface ProfileFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
  initialValues: {
    name: string;
  };
}

const ProfileForm: React.FC<ProfileFormProps> = ({ initialValues }) => {
  const { data: session } = useSession();
  const [name, setName] = useState(initialValues.name || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session || !session.user) {
      alert('Sesión no encontrada.');
      return;
    }

    if (!name || !session.user.id) {
      alert('Por favor, ingresa un nombre válido');
      return;
    }

    const data = {
      id: session.user.id,
      name: name,
    };

    try {
      const response = await fetch('/api/users', {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {

        alert('Perfil actualizado con éxito');
      } else {
        alert('Error al actualizar el perfil');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      alert('Hubo un error al actualizar el perfil');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl p-6 bg-white rounded-lg shadow-lg space-y-6">
      <div className="mb-6">
        <label htmlFor="name" className="block text-lg font-semibold text-secondary mb-2">Nombre:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-primary text-white font-semibold rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition"
      >
        Actualizar Perfil
      </button>
    </form>
  );
};

export default ProfileForm;
