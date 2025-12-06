import { Hero } from '../components/Hero'
import { ProductCard } from '../components/ProductCard'
import { products } from '../data/products'

export function HomePage() {
  const featured = products.filter((product) => product.featured)

  return (
    <div className="page">
      <Hero />

      <section className="section">
        <div className="section-header">
          <p className="eyebrow">Comunidad</p>
          <h2>El pulso de la noche</h2>
          <p className="muted">
            Sesiones, shootings y encuentros que inspiran la colección. Cada prenda suma a la experiencia
            sensorial de (Et)éreo.
          </p>
        </div>
        <div className="grid highlights">
          <article className="highlight-card">
            <p className="eyebrow">Mood</p>
            <h3>Club & rooftops</h3>
            <p>Texturas suaves que se activan con luces y sombras. Ideales para noches largas.</p>
          </article>
          <article className="highlight-card">
            <p className="eyebrow">Materialidad</p>
            <h3>Felpa liviana</h3>
            <p>Capuchas amplias, cuellos altos y ajustes pensados para moverte sin fricción.</p>
          </article>
          <article className="highlight-card">
            <p className="eyebrow">Drop cápsula</p>
            <h3>Series cortas</h3>
            <p>Disponibilidad limitada con colores neón apagados y neutros urbanos.</p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <p className="eyebrow">Colección</p>
          <h2>Destacados</h2>
          <p className="muted">Explorá los buzos más pedidos de esta cápsula nocturna.</p>
        </div>
        <div className="grid products">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}