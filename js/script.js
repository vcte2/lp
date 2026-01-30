function enviarWhatsApp(event) {
  event.preventDefault();

  const nome = document.getElementById('nome').value;
  const mensagem = document.getElementById('mensagem').value;

  const texto = `Olá! Me chamo ${nome}. Tenho interesse em um site.\n\nMensagem: ${mensagem}`;

  const telefone = '5511979852687'; // Substitua pelo número de telefone desejado com código do país

  const url = `https://wa.me/${telefone}?text=${encodeURIComponent(texto)}`;

  window.open(url, '_blank');
}

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});