import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { products } from '../data/products'

export function ProductDetailPage() {
  const { productId } = useParams()
  const product = products.find((item) => item.id === productId)
  const navigate = useNavigate()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <div className="page">
        <section className="section">
          <h2>Producto no encontrado</h2>
          <p className="muted">Volvé al catálogo para elegir otro modelo.</p>
          <button className="button ghost" onClick={() => navigate('/catalogo')}>
            Ir al catálogo
          </button>
        </section>
      </div>
    )
  }

  const handleAdd = () => {
    addItem(product, quantity)
    navigate('/carrito')
  }

  return (
    <div className="page">
      <section className="product-detail">
        <div className="product-gallery">
          {product.gallery.map((src) => (
            <img key={src} src={src} alt={product.name} loading="lazy" />
          ))}
        </div>
        <div className="product-copy">
          <p className="eyebrow">Buzo cápsula</p>
          <h1>{product.name}</h1>
          <p className="price">${product.price.toLocaleString('es-AR')}</p>
          <p>{product.description}</p>
          <div className="pill-row">
            <div>
              <p className="eyebrow">Colores</p>
              <div className="pills">
                {product.colors.map((color) => (
                  <span key={color} className="pill">
                    {color}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow">Talles</p>
              <div className="pills">
                {product.sizes.map((size) => (
                  <span key={size} className="pill">
                    {size}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="actions">
            <label className="quantity">
              Cantidad
              <input
                type="number"
                min="1"
                max="10"
                value={quantity}
                onChange={(event) => setQuantity(Number(event.target.value))}
              />
            </label>
            <button className="button primary" onClick={handleAdd}>
              Añadir al carrito
            </button>
            <button className="button ghost" onClick={() => navigate('/catalogo')}>
              Volver al catálogo
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}