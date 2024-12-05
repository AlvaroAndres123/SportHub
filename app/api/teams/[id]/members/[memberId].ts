import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string; memberId: string } }) {
  const { id, memberId } = params;

  try {
    const result = await sql`
      SELECT idteam_members, idusers, created_at 
      FROM team_members 
      WHERE idteams = ${id} AND idteam_members = ${memberId}
    `;

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Miembro no encontrado" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    console.error("Error al obtener el miembro:", error);
    return NextResponse.json({ error: "Error al obtener el miembro" }, { status: 500 });
  }
}

// Eliminar un miembro específico del equipo
export async function DELETE(req: NextRequest, { params }: { params: { id: string; memberId: string } }) {
  const { id, memberId } = params;

  try {
    
    const result = await sql`
      DELETE FROM team_members 
      WHERE idteams = ${id} AND idteam_members = ${memberId}
    `;

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Miembro no encontrado o no pertenece a este equipo" }, { status: 404 });
    }

    return NextResponse.json({ message: "Miembro eliminado exitosamente" }, { status: 200 });
  } catch (error) {
    console.error("Error al eliminar el miembro:", error);
    return NextResponse.json({ error: "Error al eliminar el miembro" }, { status: 500 });
  }
}
