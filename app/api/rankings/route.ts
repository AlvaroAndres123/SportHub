/*
import { query } from '../../../lib/db';

export default async function handler(req, res) {
  const { sport_id } = req.query;

  if (req.method === 'GET') {
    const result = await query(`
      SELECT u.name, r.points, r.rank_position 
      FROM rankings r
      JOIN users u ON u.idusers = r.idusers
      WHERE r.idsports = $1
      ORDER BY r.rank_position ASC
    `, [sport_id]);

    res.status(200).json(result.rows);
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}

*/ 