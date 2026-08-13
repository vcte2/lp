function enviarWhatsApp(event) {
  event.preventDefault();
  const nome = document.getElementById('nome').value;
  const mensagem = document.getElementById('mensagem').value;
  const texto = `Olá! Me chamo ${nome}. Preciso de orientação jurídica.\n\nCaso: ${mensagem}`;
  const url = `https://wa.me/5511979852687?text=${encodeURIComponent(texto)}`;
  window.open(url, '_blank');
}

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

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

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
