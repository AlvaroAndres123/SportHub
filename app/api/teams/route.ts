import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {

    const { team_name, team_description } = await req.json();


    if (!team_name || !team_description) {
      return NextResponse.json({ error: "team_name y team_description son requeridos" }, { status: 400 });
    }


    const result = await sql`
      INSERT INTO teams (team_name, team_description)
      VALUES (${team_name}, ${team_description})
      RETURNING idteams
    `;

    return NextResponse.json({ idteams: result.rows[0].idteams }, { status: 201 });
  } catch (error) {
    console.error("Error al crear el equipo:", error);
    return NextResponse.json(
      { error: "Error al crear el equipo" },
      { status: 500 }
    );
  }
}
