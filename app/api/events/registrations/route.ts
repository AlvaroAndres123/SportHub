import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get("eventId"); // Obtener el ID del evento

    if (!eventId) {
      return NextResponse.json(
        { message: "Falta el parámetro eventId." },
        { status: 400 }
      );
    }

    // Consulta para obtener los jugadores inscritos en el evento
    const players = await sql`
      SELECT 
        u.idusers AS id,
        u.name AS userName,
        u.email AS userEmail
      FROM event_registrations er
      INNER JOIN users u ON er.idusers = u.idusers
      WHERE er.idevents = ${eventId}
    `;

    return NextResponse.json(players.rows);
  } catch (error) {
    console.error("Error al obtener jugadores inscritos:", error);
    return NextResponse.json(
      { message: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
