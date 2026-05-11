import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { places } from "@/data/travelData";

export const SearchPlanner = () => {
  // ---- Search state ----
  const [query, setQuery] = useState("");

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return places
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.stateSlug.toLowerCase().includes(q),
      )
      .slice(0, 8);
  }, [query]);

  // ---- Route planner state ----
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [submitted, setSubmitted] = useState<{ origin: string; destination: string } | null>(null);

  const handlePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!origin.trim() || !destination.trim()) return;
    setSubmitted({ origin: origin.trim(), destination: destination.trim() });
  };

  // Suggested places near destination — keyword match on city/state/name (mock "20km radius")
  const suggested = useMemo(() => {
    if (!submitted) return [];
    const tokens = submitted.destination
      .toLowerCase()
      .split(/[\s,]+/)
      .filter((t) => t.length > 2);
    if (tokens.length === 0) return [];
    const scored = places
      .map((p) => {
        const hay = `${p.name} ${p.city} ${p.stateSlug} ${p.category}`.toLowerCase();
        const score = tokens.reduce((s, t) => s + (hay.includes(t) ? 1 : 0), 0);
        return { p, score };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map((x) => x.p);
    return scored;
  }, [submitted]);

  const mapsEmbedSrc = submitted
    ? `https://www.google.com/maps?output=embed&q=&saddr=${encodeURIComponent(
        submitted.origin,
      )}&daddr=${encodeURIComponent(submitted.destination)}`
    : "";

  const mapsOpenUrl = submitted
    ? `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
        submitted.origin,
      )}&destination=${encodeURIComponent(submitted.destination)}&travelmode=driving`
    : "";

  return (
    <section id="search" className="mx-auto max-w-7xl px-[5%] py-20">
      <div className="mb-10 text-center">
        <div className="mb-2 text-xs font-semibold uppercase tracking-[3px] text-saffron">
          Find & Plan
        </div>
        <h2 className="font-display text-4xl font-bold text-ink md:text-5xl">
          Search Places & <em className="not-italic text-saffron">Plan Your Route</em>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-ink">
          Find any destination in India or chart a journey from source to destination with nearby gems along the way.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* SEARCH BAR */}
        <div className="rounded-2xl border border-saffron/20 bg-white p-6 shadow-card">
          <h3 className="font-display text-2xl font-bold text-ink">🔍 Search Places</h3>
          <p className="mt-1 text-sm text-muted-ink">Search by name, city, state, or category.</p>

          <div className="relative mt-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try 'Taj Mahal', 'Goa', 'beach'…"
              className="w-full rounded-full border border-saffron/30 bg-cream/50 px-5 py-3 pr-12 text-sm text-ink outline-none transition focus:border-saffron focus:bg-white"
            />
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-saffron">🔎</span>
          </div>

          <div className="mt-4 space-y-2">
            {query && searchResults.length === 0 && (
              <div className="rounded-lg border border-dashed border-saffron/30 p-4 text-center text-sm text-muted-ink">
                No places match "{query}". Try a different keyword.
              </div>
            )}
            {searchResults.map((p) => (
              <Link
                key={p.id}
                to={`/place/${p.id}`}
                className="flex items-center gap-3 rounded-xl border border-transparent p-2 transition hover:border-saffron/30 hover:bg-saffron/5"
              >
                <img src={p.image} alt={p.name} className="h-14 w-14 flex-shrink-0 rounded-lg object-cover" loading="lazy" />
                <div className="min-w-0 flex-1">
                  <div className="truncate font-display text-base font-bold text-ink">{p.name}</div>
                  <div className="truncate text-xs text-muted-ink">📍 {p.city} · {p.category}</div>
                </div>
                <span className="text-saffron">→</span>
              </Link>
            ))}
            {!query && (
              <div className="rounded-lg bg-cream/50 p-4 text-center text-xs text-muted-ink">
                Start typing to discover from {places.length}+ destinations across India.
              </div>
            )}
          </div>
        </div>

        {/* ROUTE PLANNER */}
        <div className="rounded-2xl border border-saffron/20 bg-white p-6 shadow-card">
          <h3 className="font-display text-2xl font-bold text-ink">🗺️ Plan Your Route</h3>
          <p className="mt-1 text-sm text-muted-ink">Source → Destination with map & nearby places.</p>

          <form onSubmit={handlePlan} className="mt-4 space-y-3">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-ink">From</label>
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="e.g. Delhi"
                className="w-full rounded-lg border border-saffron/30 bg-cream/50 px-4 py-2.5 text-sm outline-none focus:border-saffron focus:bg-white"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-ink">To</label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. Agra, Taj Mahal"
                className="w-full rounded-lg border border-saffron/30 bg-cream/50 px-4 py-2.5 text-sm outline-none focus:border-saffron focus:bg-white"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full px-6 py-3 text-sm font-semibold text-white shadow-warm transition hover:opacity-95"
              style={{ background: "var(--gradient-saffron)" }}
            >
              Show Route 🚗
            </button>
          </form>
        </div>
      </div>

      {/* RESULTS — map + suggestions */}
      {submitted && (
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="overflow-hidden rounded-2xl border border-saffron/20 bg-white shadow-card">
            <div className="flex items-center justify-between border-b border-saffron/15 p-4">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-widest text-saffron">Route</div>
                <div className="font-display text-lg font-bold text-ink">
                  {submitted.origin} → {submitted.destination}
                </div>
              </div>
              <a
                href={mapsOpenUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-saffron/40 px-4 py-1.5 text-xs font-semibold text-saffron transition hover:bg-saffron hover:text-white"
              >
                Open in Maps ↗
              </a>
            </div>
            <iframe
              key={mapsEmbedSrc}
              title="Route map"
              src={mapsEmbedSrc}
              className="h-[420px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div>
            <div className="mb-3">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-saffron">Within ~20 km</div>
              <h4 className="font-display text-2xl font-bold text-ink">Suggested Stops Nearby</h4>
              <p className="mt-1 text-sm text-muted-ink">Hand-picked places around your destination worth a detour.</p>
            </div>
            <div className="space-y-3">
              {suggested.length === 0 ? (
                <div className="rounded-xl border border-dashed border-saffron/30 bg-white p-5 text-center text-sm text-muted-ink">
                  No matching stops in our guide for "{submitted.destination}". Try a nearby major city.
                </div>
              ) : (
                suggested.map((p) => (
                  <Link
                    key={p.id}
                    to={`/place/${p.id}`}
                    className="flex gap-3 overflow-hidden rounded-xl border border-saffron/15 bg-white shadow-card transition hover:-translate-y-0.5 hover:shadow-warm"
                  >
                    <img src={p.image} alt={p.name} className="h-24 w-28 flex-shrink-0 object-cover" loading="lazy" />
                    <div className="min-w-0 flex-1 py-2 pr-3">
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-saffron/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-saffron">
                          {p.category}
                        </span>
                        <span className="text-[11px] text-muted-ink">📍 {p.city}</span>
                      </div>
                      <div className="mt-1 truncate font-display text-base font-bold text-ink">{p.name}</div>
                      <p className="line-clamp-2 text-xs leading-relaxed text-muted-ink">{p.description}</p>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
