// Menu mobile
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('active');
  burger.setAttribute('aria-expanded', isOpen);
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    burger.setAttribute('aria-expanded', 'false');
  });
});

// Ano no rodapé
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Reveal on scroll
const animatedEls = document.querySelectorAll('[data-animate]');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('in-view'), Number(delay));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  animatedEls.forEach(el => observer.observe(el));
} else {
  animatedEls.forEach(el => el.classList.add('in-view'));
}

// Remove intro screen from tab order once hidden
const intro = document.getElementById('intro');
if (intro) {
  setTimeout(() => { intro.style.display = 'none'; }, 2300);
}

// ===== MODAL: ESCOLHA DE BARBEIRO =====
const WHATSAPP_NUMERO = '5511979852687';
const bookingModal = document.getElementById('bookingModal');
let lastFocusedEl = null;

function openBookingModal(triggerEl) {
  lastFocusedEl = triggerEl;
  bookingModal.classList.add('is-open');
  bookingModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  const firstBarber = bookingModal.querySelector('.barber-card');
  if (firstBarber) firstBarber.focus();
}

function closeBookingModal() {
  bookingModal.classList.remove('is-open');
  bookingModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (lastFocusedEl) lastFocusedEl.focus();
}

document.querySelectorAll('.js-open-booking').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    openBookingModal(el);
  });
});

bookingModal.querySelectorAll('[data-close-modal]').forEach(el => {
  el.addEventListener('click', closeBookingModal);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && bookingModal.classList.contains('is-open')) {
    closeBookingModal();
  }
});

document.querySelectorAll('.gallery').forEach(elemento => {
  elemento.addEventListener('click', function(evento) {
    evento.preventDefault(); // Cancela a ação padrão (como abrir links)
    evento.stopPropagation(); // Bloqueia a propagação do clique para outros elementos
  });
});

bookingModal.querySelectorAll('.barber-card').forEach(card => {
  card.addEventListener('click', () => {
    const barbeiro = card.dataset.barber;
    const texto = `Olá! Quero agendar um horário na Barbearia do Bigode com o ${barbeiro}. Serviço: (Corte/Barba/Corte + Barba) Dia: __ Horário: __`;
    const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank', 'noreferrer');
    closeBookingModal();
  });
});
