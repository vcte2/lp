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

// ===== FILTRO DE IMÓVEIS =====
const filtroBtns = document.querySelectorAll('.filtro-btn');
const imovelCards = document.querySelectorAll('.imovel-card');

filtroBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filtroBtns.forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');

    const filtro = btn.dataset.filter;
    imovelCards.forEach(card => {
      const tags = card.dataset.tags || '';
      const mostrar = filtro === 'todos' || tags.includes(filtro);
      card.classList.toggle('is-hidden', !mostrar);
    });
  });
});

// ===== SIMULADOR DE FINANCIAMENTO =====
const valorImovel = document.getElementById('valorImovel');
const entrada = document.getElementById('entrada');
const prazo = document.getElementById('prazo');
const valorImovelOut = document.getElementById('valorImovelOut');
const entradaOut = document.getElementById('entradaOut');
const prazoOut = document.getElementById('prazoOut');
const resultadoValor = document.getElementById('resultadoValor');
const resultadoDetalhe = document.getElementById('resultadoDetalhe');
const simuladorCta = document.getElementById('simuladorCta');

const formatBRL = (valor) => valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

function calcularSimulacao() {
  const preco = Number(valorImovel.value);
  const entradaPct = Number(entrada.value);
  const meses = Number(prazo.value);

  const valorEntrada = preco * (entradaPct / 100);
  const financiado = preco - valorEntrada;

  // taxa mensal aproximada (estimativa simplificada, não é proposta de crédito real)
  const taxaMensal = 0.0085;
  const parcela = financiado > 0
    ? (financiado * taxaMensal) / (1 - Math.pow(1 + taxaMensal, -meses))
    : 0;

  valorImovelOut.textContent = formatBRL(preco);
  entradaOut.textContent = `${formatBRL(valorEntrada)} (${entradaPct}%)`;
  prazoOut.textContent = `${meses} meses`;
  resultadoValor.textContent = `${formatBRL(Math.round(parcela))}/mês`;
  resultadoDetalhe.textContent = `// financiado: ${formatBRL(Math.round(financiado))}`;

  const texto = `Olá! Simulei um financiamento: imóvel de ${formatBRL(preco)}, entrada de ${formatBRL(valorEntrada)} (${entradaPct}%), em ${meses} meses — parcela estimada de ${formatBRL(Math.round(parcela))}. Quero saber mais.`;
  simuladorCta.href = `https://wa.me/5511979852687?text=${encodeURIComponent(texto)}`;
}

[valorImovel, entrada, prazo].forEach(input => {
  input.addEventListener('input', calcularSimulacao);
});

// Pré-preenche o simulador ao clicar em "Simular financiamento" de um card
document.querySelectorAll('.imovel-simular').forEach(link => {
  link.addEventListener('click', () => {
    const preco = link.dataset.price;
    if (preco) {
      valorImovel.value = preco;
      calcularSimulacao();
    }
  });
});

calcularSimulacao();
