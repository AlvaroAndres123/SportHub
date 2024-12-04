import React from 'react';
import { Event } from '@/types/types';
import { formatDate, formatTime } from '@/utils/formatters';

interface EventCardProps {
  event: Event;
  onView: (event: Event) => void;
  isRegistered?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, onView, isRegistered }) => {
  console.log('Renderizando EventCard:', event); // Debug para verificar los datos
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Nombre del evento */}
      <h3
        className={`text-2xl font-semibold ${isRegistered ? 'text-blue-600' : 'text-yellow-600'} mb-3`}
        aria-label={`Evento: ${event.name}`}
      >
        {event.name}
      </h3>

      {/* Fecha del evento */}
      <p className="text-gray-700">
        <strong>Fecha:</strong> {formatDate(event.date)}
      </p>

      {/* Horario del evento */}
      <p className="text-gray-700">
        <strong>Hora:</strong> {formatTime(event.startTime)} a {formatTime(event.endTime)}
      </p>

      {/* Deporte */}
      <p className="text-gray-700">
        <strong>Deporte:</strong> {event.sportName || 'No especificado'}
      </p>

      {/* Código de registro */}
      {event.sharedCode && (
        <p className="text-gray-700">
          <strong>Código:</strong> {event.sharedCode}
        </p>
      )}


      {/* Descripción */}
      <p className="text-gray-600 mt-2">{event.description || 'Sin descripción disponible.'}</p>



      {/* Botón para ver detalles */}
      <button
        onClick={() => onView(event)}
        className="mt-4 py-2 px-4 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition duration-300"
        aria-label={`Ver detalles del evento ${event.name}`}
      >
        Ver
      </button>
    </div>
  );
};

export default EventCard;
