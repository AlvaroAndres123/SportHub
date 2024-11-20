import { NextRequest, NextResponse } from 'next/server';
import { db } from '@vercel/postgres';
import { signIn } from 'next-auth/react';  // Esto no funcionará en el backend, solo se puede usar en el cliente.

export async function GET(req: NextRequest) {
  let client;
  try {
    client = await db.connect();
    const result = await client.query('SELECT * FROM users');
    client.release();
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Error fetching users' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const { id, name } = await req.json(); 
  let client;
  
  if (!id || !name) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    client = await db.connect();

    // Actualizamos el nombre en la base de datos
    await client.query(
      'UPDATE users SET name = $1 WHERE idusers = $2',
      [name, id]
    );

    client.release();


    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Error updating user' }, { status: 500 });
  }
}
