function enviarWhatsApp(event) {
  event.preventDefault();

  const nome = document.getElementById('nome').value;
  const mensagem = document.getElementById('mensagem').value;

  const texto = `Olá! Me chamo ${nome}. Tenho interesse em um site.\n\nMensagem: ${mensagem}`;
  const telefone = '5511979852687';
  const url = `https://wa.me/${telefone}?text=${encodeURIComponent(texto)}`;

  window.open(url, '_blank');
}

// Menu mobile
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('active');
  menuToggle.setAttribute('aria-expanded', isOpen);
});

navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Ano no rodapé
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
revealEls.forEach((el, i) => {
  el.style.setProperty('--reveal-delay', `${(i % 4) * 0.08}s`);
});

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

// ===== LOADER DE ENTRADA (ampulheta) =====
const loader = document.getElementById('loader');
const loaderTyped = document.getElementById('loaderTyped');
const loaderBarFill = document.getElementById('loaderBarFill');
const loaderPct = document.getElementById('loaderPct');
const sandTop = document.getElementById('sandTop');
const sandBottom = document.getElementById('sandBottom');
const stream = document.getElementById('stream');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (loader && !reduceMotion) {
  document.body.style.overflow = 'hidden';

  const fases = [
    { until: 20, texto: 'analisando_seu_negocio.js' },
    { until: 45, texto: 'desenhando_layout.tsx' },
    { until: 70, texto: 'escrevendo_o_codigo.tsx' },
    { until: 90, texto: 'testando_responsividade.css' },
    { until: 100, texto: 'publicando_site.sh' },
  ];

  let faseAtual = -1;
  let typer = null;

  function digitar(texto) {
    if (typer) clearInterval(typer);
    loaderTyped.textContent = '';
    let i = 0;
    typer = setInterval(() => {
      loaderTyped.textContent = texto.slice(0, i + 1);
      i++;
      if (i >= texto.length) clearInterval(typer);
    }, 28);
  }

  const MAX_SAND = 66; // altura útil de cada bulbo da ampulheta

  function atualizarAmpulheta(pct) {
    const topH = MAX_SAND * (1 - pct / 100);
    const botH = MAX_SAND * (pct / 100);
    sandTop.setAttribute('height', topH.toFixed(1));
    sandBottom.setAttribute('height', botH.toFixed(1));
    sandBottom.setAttribute('y', (148 - botH).toFixed(1));
    stream.style.opacity = pct >= 100 ? '0' : '';
  }

  atualizarAmpulheta(0);

  let pct = 0;
  const bar = setInterval(() => {
    pct = Math.min(100, pct + Math.random() * 9 + 4);
    loaderBarFill.style.width = pct + '%';
    loaderPct.textContent = Math.round(pct) + '%';
    atualizarAmpulheta(pct);

    const idxFase = fases.findIndex(f => pct <= f.until);
    if (idxFase !== -1 && idxFase !== faseAtual) {
      faseAtual = idxFase;
      digitar(fases[idxFase].texto);
    }

    if (pct >= 100) {
      clearInterval(bar);
      setTimeout(() => {
        loader.classList.add('is-hidden');
        document.body.style.overflow = '';
      }, 450);
    }
  }, 170);
} else if (loader) {
  loader.classList.add('is-hidden');
}

// ===== CONTADOR ANIMADO DOS STATS =====
const counters = document.querySelectorAll('[data-count]');
if (counters.length) {
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const duration = 900;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min(1, (now - start) / duration);
        const value = Math.round(target * (1 - Math.pow(1 - progress, 3)));
        el.textContent = prefix + value + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      countObserver.unobserve(el);
    });
  }, { threshold: 0.6 });

  counters.forEach(el => countObserver.observe(el));
}

// ===== BARRA DE PROGRESSO DE ROLAGEM =====
const scrollBar = document.createElement('div');
scrollBar.id = 'scroll-progress';
document.body.appendChild(scrollBar);

function atualizarScrollProgress() {
  const alturaTotal = document.documentElement.scrollHeight - window.innerHeight;
  const progresso = alturaTotal > 0 ? (window.scrollY / alturaTotal) * 100 : 0;
  scrollBar.style.width = progresso + '%';
}
window.addEventListener('scroll', atualizarScrollProgress, { passive: true });
atualizarScrollProgress();

// ===== TILT NO BROWSER-FRAME =====
const tiltFrame = document.getElementById('tiltFrame');
if (tiltFrame && !reduceMotion && window.matchMedia('(hover: hover)').matches) {
  tiltFrame.addEventListener('mousemove', (e) => {
    const r = tiltFrame.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    tiltFrame.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${y * -8}deg) translateY(-4px)`;
  });
  tiltFrame.addEventListener('mouseleave', () => {
    tiltFrame.style.transform = 'perspective(800px) rotateY(0) rotateX(0) translateY(0)';
  });
}
