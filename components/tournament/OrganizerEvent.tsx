'use client';

import React, { useEffect, useState } from 'react';
import EventCard from './EventCard';
import ModalViewEvent from '@/components/functions/ModalViewEvents';
import { Event } from '@/types/types';
import Loading from '@/app/loading';
import { useSession } from 'next-auth/react';

const OrganizerEvents: React.FC = () => {
  const { data: session } = useSession();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);


  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const fetchOrganizerEvents = async () => {
    const userId = session?.user?.id; 
    if (!userId) return;

    try {
      const response = await fetch(`/api/events?userId=${userId}`);
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
          sharedCode: event.sharecode, 
        }));
        
        setEvents(mappedEvents);
      } else {
        console.error('Error al obtener eventos del organizador:', response.statusText);
      }
    } catch (error) {
      console.error('Error al llamar al API:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizerEvents();
  }, [session]);

  const handleViewDetails = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleDeleteEvent = async (eventId: number) => {
    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
        handleCloseModal();
        alert('Evento eliminado con éxito.');
      } else {
        alert('Error al eliminar el evento.');
      }
    } catch (error) {
      console.error('Error al eliminar el evento:', error);
      alert('Error al eliminar el evento.');
    }
  };

  const handleUpdateEvent = (updatedEvent: Event) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) => (event.id === updatedEvent.id ? updatedEvent : event))
    );
    handleCloseModal();
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
              onView={handleViewDetails}
            />
          ))
        ) : (
          <p className="flex text-center justify-center text-gray-500">No has creado ningún evento.</p>
        )}
      </div>

      {/* Modal para ver detalles */}
      <ModalViewEvent
        isOpen={isModalOpen}
        event={selectedEvent}
        onClose={handleCloseModal}
        onDelete={handleDeleteEvent}
        onUpdate={handleUpdateEvent} 
        isOrganizer={false}      />
    </div>
  );
};

export default OrganizerEvents;