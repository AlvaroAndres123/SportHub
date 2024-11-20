'use client';

import React, { useState, useEffect } from 'react';
import Navbar from "@/components/navbar";
import AddButton from '@/components/add';
import ModalEventOrg from '@/components/functions/ModalEventOrg';
import ModalEventPlayer from '@/components/functions/ModalEventPl';
import { useSession } from 'next-auth/react';
import Link from 'next/link'; // Importa Link para redirección

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
    return <div className="min-h-screen flex justify-center items-center">Cargando...</div>;
  }

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center">
        <p className="text-gray-600 text-lg mb-4">No has iniciado sesión.</p>
        <Link className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded" href="/">
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <h1 className="text-3xl font-bold text-center mt-8 text-gray-800">Eventos de Torneos</h1>

      {/* Lista de eventos */}
      <div className="mt-8 mx-4">
        {events.length === 0 ? (
          <p className="text-center text-gray-500">No hay eventos creados todavía.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-yellow-500">{event.name}</h3>
                <p className="text-gray-700 mt-2">{event.date}</p>
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
          className="fixed bottom-4 right-4 z-10"
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
