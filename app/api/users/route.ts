import { NextRequest, NextResponse } from 'next/server';
import { db } from '@vercel/postgres';

export async function GET(req: NextRequest) {
  let client;
  try {
    client = await db.connect();
    const result = await client.query('SELECT * FROM users');
    return NextResponse.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return NextResponse.json(
      { success: false, error: 'Error al obtener usuarios' },
      { status: 500 }
    );
  } finally {
    client?.release(); 
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Datos recibidos en el backend:', body);

    const { id, name } = body;
    if (!id || !name) {
      console.log('Error: Faltan campos', body);
      return NextResponse.json(
        { error: 'Falta Campos' },
        { status: 400 }
      );
    }

    const client = await db.connect();
    const result = await client.query(
      'UPDATE users SET name = $1 WHERE idusers = $2 RETURNING *',
      [name, id]
    );

    console.log('Resultado de la consulta:', result.rows);

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error al procesar la solicitud PATCH:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}

