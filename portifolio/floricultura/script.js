// Menu mobile
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('active');
  menuToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Ano
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => observer.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in-view'));
}

// ===== PÉTALAS CAINDO =====
const petalsContainer = document.getElementById('petals');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (petalsContainer && !reduceMotion) {
  const total = 16;
  for (let i = 0; i < total; i++) {
    const petal = document.createElement('span');
    petal.className = 'petal';
    petal.style.left = Math.random() * 100 + '%';
    petal.style.setProperty('--drift', (Math.random() * 80 - 40) + 'px');
    petal.style.animationDuration = (7 + Math.random() * 6) + 's';
    petal.style.animationDelay = (Math.random() * 8) + 's';
    petal.style.width = petal.style.height = (10 + Math.random() * 8) + 'px';
    petalsContainer.appendChild(petal);
  }
}

// ===== FILTRO DO CATÁLOGO =====
const filtroBtns = document.querySelectorAll('.filtro-btn');
const florCards = document.querySelectorAll('.flor-card');

filtroBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filtroBtns.forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');

    const filtro = btn.dataset.filter;
    florCards.forEach(card => {
      const tags = card.dataset.tags || '';
      const mostrar = filtro === 'todos' || tags.includes(filtro);
      card.classList.toggle('is-hidden', !mostrar);
    });
  });
});

// ===== MONTE SEU BUQUÊ =====
const pedido = {
  tamanho: { label: 'Buquê Pequeno', price: 59.90 },
  flor: { label: 'Rosas', price: 0 },
  embalagem: { label: 'Papel Kraft', price: 0 }
};

const resumoLista = document.getElementById('resumoLista');
const resumoTotal = document.getElementById('resumoTotal');
const montarCta = document.getElementById('montarCta');

const formatBRL = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

function renderResumo() {
  resumoLista.innerHTML = '';

  const linha = (label, price, incluso) => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${label}</span><span>${incluso ? 'incluso' : (price > 0 ? '+' : '') + formatBRL(price)}</span>`;
    resumoLista.appendChild(li);
  };

  linha(pedido.tamanho.label, pedido.tamanho.price, false);
  linha(pedido.flor.label, pedido.flor.price, pedido.flor.price === 0);
  linha(pedido.embalagem.label, pedido.embalagem.price, pedido.embalagem.price === 0);

  const total = pedido.tamanho.price + pedido.flor.price + pedido.embalagem.price;
  resumoTotal.textContent = formatBRL(total);

  const texto = `Olá! Quero pedir um buquê:\n- ${pedido.tamanho.label}\n- Flor: ${pedido.flor.label}\n- Embalagem: ${pedido.embalagem.label}\n\nTotal estimado: ${formatBRL(total)}`;
  montarCta.href = `https://wa.me/5511979852687?text=${encodeURIComponent(texto)}`;
}

function ligarGrupo(grupo, chave) {
  document.querySelectorAll(`.opcoes[data-group="${grupo}"] .opcao`).forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll(`.opcoes[data-group="${grupo}"] .opcao`).forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const label = btn.textContent.trim().replace(/(\+R\$.*$|Incluso$)/, '').trim();
      pedido[chave] = { label, price: Number(btn.dataset.price) };
      renderResumo();
    });
  });
}

ligarGrupo('tamanho', 'tamanho');
ligarGrupo('flor', 'flor');
ligarGrupo('embalagem', 'embalagem');

renderResumo();
