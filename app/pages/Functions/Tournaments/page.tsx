'use client';

import React, { useEffect, useState } from 'react';
import Navbar from "@/components/navbar";
import AddButton from '@/components/add';
import ModalEventPlayer from '@/components/functions/ModalEventPl';
import ModalEventOrg from '@/components/functions/ModalEventOrg';
import OrganizerEvents from '@/components/tournament/OrganizerEvent';
import PlayerEvents from '@/components/tournament/PlayerEvents';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Loading from '@/app/loading';
import Link from 'next/link';

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isPlayerModalOpen, setPlayerModalOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  // Redirigir si el usuario no está autenticado
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  // Obtener el rol del usuario
  useEffect(() => {
    const fetchUserRole = async () => {
      if (!session?.user?.id) return;

      try {
        const response = await fetch(`/api/roles?user_id=${session.user.id}`);
        if (response.ok) {
          const data = await response.json();
          setUserRole(data.role || null);
        } else {
          console.error('Error al obtener el rol del usuario:', response.statusText);
        }
      } catch (error) {
        console.error('Error al obtener el rol del usuario:', error);
      } finally {
        setLoading(false);
      }
    };

    if (status === 'authenticated') {
      fetchUserRole();
    }
  }, [session, status]);

  if (status === 'loading' || isLoading) {
    return <Loading />;
  }

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center bg-gray-50 py-12">
        <p className="text-xl text-gray-600 mb-4">No has iniciado sesión.</p>
        <Link
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300"
          href="/"
        >
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <h1 className="text-4xl font-extrabold text-center mt-8 text-gray-800">
        {userRole === 'Organizador' ? 'Eventos Creados' : 'Eventos Registrados'}
      </h1>

      <div className="mt-8 mx-4 lg:mx-16">
        {userRole === 'Organizador' && <OrganizerEvents />}
        {userRole === 'Jugador' && <PlayerEvents />}
      </div>

      <AddButton
        onClick={() => {
          if (userRole === 'Organizador') setModalOpen(true);
          if (userRole === 'Jugador') setPlayerModalOpen(true);
        }}
        className="fixed bottom-6 right-6 z-10 bg-yellow-500 text-white p-4 rounded-full shadow-lg hover:bg-yellow-600 transition duration-300 transform hover:scale-110"
      />

      <ModalEventOrg
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        
      />

      <ModalEventPlayer
        isOpen={isPlayerModalOpen}
        onClose={() => setPlayerModalOpen(false)}
      />
    </div>
  );
};

export default Page;
