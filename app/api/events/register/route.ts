import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth"; 

export async function POST(request: Request) {
  try {
  
    const { registrationCode } = await request.json();

 
    const session = await getServerSession(authOptions); 

  
    if (!session || !session.user) {
      return NextResponse.json({ message: 'No estás autenticado.' }, { status: 401 });
    }

   
    const userId = session.user.id;

   
    const event = await sql`
      SELECT idevents FROM event_registrations WHERE registration_code = ${registrationCode}
    `;

   
    if (event.rowCount === 0) {
      return NextResponse.json({ message: 'Código de registro no válido.' }, { status: 400 });
    }


    await sql`
      INSERT INTO event_registrations (idusers, idevents, registration_code)
      VALUES (${userId}, ${event.rows[0].idevents}, ${registrationCode})
    `;

  
    return NextResponse.json({ message: 'Participación registrada correctamente.' });
  } catch (error) {
    console.error('Error al registrar participación:', error);
    return NextResponse.json({ message: 'Error al registrar la participación.' }, { status: 500 });
  }
}
