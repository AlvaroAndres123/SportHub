import React, { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string; // Recibe el ID del usuario como prop
}

const ModalTeamCreate: React.FC<ModalProps> = ({ isOpen, onClose, userId }) => {
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleCreateTeam = async () => {
    if (!teamName || !teamDescription) {
      setError('Por favor, completa todos los campos.');
      setSuccessMessage(null);
      return;
    }

    try {
      const response = await fetch('/api/teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          team_name: teamName,
          team_description: teamDescription,
          user_id: userId, // Envía el userId al backend
        }),
      });

      if (response.ok) {
        setError(null);
        setSuccessMessage('¡Equipo creado exitosamente!');
        setTeamName('');
        setTeamDescription('');
        onClose(); // Cierra el modal
        window.location.reload(); // Recarga la página
      } else {
        const data = await response.json();
        setError(data.error || 'Hubo un error al crear el equipo.');
        setSuccessMessage(null);
      }
    } catch (error) {
      console.error('Error al crear equipo:', error);
      setError('Hubo un error al crear el equipo. Intenta nuevamente.');
      setSuccessMessage(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Crear un Nuevo Equipo</h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {successMessage && <div className="text-green-500 text-center mb-4">{successMessage}</div>}
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Nombre del equipo"
          className="w-full p-2 mb-4 border rounded"
        />
        <textarea
          value={teamDescription}
          onChange={(e) => setTeamDescription(e.target.value)}
          placeholder="Descripción del equipo"
          className="w-full p-2 mb-4 border rounded"
        />
        <div className="flex justify-end">
          <button
            onClick={handleCreateTeam}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
          >
            Crear Equipo
          </button>
          <button
            onClick={onClose}
            className="ml-4 px-4 py-2 text-gray-500 hover:text-gray-700"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalTeamCreate;
