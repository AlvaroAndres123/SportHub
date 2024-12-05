import React, { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalTeamJoin: React.FC<ModalProps> = ({ isOpen, onClose}) => {
  const [teamCode, setTeamCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleJoinTeam = async () => {
    if (!teamCode) {
      setError('Por favor, ingresa el código del equipo.');
      return;
    }

    try {
      const response = await fetch('/api/teams/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ shared_code: teamCode, user_id: 1 }), // Cambiar user_id por el ID real del usuario
      });

      const data = await response.json();

      if (response.ok) {
        setError(null);
        setSuccessMessage('¡Te has unido al equipo exitosamente!');
        setTeamCode('');
      } else {
        setError(data.error || 'Hubo un error al unirse al equipo.');
      }
    } catch (error) {
      setError('Error al unirse al equipo.');
      console.error(error);
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-gray-800">Unirse a un Equipo</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 text-2xl"
          >
            &times;
          </button>
        </div>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {successMessage && <div className="text-green-500 text-center mb-4">{successMessage}</div>}

        <input
          type="text"
          value={teamCode}
          onChange={(e) => setTeamCode(e.target.value)}
          placeholder="Ingresa el código del equipo"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button
          onClick={handleJoinTeam}
          className="w-full py-2 mt-4 bg-yellow-400 text-gray-800 font-semibold rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          Unirse
        </button>
      </div>
    </div>
  ) : null;
};

export default ModalTeamJoin;
