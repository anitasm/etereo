import { Link } from 'react-router-dom'

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-text">
        <p className="eyebrow">Nueva entrega · React Router</p>
        <h1>
          Vibra (Et)éreo
          <span className="gradient">· cápsula nocturna</span>
        </h1>
        <p>
          Comunidad, música y moda urbana. Explorá la colección de buzos que une la energía nocturna con
          el confort cotidiano.
        </p>
        <div className="hero-actions">
          <Link to="/catalogo" className="button primary">
            Ver catálogo
          </Link>
          <Link to="/carrito" className="button ghost">
            Ir al carrito
          </Link>
        </div>
      </div>
      <div className="hero-media" aria-hidden>
        <div className="orb" />
        <img src="/assets/eto_brazoscruzados.png" alt="Modelo de la colección (Et)éreo" loading="lazy" />
      </div>
    </section>
  )
}