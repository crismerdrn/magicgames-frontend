export const API_URL = (import.meta.env.VITE_API_URL || 'https://magicgames-api.onrender.com').replace(/\/$/, '')

const PRODUCTS_URL = `${API_URL}/api/v1/products`

async function parseError(res) {
  try {
    const data = await res.json()
    if (Array.isArray(data?.detail)) {
      return data.detail.map((d) => `${d.loc?.slice(-1)[0] ?? ''}: ${d.msg}`).join(' | ')
    }
    if (data?.detail) return String(data.detail)
  } catch {
    /* sin cuerpo JSON */
  }
  return `Error HTTP ${res.status}`
}

export async function getProducts(signal) {
  const res = await fetch(PRODUCTS_URL, { signal })
  if (!res.ok) throw new Error(await parseError(res))
  return res.json()
}

export async function createProduct(payload) {
  const res = await fetch(PRODUCTS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(await parseError(res))
  return res.json().catch(() => ({}))
}
