'use client';

import React, { useState, useEffect } from 'react';
import Navbar from "@/components/navbar";
import AddButton from '@/components/add';
import ModalEventOrg from '@/components/functions/ModalEventOrg';
import ModalEventPlayer from '@/components/functions/ModalEventPl';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Loading from '@/app/loading';

interface Event {
  id: number;
  name: string;
  date: string;
  description: string;
  startTime: string; // Hora de inicio
  endTime: string;   // Hora de finalización
  sportName: string; // Nombre del deporte
}

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Intl.DateTimeFormat('en-CA', options).format(new Date(dateString));
};

const formatTime = (startTime: string | null, endTime: string | null) => {
  if (!startTime || !endTime) return '-';
  const [startHour, startMinute] = startTime.split(':');
  const [endHour, endMinute] = endTime.split(':');
  return `${startHour}:${startMinute} a ${endHour}:${endMinute}`;
};

const Page = () => {
  const { data: session, status } = useSession();
  const [isModalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/events');
        if (response.ok) {
          const data = await response.json();
        
          const mappedEvents = data.map((event: any) => ({
            id: event.id,
            name: event.name,
            date: event.date,
            description: event.description,
            startTime: event.starttime, 
            endTime: event.endtime, 
            sportName: event.sportname, 
          }));
          setEvents(mappedEvents);
        } else {
          console.error("Error al obtener eventos:", response.statusText);
        }
      } catch (error) {
        console.error("Error en la llamada al API:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchEvents();
  }, []);
  

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!session?.user?.id) {
        setUserRole(null);
        return;
      }

      try {
        const response = await fetch(`/api/roles?user_id=${session.user.id}`);
        if (response.ok) {
          const data = await response.json();
          setUserRole(data.role || null); 
        } else {
          console.error("Error al obtener el rol del usuario:", response.statusText);
        }
      } catch (error) {
        console.error("Error en la llamada al API para el rol:", error);
      }
    };

    if (session) {
      fetchUserRole();
    }
  }, [session]);

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
    return <Loading />;
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
        <p className="text-center text-gray-500 text-lg">
          No hay eventos creados todavía.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-2xl font-semibold text-yellow-600 mb-3 hover:text-yellow-500 transition-all duration-200">
                {event.name}
              </h3>
              <p className="text-gray-700">
                <strong>Fecha:</strong> {formatDate(event.date)}
              </p>
              <p className="text-gray-700">
                <strong>Hora:</strong>{' '}
                {formatTime(event.startTime, event.endTime)}
              </p>
              <p className="text-gray-700">
                <strong>Deporte:</strong> {event.sportName || 'Sin asignar'}
              </p>
              <p className="text-gray-600 mt-2">{event.description}</p>
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

      {userRole === 'Jugador' && (
        <AddButton
          onClick={openModal}
          className="fixed bottom-6 right-6 z-10 bg-yellow-500 text-white p-4 rounded-full shadow-lg hover:bg-yellow-600 transition-all duration-300 transform hover:scale-110"
        />
      )}

      {userRole === 'Organizador' ? (
        <ModalEventOrg isOpen={isModalOpen} onClose={closeModal} addEvent={addEvent} />
      ) : (
        <ModalEventPlayer isOpen={isModalOpen} onClose={closeModal} registerForEvent={registerForEvent} />
      )}
    </div>
  );
};

export default Page;
