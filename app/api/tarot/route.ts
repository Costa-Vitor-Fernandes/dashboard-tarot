// app/api/tarot/route.ts
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export const dynamic = "force-dynamic"; // garantir que essa route seja SSR mesmo

export async function GET() {
  try {
    const { rows } = await sql`
      SELECT id, nome, idade, telefone, email, descricao, valor, created_at, quantidade_cartas, payment_id, feito, data_feito
      FROM tarot
      ORDER BY created_at DESC
    `;
    return NextResponse.json(rows, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("Erro ao buscar dados do banco:", error);
    return NextResponse.json(
      { error: "Erro ao buscar dados" },
      { status: 500 },
    );
  }
}
