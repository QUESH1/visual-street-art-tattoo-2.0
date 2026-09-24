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

function setupCarousel() {
  const track = document.querySelector('.carousel-track');
  if (!track) return;
  const counters = document.querySelectorAll('.carousel-counter');
  const visible = 4;
  let index = 0;

  const render = () => {
    track.replaceChildren();
    for (let i = 0; i < visible; i++) {
      const a = ARTISTS[(index + i) % ARTISTS.length];
      const card = document.createElement('a');
      card.className = 'carousel-card ph';
      card.href = artistHref(a);

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
      track.append(card);
    }
    counters.forEach((c) => (c.textContent = `${pad(index + 1)} / ${pad(ARTISTS.length)}`));
  };

  const go = (d) => {
    index = (index + d + ARTISTS.length) % ARTISTS.length;
    render();
  };

  document.querySelectorAll('[data-carousel="prev"]').forEach((b) => b.addEventListener('click', () => go(-1)));
  document.querySelectorAll('[data-carousel="next"]').forEach((b) => b.addEventListener('click', () => go(1)));

  render();

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let paused = false;
  const section = track.closest('section');
  section.addEventListener('mouseenter', () => (paused = true));
  section.addEventListener('mouseleave', () => (paused = false));
  section.addEventListener('focusin', () => (paused = true));
  section.addEventListener('focusout', () => (paused = false));
  setInterval(() => { if (!paused && !document.hidden) go(1); }, 3500);
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
