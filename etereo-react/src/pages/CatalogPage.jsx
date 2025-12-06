import { ProductCard } from '../components/ProductCard'
import { products } from '../data/products'

export function CatalogPage() {
  return (
    <div className="page">
      <section className="section">
        <div className="section-header">
          <p className="eyebrow">Colección</p>
          <h2>Buzos cápsula (Et)éreo</h2>
          <p className="muted">Seleccioná un modelo para ver su ficha y sumarlo a tu carrito.</p>
        </div>
        <div className="grid products">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}