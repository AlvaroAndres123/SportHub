import React from 'react';

interface Event {
  id: number;
  name: string;
  date: string; 
  description: string;
  isRegistered: boolean; 
}

interface EventListProps {
  filteredEvents: Event[];
  selectedDate: string;
}

const EventList: React.FC<EventListProps> = ({ filteredEvents, selectedDate }) => {
  return (
    <div className="mt-8 mx-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Eventos del {selectedDate}</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {filteredEvents.length > 0 ? (
          <ul>
            {filteredEvents.map((event) => (
              <li key={event.id} className="border-b py-4">
                <h3 className="text-xl font-semibold text-gray-800">{event.name}</h3>
                <p className="text-gray-600">{event.description}</p>
                <p className="mt-2 text-gray-500">Inscripción: {event.isRegistered ? 'Confirmada' : 'Pendiente'}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No hay eventos para esta fecha.</p>
        )}
      </div>
    </div>
  );
};

export default EventList;
