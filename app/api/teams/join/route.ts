import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';

export async function POST(request: Request) {
  try {
    // Obtenemos el código de registro enviado en la solicitud
    const { registrationCode } = await request.json();
    console.log("Código recibido en la API:", registrationCode);

    // Verificamos la sesión del usuario
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      console.error('Usuario no autenticado.');
      return NextResponse.json(
        { message: 'No estás autenticado.' },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    console.log('ID del usuario autenticado:', userId);

    // Buscamos el equipo asociado con el código de registro
    const team = await sql`
      SELECT idteams FROM teams WHERE shared_code = ${registrationCode}
    `;
    console.log('Equipo encontrado:', team.rows);

    if (!team || team.rowCount === 0) {
      console.error('Código de registro no válido.');
      return NextResponse.json(
        { message: 'Código de registro no válido.' },
        { status: 400 }
      );
    }

    const teamId = team.rows[0].idteams;

    // Verificamos si el usuario ya está registrado en el equipo
    const existingRegistration = await sql`
      SELECT * FROM team_members
      WHERE idusers = ${userId} AND idteams = ${teamId}
    `;
    console.log('Registro existente:', existingRegistration.rows);

    if (existingRegistration?.rowCount && existingRegistration.rowCount > 0) {
      console.warn('Usuario ya está registrado en este equipo.');
      return NextResponse.json({
        message: 'Ya estás registrado en este equipo.',
      });
    }

    // Registramos al usuario en el equipo
    await sql`
      INSERT INTO team_members (idusers, idteams, registration_code)
      VALUES (${userId}, ${teamId}, ${registrationCode})
    `;

    console.log('Registro exitoso para el equipo:', teamId);

    return NextResponse.json({
      message: 'Registro exitoso en el equipo.',
    });
  } catch (error) {
    console.error('Error al registrar al miembro en el equipo:', error);
    
    // Manejo de errores
    let errorMessage = 'Error desconocido';
    if (typeof error === 'object' && error !== null && 'message' in error) {
      errorMessage = (error as { message: string }).message;
    }

    return NextResponse.json(
      { message: 'Error al registrar al miembro en el equipo.', error: errorMessage },
      { status: 500 }
    );
  }
}
