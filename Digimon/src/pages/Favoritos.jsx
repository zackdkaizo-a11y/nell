import { Link } from 'react-router-dom'
import TarjetaDigimon from '../components/TarjetaDigimon'

export default function Favoritos({ favorites, onToggleFavorite }) {
  return <main className="page-shell"><section className="page-intro"><span className="eyebrow">TU COLECCIÓN / 002</span><h1>Mis <span>favoritos</span></h1><p>Los compañeros digitales que guardaste para volver a verlos.</p></section>
    {!favorites.length ? <div className="empty-collection"><span>♡</span><h2>Aún no tienes favoritos</h2><p>Explora el catálogo y guarda los Digimon que más te gusten.</p><Link className="button primary" to="/lista">Explorar Digimon</Link></div> : <div className="digimon-grid">{favorites.map((mon) => <TarjetaDigimon key={mon.id} digimon={mon} favorite onToggleFavorite={onToggleFavorite} />)}</div>}
  </main>
}
