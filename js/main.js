// Número no formato internacional, só dígitos (ex.: '5531999999999'). Vazio = botões levam ao rodapé.
const WHATSAPP_NUMBER = '';

// bio: textos oficiais da pasta manifesto (um item por parágrafo). styles: só o que a biografia cita.
const ARTISTS = [
  {
    name: 'Ana Alves',
    role: 'Artista',
    styles: ['Tattoo', 'Pintura'],
    bio: [
      'Aninha encontrou na arte uma forma de conquistar liberdade e expressar quem é. Seu trabalho nasce tanto das coisas bonitas da vida quanto das experiências difíceis que atravessam sua história, transformando sentimentos em imagem.',
      'Respeito, liberdade e autenticidade são a base da artista que busca construir. Entre tattoo e pintura, Aninha quer ampliar sua linguagem, ganhar cada vez mais autonomia e criar trabalhos que carreguem verdade, força e identidade.'
    ]
  },
  { name: 'Lari', role: 'Artista' },
  {
    name: 'Savoi',
    role: 'Artista',
    bio: [
      'Savoi encontrou na tattoo uma forma de transformar a relação que sempre teve com a arte em caminho de vida. É através dela que explora novas formas de expressão, cria conexões e encontra pessoas que se identificam com o que ele faz.',
      'Seu trabalho nasce da curiosidade e da vontade constante de aprender. Savoi busca ampliar suas referências, viver novas experiências e construir uma arte cada vez mais conectada com quem ele é e com a forma como enxerga o mundo.'
    ]
  },
  { name: 'Thales', role: 'Body Piercer', page: 'thales.html' },
  {
    name: 'Victor',
    role: 'Artista',
    bio: [
      'Victor é um artista movido pelo inconformismo e pela vontade de construir algo maior do que aquilo que esperavam dele. Essa inquietação também aparece na forma como enxerga a tatuagem: como expressão, identidade e escolha.',
      'Respeito, honestidade e confiança são a base do seu trabalho. Mais do que entregar uma imagem na pele, Victor busca criar algo verdadeiro, que carregue intenção e uma parte de quem ele é como artista.'
    ]
  },
  {
    name: 'Fune',
    role: 'Artista',
    bio: [
      'Fune é um artista que encontrou na arte uma forma de existir com mais liberdade. Influenciado pelo desenho, pela música e pela cultura hip hop, constrói um trabalho que nasce da necessidade de se expressar sem seguir caminhos prontos.',
      'Sua busca é por uma linguagem cada vez mais autoral, capaz de provocar sensação, estranhamento ou identificação. Para ele, cada trabalho também carrega um pouco de quem ele é e da escolha de viver fora da curva.'
    ]
  },
  {
    name: 'Neville',
    role: 'Artista',
    bio: [
      'Neville encontrou na tattoo uma continuação de uma paixão que começou cedo, desenhando Dragon Ball e se conectando tanto com a estética quanto com as histórias e valores presentes nesse universo.',
      'Honestidade, sinceridade e respeito guiam sua forma de trabalhar. Como artista, busca construir uma identidade própria e criar tattoos que reforcem uma ideia importante para ele: cada pessoa é única e capaz de transformar a própria realidade.'
    ]
  },
  { name: 'Yoki', role: 'Artista' },
  {
    name: 'Lincoln',
    role: 'Artista',
    bio: [
      'Lincoln é um artista que encontrou na tattoo um caminho para transformar experiência, responsabilidade e vivência em expressão. Depois de passar por diferentes fases e tentativas profissionais, foi na arte que ele encontrou algo que realmente fazia sentido continuar construindo.',
      'Seu trabalho parte muito da confiança. Para Lincoln, tatuar também é assumir a responsabilidade de marcar momentos e histórias que pertencem a outras pessoas, transformando ideias em algo que passa a fazer parte delas.'
    ]
  },
  {
    name: 'Pedro Jr',
    role: 'Artista',
    styles: ['Geek', 'Mangá & Anime'],
    bio: [
      'Pedro é um artista que encontrou na tattoo uma continuação natural de algo que sempre fez parte da sua vida: desenhar, criar e viver o universo geek.',
      'Mangás, animes e outras referências dessa cultura aparecem no seu trabalho como formas de unir identidade, sentimento e narrativa. Mais do que tatuar, Pedro busca crescer dentro da arte e construir um trabalho que também possa inspirar outros artistas no caminho.'
    ]
  },
  { name: 'Bevilaqua', role: 'Artista' },
  {
    name: 'Franckenstein',
    role: 'Artista',
    styles: ['Dark Ornamental', 'Free Hand'],
    bio: [
      'Franck é um artista movido pela curiosidade, pela experimentação e pela busca de uma linguagem própria. Seu trabalho vem se construindo principalmente dentro do dark ornamental, explorando formas orgânicas, free hand e desenhos pensados diretamente para o corpo.',
      'Mais do que seguir padrões ou tendências, ele busca desenvolver uma identidade cada vez mais autoral - criando tattoos que carreguem sua forma de pensar, construir e enxergar a arte.'
    ]
  },
  { name: 'Arthur', role: 'Artista' },
  { name: 'Thaylane', role: 'Artista' }
];

const slug = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-');
const artistHref = (a) => a.page || `artista.html?a=${slug(a.name)}`;

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
  const n = ARTISTS.length;
  const step = 360 / n;
  const AUTO_SPEED = 0.006; // graus por ms (~1 volta por minuto)
  const DRAG = 0.2; // graus por px arrastado
  const small = window.matchMedia('(max-width: 640px)');

  let rotation = 0;
  let velocity = 0;
  let pending = 0; // giro extra das setas/foco, aplicado aos poucos por cima do giro automático
  let dragging = false;
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

  function goTo(i) {
    const d = -i * step - (rotation + pending);
    pending += d - Math.round(d / 360) * 360;
  }

  const nudge = (dir) => {
    pending -= dir * step;
  };

  const render = () => {
    ring.style.transform = `rotateY(${rotation}deg)`;
    faces.forEach((f, i) => {
      const facing = Math.cos(((i * step + rotation) * Math.PI) / 180);
      f.style.opacity = (0.25 + 0.75 * Math.max(0, facing)).toFixed(3);
    });
  };

  const tick = (now) => {
    const dt = Math.min(now - last, 64);
    last = now;
    rotation -= AUTO_SPEED * dt;
    if (!dragging) {
      if (pending !== 0) {
        const d = Math.abs(pending) < 0.05 ? pending : pending * Math.min(1, dt / 110);
        rotation += d;
        pending -= d;
      }
      if (Math.abs(velocity) > 0.002) {
        rotation += velocity * dt;
        velocity *= Math.pow(0.94, dt / 16);
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
    pending = 0;
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

  const bio = root.querySelector('[data-artist-bio]');
  if (artist.bio) {
    bio.replaceChildren(...artist.bio.map((text) => {
      const p = document.createElement('p');
      p.className = 'lead';
      p.textContent = text;
      return p;
    }));
    document.querySelector('meta[name="description"]').content = artist.bio[0];
  }

  const chips = root.querySelector('[data-artist-styles]');
  if (artist.styles) {
    chips.replaceChildren(...artist.styles.map((s) => {
      const chip = document.createElement('span');
      chip.className = 'chip';
      chip.textContent = s;
      return chip;
    }));
  } else {
    chips.remove();
  }
  root.querySelectorAll('[data-whatsapp]').forEach((el) =>
    el.setAttribute('data-whatsapp', `Olá! Quero agendar com ${artist.name}.`)
  );
}

setupMenu();
setupArtistPage();
setupWhatsApp();
setupCarousel();
