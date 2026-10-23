import { useEffect, useState } from 'react'
import { getDigimonList } from '../services/digimonApi'
import TarjetaDigimon from '../components/TarjetaDigimon'
import Buscador from '../components/Buscador'
import Estado from '../components/Estado'

export default function Lista({ favorites, onToggleFavorite }) {
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('')
  const [level, setLevel] = useState('')
  const [page, setPage] = useState(0)
  const [digimon, setDigimon] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => { setQuery(search.trim()); setPage(0) }, 350)
    return () => clearTimeout(timer)
  }, [search])

  useEffect(() => { setPage(0) }, [level])

  useEffect(() => {
    let active = true
    async function load() {
      setLoading(page === 0)
      setLoadingMore(page > 0)
      setError('')
      try {
        const result = await getDigimonList({ page, pageSize: 12, name: query, level })
        if (!active) return
        setDigimon((current) => page === 0 ? result.items : [...current, ...result.items])
        const totalPages = result.pageable?.totalPages
        setHasMore(typeof totalPages === 'number' ? page + 1 < totalPages : result.items.length === 12)
      } catch (err) {
        if (active) setError(err.message || 'No se pudo conectar con la API.')
      } finally {
        if (active) { setLoading(false); setLoadingMore(false) }
      }
    }
    load()
    return () => { active = false }
  }, [page, query, level])

  return <main className="page-shell">
    <section className="page-intro"><span className="eyebrow">CATÁLOGO / 001</span><h1>Explora los <span>Digimon</span></h1><p>Encuentra a tu compañero entre las criaturas del Mundo Digital.</p></section>
    <Buscador value={search} onChange={setSearch} level={level} onLevelChange={setLevel} />
    {error && <Estado type="error" title="No se pudo cargar el catálogo">{error} Comprueba tu conexión e inténtalo de nuevo.</Estado>}
    {loading ? <Estado type="loading" title="Conectando con el Mundo Digital...">Estamos consultando la Digi-API.</Estado> : digimon.length === 0 ? <Estado title="No encontramos Digimon">Prueba con otro nombre o cambia el filtro de nivel.</Estado> : <>
      <div className="results-caption"><span>{query ? `Resultados para “${query}”` : 'Catálogo Digimon'}</span><span>{digimon.length} cargados</span></div>
      <div className="digimon-grid">{digimon.map((mon) => <TarjetaDigimon key={mon.id} digimon={mon} favorite={favorites.some((item) => String(item.id) === String(mon.id))} onToggleFavorite={onToggleFavorite} />)}</div>
      {hasMore && <div className="load-more-wrap"><button className="button secondary" disabled={loadingMore} onClick={() => setPage((current) => current + 1)}>{loadingMore ? 'Cargando...' : 'Cargar más Digimon ↓'}</button></div>}
    </>}
  </main>
}
