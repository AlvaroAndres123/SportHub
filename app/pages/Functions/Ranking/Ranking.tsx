
import React from 'react';


interface RankItem {
  position: number;
  name: string;
  points: number;
}

interface RankingProps {
  selectedSport: string;
  rankings: Record<string, RankItem[]>;
}

const Ranking: React.FC<RankingProps> = ({ selectedSport, rankings }) => {
  return (
    <div className="mt-8 mx-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">{selectedSport}</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4 text-gray-700">Posición</th>
              <th className="py-2 px-4 text-gray-700">Nombre</th>
              <th className="py-2 px-4 text-gray-700">Puntos</th>
            </tr>
          </thead>
          <tbody>
            {rankings[selectedSport].map((rank: RankItem) => (
              <tr key={rank.position} className="border-b">
                <td className="py-2 px-4 text-gray-700">{rank.position}</td>
                <td className="py-2 px-4 text-gray-700">{rank.name}</td>
                <td className="py-2 px-4 text-gray-700">{rank.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ranking;
