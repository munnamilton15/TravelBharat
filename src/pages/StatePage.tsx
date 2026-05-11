import { Link, useNavigate, useParams } from "react-router-dom";
import { getPlacesByState, getStateBySlug } from "@/data/travelData";
import { Navbar } from "@/components/Navbar";
import { useEffect } from "react";

const StatePage = () => {
  const { slug = "" } = useParams();
  const navigate = useNavigate();
  const state = getStateBySlug(slug);
  const placesInState = getPlacesByState(slug);

  useEffect(() => {
    if (state) document.title = `${state.name} – TravelBharat`;
  }, [state]);

  if (!state) {
    return (
      <div className="min-h-screen bg-cream">
        <Navbar />
        <div className="mx-auto max-w-2xl py-32 text-center">
          <h1 className="font-display text-4xl font-bold text-ink">State Not Found</h1>
          <p className="mt-3 text-muted-ink">Sorry, we couldn't find that state.</p>
          <Link to="/" className="mt-6 inline-block font-semibold text-saffron">← Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* Hero */}
      <header className="relative flex min-h-[60vh] items-end overflow-hidden">
        <img src={state.image} alt={state.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-overlay)" }} />
        <div className="relative z-10 w-full px-[8%] pb-14">
          <button
            onClick={() => navigate("/")}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white hover:text-ink"
          >
            ← Back to Home
          </button>
          <div className="mb-3 inline-block rounded-full bg-saffron/90 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white">
            {state.region} India
          </div>
          <h1 className="font-display text-5xl font-bold leading-[1.05] text-white md:text-7xl">
            {state.name}
          </h1>
          <div className="mt-2 text-sm text-white/80">🏛️ Capital · {state.capital}</div>
        </div>
      </header>

      {/* Description */}
      <section className="mx-auto grid max-w-6xl gap-12 px-[5%] py-16 lg:grid-cols-[2fr_1fr]">
        <div>
          <p className="text-lg leading-relaxed text-muted-ink">{state.longDescription}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {state.tags.map((t) => (
              <span key={t} className="rounded-full border border-saffron bg-saffron/5 px-5 py-2 text-sm font-semibold text-saffron">
                {t}
              </span>
            ))}
          </div>
        </div>
        <aside className="h-fit rounded-2xl border border-saffron/20 bg-white p-7 shadow-card">
          <Info icon="🏛️" label="Capital" value={state.capital} />
          <Info icon="📍" label="Region" value={`${state.region}ern India`} />
          <Info icon="🗺️" label="Featured Places" value={`${placesInState.length} destinations`} last />
        </aside>
      </section>

      {/* Places */}
      <section className="mx-auto max-w-7xl px-[5%] pb-20">
        <h2 className="mb-2 font-display text-4xl font-bold text-ink">Top Tourist Places</h2>
        <p className="mb-10 text-muted-ink">Tap any place to see details and get directions on Google Maps.</p>

        {placesInState.length === 0 ? (
          <div className="rounded-2xl bg-gradient-to-br from-saffron to-deep-saffron p-12 text-center text-white">
            <h3 className="font-display text-3xl font-bold">More Destinations Coming Soon</h3>
            <p className="mt-2 opacity-90">We're curating the best places in {state.name}. Check back shortly!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {placesInState.map((p) => (
              <Link
                key={p.id}
                to={`/place/${p.id}`}
                className="group block overflow-hidden rounded-2xl bg-white shadow-card transition hover:-translate-y-1 hover:shadow-warm"
              >
                <div className="relative h-56 overflow-hidden">
                  <img src={p.image} alt={p.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-ink">
                    {p.category}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-2xl font-bold text-ink">{p.name}</h3>
                  <div className="mt-0.5 text-xs text-muted-ink">📍 {p.city}</div>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-ink">{p.description}</p>
                  <div className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-saffron transition group-hover:gap-3">
                    View Details <span>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

const Info = ({ icon, label, value, last }: { icon: string; label: string; value: string; last?: boolean }) => (
  <div className={`flex items-center gap-4 ${last ? "" : "mb-5 border-b border-ink/5 pb-5"}`}>
    <div className="text-2xl">{icon}</div>
    <div>
      <div className="text-[11px] font-medium uppercase tracking-widest text-muted-ink">{label}</div>
      <div className="text-lg font-semibold text-ink">{value}</div>
    </div>
  </div>
);

export default StatePage;
