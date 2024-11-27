'use client';

import React, { useState, useEffect } from 'react';
import Navbar from "@/components/navbar";
import AddButton from '@/components/add';
import ModalEventPlayer from '@/components/functions/ModalEventPl';
import ModalEventOrg from '@/components/functions/ModalEventOrg';
import ModalViewEvent from '@/components/functions/ModalViewEvents';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Loading from '@/app/loading';
import Link from 'next/link';

interface Event {
  id: number;
  name: string;
  date: string;
  description: string;
  startTime: string;
  endTime: string;
  sportName: string;
  registrationCode?: string; // Código de inscripción (para eventos registrados)
}

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Intl.DateTimeFormat('en-CA', options).format(new Date(dateString));
};

const formatTime = (time: string | undefined | null): string => {
  if (!time || !time.includes(':')) return '-';
  const [hour = '00', minute = '00'] = time.split(':');
  return `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`;
};

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isPlayerModalOpen, setPlayerModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [registeredEvents, setRegisteredEvents] = useState<Event[]>([]); // Eventos registrados
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchEvents = async () => {
      if (!session?.user?.id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const [allEventsResponse, registeredEventsResponse] = await Promise.all([
          fetch(`/api/events?userId=${session.user.id}`),
          fetch(`/api/events/player`),
        ]);

        if (allEventsResponse.ok) {
          const allEvents = await allEventsResponse.json();
          setEvents(
            allEvents.map((event: any) => ({
              id: event.id,
              name: event.name,
              date: event.date,
              description: event.description,
              startTime: event.starttime || '-',
              endTime: event.endtime || '-',
              sportName: event.sportname || 'Sin asignar',
            }))
          );
        }

        if (registeredEventsResponse.ok) {
          const registeredEventsData = await registeredEventsResponse.json();
          setRegisteredEvents(
            registeredEventsData.map((event: any) => ({
              id: event.idevents,
              name: event.name,
              date: event.date,
              description: event.description,
              startTime: event.start_time,
              endTime: event.end_time,
              sportName: event.sportname,
              registrationCode: event.registration_code, // Incluye el código de registro
            }))
          );
        }
      } catch (error) {
        console.error('Error al obtener eventos:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserRole = async () => {
      if (!session?.user?.id) return;

      try {
        const response = await fetch(`/api/roles?user_id=${session.user.id}`);
        if (response.ok) {
          const data = await response.json();
          setUserRole(data.role || null);
        }
      } catch (error) {
        console.error('Error al obtener el rol del usuario:', error);
      }
    };

    if (status === 'authenticated') {
      fetchEvents();
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
        <h2 className="text-2xl font-bold mb-4">Todos los Eventos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div key={event.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-semibold text-yellow-600 mb-3">{event.name}</h3>
              <p className="text-gray-700"><strong>Fecha:</strong> {formatDate(event.date)}</p>
              <p className="text-gray-700"><strong>Hora:</strong> {formatTime(event.startTime)} a {formatTime(event.endTime)}</p>
              <p className="text-gray-700"><strong>Deporte:</strong> {event.sportName}</p>
              <p className="text-gray-600 mt-2">{event.description}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mt-10 mb-4">Mis Eventos Registrados</h2>
        {registeredEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {registeredEvents.map((event) => (
              <div key={event.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <h3 className="text-2xl font-semibold text-blue-600 mb-3">{event.name}</h3>
                <p className="text-gray-700"><strong>Fecha:</strong> {formatDate(event.date)}</p>
                <p className="text-gray-700"><strong>Hora:</strong> {formatTime(event.startTime)} a {formatTime(event.endTime)}</p>
                <p className="text-gray-700"><strong>Deporte:</strong> {event.sportName}</p>
                <p className="text-gray-600 mt-2">{event.description}</p>
                <p className="text-gray-500 mt-2"><strong>Código de Registro:</strong> {event.registrationCode}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No estás registrado en ningún evento.</p>
        )}
      </div>

      <AddButton
        onClick={() => {
          if (userRole === 'Organizador') setModalOpen(true);
          if (userRole === 'Jugador') setPlayerModalOpen(true);
        }}
        className="fixed bottom-6 right-6 z-10 bg-yellow-500 text-white p-4 rounded-full shadow-lg hover:bg-yellow-600 transition duration-300 transform hover:scale-110"
      />

      <ModalEventOrg isOpen={isModalOpen} onClose={() => setModalOpen(false)} addEvent={function (event: Event): void {
        throw new Error('Function not implemented.');
      } } />
      <ModalEventPlayer isOpen={isPlayerModalOpen} onClose={() => setPlayerModalOpen(false)} registerForEvent={function (registrationCode: string): Promise<void> {
        throw new Error('Function not implemented.');
      } } />
    </div>
  );
};

export default Page;
