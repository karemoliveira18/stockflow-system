import { useEffect, useState } from 'react';
import api from '../services/api';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const loadCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data || []);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Erro ao carregar categorias.');
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await api.post('/categories', { name });
      setName('');
      setMessage('Categoria cadastrada com sucesso.');
      loadCategories();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Erro ao cadastrar categoria.');
    }
  };

  const handleDelete = async (categoryId) => {
    const confirmed = window.confirm('Deseja excluir a categoria?');
    if (!confirmed) return;

    try {
      await api.delete(`/categories/${categoryId}`);
      setMessage('Categoria excluída com sucesso.');
      loadCategories();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Erro ao excluir categoria.');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Estrutura</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Categorias</h1>
      </div>

      {message && (
        <div className="rounded-xl border border-blue-500/40 bg-blue-500/10 px-4 py-3 text-sm text-blue-200">
          {message}
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <h2 className="mb-4 text-xl font-semibold text-white">Nova categoria</h2>
          <div>
            <label className="mb-2 block text-sm text-slate-300">Nome</label>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white"
              placeholder="Ex: Eletrônicos"
              required
            />
          </div>
          <button type="submit" className="mt-4 w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-500">
            Salvar categoria
          </button>
        </form>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <h2 className="mb-4 text-xl font-semibold text-white">Categorias cadastradas</h2>
          <div className="space-y-3">
            {categories.length > 0 ? (
              categories.map((category) => (
                <div key={category.id} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 px-4 py-3">
                  <span className="font-medium text-white">{category.name}</span>
                  <button type="button" onClick={() => handleDelete(category.id)} className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-1 text-sm text-red-200">
                    Excluir
                  </button>
                </div>
              ))
            ) : (
              <p className="text-slate-400">Nenhuma categoria cadastrada.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
