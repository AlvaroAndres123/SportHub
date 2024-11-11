import { NextRequest, NextResponse } from 'next/server';
import { db } from '@vercel/postgres';
import { Buffer } from 'buffer';


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
  const { id, name, user_image } = await req.json();
  let client;
  try {
    client = await db.connect();


    const imageBuffer = Buffer.from(user_image.split(',')[1], 'base64');

    await client.query(
      'UPDATE users SET name = $1, user_image = $2 WHERE idusers = $3',
      [name, imageBuffer, id]
    );

    client.release();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Error updating user' }, { status: 500 });
  }
}
