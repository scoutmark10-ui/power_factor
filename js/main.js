const anoAtual = new Date().getFullYear();
const footer = document.querySelector(".footer");

if (footer) {
    footer.innerHTML = `<p>&copy; ${anoAtual} Handerson Dev. Todos os direitos reservados.</p>`;
}