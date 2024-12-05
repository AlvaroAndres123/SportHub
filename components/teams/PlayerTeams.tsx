import React, { useEffect, useState } from 'react';
import TeamCard from '@/components/teams/TeamCard';
import { Team } from '@/types/types';

const PlayerTeams: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Llama al API para obtener los equipos en los que el jugador está registrado
  const fetchTeams = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/player-teams');
      if (response.ok) {
        const data = await response.json();
        setTeams(data);
        setError(null);
      } else {
        console.error('Error al cargar los equipos:', response.statusText);
        setError('Hubo un error al cargar los equipos.');
      }
    } catch (error) {
      console.error('Error al llamar al API de equipos:', error);
      setError('Hubo un error al cargar los equipos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  if (isLoading) {
    return <p className="text-center text-gray-600">Cargando equipos...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (teams.length === 0) {
    return <p className="text-center text-gray-600">No estás registrado en ningún equipo.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {teams.map((team) => (
        <TeamCard
          key={team.idteams}
          team={team}
          onView={(team) => console.log(`Ver detalles del equipo:`, team)}
        />
      ))}
    </div>
  );
};

export default PlayerTeams;
