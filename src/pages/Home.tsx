import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { categories, festivals, HERO_SLIDES, places, states, travelTips } from "@/data/travelData";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SearchPlanner } from "@/components/SearchPlanner";

interface Experience {
  id: string;
  userName: string;
  content: string;
  imageUrl?: string;
  createdAt: number;
}
const featured = ["taj-mahal", "kerala-backwaters", "varanasi-ghats", "jaisalmer-fort", "hampi-ruins"]
  .map((id) => places.find((p) => p.id === id)!)
  .filter(Boolean);

const Home = () => {
  const [slide, setSlide] = useState(0);
  const [activeState, setActiveState] = useState(states[0]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [form, setForm] = useState({ userName: "", content: "", imageUrl: "" });
  const [imgPreview, setImgPreview] = useState("");

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("tb_experiences");
    if (stored) setExperiences(JSON.parse(stored));
    else
      setExperiences([
        { id: "1", userName: "Priya Sharma", content: "Sunrise over the Taj is something everyone must see at least once. Tears of joy.", imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80", createdAt: Date.now() },
        { id: "2", userName: "Arjun Mehta", content: "Spent 3 nights on a houseboat in Alleppey. Slowest, most peaceful days of my life.", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Kerala_backwaters.jpg/640px-Kerala_backwaters.jpg", createdAt: Date.now() },
      ]);
  }, []);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImgPreview(reader.result as string);
      setForm((p) => ({ ...p, imageUrl: reader.result as string }));
    };
    reader.readAsDataURL(f);
  };

  const submitExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.userName.trim() || !form.content.trim()) return;
    const next: Experience[] = [
      { id: Date.now().toString(), userName: form.userName, content: form.content, imageUrl: form.imageUrl || undefined, createdAt: Date.now() },
      ...experiences,
    ];
    setExperiences(next);
    localStorage.setItem("tb_experiences", JSON.stringify(next));
    setForm({ userName: "", content: "", imageUrl: "" });
    setImgPreview("");
  };

  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-ink py-2 text-center text-[11px] font-medium uppercase tracking-[1.5px] text-gold">
        ✦ Discover the Soul of India · Free Travel Guides ✦
      </div>
      <Navbar />

      {/* HERO */}
      <header className="relative flex min-h-[78vh] items-end overflow-hidden">
        {HERO_SLIDES.map((s, i) => (
          <img key={i} src={s.img} alt="" loading={i === 0 ? "eager" : "lazy"}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1500ms] ${i === slide ? "opacity-100 z-0" : "opacity-0 z-0"}`} />
        ))}
        <div className="absolute inset-0" style={{ background: "var(--gradient-overlay)" }} />
        <div className="relative z-10 w-full px-[8%] pb-20">
          <div className="mb-4 inline-block rounded-full bg-saffron/90 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white">
            {HERO_SLIDES[slide].tag}
          </div>
          <h1 className="font-display text-5xl font-bold leading-[1.05] text-white md:text-7xl lg:text-[88px]">
            {HERO_SLIDES[slide].title}<br />
            <em className="not-italic text-gold">{HERO_SLIDES[slide].title2}</em>
          </h1>
          <p className="mt-5 max-w-2xl text-base text-white/80 md:text-lg">
            From the snow-veiled peaks of Himachal to Kerala's emerald backwaters — explore India state by state.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#states" className="rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-warm transition hover:opacity-95" style={{ background: "var(--gradient-saffron)" }}>
              Explore States 🗺️
            </a>
            <a href="#categories" className="rounded-full border border-white/40 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white hover:text-ink">
              Browse by Category
            </a>
          </div>
          <div className="mt-8 flex gap-2">
            {HERO_SLIDES.map((_, i) => (
              <button key={i} onClick={() => setSlide(i)} aria-label={`Slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === slide ? "w-10 bg-saffron" : "w-5 bg-white/40"}`} />
            ))}
          </div>
        </div>
      </header>

      {/* SEARCH + ROUTE PLANNER */}
      <SearchPlanner />

      {/* CATEGORIES */}
      <section id="categories" className="mx-auto max-w-7xl px-[5%] py-20">
        <SectionHeader tag="Browse by Experience" title={<>Choose Your <em className="not-italic text-saffron">Adventure</em></>}
          desc="From ancient temples to pristine beaches — find exactly what calls to your heart." />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((c) => (
            <Link key={c.slug} to={`/category?type=${encodeURIComponent(c.slug)}`}
              className="group relative aspect-square overflow-hidden rounded-2xl shadow-card transition hover:-translate-y-1 hover:shadow-warm">
              <img src={c.image} alt={c.name} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                <div className="font-display text-lg font-bold leading-tight">{c.name}</div>
                <div className="text-[10px] text-white/70">{c.count}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-7xl px-[5%] pb-20">
        <SectionHeader tag="Editor's Pick" title={<>Must-Visit <em className="not-italic text-saffron">Wonders</em></>}
          desc="Handpicked destinations that define the magic of India." />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <Link key={p.id} to={`/place/${p.id}`} className="group relative block h-72 overflow-hidden rounded-2xl shadow-card">
              <img src={p.image} alt={p.name} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <div className="mb-1 inline-block rounded-full bg-saffron px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">{p.category}</div>
                <div className="font-display text-2xl font-bold">{p.name}</div>
                <div className="text-xs text-white/75">📍 {p.city}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* STATES SPLIT VIEW */}
      <section id="states" className="mx-auto max-w-7xl px-[5%] py-16">
        <SectionHeader tag="28 States · 8 Union Territories" title={<>Explore <em className="not-italic text-saffron">Every Corner</em> of India</>}
          desc="Each state is a universe — a unique tapestry of culture, food, and landscapes." />

        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          {/* Active state preview */}
          <Link to={`/state/${activeState.slug}`} className="group block overflow-hidden rounded-2xl bg-white shadow-card transition hover:shadow-warm">
            <div className="relative h-72 overflow-hidden">
              <img key={activeState.slug} src={activeState.image} alt={activeState.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute right-3 top-3 rounded-full bg-saffron/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                {activeState.region}
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-display text-3xl font-bold text-ink">{activeState.name}</h3>
              <div className="mt-1 flex gap-4 text-xs text-muted-ink">
                <span>🏛️ {activeState.capital}</span>
                <span>📍 {activeState.region}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-ink">{activeState.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {activeState.tags.map((t) => (
                  <span key={t} className="rounded-full border border-saffron/30 bg-saffron/5 px-2.5 py-0.5 text-[11px] font-semibold text-saffron">{t}</span>
                ))}
              </div>
              <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-saffron transition group-hover:gap-3">
                Explore {activeState.name} <span>→</span>
              </div>
            </div>
          </Link>

          {/* State list */}
          <div className="max-h-[520px] overflow-y-auto rounded-2xl border border-saffron/20 bg-white p-3">
            {states.map((s) => (
              <button key={s.slug} onClick={() => setActiveState(s)}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition ${activeState.slug === s.slug ? "bg-saffron text-white shadow-warm" : "hover:bg-saffron/10 text-ink"
                  }`}>
                <span className="font-semibold">{s.name}</span>
                <span className={`text-xs ${activeState.slug === s.slug ? "text-white/80" : "text-muted-ink"}`}>
                  {s.region}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITY EXPERIENCES */}
      <section className="bg-ink px-[5%] py-20 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <div className="mb-2 text-xs font-semibold uppercase tracking-[3px] text-gold">Community</div>
            <h2 className="font-display text-4xl font-bold md:text-5xl">
              Community <em className="not-italic text-gold">Experiences</em>
            </h2>
            <p className="mt-2 max-w-xl text-white/60">Share your personal travel stories and photos with the world.</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">
            <form onSubmit={submitExperience} className="h-fit rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h3 className="font-display text-2xl font-bold">Share Your Story</h3>
              <input type="text" required value={form.userName} onChange={(e) => setForm({ ...form, userName: e.target.value })}
                placeholder="Your Name (e.g. Rahul Sharma)"
                className="mt-4 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm placeholder:text-white/40 outline-none focus:border-saffron" />
              <textarea required rows={4} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="Describe your magical experience in India..."
                className="mt-3 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm placeholder:text-white/40 outline-none focus:border-saffron" />
              <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-saffron/50 bg-saffron/10 px-4 py-3 text-sm font-medium text-saffron transition hover:bg-saffron/20">
                {imgPreview ? "✅ Image attached" : "📷 Upload an Image"}
                <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
              </label>
              {imgPreview && <img src={imgPreview} alt="" className="mt-3 h-32 w-full rounded-lg object-cover" />}
              <button type="submit" className="mt-4 w-full rounded-lg px-5 py-3 font-semibold text-white shadow-warm transition hover:opacity-95"
                style={{ background: "var(--gradient-saffron)" }}>
                Post Experience ✈️
              </button>
            </form>

            <div className="space-y-4">
              {experiences.length === 0 ? (
                <div className="rounded-xl border border-white/10 p-6 text-white/50">No experiences yet — be the first!</div>
              ) : (
                experiences.map((exp) => (
                  <div key={exp.id} className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
                    {exp.imageUrl && <img src={exp.imageUrl} alt="" className="h-48 w-full object-cover" loading="lazy" />}
                    <div className="p-5">
                      <p className="text-sm italic leading-relaxed text-white/85">"{exp.content}"</p>
                      <div className="mt-2 text-xs font-semibold text-gold">— {exp.userName}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* HERITAGE */}
      <section id="heritage" className="mx-auto max-w-7xl px-[5%] py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative h-[480px]">
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c8/Complex_of_Virupaksha_Temple%2C_Hampi_%2803%29.jpg" alt="Hampi"
              className="absolute left-0 top-0 h-[360px] w-3/4 rounded-2xl object-cover shadow-card" loading="lazy" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/8/8f/Qutub_Minar_932.jpg" alt="Qutub Minar"
              className="absolute bottom-0 right-0 h-[260px] w-1/2 rounded-2xl border-4 border-cream object-cover shadow-warm" loading="lazy" />
            <div className="absolute right-4 top-4 rounded-2xl px-5 py-3 text-center text-white shadow-warm" style={{ background: "var(--gradient-saffron)" }}>
              <div className="font-display text-3xl font-bold leading-none">40</div>
              <div className="text-[10px] uppercase tracking-widest">UNESCO Sites</div>
            </div>
          </div>

          <div>
            <div className="mb-2 text-xs font-semibold uppercase tracking-[3px] text-saffron">A Civilisation of Millennia</div>
            <h2 className="font-display text-4xl font-bold text-ink md:text-5xl">
              India's <em className="not-italic text-saffron">Living Heritage</em>
            </h2>
            <p className="mt-4 text-muted-ink">
              India is home to 40 UNESCO World Heritage Sites — more than any other nation in Asia. From the temples of Khajuraho to the Sundarbans, every stone tells a story of an extraordinary civilisation.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {[
                ["5000+", "Years of History"],
                ["22", "Official Languages"],
                ["1600+", "Dialects Spoken"],
                ["29", "Classical Dance Forms"],
              ].map(([n, l]) => (
                <div key={l} className="rounded-xl bg-white p-4 shadow-card">
                  <div className="font-display text-3xl font-bold text-saffron">{n}</div>
                  <div className="text-xs text-muted-ink">{l}</div>
                </div>
              ))}
            </div>
            <a href="#heritage" className="mt-7 inline-block rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-warm transition hover:opacity-95" style={{ background: "var(--gradient-saffron)" }}>
              Explore Heritage Sites 🏛️
            </a>
          </div>
        </div>
      </section>

      {/* FESTIVALS */}
      <section id="festivals" className="mx-auto max-w-7xl px-[5%] py-16">
        <SectionHeader tag="Colours of India" title={<>Festivals That <em className="not-italic text-saffron">Move the Soul</em></>}
          desc="India celebrates life with an unmatched exuberance. Every month brings a new reason to rejoice." />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {festivals.map((f) => (
            <div key={f.name} className="overflow-hidden rounded-2xl bg-white shadow-card transition hover:-translate-y-1 hover:shadow-warm">
              <div className="relative h-44 overflow-hidden">
                <img src={f.image} alt={f.name} className="h-full w-full object-cover" loading="lazy" />
                <div className="absolute right-3 top-3 rounded-full bg-ink px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold">
                  {f.month}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl font-bold text-ink">{f.name}</h3>
                <div className="mt-0.5 text-xs text-muted-ink">📍 {f.location}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted-ink">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TIPS */}
      <section className="mx-auto max-w-7xl px-[5%] py-20">
        <SectionHeader tag="Travel Smart" title={<>Essential Travel <em className="not-italic text-saffron">Tips</em></>}
          desc="Make the most of your Indian adventure with these insider insights." />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {travelTips.map((t) => (
            <div key={t.title} className="rounded-2xl bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-warm">
              <div className="text-3xl">{t.icon}</div>
              <div className="mt-3 font-display text-lg font-bold text-ink">{t.title}</div>
              <div className="mt-1 text-sm leading-relaxed text-muted-ink">{t.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

const SectionHeader = ({ tag, title, desc }: { tag: string; title: React.ReactNode; desc: string }) => (
  <div className="mb-10 text-center">
    <div className="mb-2 text-xs font-semibold uppercase tracking-[3px] text-saffron">{tag}</div>
    <h2 className="font-display text-4xl font-bold text-ink md:text-5xl">{title}</h2>
    <p className="mx-auto mt-3 max-w-xl text-muted-ink">{desc}</p>
  </div>
);

export default Home;
