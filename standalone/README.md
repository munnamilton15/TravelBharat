# TravelBharat — Standalone (HTML / CSS / JS + MongoDB Atlas)

Pure static frontend (no React, no build step) served by an Express backend
that connects to MongoDB Atlas.

## 1. Setup

```bash
cd standalone
npm install
cp .env.example .env
# edit .env and paste your MongoDB Atlas connection string
```

### Get a MongoDB Atlas URI
1. Go to https://cloud.mongodb.com → create a free **M0** cluster
2. Database Access → add a user with password
3. Network Access → add IP `0.0.0.0/0` (allow from anywhere) for testing
4. Click **Connect → Drivers → Node.js** and copy the URI
5. Paste it into `MONGODB_URI` in `.env` (replace `<password>` with your password)

## 2. Seed the database

Loads all 14 sample places from `seed.js` into MongoDB:

```bash
npm run seed
```

## 3. Run

```bash
npm start
# open http://localhost:5000
```

## Pages
- `/` — Home (hero, search, route planner, states, categories, festivals, community)
- `/state.html?slug=rajasthan` — State detail
- `/place.html?id=taj-mahal` — Place detail with Google Maps route
- `/category.html?slug=Heritage` — Filter by category
- `/admin-login.html` — Admin login (default: `admin` / `password123`)
- `/admin-dashboard.html` — Admin dashboard (CRUD places, moderate experiences)

## API
- `GET    /api/places` — all places
- `GET    /api/places/search?q=goa` — search by name/city/category/state
- `GET    /api/places/:id`
- `POST   /api/places` (admin)
- `PUT    /api/places/:id` (admin)
- `DELETE /api/places/:id` (admin)
- `GET    /api/states`
- `GET    /api/categories`
- `GET    /api/festivals`
- `GET    /api/experiences`
- `POST   /api/experiences` — `{ userName, content, imageUrl? }`
- `DELETE /api/experiences/:id` (admin)
- `POST   /api/auth/login` — `{ username, password }` → `{ token }`
