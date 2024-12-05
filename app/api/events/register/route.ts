import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

export async function POST(request: Request) {
  try {
    const { registrationCode } = await request.json();
    console.log("Código recibido en la API:", registrationCode);

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      console.error("Usuario no autenticado.");
      return NextResponse.json(
        { message: "No estás autenticado." },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    console.log("ID del usuario autenticado:", userId);

    const event = await sql`
      SELECT idevents FROM events WHERE shared_code = ${registrationCode}
    `;
    console.log("Evento encontrado:", event.rows);

    if (!event || event.rowCount === 0) {
      console.error("Código de registro no válido.");
      return NextResponse.json(
        { message: "Código de registro no válido." },
        { status: 400 }
      );
    }

    const eventId = event.rows[0].idevents;

    const existingRegistration = await sql`
      SELECT * FROM event_registrations
      WHERE idusers = ${userId} AND idevents = ${eventId}
    `;
    console.log("Registro existente:", existingRegistration.rows);

    if (existingRegistration?.rowCount && existingRegistration.rowCount > 0) {
      console.warn("Usuario ya está registrado en este evento.");
      return NextResponse.json({
        message: "Ya estás registrado en este evento.",
      });
    }

    await sql`
      INSERT INTO event_registrations (idusers, idevents, registration_code)
      VALUES (${userId}, ${eventId}, ${registrationCode})
    `;

    console.log("Registro exitoso para el evento:", eventId);

    return NextResponse.json({
      message: "Registro exitoso.",
    });
  } catch (error) {
    console.error("Error al registrar participación:", error);
  
    let errorMessage = "Error desconocido";
    if (typeof error === "object" && error !== null && "message" in error) {
      errorMessage = (error as { message: string }).message;
    }
  
    return NextResponse.json(
      { message: "Error al registrar la participación.", error: errorMessage },
      { status: 500 }
    );
  }
  
}
