'use client';

import React, { useState, useEffect } from 'react';
import Navbar from "@/components/navbar";
import AddButton from '@/components/add';
import ModalEventOrg from '@/components/functions/ModalEventOrg';
import ModalEventPlayer from '@/components/functions/ModalEventPl';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface Event {
  id: number;
  name: string;
  date: string;
  description: string;
}

const Page = () => {
  const { data: session, status } = useSession();
  const [isModalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!session?.user?.id || userRole !== null) {
        return;
      }

      try {
        setLoading(true);

        const userId = session.user.id;
        const response = await fetch(`/api/roles?user_id=${userId}`);
        if (response.ok) {
          const data = await response.json();
          const role = data.role || 'Jugador';
          setUserRole(role);
          console.log('Rol del usuario:', role);
        } else {
          console.error("Error al obtener el rol:", response.statusText);
        }
      } catch (error) {
        console.error("Error en la llamada al API:", error);
      } finally {
        setLoading(false);
      }
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

  const addEvent = (newEvent: Event) => {
    setEvents([...events, newEvent]);
    closeModal();
  };

  const registerForEvent = (registrationCode: string) => {
    console.log("Registrando al jugador con código:", registrationCode);
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
      <h1 className="text-4xl font-extrabold text-center mt-8 text-gray-800">Eventos de Torneos</h1>

      {/* Lista de eventos */}
      <div className="mt-8 mx-4 lg:mx-16">
        {events.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No hay eventos creados todavía.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div key={event.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <h3 className="text-2xl font-semibold text-yellow-600 mb-3 hover:text-yellow-500 transition-all duration-200">{event.name}</h3>
                <p className="text-gray-700">{event.date}</p>
                <p className="text-gray-600 mt-2">{event.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Botón de agregar evento */}
      {userRole && (
        <AddButton
          onClick={openModal}
          className="fixed bottom-6 right-6 z-10 bg-yellow-500 text-white p-4 rounded-full shadow-lg hover:bg-yellow-600 transition-all duration-300 transform hover:scale-110"
        />
      )}

      {/* Modal */}
      {userRole === 'Organizador' ? (
        <ModalEventOrg isOpen={isModalOpen} onClose={closeModal} addEvent={addEvent} />
      ) : (
        <ModalEventPlayer isOpen={isModalOpen} onClose={closeModal} registerForEvent={registerForEvent} />
      )}
    </div>
  );
};

export default Page;
