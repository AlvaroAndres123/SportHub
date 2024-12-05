// src/types/types.ts
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
    idteams: number;
    team_name: string;
    team_description: string;
    team_status: string;
    shared_code?: string;
    created_at?: string;
  }