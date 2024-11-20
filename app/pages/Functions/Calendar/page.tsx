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
    <div className="relative min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Título principal */}
      <h1 className="text-4xl font-extrabold text-center mt-10 text-gray-900">Calendario de Eventos</h1>

      {/* Sección para seleccionar una fecha */}
      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={() => setSelectedDate('2024-11-15')}
          className={`px-8 py-3 rounded-lg text-lg font-medium transition-all duration-300 ease-in-out 
            ${selectedDate === '2024-11-15' ? 'bg-yellow-500 text-white transform scale-105' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
        >
          15 Nov 2024
        </button>
        <button
          onClick={() => setSelectedDate('2024-11-18')}
          className={`px-8 py-3 rounded-lg text-lg font-medium transition-all duration-300 ease-in-out 
            ${selectedDate === '2024-11-18' ? 'bg-yellow-500 text-white transform scale-105' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
        >
          18 Nov 2024
        </button>
        <button
          onClick={() => setSelectedDate('2024-11-20')}
          className={`px-8 py-3 rounded-lg text-lg font-medium transition-all duration-300 ease-in-out 
            ${selectedDate === '2024-11-20' ? 'bg-yellow-500 text-white transform scale-105' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
        >
          20 Nov 2024
        </button>
        <button
          onClick={() => setSelectedDate('2024-11-25')}
          className={`px-8 py-3 rounded-lg text-lg font-medium transition-all duration-300 ease-in-out 
            ${selectedDate === '2024-11-25' ? 'bg-yellow-500 text-white transform scale-105' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
        >
          25 Nov 2024
        </button>
      </div>

      {/* Componente para mostrar los eventos filtrados */}
      <div className="mt-10 max-w-4xl mx-auto">
        <EventList filteredEvents={filteredEvents} selectedDate={selectedDate} />
      </div>
    </div>
  );
};

export default Page;
