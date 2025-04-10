import { sql } from "@vercel/postgres";
export async function getTarotData({ limit = 20, offset = 0 }) {
  const { rows } = await sql`
    SELECT id, nome, idade, telefone, email, descricao, valor, created_at, quantidade_cartas, payment_id, feito, data_feito
    FROM tarot
        ORDER BY created_at DESC
    LIMIT ${limit}
        OFFSET ${offset}

  `;
  return rows;
}
