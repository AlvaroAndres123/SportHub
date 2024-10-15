import React from 'react'
import Image from 'next/image'

const about = () => {
    return (
        <div className='container mx-auto px-4 md:px-8'>
            <h1 className='title py-6 md:text-left text-center'>Sobre los Desarolladores</h1>

            <div className='flex flex-col md:flex-row gap-y-4 md:gap-x-4'>


                {/*Descritive Text*/}
                <div className='border-gray-300 p-4 shadow-lg basis-full md:basis-1/2'>
                    <p className='ptext'>
                    Somos jóvenes estudiantes de Ingeniería en Sistemas con ganas de superarnos, y eso incluye desarrollar 
                    diversos proyectos innovadores. Nos apasiona la tecnología y estamos comprometidos con el aprendizaje continuo 
                    para enfrentar los desafíos del futuro. Creemos en el trabajo en equipo y 
                    en la colaboración para alcanzar nuestras metas y contribuir positivamente a la sociedad.
                    </p>

                </div>

                <div className=''>
                    <h2 className='subtitle text-center md:text-left '>Nuestros Desarolladores</h2>


                    {/*Images*/}
                    <div className='flex flex-col sm:flex-row justify-center items-center md:justify-start md:flex-row gap-4'>

                        <div className='flex flex-col items-center'>
                            <Image className='rounded-full'
                                src={'/img/Moura.jpg'}
                                width={200}
                                height={200}
                                alt='Picture of developers'
                            />
                            <h1>Alvaro Casco</h1>
                        </div>
                        
                        <div className='flex flex-col items-center'>
                            <Image className='rounded-full'
                                src={'/img/Moura.jpg'}
                                width={200}
                                height={200}
                                alt='Picture of developers'
                            />
                                   <h1>Manuel Paniagua </h1>
                        </div>
                 


                        <div className='flex flex-col items-center'>
                            <Image className='rounded-full'
                                src={'/img/Moura.jpg'}
                                width={200}
                                height={200}
                                alt='Picture of developers'
                            />
                                <h1>Carlos Muñoz</h1>
                        </div>

                    

                    </div>



                </div >


            </div >

        </div >
    )
}

export default about
