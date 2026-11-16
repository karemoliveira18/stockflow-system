import { BarChart3, FolderTree, LogOut, Package2, ShoppingCart, UserCircle } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  { to: '/products', label: 'Produtos', icon: Package2 },
  { to: '/categories', label: 'Categorias', icon: FolderTree },
  { to: '/movements', label: 'Movimentações', icon: ShoppingCart },
  { to: '/profile', label: 'Perfil', icon: UserCircle },
];

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex min-h-screen">
        <aside className="w-72 border-r border-slate-800 bg-slate-900/90 p-6 backdrop-blur">
          <div className="mb-10">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
                S
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">StockFlow</p>
                <h1 className="text-xl font-semibold text-white">Gestão de Estoque</h1>
              </div>
            </div>
          </div>

          <nav className="space-y-2">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition ${
                    isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-300 hover:bg-slate-800'
                  }`
                }
              >
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-10 rounded-2xl border border-slate-700 bg-slate-800 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Usuário</p>
            <p className="mt-2 font-semibold text-white">{user?.name || 'Administrador'}</p>
            <p className="text-sm text-slate-400">{user?.email || 'user@stockflow.com'}</p>
          </div>
        </aside>

        <main className="flex-1 overflow-x-hidden">
          <header className="flex items-center justify-between border-b border-slate-800 bg-slate-950/60 px-6 py-5 backdrop-blur">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Painel</p>
              <h2 className="text-2xl font-semibold text-white">StockFlow</h2>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-red-500 hover:text-red-300"
            >
              <LogOut size={16} />
              Sair
            </button>
          </header>

          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
