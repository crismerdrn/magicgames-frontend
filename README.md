# Magic Games - Control de Stock y Ludoteca

SPA en React + Vite + Tailwind CSS + Three.js (@react-three/fiber / drei).

- **Estudiante:** Carlos Ivan Salgado Flores
- **Materia:** Tecnologías Informáticas (2026)
- **API:** https://magicgames-api.onrender.com

## Requisitos
Node.js 18 o superior.

## Uso
```bash
npm install
npm run dev      # desarrollo en http://localhost:5173
npm run build    # compila a /dist
npm run preview  # sirve la compilación
```

La URL de la API se puede cambiar con la variable `VITE_API_URL` (ver `.env.example`).

## Funcionalidades
1. **Formulario de registro** → `POST /api/v1/products` con `{ name, id_categoria, id_medida, id_ludoteca: 1, price, stock_inicial }`. Al registrar, la tabla se refresca.
2. **Visor 3D** del dado d20 (icosaedro `args={[1.6, 0]}`, azul metálico `#2563eb`) con sombras, iluminación y `OrbitControls` (rotar y zoom).
3. **Inventario en vivo** → `GET /api/v1/products`, se actualiza cada 15 s y tras cada registro. Badges azules (Juegos) y ámbar (Snacks).
4. **Badges de arquitectura**: Supabase, Render, Vercel, Slack Webhooks, Three.js y Comentera.

## Estructura
```
src/
  api.js                       # cliente de la API
  App.jsx                      # layout principal y estado del inventario
  components/
    ProductForm.jsx            # formulario de registro
    DiceViewer.jsx / Dice3D.jsx# visor 3D (carga diferida)
    InventoryTable.jsx         # tabla en vivo
    ArchitectureBadges.jsx     # badges al pie
```

## Despliegue en Vercel
Framework preset: **Vite** · Build: `npm run build` · Output: `dist`. Opcional: variable `VITE_API_URL`.

> Nota: Render (plan gratuito) puede tardar ~50 s en responder la primera petición.
