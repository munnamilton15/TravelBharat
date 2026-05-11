// Home page logic
tb.renderNavbar('header');
tb.renderFooter('body');

// ───── Hero slider ─────
(async function () {
  try {
    const slidesData = await tb.api('/api/hero');
    const heroSection = document.getElementById('hero');
    const dotsBox = document.getElementById('heroDots');
    
    if (!slidesData || !slidesData.length) return;

    // Clear existing hardcoded slides
    const existingSlides = heroSection.querySelectorAll('.hero-slide');
    existingSlides.forEach(s => s.remove());
    
    // Render dynamic slides
    slidesData.forEach((s, idx) => {
      const slide = tb.el('div', { 
        class: `hero-slide ${idx === 0 ? 'active' : ''}`, 
        style: `background-image:url('${s.img}')` 
      });
      heroSection.prepend(slide);

      const d = tb.el('span', { onclick: () => go(idx) });
      if (idx === 0) d.classList.add('active');
      dotsBox.appendChild(d);
    });

    const slides = heroSection.querySelectorAll('.hero-slide');
    const dots = dotsBox.querySelectorAll('span');
    let i = 0;

    function go(n) {
      if (!slides[i]) return;
      slides[i].classList.remove('active'); 
      dots[i].classList.remove('active');
      i = n; 
      slides[i].classList.add('active'); 
      dots[i].classList.add('active');
    }
    
    setInterval(() => go((i + 1) % slides.length), 5000);

    // Update hero text if needed (optional, keeping current HTML structure)
    // But we can update the eyebrow or title if we want.
  } catch (e) {
    console.error('Failed to load hero slides:', e);
  }
})();

// ───── Search ─────
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
let searchTimer;
searchInput.addEventListener('input', () => {
  clearTimeout(searchTimer);
  const q = searchInput.value.trim();
  if (!q) {
    searchResults.innerHTML = '<div class="empty-hint">Start typing to discover destinations across India.</div>';
    return;
  }
  searchTimer = setTimeout(async () => {
    try {
      const items = await tb.api(`/api/places/search?q=${encodeURIComponent(q)}`);
      if (!items.length) {
        searchResults.innerHTML = `<div class="empty-hint">No places match "${q}".</div>`;
        return;
      }
      searchResults.innerHTML = '';
      items.forEach((p) => {
        searchResults.appendChild(
          tb.el('a', { class: 'search-result', href: `/place.html?id=${p.id}` },
            tb.el('img', { src: p.image, alt: p.name, loading: 'lazy' }),
            tb.el('div', { style: 'flex:1;min-width:0' },
              tb.el('div', { class: 'display', style: 'font-weight:700' }, p.name),
              tb.el('div', { class: 'meta' }, `📍 ${p.city} · ${p.category}`)
            ),
            tb.el('span', { style: 'color:var(--saffron)' }, '→')
          )
        );
      });
    } catch (e) { tb.toast(e.message, 'error'); }
  }, 220);
});

// ───── Route planner ─────
document.getElementById('routeForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const origin = document.getElementById('origin').value.trim();
  const destination = document.getElementById('destination').value.trim();
  if (!origin || !destination) return;

  const embed = `https://www.google.com/maps?output=embed&saddr=${encodeURIComponent(origin)}&daddr=${encodeURIComponent(destination)}`;
  const open = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&travelmode=driving`;

  // Nearby attractions pulled live from Google Maps around the destination
  const nearbyQuery = `tourist attractions near ${destination}`;
  const nearbyEmbed = `https://www.google.com/maps?output=embed&q=${encodeURIComponent(nearbyQuery)}&z=12`;
  const nearbyOpen = `https://www.google.com/maps/search/${encodeURIComponent(nearbyQuery)}`;

  const box = document.getElementById('routeResult');
  box.style.display = 'grid';
  box.innerHTML = '';
  const left = tb.el('div', { class: 'map-card' });
  left.innerHTML = `
    <div class="map-head">
      <div>
        <div class="eyebrow">Route</div>
        <div class="display" style="font-weight:700;font-size:1.05rem">${origin} → ${destination}</div>
      </div>
      <a href="${open}" target="_blank" class="btn btn-outline" style="padding:6px 16px;font-size:.78rem">Open in Maps ↗</a>
    </div>
    <iframe src="${embed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>`;
  box.appendChild(left);

  const right = tb.el('div');
  right.appendChild(tb.el('div', { class: 'eyebrow' }, 'Within ~20 km'));
  right.appendChild(tb.el('h3', { class: 'display', style: 'font-size:1.5rem;margin-bottom:14px' }, 'Suggested stops nearby'));
  right.insertAdjacentHTML('beforeend', `
    <div class="map-card" style="margin-bottom:12px">
      <iframe src="${nearbyEmbed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen style="height:280px"></iframe>
    </div>
    <a href="${nearbyOpen}" target="_blank" class="btn btn-outline" style="display:inline-block;margin-bottom:14px">See all nearby on Google Maps ↗</a>
  `);

  // Also surface any matching places from our own guide
  let suggested = [];
  try {
    const tokens = destination.toLowerCase().split(/[\s,]+/).filter((t) => t.length > 2);
    const sets = await Promise.all(tokens.map((t) => tb.api(`/api/places/search?q=${encodeURIComponent(t)}`)));
    const map = new Map();
    sets.flat().forEach((p) => { const cur = map.get(p.id); map.set(p.id, { p, score: (cur?.score || 0) + 1 }); });
    suggested = Array.from(map.values()).sort((a, b) => b.score - a.score).slice(0, 6).map((x) => x.p);
  } catch {}

  if (suggested.length) {
    right.appendChild(tb.el('div', { class: 'eyebrow', style: 'margin-top:6px' }, 'From our guide'));
    const list = tb.el('div', { class: 'suggested-list' });
    suggested.forEach((p) => {
      list.appendChild(tb.el('a', { class: 'suggested-item', href: `/place.html?id=${p.id}` },
        tb.el('img', { src: p.image, alt: p.name, loading: 'lazy' }),
        tb.el('div', { class: 'body' },
          tb.el('span', { class: 'tag' }, p.category),
          tb.el('div', { class: 'display', style: 'font-weight:700;margin-top:4px' }, p.name),
          tb.el('div', { style: 'font-size:.78rem;color:var(--muted-ink)' }, `📍 ${p.city}`)
        )
      ));
    });
    right.appendChild(list);
  }
  box.appendChild(right);
});

// ───── States ─────
(async () => {
  const states = await tb.api('/api/states');
  const grid = document.getElementById('statesGrid');
  states.forEach((s) => {
    grid.appendChild(tb.el('a', { class: 'card', href: `/state.html?slug=${s.slug}` },
      tb.el('div', { class: 'card-img' }, tb.el('img', { src: s.image, alt: s.name, loading: 'lazy' })),
      tb.el('div', { class: 'card-body' },
        tb.el('h3', {}, s.name),
        tb.el('div', { class: 'meta' }, `${s.region} · ${s.capital}`),
        tb.el('p', {}, s.description)
      )
    ));
  });
})();

// ───── Categories ─────
(async () => {
  const cats = await tb.api('/api/categories');
  const grid = document.getElementById('categoriesGrid');
  cats.forEach((c) => {
    grid.appendChild(tb.el('a', { class: 'card', href: `/category.html?slug=${encodeURIComponent(c.slug)}` },
      tb.el('div', { class: 'card-img' }, tb.el('img', { src: c.image, alt: c.name, loading: 'lazy' })),
      tb.el('div', { class: 'card-body' },
        tb.el('h3', {}, c.name),
        tb.el('div', { class: 'meta' }, c.count),
        tb.el('p', {}, c.description)
      )
    ));
  });
})();

// ───── Festivals ─────
(async () => {
  const fests = await tb.api('/api/festivals');
  const grid = document.getElementById('festivalsGrid');
  fests.forEach((f) => {
    const card = tb.el('div', { class: 'fest-card' });
    card.innerHTML = `
      <img src="${f.image}" alt="${f.name}" loading="lazy" />
      <div class="overlay">
        <div class="month">${f.month}</div>
        <h3>${f.name}</h3>
        <div class="loc">📍 ${f.location}</div>
        <p style="font-size:.85rem;opacity:.95">${f.description}</p>
      </div>`;
    grid.appendChild(card);
  });
})();

// ───── Experiences ─────
async function loadExperiences() {
  const list = document.getElementById('expList');
  list.innerHTML = '';
  try {
    const items = await tb.api('/api/experiences');
    if (!items.length) {
      list.appendChild(tb.el('div', { class: 'empty-hint' }, 'Be the first to share a story!'));
      return;
    }
    items.forEach((e) => {
      const item = tb.el('div', { class: 'exp-item' });
      if (e.imageUrl) item.appendChild(tb.el('img', { src: e.imageUrl, alt: '', loading: 'lazy' }));
      item.appendChild(tb.el('div', { class: 'author' }, e.userName));
      item.appendChild(tb.el('p', { style: 'font-size:.88rem;color:var(--muted-ink);margin-top:4px' }, `"${e.content}"`));
      list.appendChild(item);
    });
  } catch (err) { tb.toast(err.message, 'error'); }
}
loadExperiences();

document.getElementById('expForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    await tb.api('/api/experiences', {
      method: 'POST',
      body: JSON.stringify({
        userName: document.getElementById('expName').value,
        content: document.getElementById('expContent').value,
        imageUrl: document.getElementById('expImg').value,
      }),
    });
    tb.toast('✨ Posted! Thank you.');
    e.target.reset();
    loadExperiences();
  } catch (err) { tb.toast(err.message, 'error'); }
});
