import { Link, useNavigate, useParams } from "react-router-dom";
import { getPlaceById, getStateBySlug } from "@/data/travelData";
import { Navbar } from "@/components/Navbar";
import { useEffect, useState } from "react";

const PlacePage = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const place = getPlaceById(id);
  const state = place ? getStateBySlug(place.stateSlug) : undefined;
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    if (place) document.title = `${place.name} – TravelBharat`;
  }, [place]);

  if (!place) {
    return (
      <div className="min-h-screen bg-cream">
        <Navbar />
        <div className="mx-auto max-w-2xl py-32 text-center">
          <h1 className="font-display text-4xl font-bold text-ink">Place Not Found</h1>
          <Link to="/" className="mt-6 inline-block font-semibold text-saffron">← Return Home</Link>
        </div>
      </div>
    );
  }

  const mapsEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(place.destination)}&output=embed`;

  const openDirections = () => {
    const params = new URLSearchParams({
      api: "1",
      destination: place.destination,
    });
    if (origin.trim()) params.set("origin", origin.trim());
    params.set("travelmode", "driving");
    window.open(`https://www.google.com/maps/dir/?${params.toString()}`, "_blank", "noopener");
  };

  const useMyLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => setOrigin(`${pos.coords.latitude},${pos.coords.longitude}`),
      () => alert("Could not get your location. Please type your starting point."),
    );
  };

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* Hero */}
      <header className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <img src={place.image} alt={place.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-overlay)" }} />
        <div className="relative z-10 flex h-full flex-col justify-end px-[8%] pb-12">
          <button
            onClick={() => (state ? navigate(`/state/${state.slug}`) : navigate("/"))}
            className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/40 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white hover:text-ink"
          >
            ← Back {state ? `to ${state.name}` : "to Home"}
          </button>
          <div className="mb-2 inline-block w-fit rounded-full bg-saffron/90 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white">
            {place.category}
          </div>
          <h1 className="font-display text-5xl font-bold text-white md:text-7xl">{place.name}</h1>
          <div className="mt-2 text-sm text-white/80">📍 {place.city}{state ? `, ${state.name}` : ""}</div>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-10 px-[5%] py-14 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="font-display text-3xl font-bold text-ink">About {place.name}</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-ink">{place.description}</p>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Meta icon="🌤️" label="Best Time" value={place.bestTime} />
            <Meta icon="🕐" label="Timing" value={place.timing} />
            <Meta icon="🎫" label="Entry" value={place.entry} />
          </div>

          <div className="mt-6 rounded-2xl bg-white p-5 shadow-card">
            <div className="text-[11px] font-bold uppercase tracking-widest text-muted-ink">Nearby Attractions</div>
            <div className="mt-2 text-ink">{place.nearby}</div>
          </div>
        </div>

        {/* Directions card */}
        <aside className="h-fit rounded-2xl border border-saffron/20 bg-white p-6 shadow-card">
          <h3 className="font-display text-2xl font-bold text-ink">Plan Your Route</h3>
          <p className="mt-1 text-sm text-muted-ink">
            Get directions from your city to <strong>{place.name}</strong> on Google Maps.
          </p>

          <label className="mt-5 block text-xs font-semibold uppercase tracking-widest text-muted-ink">
            From (your city or location)
          </label>
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder="e.g. Mumbai, Maharashtra"
            className="mt-2 w-full rounded-lg border border-saffron/30 bg-cream px-4 py-3 text-sm outline-none focus:border-saffron"
          />
          <button
            onClick={useMyLocation}
            className="mt-2 text-xs font-semibold text-saffron hover:underline"
          >
            📍 Use my current location
          </button>

          <div className="mt-4 rounded-xl bg-cream px-4 py-3 text-sm">
            <div className="text-[11px] font-bold uppercase tracking-widest text-muted-ink">Destination</div>
            <div className="mt-0.5 text-ink">{place.destination}</div>
          </div>

          <button
            onClick={openDirections}
            className="mt-5 w-full rounded-xl px-5 py-3.5 font-semibold text-white shadow-warm transition hover:opacity-95"
            style={{ background: "var(--gradient-saffron)" }}
          >
            🗺️ Show Route on Google Maps
          </button>

          <div className="mt-6 overflow-hidden rounded-xl border border-saffron/20">
            <iframe
              title={`Map of ${place.name}`}
              src={mapsEmbedSrc}
              className="h-64 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </aside>
      </section>
    </div>
  );
};

const Meta = ({ icon, label, value }: { icon: string; label: string; value: string }) => (
  <div className="rounded-xl bg-white p-4 shadow-card">
    <div className="text-xl">{icon}</div>
    <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-muted-ink">{label}</div>
    <div className="mt-0.5 text-sm font-semibold text-ink">{value}</div>
  </div>
);

export default PlacePage;
