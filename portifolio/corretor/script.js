function abrirWhatsApp() {
    const texto = `Olá! Me chamo ${nome}. Tenho interesse em um site.\n\nMensagem: ${mensagem}`;
    const telefone = '5511979852687'; // Substitua pelo número de telefone desejado com código do país
  window.location.href =
    `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
}
