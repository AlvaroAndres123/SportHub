import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const result = await sql`SELECT * FROM events`;

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error al obtener eventos:", error);
    return NextResponse.json(
      { error: "Error al obtener los eventos" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {

  return NextResponse.json({ message: 'Método POST no implementado' }, { status: 405 });
}
