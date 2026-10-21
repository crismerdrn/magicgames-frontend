import { lazy, Suspense } from 'react'

const Dice3D = lazy(() => import('./Dice3D.jsx'))

function Loader() {
  return (
    <div className="flex h-full items-center justify-center text-sm text-slate-400">
      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
      Cargando visor 3D...
    </div>
  )
}

export default function DiceViewer() {
  return (
    <section className="card flex flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
        <div>
          <h2 className="text-lg font-semibold text-white">Producto Estrella</h2>
          <p className="text-sm text-slate-400">Visor 3D interactivo (Three.js)</p>
        </div>
        <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300 ring-1 ring-blue-500/30">
          3D en vivo
        </span>
      </div>
      <div className="relative h-80 w-full cursor-grab active:cursor-grabbing lg:h-full lg:min-h-[22rem]">
        <Suspense fallback={<Loader />}>
          <Dice3D />
        </Suspense>
      </div>
      <p className="border-t border-slate-800 px-6 py-3 text-center text-sm font-medium text-slate-300">
        🎲 Dado d20 Poliédrico - Rotar con el cursor
      </p>
    </section>
  )
}
