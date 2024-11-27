// src/types/types.ts
export interface Event {
    id: number;
    name: string;
    date: string;
    description: string;
    startTime: string;
    endTime: string;
    sportName: string;
    registrationCode?: string; // Opcional para eventos registrados
  }
  