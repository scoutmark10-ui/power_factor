const userName = localStorage.getItem("powerFactorUserName");
const path = window.location.pathname.toLowerCase();
const isExercisePage = path.includes("/pages/");
const isHomePage = path.includes("home.html");
const isIndexPage = !isHomePage && !isExercisePage;

function pathPrefix() {
  return isExercisePage ? "../" : "./";
}

function closeSidebar(sidebar, overlay) {
  sidebar.classList.remove("open");
  overlay.classList.remove("active");
}

function closeQuickMenu(menu, overlay) {
  menu.classList.remove("open");
  overlay.classList.remove("active");
}

if (!userName && !isIndexPage) {
  window.location.href = `${pathPrefix()}index.html`;
} else if (userName && isIndexPage) {
  window.location.href = "./home.html";
}

const anoAtual = new Date().getFullYear();
const footer = document.querySelector(".footer");
if (footer) {
  footer.innerHTML = `<p>&copy; ${anoAtual} Handerson Dev. Todos os direitos reservados.</p>`;
}

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const prefix = pathPrefix();
  const header = document.querySelector("header");
  const avatarButtons = document.querySelectorAll("header button");
  const initial = userName ? userName.charAt(0).toUpperCase() : "H";

  if (localStorage.getItem("powerFactorTheme") === "light") {
    body.classList.add("light-theme");
  }

  if (userName) {
    const introTitle = document.querySelector(".intro h2");
    if (introTitle) introTitle.textContent = `Bem-vindo(a), ${userName}!`;
  }

  avatarButtons.forEach((btn) => {
    btn.classList.add("profile-btn");
    btn.textContent = initial;
    btn.setAttribute("aria-label", "Abrir menu rapido");
  });

  const burgerMenu = document.querySelector("header nav");
  const sidebar = document.getElementById("sidebar");
  const closeSidebarBtn = document.getElementById("close-sidebar");
  const sidebarOverlay = document.getElementById("sidebar-overlay");
  const themeToggleBtn = document.getElementById("theme-toggle");
  const logoutBtn = document.getElementById("logout-btn");

  if (burgerMenu && sidebar && closeSidebarBtn && sidebarOverlay) {
    burgerMenu.setAttribute("aria-label", "Abrir menu lateral");
    burgerMenu.setAttribute("role", "button");
    burgerMenu.setAttribute("tabindex", "0");

    burgerMenu.addEventListener("click", () => {
      sidebar.classList.add("open");
      sidebarOverlay.classList.add("active");
    });

    burgerMenu.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        sidebar.classList.add("open");
        sidebarOverlay.classList.add("active");
      }
    });

    closeSidebarBtn.addEventListener("click", () => closeSidebar(sidebar, sidebarOverlay));
    sidebarOverlay.addEventListener("click", () => closeSidebar(sidebar, sidebarOverlay));

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && sidebar.classList.contains("open")) {
        closeSidebar(sidebar, sidebarOverlay);
      }
    });

    const currentPage = path.split("/").pop();
    const navLinks = sidebar.querySelectorAll("a.btn-sidebar");
    navLinks.forEach((link) => {
      const href = link.getAttribute("href") || "";
      if (href.endsWith(currentPage)) {
        link.classList.add("active");
      }
    });
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      body.classList.toggle("light-theme");
      localStorage.setItem("powerFactorTheme", body.classList.contains("light-theme") ? "light" : "dark");
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("powerFactorUserName");
      window.location.href = `${prefix}index.html`;
    });
  }

  // Menu rapido nas paginas de exercicio (abre no botao com a inicial)
  if (isExercisePage && header && avatarButtons.length > 0) {
    const quickMenu = document.createElement("aside");
    quickMenu.id = "quick-menu";
    quickMenu.className = "quick-menu";
    quickMenu.innerHTML = `
      <button type="button" id="close-quick-menu" class="close-sidebar" aria-label="Fechar">&times;</button>
      <h3>Atalhos</h3>
      <ul class="quick-links">
        <li><a class="btn-sidebar" href="${prefix}home.html">Inicio</a></li>
        <li><a class="btn-sidebar" href="${prefix}pages/potencia-eixo.html">Potencia do eixo</a></li>
        <li><a class="btn-sidebar" href="${prefix}pages/motor.html">Demanda do motor</a></li>
        <li><a class="btn-sidebar" href="${prefix}pages/ccm.html">Demanda CCM</a></li>
        <li><a class="btn-sidebar" href="${prefix}pages/qdl.html">Demanda QDL</a></li>
        <li><a class="btn-sidebar" href="${prefix}pages/qgf.html">Demanda QGF</a></li>
        <li><a class="btn-sidebar" href="${prefix}pages/corrente.html">Corrente nominal</a></li>
        <li><a class="btn-sidebar" href="${prefix}pages/carga-diaria.html">Fator de carga diaria</a></li>
      </ul>
      <div class="quick-actions">
        <button type="button" id="quick-theme-toggle" class="sidebar-btn">Alternar tema</button>
        <button type="button" id="quick-logout-btn" class="sidebar-btn">Sair / Trocar nome</button>
      </div>
    `;

    const quickOverlay = document.createElement("div");
    quickOverlay.id = "quick-menu-overlay";
    quickOverlay.className = "sidebar-overlay quick-overlay";

    document.body.appendChild(quickOverlay);
    document.body.appendChild(quickMenu);

    const closeQuickBtn = document.getElementById("close-quick-menu");
    const quickThemeToggle = document.getElementById("quick-theme-toggle");
    const quickLogoutBtn = document.getElementById("quick-logout-btn");

    avatarButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        quickMenu.classList.add("open");
        quickOverlay.classList.add("active");
      });
    });

    closeQuickBtn.addEventListener("click", () => closeQuickMenu(quickMenu, quickOverlay));
    quickOverlay.addEventListener("click", () => closeQuickMenu(quickMenu, quickOverlay));

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && quickMenu.classList.contains("open")) {
        closeQuickMenu(quickMenu, quickOverlay);
      }
    });

    const quickCurrentPage = path.split("/").pop();
    const quickLinks = quickMenu.querySelectorAll("a.btn-sidebar");
    quickLinks.forEach((link) => {
      const href = link.getAttribute("href") || "";
      if (href.endsWith(quickCurrentPage)) {
        link.classList.add("active");
      }
    });

    quickThemeToggle.addEventListener("click", () => {
      body.classList.toggle("light-theme");
      localStorage.setItem("powerFactorTheme", body.classList.contains("light-theme") ? "light" : "dark");
    });

    quickLogoutBtn.addEventListener("click", () => {
      localStorage.removeItem("powerFactorUserName");
      window.location.href = `${prefix}index.html`;
    });
  }
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    const swPath = isExercisePage ? "../sw.js" : "./sw.js";
    navigator.serviceWorker.register(swPath).catch((err) => {
      console.log("Falha no registro do ServiceWorker:", err);
    });
  });
}
