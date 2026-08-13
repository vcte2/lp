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

// ===== STATUS ABERTO / FECHADO =====
// Horário de exemplo: aberto todos os dias das 18h às 23h30
const statusBadge = document.getElementById('statusBadge');
const statusDot = statusBadge.querySelector('.status-dot');

function atualizarStatus() {
  const agora = new Date();
  const hora = agora.getHours() + agora.getMinutes() / 60;
  const aberto = hora >= 18 && hora < 23.5;

  statusDot.classList.toggle('is-closed', !aberto);
  statusBadge.lastChild.textContent = aberto
    ? ' aberto agora • até 23h30'
    : ' fechado agora • abre às 18h';
}
atualizarStatus();
setInterval(atualizarStatus, 60000);

// ===== MONTE SUA PIZZA =====
const pedido = {
  tamanho: { value: 'broto', label: 'Broto', price: 34.90 },
  borda: { value: 'tradicional', label: 'Borda Tradicional', price: 0 },
  adicionais: []
};

const resumoLista = document.getElementById('resumoLista');
const resumoTotal = document.getElementById('resumoTotal');
const montarCta = document.getElementById('montarCta');

const formatBRL = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

function renderResumo() {
  resumoLista.innerHTML = '';

  const linha = (label, price) => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${label}</span><span>${price > 0 ? '+' : ''}${price === 0 ? 'incluso' : formatBRL(price)}</span>`;
    resumoLista.appendChild(li);
  };

  linha(pedido.tamanho.label, pedido.tamanho.price);
  if (pedido.borda.price > 0) linha(pedido.borda.label, pedido.borda.price);
  pedido.adicionais.forEach(a => linha(a.label, a.price));

  const total = pedido.tamanho.price + pedido.borda.price + pedido.adicionais.reduce((s, a) => s + a.price, 0);
  resumoTotal.textContent = formatBRL(total);

  const itens = [pedido.tamanho.label];
  if (pedido.borda.price > 0) itens.push(pedido.borda.label);
  pedido.adicionais.forEach(a => itens.push(a.label));

  const texto = `Olá! Quero pedir uma pizza:\n- ${itens.join('\n- ')}\n\nTotal estimado: ${formatBRL(total)}`;
  montarCta.href = `https://wa.me/5511979852687?text=${encodeURIComponent(texto)}`;
}

document.querySelectorAll('.opcoes[data-group="tamanho"] .opcao').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.opcoes[data-group="tamanho"] .opcao').forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    pedido.tamanho = { value: btn.dataset.value, label: btn.textContent.trim().split('R$')[0].trim(), price: Number(btn.dataset.price) };
    renderResumo();
  });
});

document.querySelectorAll('.opcoes[data-group="borda"] .opcao').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.opcoes[data-group="borda"] .opcao').forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    pedido.borda = { value: btn.dataset.value, label: 'Borda ' + btn.textContent.trim().split('Grátis')[0].replace(/R\$.*$/, '').trim(), price: Number(btn.dataset.price) };
    renderResumo();
  });
});

document.querySelectorAll('.opcoes[data-group="adicionais"] .opcao').forEach(btn => {
  btn.addEventListener('click', () => {
    const isActive = btn.classList.toggle('is-active');
    const item = { value: btn.dataset.value, label: btn.textContent.trim().replace(/\+R\$.*$/, '').trim(), price: Number(btn.dataset.price) };

    if (isActive) {
      pedido.adicionais.push(item);
    } else {
      pedido.adicionais = pedido.adicionais.filter(a => a.value !== item.value);
    }
    renderResumo();
  });
});

renderResumo();
