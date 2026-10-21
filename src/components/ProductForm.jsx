import { useState } from 'react'
import { createProduct } from '../api.js'

export const CATEGORIAS = [
  { id: 1, nombre: 'Juegos de Mesa' },
  { id: 2, nombre: 'Snacks y Bebidas' },
]

export const MEDIDAS = [
  { id: 1, nombre: 'Copias/Cajas' },
  { id: 2, nombre: 'Unidades' },
]

const INITIAL = { name: '', id_categoria: '1', id_medida: '1', price: '', stock_inicial: '' }

export default function ProductForm({ onCreated }) {
  const [form, setForm] = useState(INITIAL)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus(null)

    const price = Number(form.price)
    const stock = Number(form.stock_inicial)
    if (!form.name.trim()) return setStatus({ type: 'error', msg: 'Ingresa el nombre del ítem.' })
    if (!(price > 0)) return setStatus({ type: 'error', msg: 'El precio debe ser mayor a 0.' })
    if (!Number.isInteger(stock) || stock < 0)
      return setStatus({ type: 'error', msg: 'El stock inicial debe ser un entero mayor o igual a 0.' })

    setLoading(true)
    try {
      await createProduct({
        name: form.name.trim(),
        id_categoria: Number(form.id_categoria),
        id_medida: Number(form.id_medida),
        id_ludoteca: 1,
        price,
        stock_inicial: stock,
      })
      setStatus({ type: 'ok', msg: `"${form.name.trim()}" registrado en el inventario.` })
      setForm(INITIAL)
      onCreated?.()
    } catch (err) {
      setStatus({ type: 'error', msg: `No se pudo registrar: ${err.message}` })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="card p-6">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-white">Registro de Productos</h2>
        <p className="text-sm text-slate-400">Agrega juegos o snacks al inventario de la ludoteca</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="label">Nombre del ítem</label>
          <input id="name" name="name" value={form.name} onChange={update} className="input" placeholder="Ej. Catan, Dixit, Papas fritas..." required />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="id_categoria" className="label">Categoría</label>
            <select id="id_categoria" name="id_categoria" value={form.id_categoria} onChange={update} className="input">
              {CATEGORIAS.map((c) => (
                <option key={c.id} value={c.id}>{c.nombre}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="id_medida" className="label">Unidad</label>
            <select id="id_medida" name="id_medida" value={form.id_medida} onChange={update} className="input">
              {MEDIDAS.map((m) => (
                <option key={m.id} value={m.id}>{m.nombre}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="price" className="label">Precio (Bs.)</label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-slate-500">Bs.</span>
              <input id="price" name="price" type="number" min="0.01" step="0.01" value={form.price} onChange={update} className="input pl-10" placeholder="0.00" required />
            </div>
          </div>
          <div>
            <label htmlFor="stock_inicial" className="label">Stock Inicial</label>
            <input id="stock_inicial" name="stock_inicial" type="number" min="0" step="1" value={form.stock_inicial} onChange={update} className="input" placeholder="0" required />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 font-semibold text-white shadow-lg shadow-blue-900/40 transition hover:-translate-y-0.5 hover:from-blue-500 hover:to-indigo-500 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />}
          {loading ? 'Registrando...' : 'Registrar en Inventario'}
        </button>

        {status && (
          <p
            role="status"
            className={`rounded-lg px-3 py-2 text-sm ring-1 ${
              status.type === 'ok'
                ? 'bg-emerald-500/10 text-emerald-300 ring-emerald-500/30'
                : 'bg-rose-500/10 text-rose-300 ring-rose-500/30'
            }`}
          >
            {status.msg}
          </p>
        )}
      </form>
    </section>
  )
}
