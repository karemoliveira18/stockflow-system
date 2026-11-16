import { useEffect, useState } from 'react';
import api from '../services/api';

export default function MovementsPage() {
  const [products, setProducts] = useState([]);
  const [movements, setMovements] = useState([]);
  const [form, setForm] = useState({ productId: '', quantity: '', type: 'ENTRY' });
  const [message, setMessage] = useState('');

  const loadData = async () => {
    try {
      const [productsResponse, movementsResponse] = await Promise.all([
        api.get('/products'),
        api.get('/movements'),
      ]);
      setProducts(productsResponse.data || []);
      setMovements(movementsResponse.data || []);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Erro ao carregar movimentações.');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const endpoint = form.type === 'ENTRY' ? '/movements/entry' : '/movements/exit';
      await api.post(endpoint, {
        productId: Number(form.productId),
        quantity: Number(form.quantity),
      });
      setForm({ productId: '', quantity: '', type: form.type });
      setMessage(`Movimentação de ${form.type === 'ENTRY' ? 'entrada' : 'saída'} registrada com sucesso.`);
      loadData();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Erro ao registrar movimentação.');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Operações</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Movimentações</h1>
      </div>

      {message && (
        <div className="rounded-xl border border-blue-500/40 bg-blue-500/10 px-4 py-3 text-sm text-blue-200">
          {message}
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.2fr]">
        <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <h2 className="mb-4 text-xl font-semibold text-white">Registrar movimentação</h2>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm text-slate-300">Tipo</label>
              <select value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white">
                <option value="ENTRY">Entrada</option>
                <option value="EXIT">Saída</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">Produto</label>
              <select value={form.productId} onChange={(event) => setForm({ ...form, productId: event.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white" required>
                <option value="">Selecione um produto</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>{product.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">Quantidade</label>
              <input type="number" value={form.quantity} onChange={(event) => setForm({ ...form, quantity: event.target.value })} min="1" className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white" required />
            </div>

            <button type="submit" className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-500">
              Registrar
            </button>
          </div>
        </form>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <h2 className="mb-4 text-xl font-semibold text-white">Histórico</h2>
          <div className="space-y-3">
            {movements.length > 0 ? (
              movements.map((movement) => (
                <div key={movement.id} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 px-4 py-3">
                  <div>
                    <p className="font-medium text-white">{movement.product?.name || 'Produto'}</p>
                    <p className="text-sm text-slate-400">{new Date(movement.createdAt).toLocaleString('pt-BR')}</p>
                  </div>
                  <span className={`rounded-full px-2 py-1 text-xs font-semibold ${movement.type === 'ENTRY' ? 'bg-emerald-500/15 text-emerald-300' : 'bg-red-500/15 text-red-300'}`}>
                    {movement.type === 'ENTRY' ? 'Entrada' : 'Saída'}: {movement.quantity}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-slate-400">Nenhuma movimentação registrada.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
