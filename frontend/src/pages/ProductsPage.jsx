import { useEffect, useMemo, useState } from 'react';
import api from '../services/api';

const emptyForm = {
  name: '',
  sku: '',
  description: '',
  categoryId: '',
  purchasePrice: '',
  salePrice: '',
  quantity: '',
  minimumStock: '',
};

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const loadData = async () => {
    try {
      const [productsResponse, categoriesResponse] = await Promise.all([
        api.get('/products'),
        api.get('/categories'),
      ]);

      setProducts(productsResponse.data || []);
      setCategories(categoriesResponse.data || []);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Não foi possível carregar os produtos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      `${product.name} ${product.sku}`.toLowerCase().includes(search.toLowerCase()),
    );
  }, [products, search]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await api.post('/products', {
        ...form,
        quantity: Number(form.quantity),
        minimumStock: Number(form.minimumStock),
        purchasePrice: Number(form.purchasePrice),
        salePrice: Number(form.salePrice),
        categoryId: form.categoryId ? Number(form.categoryId) : null,
      });

      setForm(emptyForm);
      setMessage('Produto cadastrado com sucesso.');
      loadData();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Erro ao cadastrar produto.');
    }
  };

  const handleDelete = async (productId) => {
    const confirmed = window.confirm('Deseja excluir este produto?');
    if (!confirmed) return;

    try {
      await api.delete(`/products/${productId}`);
      setMessage('Produto excluído com sucesso.');
      loadData();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Erro ao remover produto.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Cadastros</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Produtos</h1>
        </div>
      </div>

      {message && (
        <div className="rounded-xl border border-blue-500/40 bg-blue-500/10 px-4 py-3 text-sm text-blue-200">
          {message}
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[1.1fr_1.5fr]">
        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <h2 className="text-xl font-semibold text-white">Novo produto</h2>

          <div>
            <label className="mb-2 block text-sm text-slate-300">Nome</label>
            <input name="name" value={form.name} onChange={handleChange} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white" required />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">SKU</label>
            <input name="sku" value={form.sku} onChange={handleChange} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white" required />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">Descrição</label>
            <textarea name="description" value={form.description} onChange={handleChange} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white" rows="3" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-slate-300">Categoria</label>
              <select name="categoryId" value={form.categoryId} onChange={handleChange} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white">
                <option value="">Sem categoria</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">Estoque mínimo</label>
              <input type="number" name="minimumStock" value={form.minimumStock} onChange={handleChange} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white" min="0" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-slate-300">Preço de compra</label>
              <input type="number" step="0.01" name="purchasePrice" value={form.purchasePrice} onChange={handleChange} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white" min="0" required />
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-300">Preço de venda</label>
              <input type="number" step="0.01" name="salePrice" value={form.salePrice} onChange={handleChange} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white" min="0" required />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">Quantidade disponível</label>
            <input type="number" name="quantity" value={form.quantity} onChange={handleChange} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white" min="0" required />
          </div>

          <button type="submit" className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-500">
            Cadastrar produto
          </button>
        </form>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="mb-4 flex items-center gap-3">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Pesquisar produto"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white"
            />
          </div>

          {loading ? (
            <p className="text-slate-400">Carregando...</p>
          ) : (
            <div className="max-h-[620px] overflow-auto">
              <table className="min-w-full text-left text-sm text-slate-300">
                <thead>
                  <tr className="border-b border-slate-700 text-xs uppercase tracking-[0.2em] text-slate-400">
                    <th className="py-2">Produto</th>
                    <th className="py-2">SKU</th>
                    <th className="py-2">Qtd</th>
                    <th className="py-2">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b border-slate-800">
                      <td className="py-3 pr-3">
                        <p className="font-medium text-white">{product.name}</p>
                        <p className="text-xs text-slate-400">{product.category?.name || 'Sem categoria'}</p>
                      </td>
                      <td className="py-3 pr-3">{product.sku}</td>
                      <td className="py-3 pr-3">{product.quantity}</td>
                      <td className="py-3">
                        <button type="button" onClick={() => handleDelete(product.id)} className="rounded-lg border border-red-500/40 bg-red-500/10 px-2 py-1 text-red-200">
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
