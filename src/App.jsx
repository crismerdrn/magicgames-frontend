import { useCallback, useEffect, useState } from 'react'
import { getProducts } from './api.js'
import ProductForm from './components/ProductForm.jsx'
import DiceViewer from './components/DiceViewer.jsx'
import InventoryTable from './components/InventoryTable.jsx'
import ArchitectureBadges from './components/ArchitectureBadges.jsx'

const REFRESH_MS = 15000

export default function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(null)

  const loadProducts = useCallback(async (signal) => {
    setLoading(true)
    try {
      const data = await getProducts(signal)
      setProducts([...data].sort((a, b) => a.id - b.id))
      setError(null)
      setLastUpdate(new Date())
    } catch (err) {
      if (err.name !== 'AbortError') setError(err.message)
    } finally {
      if (!signal?.aborted) setLoading(false)
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    loadProducts(controller.signal)
    const id = setInterval(() => loadProducts(), REFRESH_MS)
    return () => {
      controller.abort()
      clearInterval(id)
    }
  }, [loadProducts])

  const totalStock = products.reduce((s, p) => s + (p.stock_actual || 0), 0)
  const totalValue = products.reduce((s, p) => s + (p.price || 0) * (p.stock_actual || 0), 0)
  const juegos = products.filter((p) => /juego/i.test(p.categoria)).length

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_rgba(37,99,235,0.18),_transparent_60%)] text-slate-100">
      <header className="border-b border-slate-800/80 bg-slate-950/60 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-3">
            <img src="/d20.svg" alt="" className="h-11 w-11 drop-shadow-[0_0_12px_rgba(37,99,235,0.6)]" />
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
                Magic Games <span className="text-blue-400">·</span>{' '}
                <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                  Control de Stock y Ludoteca
                </span>
              </h1>
              <p className="text-sm text-slate-400">Sistema web de gestión de inventario</p>
            </div>
          </div>
          <div className="text-sm sm:text-right">
            <p className="font-semibold text-slate-200">Carlos Ivan Salgado Flores</p>
            <p className="text-slate-400">Tecnologías Informáticas (2026)</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { label: 'Productos', value: products.length },
            { label: 'Juegos de Mesa', value: juegos },
            { label: 'Unidades en stock', value: totalStock },
            { label: 'Valor del inventario', value: `Bs. ${totalValue.toLocaleString('es-BO', { maximumFractionDigits: 0 })}` },
          ].map((s) => (
            <div key={s.label} className="card px-5 py-4">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{s.label}</p>
              <p className="mt-1 text-2xl font-bold tabular-nums text-white">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ProductForm onCreated={() => loadProducts()} />
          <DiceViewer />
        </div>

        <InventoryTable
          products={products}
          loading={loading}
          error={error}
          lastUpdate={lastUpdate}
          onRefresh={() => loadProducts()}
        />

        <ArchitectureBadges />
      </main>
    </div>
  )
}
