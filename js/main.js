/* =================================================================== */
/*                       BOAS VINDAS E USUÁRIO                         */
/* =================================================================== */
const userName = localStorage.getItem('powerFactorUserName');
// Qualquer página que não seja a home.html ou alguma dentro de /pages/ é a nossa index (boas-vindas)
const isIndexPage = !window.location.pathname.includes('home.html') && !window.location.pathname.includes('/pages/');

if (!userName && !isIndexPage) {
    // Se o user não tem nome e não está na index, joga para index.html (welcome)
    const pathToIndex = window.location.pathname.includes('/pages/') ? '../index.html' : './index.html';
    window.location.href = pathToIndex;
} else if (userName && isIndexPage) {
    // Se já tem nome mas parou na index.html (welcome), joga pra home.html
    window.location.href = './home.html';
}

const anoAtual = new Date().getFullYear();
const footer = document.querySelector(".footer");

if (footer) {
    footer.innerHTML = `<p>&copy; ${anoAtual} Handerson Dev. Todos os direitos reservados.</p>`;
}

// Se estiver na home.html e houver o título intro, atualiza com o nome do usuário
document.addEventListener("DOMContentLoaded", () => {
    if (userName) {
        const introTitle = document.querySelector('.intro h2');
        if (introTitle) {
            introTitle.textContent = `Bem-vindo(a), ${userName}!`;
        }
    }

    // Avatar (botão do cabeçalho com inicial)
    const headerBtns = document.querySelectorAll('header button');
    headerBtns.forEach(btn => {
        // Garantindo que modifique apenas botões com 'H' original ou já preparados
        if(btn.textContent === 'H' || window.getComputedStyle(btn).borderRadius === '50%') {
            btn.textContent = userName ? userName.charAt(0).toUpperCase() : 'H';
            // Borda colorida em volta do botão fica muito legal:
            btn.style.border = '2px solid rgba(255, 255, 255, 0.4)';
            btn.style.background = 'rgba(0,0,0,0.2)';
            btn.style.color = 'inherit';
        }
    });

    // Tema Claro Global
    const body = document.body;
    if (localStorage.getItem('powerFactorTheme') === 'light') {
        body.classList.add('light-theme');
    }

    // Logica do Sidebar (Home)
    const burgerMenu = document.querySelector('header nav');
    const sidebar = document.getElementById('sidebar');
    const closeSidebar = document.getElementById('close-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const logoutBtn = document.getElementById('logout-btn');

    if (burgerMenu && sidebar) {
        burgerMenu.addEventListener('click', () => {
            sidebar.classList.add('open');
            overlay.classList.add('active');
        });
        
        closeSidebar.addEventListener('click', () => {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
        });

        overlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
        });
    }

    // Ações do Sidebar
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            body.classList.toggle('light-theme');
            if (body.classList.contains('light-theme')) {
                localStorage.setItem('powerFactorTheme', 'light');
            } else {
                localStorage.setItem('powerFactorTheme', 'dark');
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('powerFactorUserName');
            window.location.href = './index.html'; // Tenta ir pra raiz do server se tiver dentro de folder
        });
    }
});

/* =================================================================== */
/*                       REGISTRO SERVICE WORKER PWA                   */
/* =================================================================== */
// Verifica se o navegador atual tem suporte a "serviceWorker"
if ('serviceWorker' in navigator) {
    // Escuta o evento load na página inteira e então registra o nosso arquivo "sw.js"
    window.addEventListener('load', function() {
        // O caminho do Service Worker é relativo à raiz do site para cobrir todos os repositórios/páginas
        // Sendo executado a partir de index.html e das subcamadas.
        // Resolvemos o caminho com base na raiz ou simplesmente passando ../sw.js dependendo da chamada?
        // Como main.js é chamado em diferentes pastas, passaremos caminho absoluto ou trataremos abaixo.
        // A melhor prática é registrar o sw em uma tag de script dentro do index.html.
        
        // Vamos usar um path dinâmico baseado na URL da página atual em relação à raiz:
        const swPath = window.location.pathname.includes('/pages/') ? '../sw.js' : './sw.js';

        navigator.serviceWorker.register(swPath)
        .then(function(registration) {
            // Em caso de sucesso
            console.log('ServiceWorker registrado com sucesso com escopo: ', registration.scope);
        })
        .catch(function(err) {
            // Em caso de falha (talvez por não estar usando HTTPS no servidor, erro sintático, etc.)
            console.log('Falha no registro do ServiceWorker: ', err);
        });
    });
}