'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface Event {
  id: number;
  name: string;
  date: string;
  description: string;
  sport: string;
  startTime: string;
  endTime: string;
  sportName: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void; 
}

const ModalEvent: React.FC<ModalProps> = ({ isOpen, onClose}) => {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    description: '',
    sport: '',
    startTime: '',
    endTime: '',
  });

  const [sports, setSports] = useState<{ id: number; name: string }[]>([]);
  const [isLoadingSports, setIsLoadingSports] = useState(true);

  // Cargar deportes desde la API
  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await fetch('/api/sports');
        if (response.ok) {
          const data = await response.json();
          setSports(data);
        } else {
          console.error('Error al obtener los deportes:', response.statusText);
        }
      } catch (error) {
        console.error('Error en la llamada al API:', error);
      } finally {
        setIsLoadingSports(false);
      }
    };

    fetchSports();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!formData.name || !formData.date || !formData.sport || !formData.startTime || !formData.endTime) {
      alert('Por favor completa todos los campos obligatorios.');
      return;
    }
  
    const selectedSport = sports.find((sport) => sport.id.toString() === formData.sport);
    if (!selectedSport) {
      alert('Deporte no válido.');
      return;
    }
  
    try {
      const newEvent: Event = {
        id: Date.now(),
        name: formData.name,
        date: formData.date,
        description: formData.description,
        sport: formData.sport,
        startTime: formData.startTime,
        endTime: formData.endTime,
        sportName: selectedSport.name,
      };
  
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...newEvent, idusers: session?.user?.id }),
      });
  
      if (!response.ok) {
        throw new Error('Error al crear el evento');
      }
  
      // Forzar la recarga de la página después de crear el evento
      window.location.reload();
    } catch (error) {
      console.error('No se pudo crear el evento:', error);
      alert('No se pudo crear el evento. Intenta nuevamente.');
    }
  };
  

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-gray-800">Crear Evento</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800 text-2xl">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="name" className="text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nombre del evento"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="date" className="text-gray-700">
              Fecha
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="sport" className="text-gray-700">
              Deporte
            </label>
            {isLoadingSports ? (
              <p className="text-gray-500">Cargando deportes...</p>
            ) : (
              <select
                id="sport"
                name="sport"
                value={formData.sport}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option value="">Seleccionar un deporte</option>
                {sports.map((sport) => (
                  <option key={sport.id} value={sport.id}>
                    {sport.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="space-y-1">
            <label htmlFor="startTime" className="text-gray-700">
              Hora de inicio
            </label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="endTime" className="text-gray-700">
              Hora de finalización
            </label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="description" className="text-gray-700">
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Descripción del evento"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-yellow-400 text-gray-800 font-semibold rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            Guardar Evento
          </button>
        </form>
      </div>
    </div>
  ) : null;
};

export default ModalEvent;
