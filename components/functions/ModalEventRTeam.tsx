import React, { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  joinTeam: (teamId: number) => void;
}

const ModalTeamJoin = ({ isOpen, onClose, joinTeam }: ModalProps) => {
  const [teamId, setTeamId] = useState<number | null>(null);

  const handleJoinTeam = () => {
    if (teamId !== null) {
      joinTeam(teamId);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Unirse a un Equipo</h2>
        <input
          type="number"
          value={teamId || ''}
          onChange={(e) => setTeamId(Number(e.target.value))}
          placeholder="ID del equipo"
          className="w-full p-2 mb-4 border rounded"
        />
        <button onClick={handleJoinTeam} className="bg-yellow-500 text-white p-2 rounded">Unirse al Equipo</button>
        <button onClick={onClose} className="ml-4 p-2 text-gray-500">Cerrar</button>
      </div>
    </div>
  );
};

export default ModalTeamJoin;
