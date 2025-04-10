import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  const { id, feito } = await req.json();
  console.log("id:", id, typeof id, "feito:", feito, typeof feito);
  const idStr = typeof id === "number" ? id.toString() : id;

  if (typeof idStr !== "string" || typeof feito !== "boolean") {
    return NextResponse.json(
      { error: "Parâmetros inválidos" },
      { status: 400 },
    );
  }

  const dataFeito = feito ? new Date().toISOString() : null;

  await sql`
    UPDATE tarot
    SET feito = ${feito}, data_feito = ${dataFeito}
    WHERE id = ${idStr}
  `;
  const response = NextResponse.json({ success: true });
  response.headers.set("Cache-Control", "no-store, max-age=0");
  revalidatePath("/dashboard");

  return response;
}
