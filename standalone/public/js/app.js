// Shared utilities, API client, navbar/footer renderers
const API = ''; // same origin

async function api(path, opts = {}) {
  const headers = { 'Content-Type': 'application/json', ...(opts.headers || {}) };
  const token = localStorage.getItem('tb_token');
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(API + path, { ...opts, headers });
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || `HTTP ${res.status}`);
  return res.json();
}

function el(tag, attrs = {}, ...children) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') e.className = v;
    else if (k === 'html') e.innerHTML = v;
    else if (k.startsWith('on') && typeof v === 'function') e.addEventListener(k.slice(2), v);
    else if (v !== undefined && v !== null) e.setAttribute(k, v);
  }
  for (const c of children) {
    if (c == null) continue;
    e.append(c.nodeType ? c : document.createTextNode(String(c)));
  }
  return e;
}

function toast(msg, type = '') {
  const t = el('div', { class: `toast ${type}` }, msg);
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 2600);
}

function qs(name) { return new URLSearchParams(location.search).get(name); }

function renderNavbar(target = 'header') {
  const html = `
    <nav class="nav">
      <div class="nav-inner">
        <a href="/" class="logo">Travel<span>Bharat</span></a>
        <ul class="nav-links" id="navLinks">
          <li><a href="/#search">Search</a></li>
          <li><a href="/#states">States</a></li>
          <li><a href="/#categories">Categories</a></li>
          <li><a href="/#festivals">Festivals</a></li>
          <li><a href="/#community">Community</a></li>
        </ul>
        <a href="/admin-login.html" class="nav-cta">Admin</a>
        <button class="menu-btn" onclick="document.getElementById('navLinks').classList.toggle('open')">☰</button>
      </div>
    </nav>`;
  document.querySelector(target)?.insertAdjacentHTML('afterbegin', html);
}

function renderFooter(target = 'body') {
  const html = `
    <footer>
      <div class="container">
        <div class="cols">
          <div>
            <div class="logo" style="color:#fff">Travel<span>Bharat</span></div>
            <p style="margin-top:10px;font-size:.88rem;color:#94a3b8">Discover the soul of India — 28 states, infinite stories.</p>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><a href="/#states">All States</a></li>
              <li><a href="/#categories">Categories</a></li>
              <li><a href="/#festivals">Festivals</a></li>
            </ul>
          </div>
          <div>
            <h4>Plan</h4>
            <ul>
              <li><a href="/#search">Search Places</a></li>
              <li><a href="/#search">Route Planner</a></li>
              <li><a href="/#community">Community</a></li>
            </ul>
          </div>
          <div>
            <h4>Connect</h4>
            <ul>
              <li>hello@travelbharat.in</li>
              <li>+91 98765 43210</li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">© ${new Date().getFullYear()} TravelBharat · Built with ❤️ for Incredible India</div>
      </div>
    </footer>`;
  document.querySelector(target)?.insertAdjacentHTML('beforeend', html);
}

window.tb = { api, el, toast, qs, renderNavbar, renderFooter };
