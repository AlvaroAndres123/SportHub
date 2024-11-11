'use client'

import React, { useState } from 'react';
import Navbar from "@/components/navbar";
import Ranking from "./Ranking";


type Sport = 'Futbol' | 'Baloncesto' | 'Tenis de Mesa';


interface RankItem {
  position: number;
  name: string;
  points: number;
}

const Page = () => {
  const [selectedSport, setSelectedSport] = useState<Sport>('Futbol'); 

  const rankings: Record<Sport, RankItem[]> = {
    Futbol: [
      { position: 1, name: 'Equipo A', points: 120 },
      { position: 2, name: 'Equipo B', points: 110 },
      { position: 3, name: 'Equipo C', points: 90 },
    ],
    Baloncesto: [
      { position: 1, name: 'Jugador X', points: 200 },
      { position: 2, name: 'Jugador Y', points: 180 },
      { position: 3, name: 'Jugador Z', points: 150 },
    ],
    'Tenis de Mesa': [
      { position: 1, name: 'Jugador 1', points: 50 },
      { position: 2, name: 'Jugador 2', points: 45 },
      { position: 3, name: 'Jugador 3', points: 40 },
    ],
  };


  const handleSportChange = (sport: Sport) => {
    setSelectedSport(sport);
  };

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Título principal */}
      <h1 className="text-3xl font-bold text-center mt-8 text-gray-800">Ranking de Deportes</h1>

      {/* Sección para seleccionar un deporte */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => handleSportChange('Futbol')}
          className={`px-6 py-2 mx-2 rounded-lg ${selectedSport === 'Futbol' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          Fútbol
        </button>
        <button
          onClick={() => handleSportChange('Baloncesto')}
          className={`px-6 py-2 mx-2 rounded-lg ${selectedSport === 'Baloncesto' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          Baloncesto
        </button>
        <button
          onClick={() => handleSportChange('Tenis de Mesa')}
          className={`px-6 py-2 mx-2 rounded-lg ${selectedSport === 'Tenis de Mesa' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          Tenis de Mesa
        </button>
      </div>

      {/* Componente de Ranking */}
      <Ranking selectedSport={selectedSport} rankings={rankings} />
    </div>
  );
};

export default Page;
