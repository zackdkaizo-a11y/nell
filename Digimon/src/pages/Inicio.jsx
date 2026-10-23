import { Link } from 'react-router-dom'

export default function Inicio() {
  return (
    <main className="home-page">
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">DIGITAL WORLD / EXPLORER</span>

          <h1>
            Tu próxima aventura
            <span> comienza aquí.</span>
          </h1>

          <p>
            Explora el Mundo Digital, descubre nuevas criaturas
            y reúne a tus compañeros Digimon favoritos.
          </p>

          <div className="hero-actions">
            <Link to="/lista" className="button primary">
              Explorar Digimon
            </Link>

            <Link to="/favoritos" className="button secondary">
              Mis favoritos
            </Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="section-heading">
          <span className="eyebrow">DESCUBRE</span>
          <h2>Todo el Mundo Digital en un solo lugar</h2>
          <p>
            Encuentra criaturas, guarda tus favoritas y conoce
            sus características.
          </p>
        </div>

        <div className="feature-grid">
          <Link to="/lista" className="feature-card">
            <div className="feature-icon">◈</div>
            <h3>Explora el catálogo</h3>
            <p>
              Descubre Digimon, busca por nombre y filtra
              las criaturas por nivel.
            </p>
            <span className="feature-link">
              Ver catálogo →
            </span>
          </Link>

          <Link to="/favoritos" className="feature-card">
            <div className="feature-icon">♡</div>
            <h3>Crea tu colección</h3>
            <p>
              Guarda tus Digimon favoritos y vuelve a
              consultarlos cuando quieras.
            </p>
            <span className="feature-link">
              Ver favoritos →
            </span>
          </Link>

          <Link to="/lista" className="feature-card">
            <div className="feature-icon">⌘</div>
            <h3>Conoce sus datos</h3>
            <p>
              Entra en la ficha de cada criatura para
              consultar sus características.
            </p>
            <span className="feature-link">
              Descubrir más →
            </span>
          </Link>
        </div>
      </section>
    </main>
  )
}
