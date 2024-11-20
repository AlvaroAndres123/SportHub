/*

import { query } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { team_name, team_description } = req.body;
    const queryText = `
      INSERT INTO teams (team_name, team_description) 
      VALUES ($1, $2) RETURNING idteams
    `;
    try {
      const result = await query(queryText, [team_name, team_description]);
      res.status(201).json({ idteams: result.rows[0].idteams });
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el equipo' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}


*/ 