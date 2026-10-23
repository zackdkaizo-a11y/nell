# Digimon Explorer

Proyecto académico de Tecnologías Web desarrollado con React, Vite y React Router. Usa la API pública Digi-API para explorar Digimon.

## Requisitos
- Node.js instalado (recomendado Node.js 20.19+ o 22.12+ para Vite moderno).
- Visual Studio Code y conexión a Internet.

## Ejecutar en Visual Studio Code
1. Descomprime el proyecto y abre la carpeta `Digimon_Explorer_Proyecto2` en VS Code.
2. Abre **Terminal > Nueva terminal**.
3. Ejecuta `npm install`.
4. Cuando termine, ejecuta `npm run dev`.
5. Abre la dirección local que indique Vite, normalmente `http://localhost:5173`.

Si PowerShell no permite ejecutar `npm`, comprueba que Node.js esté instalado con `node -v` y `npm -v`. Si el comando no se reconoce, instala Node.js LTS desde https://nodejs.org/ y reinicia VS Code.

## Compilar
`npm run build`

## API utilizada
- Nombre: Digi-API (Digimon API).
- URL base: `https://digi-api.com/api/v1`
- Listado paginado y filtros: `GET /digimon?page=0&pageSize=12`
- Búsqueda por nombre: `GET /digimon?name=agumon&page=0&pageSize=12`
- Filtro por nivel: `GET /digimon?level=Rookie&page=0&pageSize=12`
- Detalle por identificador: `GET /digimon/{id}`
- Documentación: https://digi-api.com/

## Funcionalidades
- Inicio, listado, detalle con parámetro, favoritos, registro de usuarios y página 404.
- Buscador y filtro por nivel; paginación con botón «Cargar más».
- Favoritos persistidos en `localStorage`.
- CRUD de usuarios en estado React: registrar, listar, editar y eliminar; validación de campos, identificación numérica y duplicados.
- Estados de carga, error y resultados vacíos.
- Diseño responsivo para móvil, tablet y escritorio.

## Estructura
- `src/components/`: Navbar, tarjetas, buscador, mensajes, formulario y pie de página.
- `src/pages/`: páginas de la aplicación.
- `src/services/digimonApi.js`: peticiones a la API.
- `src/App.jsx`: estado compartido y rutas.
- `src/main.jsx`: punto de entrada y `BrowserRouter`.

## Integrantes
Reemplazar este texto por los nombres del grupo antes de entregar.

## Repositorio y despliegue
Después de publicar, agregar los enlaces reales a `links.txt`.
