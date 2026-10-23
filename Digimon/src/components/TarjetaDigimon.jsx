import { Link } from 'react-router-dom'
import { getDigimonImage } from '../services/digimonApi'

export default function TarjetaDigimon({ digimon, favorite, onToggleFavorite }) {
  const image = getDigimonImage(digimon)
  return <article className="digimon-card">
    <button className={`favorite-toggle ${favorite ? 'is-favorite' : ''}`} onClick={() => onToggleFavorite(digimon)} aria-label={favorite ? `Quitar ${digimon.name} de favoritos` : `Agregar ${digimon.name} a favoritos`} title={favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}>{favorite ? '♥' : '♡'}</button>
    <Link to={`/detalle/${digimon.id}`} className="card-main">
      <div className="digimon-art">{image ? <img src={image} alt={digimon.name} loading="lazy" /> : <span className="placeholder-mon">D</span>}</div>
      <div className="card-copy"><span className="eyebrow">DIGIMON #{digimon.id}</span><h3>{digimon.name}</h3><span className="details-link">Ver detalles <span aria-hidden="true">↗</span></span></div>
    </Link>
  </article>
}
