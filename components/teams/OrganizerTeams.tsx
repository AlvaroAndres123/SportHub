'use client';

import React, { useEffect, useState } from 'react';
import TeamCard from '@/components/teams/TeamCard';
import ModalViewTeam from '@/components/teams/ModalViewTeam';
import { Team } from '@/types/types';
import Loading from '@/app/loading';
import { useSession } from 'next-auth/react';

const OrganizerTeams: React.FC = () => {
  const { data: session } = useSession();
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  const fetchOrganizerTeams = async () => {
    const userId = session?.user?.id;
    if (!userId) return;

    try {
      const response = await fetch(`/api/teams?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        setTeams(data);
      } else {
        console.error('Error al obtener equipos del organizador:', response.statusText);
      }
    } catch (error) {
      console.error('Error al llamar al API:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizerTeams();
  }, [session]);

  const handleViewDetails = (team: Team) => {
    setSelectedTeam(team);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTeam(null);
  };

  const handleDeleteTeam = async (teamId: number) => {
    try {
      const response = await fetch(`/api/teams/${teamId}`, {
        method: 'DELETE', // El método DELETE
      });
  
      if (response.ok) {
        setTeams((prevTeams) => prevTeams.filter((team) => team.id !== teamId));
        handleCloseModal();
        alert('Equipo eliminado con éxito.');
      } else {
        alert('Error al eliminar el equipo.');
      }
    } catch (error) {
      console.error('Error al eliminar el equipo:', error);
      alert('Error al eliminar el equipo.');
    }
  };
  
  

  const handleUpdateTeam = async (updatedTeam: Team) => {
    setTeams((prevTeams) =>
      prevTeams.map((team) => (team.id === updatedTeam.id ? updatedTeam : team))
    );
    handleCloseModal();
    await fetchOrganizerTeams(); 
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mt-8 mx-4 lg:mx-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {teams.length > 0 ? (
          teams.map((team) => (
            <TeamCard
              key={team.id}
              team={team}
              onView={handleViewDetails}
            />
          ))
        ) : (
          <p className="flex text-center justify-center text-gray-500">
            No has creado ningún equipo.
          </p>
        )}
      </div>

      {/* Modal para ver detalles */}
      <ModalViewTeam
        isOpen={isModalOpen}
        team={selectedTeam}
        onClose={handleCloseModal}
        onDelete={handleDeleteTeam}
        onUpdate={handleUpdateTeam}
        isOrganizer
      />
    </div>
  );
};

export default OrganizerTeams;
