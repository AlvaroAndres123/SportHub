import { sql } from "@vercel/postgres";
import { NextResponse, NextRequest } from "next/server";
import { nanoid } from "nanoid";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Falta el parámetro userId" }, { status: 400 });
  }

  try {
    const events = await sql`
      SELECT
        e.idevents AS id,
        e.name,
        e.date,
        e.start_time AS starttime,
        e.end_time AS endtime,
        e.description,
        e.idsports,
        e.shared_code AS sharecode,
        s.name AS sportname
      FROM events e
      LEFT JOIN sports s ON e.idsports = s.idsports
      WHERE e.idusers = ${userId}
    `;

    return NextResponse.json(events.rows);
  } catch (error) {
    console.error("Error al obtener eventos:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, date, description, sport, startTime, endTime, idusers } = await req.json();

    if (!name || !date || !sport || !startTime || !endTime || !idusers) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios: name, date, sport, startTime, endTime, idusers" },
        { status: 400 }
      );
    }

    const sharedCode = nanoid(8); // Genera un código único de 8 caracteres

    const result = await sql`
      INSERT INTO events (name, date, description, idsports, start_time, end_time, idusers, shared_code)
      VALUES (${name}, ${date}, ${description}, ${sport}, ${startTime}, ${endTime}, ${idusers}, ${sharedCode})
      RETURNING idevents AS id, name, date, description, start_time AS startTime, end_time AS endTime, idsports AS sport, shared_code AS shareCode
    `;

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error al crear evento:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

