import { NavLink } from 'react-router-dom'

export default function Navbar({ favoritesCount, usersCount }) {
  const linkClass = ({ isActive }) => `nav-link${isActive ? ' active' : ''}`
  return (
    <header className="navbar">
      <NavLink className="brand" to="/" aria-label="Digimon Explorer, inicio">
        <span className="brand-mark">D</span><span>Digimon<span className="brand-accent">Explorer</span></span>
      </NavLink>
      <nav className="nav-links" aria-label="Navegación principal">
        <NavLink end className={linkClass} to="/">Inicio</NavLink>
        <NavLink className={linkClass} to="/lista">Digimon</NavLink>
        <NavLink className={linkClass} to="/favoritos">Favoritos <span className="nav-count">{favoritesCount}</span></NavLink>
        <NavLink className={linkClass} to="/registro">Registro <span className="nav-count">{usersCount}</span></NavLink>
      </nav>
    </header>
  )
}
