import { NextRequest, NextResponse } from 'next/server';
import { db } from '@vercel/postgres';


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
