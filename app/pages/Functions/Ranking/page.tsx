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
      { position: 1, name: 'Culiopteros', points: 120 },
      { position: 2, name: 'Los ABC', points: 110 },
      { position: 3, name: 'Los 7 Puntos', points: 90 },
    ],
    Baloncesto: [
      { position: 1, name: 'Bonilla Lopez', points: 200 },
      { position: 2, name: 'El Salta Alto', points: 180 },
      { position: 3, name: 'Negro Matias', points: 150 },
    ],
    'Tenis de Mesa': [
      { position: 1, name: 'Ma Lin', points: 50 },
      { position: 2, name: 'Rocket Trunk', points: 45 },
      { position: 3, name: 'Chino Lopez', points: 40 },
    ],
  };

  const handleSportChange = (sport: Sport) => {
    setSelectedSport(sport);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Título principal */}
      <h1 className="text-4xl font-extrabold text-center mt-10 text-gray-900">Ranking de Deportes</h1>

      {/* Sección para seleccionar un deporte */}
      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={() => handleSportChange('Futbol')}
          className={`px-8 py-3 rounded-lg text-lg font-medium transition-all duration-300 ease-in-out 
            ${selectedSport === 'Futbol' ? 'bg-yellow-500 text-white transform scale-105' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
        >
          Fútbol
        </button>
        <button
          onClick={() => handleSportChange('Baloncesto')}
          className={`px-8 py-3 rounded-lg text-lg font-medium transition-all duration-300 ease-in-out 
            ${selectedSport === 'Baloncesto' ? 'bg-yellow-500 text-white transform scale-105' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
        >
          Baloncesto
        </button>
        <button
          onClick={() => handleSportChange('Tenis de Mesa')}
          className={`px-8 py-3 rounded-lg text-lg font-medium transition-all duration-300 ease-in-out 
            ${selectedSport === 'Tenis de Mesa' ? 'bg-yellow-500 text-white transform scale-105' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
        >
          Tenis de Mesa
        </button>
      </div>

      {/* Componente de Ranking */}
      <div className="mt-10 max-w-4xl mx-auto">
        <Ranking selectedSport={selectedSport} rankings={rankings} />
      </div>
    </div>
  );
};

export default Page;
