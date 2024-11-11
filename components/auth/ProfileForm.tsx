'use client'

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface ProfileFormProps {
    onSubmit: (formData: FormData) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onSubmit }) => {
    const { data: session } = useSession();
    const [name, setName] = useState('');
    const [userImage, setUserImage] = useState<File | null>(null);

    useEffect(() => {
        if (session?.user) {
            setName(session.user.name || '');
        }
    }, [session]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!session || !session.user) return;

        const formData = new FormData();
        formData.append('id', session.user.id);
        formData.append('name', name);
        if (userImage) formData.append('user_image', userImage);

        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-xl p-6 bg-white rounded-lg shadow-lg space-y-6">
            <div className="mb-6">
                <label htmlFor="name" className="block text-lg font-semibold text-secondary mb-2">Nombre:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
            </div>
            <div className="mb-6">
                <label htmlFor="userImage" className="block text-lg font-semibold text-secondary mb-2">Imagen de perfil:</label>
                <input
                    type="file"
                    id="userImage"
                    accept="image/*"
                    onChange={(e) => setUserImage(e.target.files?.[0] || null)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
            </div>
            <button
                type="submit"
                className="w-full py-3 bg-primary text-white font-semibold rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition"
            >
                Actualizar Perfil
            </button>
        </form>
    );
};

export default ProfileForm;
