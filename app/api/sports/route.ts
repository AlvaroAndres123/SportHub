import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await sql`SELECT idsports AS id, name FROM sports`;
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error al obtener los deportes:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
