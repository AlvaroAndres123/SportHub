import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';

export async function POST(request: Request) {
  try {
    const { eventId } = await request.json();

    if (!eventId) {
      return NextResponse.json(
        { message: 'Falta el ID del evento.' },
        { status: 400 }
      );
    }

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { message: 'No estás autenticado.' },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // Verificar si existe la inscripción
    const registration = await sql`
      SELECT * FROM event_registrations 
      WHERE idusers = ${userId} AND idevents = ${eventId}
    `;

    if (!registration || registration.rowCount === 0) {
      return NextResponse.json(
        { message: 'No estás inscrito en este evento.' },
        { status: 400 }
      );
    }

    // Eliminar inscripción
    await sql`
      DELETE FROM event_registrations 
      WHERE idusers = ${userId} AND idevents = ${eventId}
    `;

    return NextResponse.json({ message: 'Saliste del evento exitosamente.' });
  } catch (error) {
    console.error('Error al salir del evento:', error);
  
    const errorMessage =
      error instanceof Error ? error.message : 'Error desconocido';
  
    return NextResponse.json(
      { message: 'Error al salir del evento.', error: errorMessage },
      { status: 500 }
    );
  }
  
}
