'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Navbar from "@/components/navbar";
import AddButton from '@/components/add';
import ModalTeamCreate from '@/components/functions/ModalEventCTeam'; 
import ModalTeamJoin from '@/components/functions/ModalEventRTeam';   
import { useRouter } from 'next/router';
import Link from 'next/link';

interface Team {
  id: number;
  name: string;
  members: string[];
  description: string;
}

const Page = () => {
  const { data: session, status } = useSession();
  const [isModalOpen, setModalOpen] = useState(false);
  const [teams, setTeams] = useState<Team[]>([
    { id: 1, name: 'Equipo A', members: ['Jugador1', 'Jugador2'], description: 'Equipo de prueba A' },
    { id: 2, name: 'Equipo B', members: ['Jugador3', 'Jugador4'], description: 'Equipo de prueba B' },
  ]);
  const [userRole, setUserRole] = useState<string | null>('Jugador'); 
  const [isLoading, setLoading] = useState<boolean>(false);


  useEffect(() => {
    const fetchUserRole = () => {
      if (!session?.user?.id || userRole !== null) {
        return;
      }
      setUserRole('Jugador'); 
    };

    if (!session) {
      setUserRole(null);
      setLoading(false);
    } else {
      fetchUserRole();
    }
  }, [session, userRole]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const createTeam = (newTeam: Team) => {
    setTeams([...teams, newTeam]);
    closeModal();
  };

  const joinTeam = (teamId: number) => {
    const updatedTeams = teams.map(team => {
      if (team.id === teamId && !team.members.includes('NuevoJugador')) {
        team.members.push('NuevoJugador'); 
      }
      return team;
    });
    setTeams(updatedTeams);
    closeModal();
  };

  if (status === 'loading' || isLoading) {
    return <div className="min-h-screen flex justify-center items-center text-xl font-semibold text-gray-700">Cargando...</div>;
  }

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center bg-gray-50 py-12">
        <p className="text-xl text-gray-600 mb-4">No has iniciado sesión.</p>
        <Link className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300" href="/">
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <h1 className="text-4xl font-extrabold text-center mt-8 text-gray-800">Equipos</h1>

      {/* Lista de equipos */}
      <div className="mt-8 mx-4 lg:mx-16">
        {teams.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No hay equipos creados todavía.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teams.map((team) => (
              <div key={team.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <h3 className="text-2xl font-semibold text-yellow-600 mb-3 hover:text-yellow-500 transition-all duration-200">{team.name}</h3>
                <p className="text-gray-700">{team.members.length} miembros</p>
                <p className="text-gray-600 mt-2">{team.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      
      {userRole === 'Organizador' && (
        <AddButton
          onClick={openModal}
          className="fixed bottom-6 right-6 z-10 bg-yellow-500 text-white p-4 rounded-full shadow-lg hover:bg-yellow-600 transition-all duration-300 transform hover:scale-110"
        />
      )}

      {userRole === 'Organizador' ? (
        <ModalTeamCreate isOpen={isModalOpen} onClose={closeModal} createTeam={createTeam} />
      ) : (
        <ModalTeamJoin isOpen={isModalOpen} onClose={closeModal} joinTeam={joinTeam} />
      )}
    </div>
  );
};

export default Page;
