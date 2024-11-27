import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "No estás autenticado." }, { status: 401 });
    }

    const userId = session.user.id;

    const events = await sql`
      SELECT e.idevents, e.name, e.date, e.start_time, e.end_time, e.description, e.sportname, er.registration_code
      FROM events e
      INNER JOIN event_registrations er ON e.idevents = er.idevents
      WHERE er.idusers = ${userId}
    `;

    return NextResponse.json(events.rows);
  } catch (error) {
    console.error("Error al obtener eventos registrados:", error);
    return NextResponse.json({ message: "Error al obtener los eventos registrados." }, { status: 500 });
  }
}
