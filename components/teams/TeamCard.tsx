import React from 'react';
import { Team } from '@/types/types';

interface TeamCardProps {
  team: Team;
  onView: (team: Team) => void;
}

const TeamCard: React.FC<TeamCardProps> = ({ team, onView }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
      <h3 className="text-2xl font-semibold text-yellow-600 mb-3">{team.team_name}</h3>
      <p className="text-gray-700"><strong>Estado:</strong> {team.team_status}</p>
      {team.shared_code && <p className="text-gray-700"><strong>Código:</strong> {team.shared_code}</p>}
      <p className="text-gray-600 mt-2">{team.team_description || 'Sin descripción disponible.'}</p>
      <button
        onClick={() => onView(team)}
        className="mt-4 py-2 px-4 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition duration-300"
      >
        Ver
      </button>
    </div>
  );
};

export default TeamCard;
