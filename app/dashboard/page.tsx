import FeitoToggle from "@/components/feitoToggle";
export const revalidate = 0;
import { getTarotData } from "@/lib/db";

export type ConsultaTarot = {
  id: string;
  nome: string;
  idade: number;
  telefone: string;
  email: string;
  descricao: string;
  valor: string;
  created_at: string;
  quantidade_cartas: number;
  payment_id: string;
  feito: boolean;
  data_feito: string | null;
};

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = parseInt(searchParams.page || "1");
  const limit = 20;
  const offset = (page - 1) * limit;

  const data = await getTarotData({ limit, offset });

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Tarot🔮</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <div className="rounded-2xl bg-white border p-4 shadow-sm">
          <p className="text-sm text-gray-500">Consultas</p>
          <p className="text-xl font-bold">{data.length}</p>
        </div>

        <div className="rounded-2xl bg-white border p-4 shadow-sm">
          <p className="text-sm text-gray-500">Total Faturado</p>
          <p className="text-xl font-bold">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(
              data.reduce((acc, val) => acc + parseFloat(val.valor ?? "0"), 0),
            )}
          </p>
        </div>

        <div className="rounded-2xl bg-white border p-4 shadow-sm">
          <p className="text-sm text-gray-500">Média por Consulta</p>
          <p className="text-xl font-bold">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(
              data.length > 0
                ? data.reduce(
                    (acc, val) => acc + parseFloat(val.valor ?? "0"),
                    0,
                  ) / data.length
                : 0,
            )}
          </p>
        </div>

        <div className="rounded-2xl bg-white border p-4 shadow-sm">
          <p className="text-sm text-gray-500">Consultas Realizadas</p>
          <p className="text-xl font-bold">
            {data.filter((item) => item.feito === true).length}
          </p>
        </div>

        <div className="rounded-2xl bg-white border p-4 shadow-sm">
          <p className="text-sm text-gray-500">Consultas Pendentes</p>
          <p className="text-xl font-bold">
            {data.filter((item) => item.feito === false).length}
          </p>
        </div>
      </div>

      <div className="overflow-auto border rounded-2xl">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Cliente</th>
              <th className="px-4 py-2">Idade</th>
              <th className="px-4 py-2">Telefone</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Valor</th>
              <th className="px-4 py-2">Cartas</th>
              <th className="px-4 py-2">Descrição</th>
              <th className="px-4 py-2">Data</th>
              <th className="px-4 py-2">Payment ID</th>
              <th className="px-4 py-2">Feito</th>
              <th className="px-4 py-2">Data Feito</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{item.id}</td>
                <td className="px-4 py-2">{item.nome}</td>
                <td className="px-4 py-2 text-center">{item.idade}</td>
                <td className="px-4 py-2 text-center">{item.telefone}</td>
                <td className="px-4 py-2">{item.email}</td>
                <td className="px-4 py-2 text-center">R$ {item.valor}</td>
                <td className="px-4 py-2 text-center">
                  {item.quantidade_cartas}
                </td>
                <td className="px-4 py-2">{item.descricao}</td>
                <td className="px-4 py-2 text-sm text-gray-500">
                  {new Date(item.created_at).toLocaleString("pt-BR")}
                </td>
                <td className="px-4 py-2 text-xs text-gray-400">
                  {item.payment_id}
                </td>
                <td className="px-4 py-2 text-center">
                  <FeitoToggle id={item.id} feito={item.feito} />
                </td>
                <td className="px-4 py-2 text-sm text-gray-500 text-center">
                  {item.data_feito
                    ? new Date(item.data_feito).toLocaleString("pt-BR")
                    : "❌"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-4 gap-2">
        {page > 1 && (
          <a href={`?page=${page - 1}`}>
            <button className="px-2 py-1 border rounded">Anterior</button>
          </a>
        )}
        <span className="px-4 py-2 text-sm">Página {page}</span>
        <a href={`?page=${page + 1}`}>
          <button className="px-2 py-1 border rounded">Próxima</button>
        </a>
      </div>
    </main>
  );
}
