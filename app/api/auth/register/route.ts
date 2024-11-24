import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
  try {

    const { name, email, password, role } = await request.json();

 
    if (role !== 'player' && role !== 'organizer') {
      return NextResponse.json({ message: 'Rol no válido' }, { status: 400 });
    }

    const hashedPassword = await hash(password, 10);


    const roleQuery = await sql`
      SELECT idroles FROM roles WHERE role_name = ${role === 'player' ? 'Jugador' : 'Organizador'}
    `;
    

    if (roleQuery.rowCount === 0) {
      return NextResponse.json({ message: 'Rol no encontrado en la base de datos' }, { status: 400 });
    }
    
    const userRoleId = roleQuery.rows[0].idroles;


    const response = await sql`
      INSERT INTO users (name, email, password, idroles)
      VALUES (${name}, ${email}, ${hashedPassword}, ${userRoleId})
    `;

    return NextResponse.json({ message: 'success' });
  } catch (e) {
    console.log({ e });
    return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
  }
}