'use client'

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const Configuracion = () => {
    const { data: session } = useSession();
    const [name, setName] = useState('');
    const [userImage, setUserImage] = useState<File | null>(null);

    useEffect(() => {
        if (session?.user) {
            setName(session.user.name || '');
        }
    }, [session]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session || !session.user) return;

        const formData = new FormData();
        formData.append('id', session.user.id);
        formData.append('name', name);
        if (userImage) formData.append('user_image', userImage);

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
        <form onSubmit={handleSubmit} className="configuracion-form">
            <div>
                <label htmlFor="name">Nombre:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="userImage">Imagen de perfil:</label>
                <input
                    type="file"
                    id="userImage"
                    accept="image/*"
                    onChange={(e) => setUserImage(e.target.files?.[0] || null)}
                />
            </div>
            <button type="submit">Actualizar Perfil</button>
        </form>
    );
};

export default Configuracion;
