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
  registrationCode?: string; 
}

interface EventListProps {
  title: string;
  events: Event[];
  onView: (event: Event) => void;
  isRegistered?: boolean;
}

const EventList: React.FC<EventListProps> = ({ title, events, onView, isRegistered }) => (
    <div>
      <h2
        className={`text-2xl font-bold mb-4 ${
          isRegistered ? 'text-blue-600' : 'text-yellow-600'
        }`}
      >
        {title}
      </h2>
      {events.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <EventCard key={event.id} event={event} onView={onView} isRegistered={isRegistered} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          {isRegistered ? 'No estás registrado en ningún evento.' : 'No hay eventos creados todavía.'}
        </p>
      )}
    </div>
  );
  

export default EventList;
