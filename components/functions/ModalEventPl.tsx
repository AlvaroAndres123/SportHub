'use client';

import React, { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalEventPlayer: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [registrationCode, setRegistrationCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegistrationCode(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!registrationCode) {
      setError('Por favor, ingresa un código de registro.');
      setSuccessMessage(null); // Limpiar mensajes previos
      return;
    }

    try {
      const response = await fetch('/api/events/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ registrationCode }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Hubo un error al registrar tu participación.');
      }

      setError(null); // Limpiar errores previos
      setSuccessMessage('¡Registro exitoso!');
      setRegistrationCode(''); // Limpiar el código de registro
      setTimeout(() => {
        onClose(); // Cerrar modal después de un tiempo
      }, 2000);
    } catch (error: any) {
      setSuccessMessage(null); // Limpiar mensajes de éxito
      setError(error.message || 'Hubo un error al registrar tu participación.');
    }
  };

  return (
    isOpen ? (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl text-gray-800">Registrarse en el Evento</h2>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 text-2xl"
            >
              &times;
            </button>
          </div>

          {error && <div className="text-red-500 text-center mb-4">{error}</div>}
          {successMessage && <div className="text-green-500 text-center mb-4">{successMessage}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="registrationCode" className="text-gray-700">Código de Registro</label>
              <input
                type="text"
                id="registrationCode"
                name="registrationCode"
                value={registrationCode}
                onChange={handleChange}
                placeholder="Ingresa el código de registro"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 mt-4 bg-yellow-400 text-gray-800 font-semibold rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              Registrar Participación
            </button>
          </form>
        </div>
      </div>
    ) : null
  );
};

export default ModalEventPlayer;
