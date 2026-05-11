export const Footer = () => (
  <footer className="bg-ink px-[5%] pb-8 pt-16 text-white/70">
    <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-4">
      <div className="md:col-span-1">
        <div className="mb-3 flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full text-lg" style={{ background: "var(--gradient-saffron)" }}>🕌</div>
          <div className="font-display text-xl font-bold text-white">
            Travel<span className="text-saffron">Bharat</span>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-white/50">
          India's most comprehensive digital travel encyclopedia — your trusted guide to every corner of incredible Bharat.
        </p>
        <div className="mt-4 flex gap-2">
          {["📘", "🐦", "📸", "▶️"].map((s) => (
            <span key={s} className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/5 text-base transition hover:bg-saffron">
              {s}
            </span>
          ))}
        </div>
      </div>

      {[
        { h: "Destinations", items: ["North India", "South India", "East India", "West India", "North East"] },
        { h: "Experiences", items: ["Heritage Tours", "Wildlife Safaris", "Beach Escapes", "Spiritual Journeys", "Festivals & Events"] },
        { h: "Information", items: ["About TravelBharat", "Travel Guidelines", "Visa Information", "FAQs", "Contact Us"] },
      ].map((col) => (
        <div key={col.h}>
          <h5 className="mb-4 text-xs font-bold uppercase tracking-widest text-white">{col.h}</h5>
          <ul className="space-y-2 text-sm">
            {col.items.map((i) => (
              <li key={i}><a href="#" className="hover:text-saffron transition">{i}</a></li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/30 md:flex-row">
      <div>© 2025 TravelBharat. A digital initiative to promote Indian tourism.</div>
      <div className="flex gap-5">
        <a href="#" className="hover:text-saffron">Terms</a>
        <a href="#" className="hover:text-saffron">Privacy</a>
        <a href="#" className="hover:text-saffron">Sitemap</a>
      </div>
    </div>
  </footer>
);
