import React from 'react'
import Image from 'next/image'

interface DeveloperCardProps {
  name: string;
  image: string;
  quote: string; 
}

const DeveloperCard: React.FC<DeveloperCardProps> = ({ name, image, quote }) => {
  return (
    <div className="max-w-xs bg-white border border-gray-300 rounded-lg shadow-lg p-6 flex flex-col items-center">
      <div className="w-32 h-32 mb-4 rounded-full overflow-hidden">
        <Image src={image} alt={name} width={128} height={128} className="object-cover"/>
      </div>
      <h2 className="text-xl font-bold mb-2">{name}</h2>
      <p className="text-gray-600 text-center italic mb-4">"{quote}"</p>  {/* Mostramos la frase */}
    </div>
  )
}

export default DeveloperCard;
