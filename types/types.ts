export interface Event {
  id: number;
  name: string;
  date: string;
  description: string;
  startTime: string;
  endTime: string;
  sportName: string;
  sharedCode?: string;
}

export interface Team {
  id: number;
  team_name: string;
  team_description: string;
  team_status: string;
  shared_code?: string;
  created_at?: string;
}

export interface TeamMember {
  id: number; // ID del miembro en la tabla de miembros
  idusers: number;        // ID del usuario
  userName: string;       // Nombre del usuario
  userEmail: string;      // Correo del usuario
}