'use client';

import React, { useState, useEffect } from 'react';

interface JoinRequest {
  id: number;
  userName: string;
  userEmail: string;
}

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

interface ModalViewEventProps {
  isOpen: boolean;
  event: Event | null;
  onClose: () => void;
  onDelete: (eventId: number) => void;
  onUpdate: (updatedEvent: Event) => void;
}

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Intl.DateTimeFormat('en-CA', options).format(new Date(dateString));
};

const formatTime = (timeString: string | undefined) => {
  if (!timeString) return '-';
  const [hour, minute] = timeString.split(':');
  return `${hour}:${minute}`;
};

const ModalViewEvent: React.FC<ModalViewEventProps> = ({
  isOpen,
  event,
  onClose,
  onDelete,
  onUpdate,
}) => {
  const [isEditing, setEditing] = useState(false);
  const [formData, setFormData] = useState<Event | null>(event);
  const [joinRequests, setJoinRequests] = useState<JoinRequest[]>([]); // Jugadores inscritos

  useEffect(() => {
    if (event?.id) {
      const fetchJoinRequests = async () => {
        try {
          const response = await fetch(`/api/events/registrations?eventId=${event.id}`);
          if (response.ok) {
            const data = await response.json();
            console.log('Datos recibidos desde la API:', data);
  
            const mappedData = data.map((item: any) => ({
              id: item.id, // Esto parece correcto
              userName: item.username, // Cambia para coincidir con la clave del API
              userEmail: item.useremail, // Cambia para coincidir con la clave del API
            }));
            
            console.log('Datos mapeados para jugadores inscritos:', mappedData);
  
            setJoinRequests(mappedData);
          } else {
            console.error('Error al obtener jugadores inscritos:', response.statusText);
          }
        } catch (error) {
          console.error('Error al llamar al API de jugadores inscritos:', error);
        }
      };
  
      fetchJoinRequests();
    }
  }, [event]);
  

  const handleEditToggle = () => {
    setEditing(!isEditing);
    if (event) setFormData(event); // Restablece los datos originales
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (formData) setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      onUpdate(formData);
      setEditing(false);
    }
  };

  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-yellow-600">
            {isEditing ? 'Editar Evento' : 'Detalles del Evento'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 text-2xl font-bold"
          >
            &times;
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData?.name || ''}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-gray-700 font-medium mb-1">
                Descripción
              </label>
              <textarea
                id="description"
                name="description"
                value={formData?.description || ''}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition duration-300"
            >
              Guardar Cambios
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-700">
              <strong className="text-yellow-600">Nombre:</strong> {event.name}
            </p>
            <p className="text-gray-700">
              <strong className="text-yellow-600">Fecha:</strong> {formatDate(event.date)}
            </p>
            <p className="text-gray-700">
              <strong className="text-yellow-600">Hora:</strong>{' '}
              {`${formatTime(event.startTime)} a ${formatTime(event.endTime)}`}
            </p>
            <p className="text-gray-700">
              <strong className="text-yellow-600">Deporte:</strong> {event.sportName}
            </p>

            {/* Mostrar jugadores inscritos */}
            {joinRequests.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-yellow-600 mt-4">Jugadores Inscritos:</h3>
                <ul className="mt-2 space-y-2">
                  {joinRequests.map((request) => (
                    <li
                      key={request.id}
                      className="p-3 bg-gray-100 rounded-lg flex justify-between items-center"
                    >
                      <div>
                        <p className="text-gray-800 font-semibold">{request.userName}</p>
                        <p className="text-gray-600 text-sm">{request.userEmail}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={handleEditToggle}
              className="w-full py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition duration-300"
            >
              Editar
            </button>
          </div>
        )}

        <button
          onClick={() => onDelete(event.id)}
          className="w-full mt-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default ModalViewEvent;
