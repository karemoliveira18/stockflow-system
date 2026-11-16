import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Conta</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Perfil do usuário</h1>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold text-white">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-white">{user?.name || 'Usuário'}</h2>
            <p className="text-slate-400">{user?.email || 'email@stockflow.com'}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Nome</p>
            <p className="mt-2 text-lg font-semibold text-white">{user?.name || 'Usuário'}</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">E-mail</p>
            <p className="mt-2 text-lg font-semibold text-white">{user?.email || 'email@stockflow.com'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
