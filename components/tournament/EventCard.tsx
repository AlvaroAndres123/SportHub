import React from 'react';
import { Event } from '@/types/types';
import { formatDate, formatTime } from '@/utils/formatters';

interface EventCardProps {
  event: Event;
  onView: (event: Event) => void;
  isRegistered?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, onView, isRegistered }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
    <h3 className={`text-2xl font-semibold ${isRegistered ? 'text-yellow-600' : 'text-yellow-600'} mb-3`}>
      {event.name}
    </h3>
    <p className="text-gray-700"><strong>Fecha:</strong> {formatDate(event.date)}</p>
    <p className="text-gray-700"><strong>Hora:</strong> {formatTime(event.startTime)} a {formatTime(event.endTime)}</p>
    <p className="text-gray-700"><strong>Deporte:</strong> {event.sportName}</p>
    <p className="text-gray-600 mt-2">{event.description}</p>
    {isRegistered && event.registrationCode && (
      <p className="text-gray-500 mt-2"><strong>Código de Registro:</strong> {event.registrationCode}</p>
    )}
    <button
      onClick={() => onView(event)}
      className="mt-4 py-2 px-4 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition duration-300"
    >
      Ver
    </button>
  </div>
);

export default EventCard;
