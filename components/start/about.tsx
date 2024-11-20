import React from 'react'
import DeveloperCard from '../DeveloperCard'

interface Developer {
  id: number;
  name: string;
  image: string;
  quote: string;
}

const About = () => {
  const developers: Developer[] = [
    {
      id: 1,
      name: "Alvaro Casco",
      image: "/img/Moura.jpg", 
      quote: "Siempre hay una solución para todo, solo hay que saber buscarla.",
    },
    {
      id: 2,
      name: "Carlos Muñoz",
      image: "/img/Charlie.jpeg",
      quote: "La tecnología debe ser al servicio de las personas, no al revés.",
    },
    {
      id: 3,
      name: "Manuel Paniagua",
      image: "/img/Paniagua.jpeg",
      quote: "Automatizar procesos es la clave para un desarrollo eficiente.",
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6">
 
      <div className="text-center mb-12">
        <h1 className="text-4xl font-semibold text-primary mb-4">Conoce a los Desarrolladores</h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
          Somos jóvenes estudiantes de Ingeniería en Sistemas con ganas de superarnos, y eso incluye desarrollar 
          diversos proyectos innovadores. Nos apasiona la tecnología y estamos comprometidos con el aprendizaje continuo 
          para enfrentar los desafíos del futuro. Creemos en el trabajo en equipo y 
          en la colaboración para alcanzar nuestras metas y contribuir positivamente a la sociedad.
        </p>
      </div>


      <div className="flex flex-wrap justify-center gap-8">
        {developers.map((developer) => (
          <DeveloperCard 
            key={developer.id}
            name={developer.name}
            image={developer.image}
            quote={developer.quote}  
          />
        ))}
      </div>
    </div>
  );
}

export default About;
