import React from 'react';
import EventCard from './EventCard';

interface Event {
  id: number;
  name: string;
  date: string;
  description: string;
  startTime: string;
  endTime: string;
  sportName: string;
  registrationCode?: string; // Opcional si es un evento registrado.
}

interface EventListProps {
  title: string;
  events: Event[];
  onView: (event: Event) => void;
  isRegistered?: boolean;
}

const EventList: React.FC<EventListProps> = ({ title, events, onView, isRegistered }) => (
  <div>
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    {events.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <EventCard key={event.id} event={event} onView={onView} isRegistered={isRegistered} />
        ))}
      </div>
    ) : (
      <p className="text-center text-gray-500">No hay eventos disponibles.</p>
    )}
  </div>
);

export default EventList;
