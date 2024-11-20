import React, { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  addEvent: (event: { id: number; name: string; date: string; description: string }) => void;
}

const ModalEvent: React.FC<ModalProps> = ({ isOpen, onClose, addEvent }) => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

   
    const newEvent = {
      id: Date.now(), 
      name: formData.name,
      date: formData.date,
      description: formData.description,
    };

    addEvent(newEvent);
    onClose(); 
  };

  return (
    isOpen ? (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl text-gray-800">Crear Evento</h2>
            <button onClick={onClose} className="text-gray-600 hover:text-gray-800 text-2xl">&times;</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="name" className="text-gray-700">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nombre del evento"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="date" className="text-gray-700">Fecha</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="description" className="text-gray-700">Descripción</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Descripción del evento"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 mt-4 bg-yellow-400 text-gray-800 font-semibold rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              Guardar Evento
            </button>
          </form>
        </div>
      </div>
    ) : null
  );
};

export default ModalEvent;
