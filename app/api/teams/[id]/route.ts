import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const teamId = parseInt(params.id, 10);

  if (isNaN(teamId)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  try {
    // Obtener los detalles del equipo
    const { rows: teamRows } = await sql`
      SELECT idteams, team_name, team_description, team_status
      FROM teams
      WHERE idteams = ${teamId};
    `;

    if (teamRows.length === 0) {
      return NextResponse.json({ error: "Equipo no encontrado" }, { status: 404 });
    }

    const team = teamRows[0];

    // Obtener los miembros del equipo
    const { rows: memberRows } = await sql`
      SELECT 
        tm.idteam_members AS id, 
        u.name AS member_name,
        tm.created_at AS joined_at
      FROM team_members tm
      JOIN users u ON tm.idusers = u.idusers
      WHERE tm.idteams = ${teamId};
    `;

    return NextResponse.json({
      idteams: team.idteams,
      team_name: team.team_name,
      team_description: team.team_description,
      team_status: team.team_status,
      members: memberRows,
    });
  } catch (error) {
    console.error("Error al obtener el equipo:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
