'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import ProfileForm from '@/components/auth/ProfileForm';
import BackButton from '@/components/auth/backbutton';

const Configuracion = () => {
    const router = useRouter();

    const handleBackClick = () => {
        router.push('/'); 
    };

    const handleFormSubmit = async (formData: FormData) => {
        const response = await fetch('/api/users', {
            method: 'PATCH',
            body: formData,
        });

        const responseBody = await response.text();
        console.log(responseBody);

        if (response.ok) {
            alert('Perfil actualizado con éxito');
        } else {
            alert('Error al actualizar el perfil');
        }
    };

    return (
        <div className="bgimage">
            <BackButton
                onClick={handleBackClick}
                className="text-white font-extrabold"
            />

             <div className='flex justify-center items-center mt-[50%] md:mt-[18%] '>
            <ProfileForm onSubmit={handleFormSubmit} />
            </div>
            
        </div>
    );
};

export default Configuracion;