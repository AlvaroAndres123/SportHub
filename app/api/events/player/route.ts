import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "No estás autenticado." }, { status: 401 });
    }

    const userId = session.user.id;

    const events = await sql`
      SELECT 
          e.idevents AS id,
          e.name,
          e.date,
          e.start_time AS starttime,
          e.end_time AS endtime,
          e.description,
          s.name AS sportname, -- Columna sportname desde la tabla sports
          er.registration_code
      FROM events e
      INNER JOIN event_registrations er ON e.idevents = er.idevents
      LEFT JOIN sports s ON e.idsports = s.idsports -- Relación con sports
      WHERE er.idusers = ${userId}
    `;

    return NextResponse.json(events.rows);
  } catch (error) {
    console.error("Error al obtener eventos registrados:", error);
    return NextResponse.json({ message: "Error al obtener los eventos registrados." }, { status: 500 });
  }
}
