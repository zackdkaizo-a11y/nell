import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Estado from '../components/Estado'
import { getDigimonById, getDigimonImage, getDigimonLevel } from '../services/digimonApi'

function values(items, key) {
  if (!Array.isArray(items) || !items.length) return 'No especificado'
  return items.map((item) => typeof item === 'string' ? item : item?.[key] || item?.name || item?.type || '').filter(Boolean).join(', ') || 'No especificado'
}

export default function Detalle({ favorites, onToggleFavorite }) {
  const { id } = useParams()
  const [digimon, setDigimon] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    setLoading(true); setError(''); setDigimon(null)
    getDigimonById(id).then((data) => { if (active) setDigimon(data) })
      .catch((err) => { if (active) setError(err.message || 'No se pudo cargar el detalle.') })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [id])

  if (loading) return <main className="page-shell"><Estado type="loading" title="Cargando ficha del Digimon..."/></main>
  if (error || !digimon) return <main className="page-shell"><Estado type="error" title="No pudimos abrir esta ficha">{error || 'El Digimon no existe o no está disponible.'}</Estado><Link className="button secondary" to="/lista">← Volver al catálogo</Link></main>

  const isFavorite = favorites.some((item) => String(item.id) === String(digimon.id))
  const image = getDigimonImage(digimon)
  const details = [
    ['Identificador', digimon.id ?? id],
    ['Nivel', getDigimonLevel(digimon)],
    ['Atributos', values(digimon.attributes, 'attribute')],
    ['Tipos', values(digimon.types, 'type')],
    ['Campos', values(digimon.fields, 'field')],
    ['Habilidades', values(digimon.skills?.slice?.(0, 4), 'skill')],
  ]
  return <main className="page-shell detail-page">
    <Link className="back-link" to="/lista">← Volver al catálogo</Link>
    <section className="detail-card"><div className="detail-art">{image ? <img src={image} alt={digimon.name} /> : <div className="placeholder-mon">D</div>}<span className="eyebrow">DIGITAL MONSTER / #{digimon.id}</span></div>
      <div className="detail-copy"><span className="eyebrow">FICHA DEL PERSONAJE</span><h1>{digimon.name}</h1><p className="detail-description">{digimon.descriptions?.find((item) => item.language === 'en_us')?.description || digimon.descriptions?.[0]?.description || 'Explora los datos disponibles de este habitante del Mundo Digital.'}</p>
        <div className="detail-data">{details.map(([label, value]) => <div className="data-row" key={label}><span>{label}</span><strong>{String(value)}</strong></div>)}</div>
        <button className={`button ${isFavorite ? 'secondary' : 'primary'}`} onClick={() => onToggleFavorite(digimon)}>{isFavorite ? '♥ Quitar de favoritos' : '♡ Añadir a favoritos'}</button>
      </div>
    </section>
  </main>
}
