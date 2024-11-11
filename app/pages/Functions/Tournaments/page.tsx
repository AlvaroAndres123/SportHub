'use client'

import React, { useState } from 'react'
import Navbar from "@/components/navbar";
import AddButton from '@/components/add';
import Modal from '@/components/functions/ModalEvent'; 

interface Event {
  id: number;
  name: string;
  date: string;
  description: string;
}

const Page = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]); 


  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };


  const addEvent = (newEvent: Event) => {
    setEvents([...events, newEvent]);
    closeModal(); 
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <h1 className="text-3xl font-bold text-center mt-8 text-gray-800">Eventos de Torneos</h1>
      
      {/* Lista de eventos */}
      <div className="mt-8 mx-4">
        {events.length === 0 ? (
          <p className="text-center text-gray-500">No hay eventos creados todavía.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-yellow-500">{event.name}</h3>
                <p className="text-gray-700 mt-2">{event.date}</p>
                <p className="text-gray-600 mt-2">{event.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <AddButton 
        onClick={openModal} 
        className="fixed bottom-4 right-4 z-10" 
      />

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} addEvent={addEvent} />
    </div>
  );
}

export default Page;
