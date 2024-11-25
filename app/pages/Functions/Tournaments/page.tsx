'use client';

import React, { useState, useEffect } from 'react';
import Navbar from "@/components/navbar";
import AddButton from '@/components/add';
import ModalEventOrg from '@/components/functions/ModalEventOrg';
import ModalEventPlayer from '@/components/functions/ModalEventPl';
import ModalViewEvent from '@/components/functions/ModalViewEvents';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // Importar el hook de navegación
import Link from 'next/link';
import Loading from '@/app/loading';

interface Event {
  id: number;
  name: string;
  date: string;
  description: string;
  startTime: string;
  endTime: string;
  sportName: string;
  shareCode?: string;
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
  const router = useRouter(); // Inicializar el router
  const [isModalOpen, setModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  // Redirigir al usuario si no está autenticado
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/'); // Redirigir a la página de inicio
    }
  }, [status, router]);

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      if (!session?.user?.id) {
        setLoading(false);
        return;
      }
    
      try {
        setLoading(true);
        const response = await fetch(`/api/events?userId=${session.user.id}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data); // Verificar que `sharecode` existe en los datos
          const mappedEvents = data.map((event: any) => ({
            id: event.id,
            name: event.name,
            date: event.date,
            description: event.description,
            startTime: event.starttime,
            endTime: event.endtime,
            sportName: event.sportname,
            shareCode: event.sharecode, // Verifica que este mapeo coincida con el backend
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
    
    if (status === 'authenticated') {
      fetchEvents();
    }
  }, [session, status]);

  // Fetch user role once
  useEffect(() => {
    const fetchUserRole = async () => {
      if (!session?.user?.id || userRole) {
        return; // Evitar llamadas adicionales si ya tenemos el rol
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

    fetchUserRole();
  }, [session, userRole]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const openViewModal = (event: Event) => {
    setSelectedEvent(event);
    setViewModalOpen(true);
  };

  const closeViewModal = () => {
    setSelectedEvent(null);
    setViewModalOpen(false);
  };

  const addEvent = (newEvent: Event) => {
    setEvents([...events, newEvent]);
    closeModal();
  };

  const deleteEvent = async (eventId: number) => {
    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el evento');
      }

      setEvents(events.filter(event => event.id !== eventId));
      alert('Evento eliminado con éxito.');
    } catch (error) {
      console.error(error);
      alert('No se pudo eliminar el evento. Intenta nuevamente.');
    }
  };

  const updateEvent = (updatedEvent: Event) => {
    setEvents(events.map(event => (event.id === updatedEvent.id ? updatedEvent : event)));
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

      <div className="mt-8 mx-4 lg:mx-16">
        {events.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No hay eventos creados todavía.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div key={event.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <h3 className="text-2xl font-semibold text-yellow-600 mb-3 hover:text-yellow-500 transition-all duration-200">
                  {event.name}
                </h3>
                <p className="text-gray-700"><strong>Fecha:</strong> {formatDate(event.date)}</p>
                <p className="text-gray-700"><strong>Hora:</strong> {formatTime(event.startTime, event.endTime)}</p>
                <p className="text-gray-700"><strong>Deporte:</strong> {event.sportName || 'Sin asignar'}</p>
                <p className="text-gray-600 mt-2">{event.description}</p>
                {userRole === 'Organizador' && (
                  <button
                    onClick={() => openViewModal(event)}
                    className="mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
                  >
                    Ver
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {userRole === 'Organizador' && (
        <AddButton
          onClick={openModal}
          className="fixed bottom-6 right-6 z-10 bg-yellow-500 text-white p-4 rounded-full shadow-lg hover:bg-yellow-600 transition duration-300 transform hover:scale-110"
        />
      )}

      <ModalEventOrg isOpen={isModalOpen} onClose={closeModal} addEvent={addEvent} />
      <ModalViewEvent
        isOpen={isViewModalOpen}
        event={selectedEvent}
        onClose={closeViewModal}
        onDelete={deleteEvent}
        onUpdate={updateEvent}
      />
    </div>
  );
};

export default Page;
