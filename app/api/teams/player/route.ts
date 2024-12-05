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

    // Consulta los equipos en los que está registrado el usuario
    const teams = await sql`
      SELECT 
          t.idteams AS id,
          t.team_name,
          t.team_description,
          t.team_status,
          t.shared_code,
          t.created_at
      FROM teams t
      INNER JOIN team_members tm ON t.idteams = tm.idteams
      WHERE tm.idusers = ${userId}
    `;

    return NextResponse.json(teams.rows);
  } catch (error) {
    console.error("Error al obtener equipos registrados:", error);
    return NextResponse.json({ message: "Error al obtener los equipos registrados." }, { status: 500 });
  }
}
