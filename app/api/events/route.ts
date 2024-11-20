/*
import { query } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const result = await query('SELECT * FROM events');
    res.status(200).json(result.rows);
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
*/