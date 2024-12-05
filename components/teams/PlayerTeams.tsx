import React, { useEffect, useState } from 'react';
import TeamCard from '@/components/teams/TeamCard';
import { Team } from '@/types/types';
import ModalViewTeam from '@/components/teams/ModalViewTeam'; // Asegúrate de importar el ModalViewTeam

const PlayerTeams: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Estado para el modal
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/teams/player');
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

  const handleViewTeam = (team: Team) => {
    setSelectedTeam(team); 
    setIsModalOpen(true);  
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); 
    setSelectedTeam(null); 
  };

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
    <div>
      {/* Mostrar equipos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <TeamCard
            key={team.idteams}
            team={team}
            onView={() => handleViewTeam(team)}  // Abre el modal con el equipo seleccionado
          />
        ))}
      </div>

      {/* Modal para ver detalles del equipo */}
      {isModalOpen && selectedTeam && (
        <ModalViewTeam
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          team={selectedTeam} // Pasa el equipo seleccionado al modal
          onDelete={function (teamId: number): void {
            throw new Error('Function not implemented.');
          } } onUpdate={function (updatedTeam: Team): void {
            throw new Error('Function not implemented.');
          } } isOrganizer={false}        />
      )}
    </div>
  );
};

export default PlayerTeams;
