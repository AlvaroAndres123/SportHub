'use client';

import React, { useEffect, useState } from 'react';
import EventCard from './EventCard';
import { Event } from '@/types/types';
import Loading from '@/app/loading';
import { useSession } from 'next-auth/react';

const OrganizerEvents: React.FC = () => {
  const { data: session } = useSession();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrganizerEvents = async () => {
      const userId = session?.user?.id; // Obtener userId dinámicamente
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

    fetchOrganizerEvents();
  }, [session]);

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
              onView={(e) => console.log('Ver detalles del evento:', e)}
            />
          ))
        ) : (
          <p className="flex text-center justify-center text-gray-500">No has creado ningún evento.</p>
        )}
      </div>
    </div>
  );
};

export default OrganizerEvents;
