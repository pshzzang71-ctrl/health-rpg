// 건강 RPG 서비스 워커: 처음 한 번 열면 모든 파일을 저장해 두고, 이후에는 인터넷 없이 실행됩니다.
const CACHE = 'health-rpg-v8';
const ASSETS = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-maskable-512.png', './costumes.js'];
const FONT_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // 백업 서버(/api/)는 저장하지 않고 항상 인터넷으로
  if (url.origin === self.location.origin && url.pathname.startsWith('/api/')) return;
  // 새 버전 확인 요청(?fresh)도 저장본을 쓰지 않음
  if (url.origin === self.location.origin && url.searchParams.has('fresh')) return;

  // 글꼴: 한 번 받으면 저장해 두고 계속 사용
  if (FONT_HOSTS.includes(url.hostname)) {
    e.respondWith(caches.open(CACHE).then(c => c.match(req).then(hit => hit || fetch(req).then(res => {
      c.put(req, res.clone());
      return res;
    }).catch(() => hit))));
    return;
  }

  // 앱 화면: 인터넷이 되면 항상 최신 화면, 안 되거나 4초 넘게 걸리면 저장된 화면
  if (req.mode === 'navigate') {
    e.respondWith((async () => {
      const cached = await caches.match('./index.html');
      const net = fetch(req, { cache: 'no-store' }).then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put('./index.html', copy)); }
        return res;
      });
      if (!cached) return net;
      const late = new Promise(r => setTimeout(() => r(cached), 4000));
      return Promise.race([net.catch(() => cached), late]);
    })());
    return;
  }

  // 코스튬 목록: 매주 새 옷이 추가되니 인터넷이 되면 새 파일, 안 되면 저장본
  if (url.origin === self.location.origin && url.pathname.endsWith('/costumes.js')) {
    e.respondWith(fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put('./costumes.js', copy)); }
      return res;
    }).catch(() => caches.match('./costumes.js')));
    return;
  }

  // 그 밖의 파일: 저장본 우선
  e.respondWith(caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).then(res => {
    if (res.ok && url.origin === self.location.origin) {
      const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy));
    }
    return res;
  })));
});
