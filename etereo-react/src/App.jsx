import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { CatalogPage } from './pages/CatalogPage'
import { CartPage } from './pages/CartPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { CartProvider } from './context/CartContext'
import './App.css'

export default function App() {
  return (
    <CartProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalogo" element={<CatalogPage />} />
          <Route path="/producto/:productId" element={<ProductDetailPage />} />
          <Route path="/carrito" element={<CartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </CartProvider>
  )
}