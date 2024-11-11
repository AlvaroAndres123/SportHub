'use client'

import React, { useState } from 'react';
import Navbar from "@/components/navbar";
import EventList from "./Calendar";

// Tipo para los eventos
interface Event {
  id: number;
  name: string;
  date: string; // Formato: YYYY-MM-DD
  description: string;
  isRegistered: boolean; // Estado de la inscripción
}

const Page = () => {
  // Lista de eventos (simulación de datos)
  const events: Event[] = [
    { id: 1, name: 'Torneo de Fútbol', date: '2024-11-15', description: 'Evento de fútbol para todos los niveles.', isRegistered: true },
    { id: 2, name: 'Campeonato de Baloncesto', date: '2024-11-18', description: 'Competencia de baloncesto con equipos locales.', isRegistered: false },
    { id: 3, name: 'Tenis de Mesa Amateur', date: '2024-11-20', description: 'Torneo de tenis de mesa en formato individual.', isRegistered: true },
    { id: 4, name: 'Maratón Anual', date: '2024-11-25', description: 'Maratón anual en la ciudad, todos bienvenidos.', isRegistered: false },
  ];

  const [selectedDate, setSelectedDate] = useState<string>('2024-11-15'); // Fecha seleccionada por defecto

  // Filtrar eventos por la fecha seleccionada
  const filteredEvents = events.filter(event => event.date === selectedDate);

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Título principal */}
      <h1 className="text-3xl font-bold text-center mt-8 text-gray-800">Calendario de Eventos</h1>

      {/* Calendario (solo presentación, sin interacción real) */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setSelectedDate('2024-11-15')}
          className={`px-6 py-2 mx-2 rounded-lg ${selectedDate === '2024-11-15' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          15 Nov 2024
        </button>
        <button
          onClick={() => setSelectedDate('2024-11-18')}
          className={`px-6 py-2 mx-2 rounded-lg ${selectedDate === '2024-11-18' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          18 Nov 2024
        </button>
        <button
          onClick={() => setSelectedDate('2024-11-20')}
          className={`px-6 py-2 mx-2 rounded-lg ${selectedDate === '2024-11-20' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          20 Nov 2024
        </button>
        <button
          onClick={() => setSelectedDate('2024-11-25')}
          className={`px-6 py-2 mx-2 rounded-lg ${selectedDate === '2024-11-25' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          25 Nov 2024
        </button>
      </div>

      {/* Componente para mostrar los eventos filtrados */}
      <EventList filteredEvents={filteredEvents} selectedDate={selectedDate} />
    </div>
  );
};

export default Page;
