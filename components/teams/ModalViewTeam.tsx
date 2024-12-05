import React, { useState, useEffect } from 'react';
import { Team, TeamMember } from '@/types/types';

interface ModalViewTeamProps {
  isOpen: boolean;
  team: Team | null;
  onClose: () => void;
  onDelete: (teamId: number) => void;
  onUpdate: (updatedTeam: Team) => void;
  isOrganizer: boolean;
}

const ModalViewTeam: React.FC<ModalViewTeamProps> = ({
  isOpen,
  team,
  onClose,
  onDelete,
  onUpdate,
  isOrganizer,
}) => {
  const [isEditing, setEditing] = useState(false);
  const [formData, setFormData] = useState<Team | null>(team);
  const [members, setMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    // Verifica si el equipo tiene un ID válido antes de realizar la llamada
    if (team && team.id) {
      console.log(`Fetching members for team ID: ${team.id}`); // Verifica que el team tiene ID
      const fetchTeamMembers = async () => {
        try {
          const response = await fetch(`/api/teams/members?teamId=${team.id}`);
          if (response.ok) {
            const data = await response.json();
            console.log('Members data:', data); // Verifica los datos que devuelve el API
            const mappedData = data.map((item: any) => ({
              id: item.id,
              userName: item.username,
              userEmail: item.useremail,
            }));
            setMembers(mappedData); 
          } else {
            console.error('Error al obtener miembros del equipo:', response.statusText);
          }
        } catch (error) {
          console.error('Error al llamar al API de miembros del equipo:', error);
        }
      };

      fetchTeamMembers();
    } else {
      console.log('No team ID found or team is null', team);
    }
  }, [team]);


  const handleEditToggle = () => {
    setEditing(!isEditing);
    if (team) setFormData(team);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (formData) setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      onUpdate(formData);
      setEditing(false);
    }
  };

  const handleRemoveMember = async (memberId: number) => {
    try {
      const response = await fetch(`/api/teams/${team?.id}/members/${memberId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setMembers(members.filter((member) => member.id !== memberId));
      } else {
        console.error('Error al eliminar miembro:', response.statusText);
      }
    } catch (error) {
      console.error('Error al llamar al API de eliminar miembro:', error);
    }
  };

  if (!isOpen || !team) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-yellow-600">
            {isEditing ? 'Editar Equipo' : 'Detalles del Equipo'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 text-2xl font-bold"
          >
            &times;
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="team_name" className="block text-gray-700 font-medium mb-1">
                Nombre del Equipo
              </label>
              <input
                type="text"
                id="team_name"
                name="team_name"
                value={formData?.team_name || ''}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label htmlFor="team_description" className="block text-gray-700 font-medium mb-1">
                Descripción
              </label>
              <textarea
                id="team_description"
                name="team_description"
                value={formData?.team_description || ''}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition duration-300"
            >
              Guardar Cambios
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-700">
              <strong className="text-yellow-600">Nombre:</strong> {team.team_name}
            </p>
            <p className="text-gray-700">
              <strong className="text-yellow-600">Estado:</strong> {team.team_status}
            </p>
            {team.shared_code && (
              <p className="text-gray-700">
                <strong className="text-yellow-600">Código:</strong> {team.shared_code}
              </p>
            )}
            <p className="text-gray-700">
              <strong className="text-yellow-600">Descripción:</strong>{' '}
              {team.team_description || 'Sin descripción disponible.'}
            </p>

            {members.length > 0 ? (
              <div>
                <h3 className="text-lg font-semibold text-yellow-600 mt-4">Miembros del Equipo:</h3>
                <ul className="mt-2 space-y-2">
                  {members.map((member) => (
                    <li
                      key={member.id}
                      className="p-3 bg-gray-100 rounded-lg flex justify-between items-center"
                    >
                      <div>
                        <p className="text-gray-800 font-semibold">{member.userName}</p>
                        <p className="text-gray-600 text-sm">{member.userEmail}</p>
                      </div>
                      {isOrganizer && (
                        <button
                          onClick={() => handleRemoveMember(member.id)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Eliminar
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>No hay miembros disponibles.</p>
            )}

            {isOrganizer && (
              <button
                onClick={handleEditToggle}
                className="w-full py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition duration-300"
              >
                Editar
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalViewTeam;
