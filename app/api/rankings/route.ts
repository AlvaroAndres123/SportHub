import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sport_id = searchParams.get("sport_id");

  if (!sport_id) {
    return NextResponse.json({ error: "sport_id es requerido" }, { status: 400 });
  }

  try {
    const result = await sql`
      SELECT u.name, r.points, r.rank_position 
      FROM rankings r
      JOIN users u ON u.idusers = r.idusers
      WHERE r.idsports = ${sport_id}
      ORDER BY r.rank_position ASC
    `;
    
    // Devolver los resultados de la consulta
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error al obtener el ranking:", error);
    return NextResponse.json(
      { error: "Error al obtener el ranking" },
      { status: 500 }
    );
  }
}
