import { Link } from 'react-router-dom'
export default function NoEncontrada() {
  return <main className="not-found"><span className="eyebrow">ERROR 404 / RUTA PERDIDA</span><div className="not-found-code">404</div><h1>¡Te perdiste en el Mundo Digital!</h1><p>Esta página no existe o fue movida a otra dimensión.</p><Link className="button primary" to="/">Volver al inicio</Link></main>
}
