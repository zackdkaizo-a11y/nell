const API_BASE = 'https://digi-api.com/api/v1'

// Equivalencias entre los niveles de Digi-API y los nombres
// que utilizaremos en Digimon Explorer.
const LEVEL_DISPLAY_NAMES = {
  'Baby I': 'Fresh',
  Baby: 'Fresh',
  'Baby II': 'In Training',
  'Child I': 'In Training',
  Child: 'Rookie',
  Adult: 'Champion',
  Perfect: 'Ultimate',
  Ultimate: 'Mega',
  Armor: 'Armor',
  Ultra: 'Ultra',
}

// Traduce el nombre del filtro al nombre utilizado por la API.
const LEVEL_API_NAMES = {
  Fresh: 'Baby I',
  'In Training': 'Baby II',
  Rookie: 'Child',
  Champion: 'Adult',
  Ultimate: 'Perfect',
  Mega: 'Ultimate',
  Armor: 'Armor',
  Ultra: 'Ultra',
}

function normalizeLevel(level) {
  const cleanLevel = String(level || '').trim()

  return LEVEL_DISPLAY_NAMES[cleanLevel] || cleanLevel || 'No especificado'
}

export async function getDigimonList({
  page = 0,
  pageSize = 12,
  name = '',
  level = '',
} = {}) {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  })

  if (name.trim()) {
    params.set('name', name.trim())
  }

  if (level) {
    const apiLevel = LEVEL_API_NAMES[level] || level
    params.set('level', apiLevel)
  }

  const response = await fetch(
    `${API_BASE}/digimon?${params.toString()}`
  )

  if (!response.ok) {
    throw new Error(
      `La API respondió con el estado ${response.status}.`
    )
  }

  const data = await response.json()

  return {
    items: Array.isArray(data.content) ? data.content : [],
    pageable: data.pageable || {},
    raw: data,
  }
}

export async function getDigimonById(id) {
  const response = await fetch(
    `${API_BASE}/digimon/${encodeURIComponent(id)}`
  )

  if (!response.ok) {
    throw new Error(
      `No se pudo cargar el Digimon (estado ${response.status}).`
    )
  }

  return response.json()
}

export function getDigimonImage(digimon) {
  if (digimon?.images?.length) {
    const preferred =
      digimon.images.find((image) => image.transparent) ||
      digimon.images[0]

    return preferred?.href || ''
  }

  return digimon?.image || ''
}

export function getDigimonLevel(digimon) {
  if (Array.isArray(digimon?.levels)) {
    const levels = digimon.levels
      .map((item) => normalizeLevel(item.level))
      .filter((level) => level !== 'No especificado')

    return levels.length
      ? [...new Set(levels)].join(', ')
      : 'No especificado'
  }

  if (typeof digimon?.level === 'string') {
    return normalizeLevel(digimon.level)
  }

  return 'No especificado'
}
