import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");

    if (!user_id) {
      return NextResponse.json({ error: "Falta user_id en la consulta" }, { status: 400 });
    }

    const userResult = await sql`
      SELECT idroles FROM users WHERE idusers = ${user_id}`;

    if (userResult.rows.length === 0) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    const idroles = userResult.rows[0].idroles;

    const roleResult = await sql`
      SELECT role_name FROM roles WHERE idroles = ${idroles}`;

    if (roleResult.rows.length === 0) {
      return NextResponse.json({ error: "Rol no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ role: roleResult.rows[0].role_name });
  } catch (error) {
    console.error("Error al consultar roles:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
