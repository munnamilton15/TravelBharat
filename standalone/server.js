const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
require('dotenv').config(); // Also load local .env if it exists
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { Place, Experience } = require('./models');
const { states, categories, festivals, HERO_SLIDES, travelTips, seedPlaces } = require('./data');

// ───── Auto-categorisation & auto-state helpers ─────
const CATEGORY_KEYWORDS = {
  Heritage:  ['fort','palace','heritage','monument','mahal','haveli','tomb','ruin','unesco','museum','historic'],
  Nature:    ['hill','valley','lake','garden','forest','tea','backwater','waterfall','park','meadow','river','nature'],
  Religious: ['temple','church','mosque','gurudwara','monastery','shrine','ghat','basilica','dargah','stupa','pilgr'],
  Adventure: ['trek','adventure','rafting','ski','paraglid','climb','expedition','camp','sport'],
  Beach:     ['beach','coast','shore','island','sea','bay'],
  Wildlife:  ['wildlife','sanctuary','reserve','national park','tiger','rhino','safari','bird'],
};
const KNOWN_CATEGORIES = categories.map((c) => c.slug);

function autoCategorise(input) {
  const incoming = (input.category || '').trim();
  // If admin already supplied a known category, normalise casing and keep it.
  const exact = KNOWN_CATEGORIES.find((c) => c.toLowerCase() === incoming.toLowerCase());
  if (exact) return exact;
  // Otherwise infer from name + description + supplied category text.
  const blob = `${input.name||''} ${input.description||''} ${incoming}`.toLowerCase();
  let best = 'Heritage', bestScore = 0;
  for (const [cat, words] of Object.entries(CATEGORY_KEYWORDS)) {
    const score = words.reduce((s, w) => s + (blob.includes(w) ? 1 : 0), 0);
    if (score > bestScore) { best = cat; bestScore = score; }
  }
  return best;
}

function autoStateSlug(input) {
  const incoming = (input.stateSlug || '').trim().toLowerCase();
  if (!incoming) return '';
  // Match by slug
  let s = states.find((x) => x.slug === incoming);
  if (s) return s.slug;
  // Match by display name (e.g. "Uttar Pradesh" → "uttar-pradesh")
  s = states.find((x) => x.name.toLowerCase() === incoming);
  if (s) return s.slug;
  // Loose match (admin typed "uttar pradesh" or "UttarPradesh")
  const norm = incoming.replace(/\s+/g, '-').replace(/[^a-z-]/g, '');
  s = states.find((x) => x.slug === norm);
  return s ? s.slug : incoming; // fallback to whatever they typed
}

function normalisePlace(body) {
  const out = { ...body };
  out.stateSlug = autoStateSlug(out);
  out.category = autoCategorise(out);
  return out;
}

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD_HASH = bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'password123', 10);

app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// ───── Mongo ─────
const MONGODB_URI = process.env.MONGODB_URI || process.env.VITE_MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MongoDB URI not found in environment variables (MONGODB_URI or VITE_MONGODB_URI)');
} else {
  mongoose
    .connect(MONGODB_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch((err) => console.error('❌ MongoDB error:', err.message));
}

// ───── Auth ─────
function authRequired(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body || {};
  if (username !== ADMIN_USERNAME || !bcrypt.compareSync(password || '', ADMIN_PASSWORD_HASH)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ username, role: 'admin' }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { username, role: 'admin' } });
});

// ───── Static data (states, categories, festivals) — served from JSON ─────
app.get('/api/hero', (req, res) => res.json(HERO_SLIDES || []));
app.get('/api/tips', (req, res) => res.json(travelTips || []));
app.get('/api/states', (req, res) => res.json(states));
app.get('/api/states/:slug', (req, res) => {
  const s = states.find((x) => x.slug === req.params.slug);
  if (!s) return res.status(404).json({ error: 'Not found' });
  res.json(s);
});
app.get('/api/categories', (req, res) => res.json(categories));
app.get('/api/festivals', (req, res) => res.json(festivals));

// ───── Places (Merging static code data with MongoDB) ─────
app.get('/api/places', async (req, res) => {
  const { state, category } = req.query;
  
  // 1. Get static places from data.js
  let allPlaces = [...(seedPlaces || [])];
  
  // 2. Get dynamic places from MongoDB
  const dbPlaces = await Place.find().lean();
  
  // 3. Merge: If a place exists in both, the code (seedPlaces) wins for "edit-in-code" support.
  // If it only exists in DB, keep it (newly added via admin).
  dbPlaces.forEach(dbP => {
    if (!allPlaces.find(p => p.id === dbP.id)) {
      allPlaces.push(dbP);
    }
  });

  // Apply filters
  let filtered = allPlaces;
  if (state) filtered = filtered.filter(p => p.stateSlug === state);
  if (category) {
    const rx = new RegExp(category, 'i');
    filtered = filtered.filter(p => rx.test(p.category));
  }
  
  res.json(filtered);
});

app.get('/api/places/search', async (req, res) => {
  const q = (req.query.q || '').trim();
  if (!q) return res.json([]);
  const rx = new RegExp(q, 'i');

  // Merge for search too
  let allPlaces = [...(seedPlaces || [])];
  const dbPlaces = await Place.find().lean();
  dbPlaces.forEach(dbP => {
    if (!allPlaces.find(p => p.id === dbP.id)) allPlaces.push(dbP);
  });

  const items = allPlaces.filter(p => 
    rx.test(p.name) || rx.test(p.city) || rx.test(p.category) || rx.test(p.stateSlug) || rx.test(p.description)
  ).slice(0, 20);
  
  res.json(items);
});

app.get('/api/places/:id', async (req, res) => {
  // Check static first
  let p = seedPlaces.find(x => x.id === req.params.id);
  if (!p) {
    p = await Place.findOne({ id: req.params.id }).lean();
  }
  if (!p) return res.status(404).json({ error: 'Not found' });
  res.json(p);
});

app.post('/api/places', authRequired, async (req, res) => {
  try {
    const created = await Place.create(normalisePlace(req.body));
    res.status(201).json(created);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.put('/api/places/:id', authRequired, async (req, res) => {
  const updated = await Place.findOneAndUpdate({ id: req.params.id }, normalisePlace(req.body), { new: true });
  if (!updated) return res.status(404).json({ error: 'Not found' });
  res.json(updated);
});

app.delete('/api/places/:id', authRequired, async (req, res) => {
  const r = await Place.findOneAndDelete({ id: req.params.id });
  if (!r) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
});

// ───── User experiences ─────
app.get('/api/experiences', async (req, res) => {
  const items = await Experience.find().sort({ createdAt: -1 }).lean();
  res.json(items);
});

app.post('/api/experiences', async (req, res) => {
  const { userName, content, imageUrl } = req.body || {};
  if (!userName || !content) return res.status(400).json({ error: 'userName and content required' });
  const e = await Experience.create({ userName, content, imageUrl: imageUrl || '' });
  res.status(201).json(e);
});

app.delete('/api/experiences/:id', authRequired, async (req, res) => {
  await Experience.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

// ───── Fallback to index.html for unknown GET ─────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`🚀 TravelBharat running at http://localhost:${PORT}`));
