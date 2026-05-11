import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const onHome = pathname === "/";

  const NavLinks = () => (
    <>
      {onHome ? (
        <>
          <a href="#categories" className="text-sm font-medium text-ink/80 hover:text-saffron transition">Categories</a>
          <a href="#states" className="text-sm font-medium text-ink/80 hover:text-saffron transition">States</a>
          <a href="#festivals" className="text-sm font-medium text-ink/80 hover:text-saffron transition">Festivals</a>
          <a href="#heritage" className="text-sm font-medium text-ink/80 hover:text-saffron transition">Heritage</a>
        </>
      ) : (
        <Link to="/" className="text-sm font-medium text-ink/80 hover:text-saffron">Home</Link>
      )}
      <Link to="/admin" className="text-sm font-medium text-ink/80 hover:text-saffron">Admin</Link>
    </>
  );

  return (
    <nav className="sticky top-0 z-50 flex h-[72px] items-center justify-between border-b border-saffron/20 bg-cream/85 px-[5%] backdrop-blur-xl">
      <Link to="/" className="flex items-center gap-2.5">
        <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full text-xl shadow-warm" style={{ background: "var(--gradient-saffron)" }}>
          🇮🇳
        </div>
        <div className="font-display text-[22px] font-bold leading-tight text-ink">
          Travel<span className="text-saffron">Bharat</span>
        </div>
      </Link>

      <div className="hidden items-center gap-7 md:flex">
        <NavLinks />
      </div>

      <button
        onClick={() => setOpen((o) => !o)}
        className="md:hidden rounded-full border border-saffron/30 px-4 py-2 text-xs font-semibold text-ink"
        aria-label="Menu"
      >
        {open ? "✕" : "☰"}
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full flex flex-col gap-3 border-b border-saffron/20 bg-cream px-[5%] py-5 md:hidden" onClick={() => setOpen(false)}>
          <NavLinks />
        </div>
      )}
    </nav>
  );
};
