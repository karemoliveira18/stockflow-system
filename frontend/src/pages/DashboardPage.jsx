import { useEffect, useState } from 'react';
import api from '../services/api';
import StatCard from '../components/StatCard';

export default function DashboardPage() {
  const [products, setProducts] = useState([]);
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsResponse, movementsResponse] = await Promise.all([
          api.get('/products'),
          api.get('/movements'),
        ]);
        setProducts(productsResponse.data || []);
        setMovements(movementsResponse.data || []);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const totalItens = products.reduce((sum, product) => sum + Number(product.quantity || 0), 0);
  const lowStock = products.filter((product) => Number(product.quantity) <= Number(product.minimumStock || 0)).length;
  const outOfStock = products.filter((product) => Number(product.quantity) === 0).length;
  const recentMovements = movements.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Overview</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Dashboard</h1>
        </div>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-slate-300">Carregando indicadores...</div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Produtos" value={products.length} hint="Total cadastrado" tone="blue" />
            <StatCard label="Estoque total" value={totalItens} hint="Unidades em estoque" tone="green" />
            <StatCard label="Estoque baixo" value={lowStock} hint="Atenção necessária" tone="amber" />
            <StatCard label="Sem estoque" value={outOfStock} hint="Produtos zerados" tone="red" />
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <h2 className="mb-4 text-xl font-semibold text-white">Movimentações recentes</h2>

              <div className="space-y-3">
                {recentMovements.length > 0 ? (
                  recentMovements.map((movement) => (
                    <div key={movement.id} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 px-4 py-3">
                      <div>
                        <p className="font-medium text-white">{movement.product?.name || 'Produto'}</p>
                        <p className="text-sm text-slate-400">{movement.type === 'ENTRY' ? 'Entrada' : 'Saída'} • {movement.quantity} unidades</p>
                      </div>
                      <span className={`rounded-full px-2 py-1 text-xs font-semibold ${movement.type === 'ENTRY' ? 'bg-emerald-500/15 text-emerald-300' : 'bg-red-500/15 text-red-300'}`}>
                        {movement.type}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400">Nenhuma movimentação registrada ainda.</p>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <h2 className="mb-4 text-xl font-semibold text-white">Resumo</h2>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex items-center justify-between rounded-xl bg-slate-950 px-3 py-2">
                  <span>Produtos ativos</span>
                  <strong className="text-white">{products.length}</strong>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-slate-950 px-3 py-2">
                  <span>Últimas movimentações</span>
                  <strong className="text-white">{recentMovements.length}</strong>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-slate-950 px-3 py-2">
                  <span>Produtos abaixo do mínimo</span>
                  <strong className="text-white">{lowStock}</strong>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-slate-950 px-3 py-2">
                  <span>Produtos zerados</span>
                  <strong className="text-white">{outOfStock}</strong>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
