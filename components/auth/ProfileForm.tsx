'use client';

import React, { useState } from 'react';

interface ProfileFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
  initialValues: {
    name: string;
  };
  isLoading: boolean; 
}

const ProfileForm: React.FC<ProfileFormProps> = ({ initialValues, onSubmit, isLoading }) => {
  const [name, setName] = useState(initialValues.name || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('name', name);

    await onSubmit(formData);
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
        disabled={isLoading}
        className={`w-full py-3 ${
          isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-yellow-600'
        } text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition`}
      >
        {isLoading ? 'Actualizando...' : 'Actualizar Perfil'}
      </button>
    </form>
  );
};

export default ProfileForm;
