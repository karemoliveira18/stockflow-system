export default function StatCard({ label, value, hint, tone = 'blue' }) {
  const toneClasses = {
    blue: 'border-blue-500/30 bg-blue-500/10 text-blue-200',
    green: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200',
    red: 'border-red-500/30 bg-red-500/10 text-red-200',
    amber: 'border-amber-500/30 bg-amber-500/10 text-amber-200',
  };

  return (
    <div className={`rounded-2xl border p-5 ${toneClasses[tone] || toneClasses.blue}`}>
      <p className="text-xs uppercase tracking-[0.2em] text-slate-300">{label}</p>
      <h3 className="mt-3 text-3xl font-bold text-white">{value}</h3>
      <p className="mt-2 text-sm text-slate-300">{hint}</p>
    </div>
  );
}
