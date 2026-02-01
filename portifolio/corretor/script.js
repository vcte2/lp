function abrirWhatsApp() {
  const telefone = '5511979852687';
  const texto = 'Olá! Tenho interesse em um site.';

  window.open(
    `https://wa.me/${telefone}?text=${encodeURIComponent(texto)}`,
    '_blank'
  );
}
