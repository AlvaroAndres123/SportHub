import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

// Obtener la lista de miembros del equipo
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const result = await sql`
      SELECT idteam_members, idusers, created_at 
      FROM team_members 
      WHERE idteams = ${id}
    `;

    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error("Error al obtener los miembros del equipo:", error);
    return NextResponse.json({ error: "Error al obtener los miembros del equipo" }, { status: 500 });
  }
}

// Agregar un miembro al equipo
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "El ID del usuario es requerido" }, { status: 400 });
    }

    await sql`
      INSERT INTO team_members (idteams, idusers, created_at)
      VALUES (${id}, ${userId}, NOW())
    `;

    return NextResponse.json({ message: "Miembro agregado exitosamente" }, { status: 201 });
  } catch (error) {
    console.error("Error al agregar un miembro al equipo:", error);
    return NextResponse.json({ error: "Error al agregar un miembro al equipo" }, { status: 500 });
  }
}

// Eliminar un miembro del equipo
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const memberId = req.nextUrl.searchParams.get("memberId");

  if (!memberId) {
    return NextResponse.json({ error: "El ID del miembro es requerido" }, { status: 400 });
  }

  try {
    await sql`
      DELETE FROM team_members
      WHERE idteam_members = ${memberId} AND idteams = ${id}
    `;

    return NextResponse.json({ message: "Miembro eliminado exitosamente" }, { status: 200 });
  } catch (error) {
    console.error("Error al eliminar miembro del equipo:", error);
    return NextResponse.json({ error: "Error al eliminar miembro del equipo" }, { status: 500 });
  }
}
