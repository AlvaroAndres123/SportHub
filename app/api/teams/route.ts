import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { nanoid } from "nanoid";

// POST: Crear un nuevo equipo
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "No estás autenticado." },
        { status: 401 }
      );
    }

    const { team_name, team_description } = await req.json();

    if (!team_name || !team_description) {
      return NextResponse.json(
        { error: "team_name y team_description son requeridos" },
        { status: 400 }
      );
    }

    const sharedCode = nanoid(10);
    const userId = session.user.id;

    const result = await sql`
      INSERT INTO teams (team_name, team_description, team_status, created_at, shared_code, idusers)
      VALUES (${team_name}, ${team_description}, 'active', NOW(), ${sharedCode}, ${userId})
      RETURNING idteams, shared_code
    `;

    return NextResponse.json(
      { idteams: result.rows[0].idteams, shared_code: result.rows[0].shared_code },
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

// GET: Obtener la lista de equipos creados por el usuario autenticado
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "No estás autenticado." },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    const url = new URL(req.url);
    const status = url.searchParams.get("status");

    const query = status
      ? sql`
        SELECT idteams, team_name, team_description, team_status, created_at, shared_code
        FROM teams
        WHERE idusers = ${userId} AND team_status = ${status}
      `
      : sql`
        SELECT idteams, team_name, team_description, team_status, created_at, shared_code
        FROM teams
        WHERE idusers = ${userId}
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
