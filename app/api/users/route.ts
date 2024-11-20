import { NextRequest, NextResponse } from 'next/server';
import { db } from '@vercel/postgres';
import { signIn } from 'next-auth/react';  // Esto no funcionará en el backend, solo se puede usar en el cliente. por que lo puse aqui no me acuerdo deberia borarlo

export async function GET(req: NextRequest) {
  let client;
  try {
    client = await db.connect();
    const result = await client.query('SELECT * FROM users');
    client.release();
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error en Buscar users:', error);
    return NextResponse.json({ error: 'Error en Buscar users' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const { id, name } = await req.json(); 
  let client;
  
  if (!id || !name) {
    return NextResponse.json({ error: 'Falta Campos' }, { status: 400 });
  }

  try {
    client = await db.connect();

    await client.query(
      'UPDATE users SET name = $1 WHERE idusers = $2',
      [name, id]
    );

    client.release();


    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error Actualizar user:', error);
    return NextResponse.json({ error: 'Error Actualizar user' }, { status: 500 });
  }
}
