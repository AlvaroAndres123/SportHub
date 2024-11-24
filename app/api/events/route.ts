import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const events = await sql`
      SELECT 
        events.idevents AS id,
        events.name,
        events.date,
        events.description,
        events.start_time AS startTime,
        events.end_time AS endTime,
        sports.name AS sportName -- Aquí obtenemos el nombre del deporte
      FROM events
      LEFT JOIN sports ON events.idsports = sports.idsports
    `;

    return NextResponse.json(events.rows);
  } catch (error) {
    console.error("Error al obtener eventos:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
export async function POST(req: Request) {
  try {
    const { name, date, description, sport, startTime, endTime, idusers } = await req.json();

    if (!name || !date || !sport || !startTime || !endTime || !idusers) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO events (name, date, description, idsports, start_time, end_time, idusers)
      VALUES (${name}, ${date}, ${description}, ${sport}, ${startTime}, ${endTime}, ${idusers})
      RETURNING idevents AS id, name, date, description, start_time AS startTime, end_time AS endTime, idsports AS sport
    `;

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error al crear evento:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
