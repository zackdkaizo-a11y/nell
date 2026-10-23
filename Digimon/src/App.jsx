import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import PiePagina from './components/PiePagina'
import Inicio from './pages/Inicio'
import Lista from './pages/Lista'
import Detalle from './pages/Detalle'
import Favoritos from './pages/Favoritos'
import Registro from './pages/Registro'
import NoEncontrada from './pages/NoEncontrada'

function readFavorites() {
  try { return JSON.parse(localStorage.getItem('digimon-favorites') || '[]') } catch { return [] }
}

export default function App() {
  const [favorites, setFavorites] = useState(readFavorites)
  const [users, setUsers] = useState([])

  const toggleFavorite = (digimon) => {
    setFavorites((current) => {
      const exists = current.some((item) => String(item.id) === String(digimon.id))
      const next = exists ? current.filter((item) => String(item.id) !== String(digimon.id)) : [...current, {
        id: digimon.id, name: digimon.name, image: digimon.image || digimon.images?.[0]?.href || '',
        images: digimon.images || [], levels: digimon.levels || [], level: digimon.level || '',
      }]
      localStorage.setItem('digimon-favorites', JSON.stringify(next))
      return next
    })
  }

  return <div className="app-shell">
    <Navbar favoritesCount={favorites.length} usersCount={users.length} />
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/lista" element={<Lista favorites={favorites} onToggleFavorite={toggleFavorite} />} />
      <Route path="/detalle/:id" element={<Detalle favorites={favorites} onToggleFavorite={toggleFavorite} />} />
      <Route path="/favoritos" element={<Favoritos favorites={favorites} onToggleFavorite={toggleFavorite} />} />
      <Route path="/registro" element={<Registro users={users} setUsers={setUsers} />} />
      <Route path="*" element={<NoEncontrada />} />
    </Routes>
    <PiePagina />
  </div>
}
