import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

// POST: Crear un nuevo equipo
export async function POST(req: NextRequest) {
  try {
    const { team_name, team_description } = await req.json();

    if (!team_name || !team_description) {
      return NextResponse.json(
        { error: "team_name y team_description son requeridos" },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO teams (team_name, team_description, team_status, created_at)
      VALUES (${team_name}, ${team_description}, 'active', NOW())
      RETURNING idteams
    `;

    return NextResponse.json(
      { idteams: result.rows[0].idteams },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al crear el equipo:", error);
    return NextResponse.json(
      { error: "Error al crear el equipo" },
      { status: 500 }
    );
  }
}

// GET: Obtener la lista de equipos
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const status = url.searchParams.get("status"); 

    const query = status
      ? sql`
        SELECT idteams, team_name, team_description, team_status, created_at
        FROM teams
        WHERE team_status = ${status}
      `
      : sql`
        SELECT idteams, team_name, team_description, team_status, created_at
        FROM teams
      `;

    const result = await query;

    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error("Error al obtener los equipos:", error);
    return NextResponse.json(
      { error: "Error al obtener los equipos" },
      { status: 500 }
    );
  }
}
