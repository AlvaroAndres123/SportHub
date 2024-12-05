import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const teamId = searchParams.get("teamId"); 

    if (!teamId) {
      return NextResponse.json(
        { message: "Falta el parámetro teamId." },
        { status: 400 }
      );
    }

    // Consulta para obtener los miembros del equipo
    const members = await sql`
      SELECT 
        u.idusers AS id,
        u.name AS userName,
        u.email AS userEmail
      FROM team_members tm
      INNER JOIN users u ON tm.idusers = u.idusers
      WHERE tm.idteams = ${teamId}
    `;

    return NextResponse.json(members.rows);
  } catch (error) {
    console.error("Error al obtener miembros del equipo:", error);
    return NextResponse.json(
      { message: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
