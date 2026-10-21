const MEDIDA_LABEL = {
  COP: 'Copias/Cajas',
  UND: 'Unidades',
}

const formatBs = (n) =>
  `Bs. ${Number(n).toLocaleString('es-BO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

function CategoryBadge({ categoria }) {
  const isJuego = /juego/i.test(categoria)
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${
        isJuego
          ? 'bg-blue-500/15 text-blue-300 ring-blue-500/40'
          : 'bg-amber-500/15 text-amber-300 ring-amber-500/40'
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${isJuego ? 'bg-blue-400' : 'bg-amber-400'}`} />
      {categoria}
    </span>
  )
}

function StockCell({ value }) {
  const color = value <= 0 ? 'text-rose-400' : value <= 5 ? 'text-amber-300' : 'text-emerald-300'
  return <span className={`font-semibold tabular-nums ${color}`}>{value}</span>
}

export default function InventoryTable({ products, loading, error, lastUpdate, onRefresh }) {
  return (
    <section className="card overflow-hidden">
      <div className="flex flex-col gap-3 border-b border-slate-800 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            Inventario en Vivo
          </h2>
          <p className="text-sm text-slate-400">
            {products.length} productos
            {lastUpdate && ` · Actualizado ${lastUpdate.toLocaleTimeString('es-BO')}`}
          </p>
        </div>
        <button
          onClick={onRefresh}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm font-medium text-slate-200 transition hover:border-blue-500 hover:text-white disabled:opacity-50"
        >
          <svg className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Actualizar
        </button>
      </div>

      {error && (
        <div className="mx-6 mt-4 rounded-lg bg-rose-500/10 px-3 py-2 text-sm text-rose-300 ring-1 ring-rose-500/30">
          No se pudo cargar el inventario: {error}. El servidor de Render puede tardar ~50 s en despertar.
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-950/50 text-xs uppercase tracking-wider text-slate-400">
            <tr>
              <th className="px-6 py-3 font-semibold">ID</th>
              <th className="px-6 py-3 font-semibold">Nombre</th>
              <th className="px-6 py-3 font-semibold">Categoría</th>
              <th className="px-6 py-3 text-right font-semibold">Precio</th>
              <th className="px-6 py-3 text-right font-semibold">Stock Actual</th>
              <th className="px-6 py-3 font-semibold">Unidad</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {loading && products.length === 0 &&
              Array.from({ length: 4 }).map((_, i) => (
                <tr key={i}>
                  {Array.from({ length: 6 }).map((__, j) => (
                    <td key={j} className="px-6 py-4">
                      <div className="h-4 animate-pulse rounded bg-slate-800" />
                    </td>
                  ))}
                </tr>
              ))}

            {!loading && products.length === 0 && !error && (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-slate-400">
                  Aún no hay productos registrados.
                </td>
              </tr>
            )}

            {products.map((p) => (
              <tr key={p.id} className="transition hover:bg-slate-800/40">
                <td className="px-6 py-4 font-mono text-slate-400">#{p.id}</td>
                <td className="px-6 py-4 font-medium text-white">{p.name}</td>
                <td className="px-6 py-4"><CategoryBadge categoria={p.categoria} /></td>
                <td className="px-6 py-4 text-right tabular-nums text-slate-200">{formatBs(p.price)}</td>
                <td className="px-6 py-4 text-right"><StockCell value={p.stock_actual} /></td>
                <td className="px-6 py-4 text-slate-300">
                  {MEDIDA_LABEL[p.medida] ?? p.medida}
                  {MEDIDA_LABEL[p.medida] && <span className="ml-1.5 text-xs text-slate-500">({p.medida})</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
