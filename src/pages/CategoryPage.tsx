import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { categories, places, states } from "@/data/travelData";

const CategoryPage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const cat = params.get("type") || "Heritage";
  const [activeCat, setActiveCat] = useState(cat);

  useEffect(() => {
    setActiveCat(cat);
    document.title = `${cat} Destinations – TravelBharat`;
  }, [cat]);

  const meta = categories.find((c) => c.slug.toLowerCase() === activeCat.toLowerCase()) ?? categories[0];
  const filteredPlaces = places.filter((p) => p.category.toLowerCase().includes(activeCat.toLowerCase()));
  const filteredStates = states.filter((s) => s.tags.some((t) => t.toLowerCase().includes(activeCat.toLowerCase())));

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* Hero */}
      <header className="relative flex min-h-[40vh] items-end overflow-hidden">
        <img src={meta.image} alt={meta.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-overlay)" }} />
        <div className="relative z-10 w-full px-[8%] pb-12">
          <button onClick={() => navigate("/")} className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white hover:text-ink">
            ← Back to Home
          </button>
          <div className="mb-3 inline-block rounded-full bg-saffron/90 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white">
            {meta.name}
          </div>
          <h1 className="font-display text-5xl font-bold text-white md:text-6xl">{meta.name} Destinations</h1>
          <p className="mt-2 max-w-2xl text-white/80">{meta.description}</p>
        </div>
      </header>

      {/* Filter chips */}
      <div className="mx-auto flex max-w-6xl flex-wrap gap-2 px-[5%] pt-8">
        {categories.map((c) => (
          <Link
            key={c.slug}
            to={`/category?type=${encodeURIComponent(c.slug)}`}
            className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
              c.slug.toLowerCase() === activeCat.toLowerCase()
                ? "border-saffron bg-saffron text-white"
                : "border-saffron/30 bg-white text-ink hover:border-saffron"
            }`}
          >
            {c.name}
          </Link>
        ))}
      </div>

      {/* Places grid */}
      <section className="mx-auto max-w-6xl px-[5%] py-10">
        <h2 className="mb-6 font-display text-3xl font-bold text-ink">Top Places</h2>
        {filteredPlaces.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-saffron/30 p-12 text-center text-muted-ink">
            No places listed yet for this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPlaces.map((p) => (
              <Link key={p.id} to={`/place/${p.id}`} className="group block overflow-hidden rounded-2xl bg-white shadow-card transition hover:-translate-y-1 hover:shadow-warm">
                <div className="relative h-52 overflow-hidden">
                  <img src={p.image} alt={p.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" loading="lazy" />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-2xl font-bold text-ink">{p.name}</h3>
                  <div className="text-xs text-muted-ink">📍 {p.city}</div>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-ink">{p.description}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Related states */}
      {filteredStates.length > 0 && (
        <section className="mx-auto max-w-6xl px-[5%] pb-16">
          <h2 className="mb-6 font-display text-3xl font-bold text-ink">Best States for {meta.name}</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredStates.map((s) => (
              <Link key={s.slug} to={`/state/${s.slug}`} className="group block overflow-hidden rounded-2xl bg-white shadow-card transition hover:-translate-y-1 hover:shadow-warm">
                <div className="relative h-44 overflow-hidden">
                  <img src={s.image} alt={s.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" loading="lazy" />
                </div>
                <div className="p-4">
                  <h3 className="font-display text-xl font-bold text-ink">{s.name}</h3>
                  <div className="text-xs text-muted-ink">🏛️ {s.capital}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default CategoryPage;
