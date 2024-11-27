import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

export async function POST(request: Request) {
  try {
    const { registrationCode } = await request.json();

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { message: "No estás autenticado." },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    const event = await sql`
      SELECT idevents FROM events WHERE shared_code = ${registrationCode}
    `;

    if (!event || event.rowCount === 0) {
      return NextResponse.json(
        { message: "Código de registro no válido." },
        { status: 400 }
      );
    }

    const eventId = event.rows[0].idevents;

    // Verificar si ya está registrado
    const existingRegistration = await sql`
      SELECT * FROM event_registrations
      WHERE idusers = ${userId} AND idevents = ${eventId}
    `;

    if (existingRegistration?.rowCount && existingRegistration.rowCount > 0) {
      return NextResponse.json({
        message: "Ya estás registrado en este evento.",
      });
    }

    // Registrar al usuario en el evento
    await sql`
      INSERT INTO event_registrations (idusers, idevents, registration_code)
      VALUES (${userId}, ${eventId}, ${registrationCode})
    `;

    return NextResponse.json({
      message: "Registro exitoso.",
    });
  } catch (error) {
    console.error("Error al registrar participación:", error);
    return NextResponse.json(
      { message: "Error al registrar la participación." },
      { status: 500 }
    );
  }
}

