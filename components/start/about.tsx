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
      quote: "Estaremos bien al final y si no estamos bien no hemos llegado al final",
    },
    {
      id: 2,
      name: "Carlos Muñoz",
      image: "/img/Charlie.jpeg",
      quote: "Bah, típica frase Rivense, donde cada 'bah' significa que los cosas van mal.",
    },
    {
      id: 3,
      name: "Manuel Paniagua",
      image: "/img/Paniagua.jpeg",
      quote: " Se ven en la pantalla tres vectores linealmente independientes. ¿Como se llama la película?. Rango 3. ",
    }
  ];

  return (
    <div className=" min-h-screen py-16 px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-primary mb-6 animate__animated animate__fadeIn animate__delay-1s">
          Conoce a los Desarrolladores
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto mb-10 opacity-90 animate__animated animate__fadeIn animate__delay-2s">
          Somos jóvenes estudiantes de Ingeniería en Sistemas con ganas de superarnos, y eso incluye desarrollar 
          diversos proyectos innovadores. Nos apasiona la tecnología y estamos comprometidos con el aprendizaje continuo 
          para enfrentar los desafíos del futuro. Creemos en el trabajo en equipo y 
          en la colaboración para alcanzar nuestras metas y contribuir positivamente a la sociedad.
        </p>
      </div>

      {/* Sección de los desarrolladores */}
      <div className="flex flex-wrap justify-center gap-10">
        {developers.map((developer) => (
          <div key={developer.id} className="bg-white rounded-lg shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300">
            <DeveloperCard 
              name={developer.name}
              image={developer.image}
              quote={developer.quote}  
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default About;
