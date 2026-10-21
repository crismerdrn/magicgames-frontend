const BADGES = [
  { name: 'Supabase', detail: 'PostgreSQL · 5 tablas', dot: 'bg-emerald-400', ring: 'ring-emerald-500/30 hover:ring-emerald-400/60' },
  { name: 'Render', detail: 'FastAPI', dot: 'bg-violet-400', ring: 'ring-violet-500/30 hover:ring-violet-400/60' },
  { name: 'Vercel', detail: 'Frontend SPA', dot: 'bg-white', ring: 'ring-slate-500/30 hover:ring-slate-300/60' },
  { name: 'Slack Webhooks', detail: 'Notificaciones', dot: 'bg-pink-400', ring: 'ring-pink-500/30 hover:ring-pink-400/60' },
  { name: 'Three.js', detail: 'Gráficos 3D', dot: 'bg-blue-400', ring: 'ring-blue-500/30 hover:ring-blue-400/60' },
  { name: 'Comentera', detail: 'Comentarios', dot: 'bg-amber-400', ring: 'ring-amber-500/30 hover:ring-amber-400/60' },
]

export default function ArchitectureBadges() {
  return (
    <footer className="mt-10 border-t border-slate-800 pt-8">
      <h3 className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        Arquitectura del Sistema
      </h3>
      <ul className="flex flex-wrap justify-center gap-3">
        {BADGES.map((b) => (
          <li
            key={b.name}
            className={`flex items-center gap-2 rounded-full bg-slate-900/80 px-4 py-2 text-sm ring-1 transition ${b.ring}`}
          >
            <span className={`h-2 w-2 rounded-full ${b.dot}`} />
            <span className="font-semibold text-white">{b.name}</span>
            <span className="text-slate-400">· {b.detail}</span>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-center text-xs text-slate-500">
        Carlos Ivan Salgado Flores · Tecnologías Informáticas (2026) · Magic Games
      </p>
    </footer>
  )
}
