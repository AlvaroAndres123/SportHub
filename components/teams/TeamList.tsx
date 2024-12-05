import React from 'react';

interface Team {
  idteams: number;
  team_name: string;
  team_description: string;
  team_status: string;
}

interface TeamListProps {
  teams: Team[];
  onTeamView: (id: number) => void;
}

const TeamList: React.FC<TeamListProps> = ({ teams, onTeamView }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {teams.length === 0 ? (
        <p className="text-center text-gray-500">No hay equipos registrados.</p>
      ) : (
        teams.map((team) => (
          <div
            key={team.idteams}
            className="bg-white border rounded-lg shadow-lg p-4 hover:shadow-xl transition-all"
          >
            <h3 className="text-xl font-bold text-yellow-600">{team.team_name}</h3>
            <p className="text-gray-600 mt-2">{team.team_description || 'Sin descripción disponible.'}</p>
            <p className="text-sm text-gray-500 mt-2">Estado: {team.team_status}</p>
            <button
              className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
              onClick={() => onTeamView(team.idteams)}
            >
              Ver
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default TeamList;
