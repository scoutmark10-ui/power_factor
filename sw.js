// Nome do cache onde vamos guardar os arquivos (altere a versão para atualizar o cache)
const CACHE_NAME = 'power-factor-v2';

// Lista de arquivos e requisições que queremos guardar para funcionar offline
const urlsToCache = [
  './',
  './index.html',
  './home.html',
  './manifest.json',
  
  // Estilo e fontes
  './css/style.css',
  './css/Poppins-Regular.ttf',

  // Scripts
  './js/main.js',
  './js/ccm.js',
  './js/demanda-motor.js',
  './js/potencia-eixo.js',
  './js/qdl.js',
  './js/qgf.js',

  // Imagens
  './img/favicon.png',
  './img/logo.jpg',

  // Páginas HTML adicionais
  './pages/ccm.html',
  './pages/motor.html',
  './pages/potencia-eixo.html',
  './pages/qdl.html',
  './pages/qgf.html'
];

// Evento de "Instalação" - chamado quando o Service Worker é registrado pela primeira vez
self.addEventListener('install', function(event) {
  event.waitUntil(
    // Abrimos o cache
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Cache aberto com sucesso');
        // Adicionamos todos os arquivos básicos listados acima
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento de "Ativação" - chamado depois que o Service Worker instala, usado para limpar caches antigos
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          // Remover qualquer cache que não seja a versão atual
          if (cacheName !== CACHE_NAME) {
            console.log('Removendo cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Evento de "Interceptação de Rede (Fetch)" - para servir os dados do cache se offline
self.addEventListener('fetch', function(event) {
  event.respondWith(
    // Tenta encontrar uma resposta correspondente no cache
    caches.match(event.request)
      .then(function(response) {
        // Se encontramos no cache (offline ou já salvo), retornamos o que tínhamos
        if (response) {
          return response;
        }
        
        // Se não encontramos, fazemos a requisição via rede normalmente
        return fetch(event.request).catch(function() {
          // Se falhar o cache E a rede estiver offline, não vai achar nada,
          // porém como já salvamos tudo no install, isso assegura funcionalidade normal.
          console.log('Você está offline e o recurso não foi encontrado no cache.');
        });
      }
    )
  );
});
