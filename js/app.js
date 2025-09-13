/* ---------------------------
   ETHEREO / (Et). — app.js
   - Menú móvil
   - Carga perezosa de imágenes/videos/audio (data-src -> src)
   - Microanimaciones al hacer scroll
-------------------------------- */

// 1) Menú móvil
const toggle = document.querySelector('[data-menu-toggle]');
const links = document.querySelector('[data-nav-links]');
if (toggle && links){
  toggle.addEventListener('click', () => {
    const open = links.style.display === 'flex';
    links.style.display = open ? 'none' : 'flex';
    links.style.flexDirection = 'column';
    links.style.gap = '12px';
  });
}

// 2) Lazy load de medios usando IntersectionObserver
const lazyMedia = document.querySelectorAll('[data-src]');
if ('IntersectionObserver' in window){
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const real = el.getAttribute('data-src');
      if (real){
        el.setAttribute('src', real);
        el.removeAttribute('data-src');
        el.removeAttribute('src-placeholder');
      }
      // Para <source> dentro de <video> o <audio>
      el.querySelectorAll('source[data-src]').forEach(s => {
        s.src = s.getAttribute('data-src');
        s.removeAttribute('data-src');
      });
      // Si es video con controls, evitamos autoplay por accesibilidad
      if (el.tagName === 'VIDEO') el.load();
      io.unobserve(el);
    });
  }, { rootMargin: '200px 0px' });
  lazyMedia.forEach(m => io.observe(m));
}else{
  // Fallback: cargar todo
  lazyMedia.forEach(el => {
    const real = el.getAttribute('data-src');
    if (real){
      el.setAttribute('src', real);
      el.removeAttribute('data-src');
      el.removeAttribute('src-placeholder');
    }
  });
}

// 3) Microanimaciones on-scroll (fade-up)
const revealables = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window){
  const io2 = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting){
        e.target.animate(
          [
            { opacity: 0, transform: 'translateY(14px)' },
            { opacity: 1, transform: 'translateY(0)' }
          ],
          { duration: 550, easing: 'cubic-bezier(.2,.6,.2,1)', fill: 'forwards' }
        );
        io2.unobserve(e.target);
      }
    });
  }, { rootMargin: '120px 0px' });
  revealables.forEach(n => io2.observe(n));
}

// 4) Utilidad: año automático en el footer
const yearEl = document.querySelector('[data-year]');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// 5) Accesibilidad básica para usuarios que prefieren reducir movimiento
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  // Desactivar animaciones
  document.querySelectorAll('*').forEach(el => {
    el.style.scrollBehavior = 'auto';
  });
}
