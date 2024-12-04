'use client';

import React, { useEffect, useState } from 'react';
import EventCard from '@/components/tournament/EventCard';
import ModalViewEvent from '@/components/functions/ModalViewEvents'; // Importa el modal
import { Event } from '@/types/types';
import Loading from '@/app/loading';
import { useSession } from 'next-auth/react';

const PlayerEvents: React.FC = () => {
  const { data: session } = useSession();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    const fetchPlayerEvents = async () => {
      const userId = session?.user?.id; 
      if (!userId) return;

      try {
        const response = await fetch(`/api/events/player?userId=${userId}`);
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
          console.error('Error al obtener eventos del jugador:', response.statusText);
        }
      } catch (error) {
        console.error('Error al llamar al API de eventos del jugador:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlayerEvents();
  }, [session]);

  const handleViewEvent = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mt-8 mx-4 lg:mx-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.length > 0 ? (
          events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onView={handleViewEvent}
            />
          ))
        ) : (
          <p className="flex text-center justify-center text-gray-500">
            No estás registrado en ningún evento.
          </p>
        )}
      </div>

      {/* Modal para ver detalles del evento */}
      <ModalViewEvent
        isOpen={isModalOpen}
        event={selectedEvent}
        onClose={handleCloseModal}
        onDelete={() => console.log('Eliminar evento no disponible para jugador')}
        onUpdate={() => console.log('Actualizar evento no disponible para jugador')} isOrganizer={false}      />
    </div>
  );
};

export default PlayerEvents;
