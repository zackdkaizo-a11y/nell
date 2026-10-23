export default function Buscador({ value, onChange, level, onLevelChange }) {
  return <div className="search-tools">
    <label className="search-box">
      <span aria-hidden="true">⌕</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder="Buscar Digimon por nombre..." aria-label="Buscar Digimon por nombre" />
    </label>
    <label className="filter-box"><span>Nivel</span>
      <select value={level} onChange={(event) => onLevelChange(event.target.value)} aria-label="Filtrar por nivel">
        <option value="">Todos los niveles</option>
        <option value="Fresh">Fresh</option><option value="In Training">In Training</option>
        <option value="Rookie">Rookie</option><option value="Champion">Champion</option>
        <option value="Ultimate">Ultimate</option><option value="Mega">Mega</option>
        <option value="Armor">Armor</option><option value="Ultra">Ultra</option>
      </select>
    </label>
  </div>
}
