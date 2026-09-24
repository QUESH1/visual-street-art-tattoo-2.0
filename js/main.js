// Número no formato internacional, só dígitos (ex.: '5531999999999'). Vazio = botões levam ao rodapé.
const WHATSAPP_NUMBER = '';

const ARTISTS = [
  { name: 'Ana Alves', role: 'Artista' },
  { name: 'Lari', role: 'Artista' },
  { name: 'Savoi', role: 'Artista' },
  { name: 'Thales', role: 'Body Piercer', page: 'thales.html' },
  { name: 'Victor', role: 'Artista' },
  { name: 'Fune', role: 'Artista' },
  { name: 'Neville', role: 'Artista' },
  { name: 'Yoki', role: 'Artista' },
  { name: 'Lincoln', role: 'Artista' },
  { name: 'Pedro Jr', role: 'Artista' },
  { name: 'Bevilaqua', role: 'Artista' },
  { name: 'Franckenstein', role: 'Artista' },
  { name: 'Arthur', role: 'Artista' },
  { name: 'Thaylane', role: 'Artista' }
];

const slug = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-');
const artistHref = (a) => a.page || `artista.html?a=${slug(a.name)}`;
const pad = (n) => (n < 10 ? '0' + n : String(n));

function setupMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('open', open);
  });
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
    }
  });
}

function setupWhatsApp() {
  if (!WHATSAPP_NUMBER) return;
  document.querySelectorAll('[data-whatsapp]').forEach((el) => {
    const msg = el.getAttribute('data-whatsapp');
    el.href = `https://wa.me/${WHATSAPP_NUMBER}` + (msg ? `?text=${encodeURIComponent(msg)}` : '');
    el.target = '_blank';
    el.rel = 'noopener';
  });
}

function createArtistCard(a) {
  const card = document.createElement('div');
  card.className = 'cyl-card ph';

  const label = document.createElement('span');
  label.className = 'ph-label';
  label.textContent = a.name;

  const overlay = document.createElement('div');
  overlay.className = 'card-overlay';
  const role = document.createElement('div');
  role.className = 'role';
  role.textContent = a.role;
  const name = document.createElement('div');
  name.className = 'name';
  name.textContent = a.name;
  overlay.append(role, name);

  card.append(label, overlay);
  return card;
}

function setupCarousel() {
  const stage = document.querySelector('.cyl-stage');
  if (!stage) return;
  const ring = stage.querySelector('.cyl');
  const counter = document.querySelector('.carousel-counter');
  const n = ARTISTS.length;
  const step = 360 / n;
  const AUTO_SPEED = 0.006; // graus por ms (~1 volta por minuto)
  const DRAG = 0.2; // graus por px arrastado
  const small = window.matchMedia('(max-width: 640px)');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  let rotation = 0;
  let velocity = 0;
  let target = null;
  let dragging = false;
  let hovering = false;
  let focused = false;
  let moved = 0;
  let lastX = 0;
  let lastT = 0;
  let last = performance.now();

  const faces = ARTISTS.map((a, i) => {
    const face = document.createElement('a');
    face.className = 'cyl-face';
    face.href = artistHref(a);
    face.draggable = false;
    face.setAttribute('aria-label', `${a.name} — ${a.role}`);
    face.append(createArtistCard(a));
    face.addEventListener('focus', () => goTo(i));
    ring.append(face);
    return face;
  });

  const layout = () => {
    const cylinderWidth = small.matches ? 1600 : 2400;
    const radius = cylinderWidth / (2 * Math.PI);
    stage.style.setProperty('--face-w', `${cylinderWidth / n}px`);
    faces.forEach((f, i) => (f.style.transform = `rotateY(${i * step}deg) translateZ(${radius}px)`));
  };

  const snap = (deg) => Math.round(deg / step) * step;
  const frontIndex = () => ((Math.round(-rotation / step) % n) + n) % n;

  function goTo(i) {
    const base = -i * step;
    target = base + Math.round((rotation - base) / 360) * 360;
    velocity = 0;
  }

  const nudge = (dir) => {
    target = snap(target ?? rotation) - dir * step;
    velocity = 0;
  };

  const render = () => {
    ring.style.transform = `rotateY(${rotation}deg)`;
    faces.forEach((f, i) => {
      const facing = Math.cos(((i * step + rotation) * Math.PI) / 180);
      f.style.opacity = (0.25 + 0.75 * Math.max(0, facing)).toFixed(3);
    });
    counter.textContent = `${pad(frontIndex() + 1)} / ${pad(n)}`;
  };

  const tick = (now) => {
    const dt = Math.min(now - last, 64);
    last = now;
    if (!dragging) {
      if (target !== null) {
        const d = target - rotation;
        rotation += d * Math.min(1, dt / 110);
        if (Math.abs(d) < 0.05) { rotation = target; target = null; }
      } else if (Math.abs(velocity) > 0.002) {
        rotation += velocity * dt;
        velocity *= Math.pow(0.94, dt / 16);
      } else if (!reduce.matches && !hovering && !focused && !document.hidden) {
        rotation -= AUTO_SPEED * dt;
      }
    }
    render();
    requestAnimationFrame(tick);
  };

  stage.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    dragging = true;
    moved = 0;
    lastX = e.clientX;
    lastT = e.timeStamp;
    velocity = 0;
    target = null;
  });
  stage.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const dx = e.clientX - lastX;
    moved += Math.abs(dx);
    // só captura depois de arrastar de verdade, senão o clique no card deixa de abrir o link
    if (moved > 6 && !stage.hasPointerCapture(e.pointerId)) {
      stage.setPointerCapture(e.pointerId);
      stage.classList.add('dragging');
    }
    rotation += dx * DRAG;
    const dt = e.timeStamp - lastT;
    if (dt > 0) velocity = (dx * DRAG) / dt;
    lastX = e.clientX;
    lastT = e.timeStamp;
  });
  const endDrag = (e) => {
    if (!dragging) return;
    dragging = false;
    stage.classList.remove('dragging');
    if (e.timeStamp - lastT > 80) velocity = 0;
  };
  stage.addEventListener('pointerup', endDrag);
  stage.addEventListener('pointercancel', endDrag);
  stage.addEventListener('click', (e) => {
    if (moved > 6) { e.preventDefault(); e.stopPropagation(); }
  }, true);
  stage.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') hovering = true; });
  stage.addEventListener('pointerleave', () => (hovering = false));
  stage.addEventListener('focusin', () => (focused = true));
  stage.addEventListener('focusout', () => (focused = false));

  document.querySelector('[data-carousel="prev"]').addEventListener('click', () => nudge(-1));
  document.querySelector('[data-carousel="next"]').addEventListener('click', () => nudge(1));
  small.addEventListener('change', layout);

  layout();
  requestAnimationFrame(tick);
}

function setupArtistPage() {
  const root = document.querySelector('[data-artist-page]');
  if (!root) return;
  const key = new URLSearchParams(location.search).get('a');
  const artist = ARTISTS.find((a) => slug(a.name) === key) || ARTISTS.find((a) => a.name === 'Victor');
  if (artist.page) {
    location.replace(artist.page);
    return;
  }
  document.title = `${artist.name} — Street Art Tattoo`;
  root.querySelectorAll('[data-artist-name]').forEach((el) => (el.textContent = artist.name));
  root.querySelectorAll('[data-artist-role]').forEach((el) => (el.textContent = `/ ${artist.role}`));
  root.querySelectorAll('[data-whatsapp]').forEach((el) =>
    el.setAttribute('data-whatsapp', `Olá! Quero agendar com ${artist.name}.`)
  );
}

setupMenu();
setupArtistPage();
setupWhatsApp();
setupCarousel();
