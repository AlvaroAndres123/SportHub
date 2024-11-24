import React, { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  createTeam: (newTeam: { id: number; name: string; members: string[]; description: string }) => void;
}

const ModalTeamCreate = ({ isOpen, onClose, createTeam }: ModalProps) => {
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');

  const handleCreateTeam = () => {
    const newTeam = {
      id: Math.floor(Math.random() * 1000),  // Generar un ID aleatorio para el equipo
      name: teamName,
      members: [],  // Inicialmente sin miembros
      description: teamDescription,
    };
    createTeam(newTeam);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Crear un Nuevo Equipo</h2>
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
        <button onClick={handleCreateTeam} className="bg-yellow-500 text-white p-2 rounded">Crear Equipo</button>
        <button onClick={onClose} className="ml-4 p-2 text-gray-500">Cerrar</button>
      </div>
    </div>
  );
};

export default ModalTeamCreate;