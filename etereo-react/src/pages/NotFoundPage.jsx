import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="page">
      <section className="section">
        <h2>Ups, esta ruta no existe</h2>
        <p className="muted">Verificá el enlace o volvé al inicio.</p>
        <div className="actions">
          <Link className="button primary" to="/">
            Volver al inicio
          </Link>
          <Link className="button ghost" to="/catalogo">
            Abrir catálogo
          </Link>
        </div>
      </section>
    </div>
  )
}