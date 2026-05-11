import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { categories, places as seedPlaces, Place } from "@/data/travelData";

interface AdminPlace extends Omit<Place, "stateSlug"> {
  state: string; // free-form for admin
  stateSlug?: string;
}

const STORAGE_KEY = "tb_admin_places";
const AUTH_KEY = "tb_admin_session";

const loadPlaces = (): AdminPlace[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return JSON.parse(stored);
  // seed with existing places
  return seedPlaces.map((p) => ({ ...p, state: p.stateSlug }));
};

const Admin = () => {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState(false);
  const [creds, setCreds] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const [tab, setTab] = useState<"places" | "experiences">("places");
  const [items, setItems] = useState<AdminPlace[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<AdminPlace | null>(null);
  const [form, setForm] = useState<AdminPlace>(blank());

  useEffect(() => {
    if (localStorage.getItem(AUTH_KEY) === "1") setAuthed(true);
  }, []);

  useEffect(() => {
    if (authed) setItems(loadPlaces());
  }, [authed]);

  const persist = (next: AdminPlace[]) => {
    setItems(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (creds.username === "admin" && creds.password === "password123") {
      localStorage.setItem(AUTH_KEY, "1");
      setAuthed(true);
      setError("");
    } else {
      setError("Invalid username or password.");
    }
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setAuthed(false);
  };

  const openAdd = () => { setEditing(null); setForm(blank()); setShowModal(true); };
  const openEdit = (p: AdminPlace) => { setEditing(p); setForm(p); setShowModal(true); };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) persist(items.map((p) => (p.id === editing.id ? form : p)));
    else persist([{ ...form, id: form.id || `p_${Date.now()}` }, ...items]);
    setShowModal(false);
  };

  const remove = (id: string) => {
    if (!confirm("Delete this place?")) return;
    persist(items.filter((p) => p.id !== id));
  };

  // ─── LOGIN ───
  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream px-4">
        <form onSubmit={login} className="w-full max-w-md rounded-2xl bg-white p-10 text-center shadow-warm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full text-2xl shadow-warm" style={{ background: "var(--gradient-saffron)" }}>
            🛡️
          </div>
          <h1 className="font-display text-3xl font-bold text-ink">Admin Login</h1>
          <p className="mt-1 text-sm text-muted-ink">Default · admin / password123</p>

          <label className="mt-6 block text-left text-xs font-semibold uppercase tracking-widest text-muted-ink">Username</label>
          <input type="text" required value={creds.username} onChange={(e) => setCreds({ ...creds, username: e.target.value })}
            className="mt-2 w-full rounded-lg border border-saffron/30 bg-cream px-4 py-3 text-sm outline-none focus:border-saffron" />

          <label className="mt-4 block text-left text-xs font-semibold uppercase tracking-widest text-muted-ink">Password</label>
          <input type="password" required value={creds.password} onChange={(e) => setCreds({ ...creds, password: e.target.value })}
            className="mt-2 w-full rounded-lg border border-saffron/30 bg-cream px-4 py-3 text-sm outline-none focus:border-saffron" />

          {error && <div className="mt-3 text-sm font-medium text-destructive">{error}</div>}

          <button type="submit" className="mt-6 w-full rounded-lg px-5 py-3.5 font-semibold text-white shadow-warm transition hover:opacity-95" style={{ background: "var(--gradient-saffron)" }}>
            Login
          </button>
          <button type="button" onClick={() => navigate("/")} className="mt-3 w-full text-sm font-semibold text-muted-ink hover:text-saffron">
            ← Back to site
          </button>
        </form>
      </div>
    );
  }

  // ─── DASHBOARD ───
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main className="mx-auto max-w-6xl px-[5%] py-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-display text-4xl font-bold text-ink">Admin Dashboard</h1>
          <button onClick={logout} className="rounded-full border border-saffron px-5 py-2 text-sm font-semibold text-saffron transition hover:bg-saffron hover:text-white">
            Logout
          </button>
        </div>

        <div className="mb-6 flex gap-2">
          {(["places", "experiences"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition ${
                tab === t ? "bg-saffron text-white shadow-warm" : "bg-white text-ink hover:bg-saffron/10"
              }`}>
              {t === "places" ? "Manage Places" : "User Experiences"}
            </button>
          ))}
        </div>

        {tab === "places" ? (
          <div className="overflow-hidden rounded-2xl bg-white shadow-card">
            <div className="flex items-center justify-between border-b border-saffron/10 p-5">
              <h2 className="font-display text-2xl font-bold text-ink">Places ({items.length})</h2>
              <button onClick={openAdd} className="rounded-lg px-5 py-2.5 text-sm font-semibold text-white shadow-warm transition hover:opacity-95" style={{ background: "var(--gradient-saffron)" }}>
                + Add New Place
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-cream text-left text-xs uppercase tracking-wider text-muted-ink">
                  <tr>
                    <th className="p-4">Image</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">State</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((p) => (
                    <tr key={p.id} className="border-t border-saffron/10">
                      <td className="p-4"><img src={p.image} alt={p.name} className="h-12 w-16 rounded object-cover" /></td>
                      <td className="p-4 font-semibold text-ink">{p.name}</td>
                      <td className="p-4 text-muted-ink">{p.state}</td>
                      <td className="p-4 text-muted-ink">{p.category}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button onClick={() => openEdit(p)} className="rounded bg-gold px-3 py-1 text-xs font-semibold text-ink hover:opacity-90">Edit</button>
                          <button onClick={() => remove(p.id)} className="rounded bg-destructive px-3 py-1 text-xs font-semibold text-white hover:opacity-90">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <ExperiencesPanel />
        )}
      </main>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4" onClick={() => setShowModal(false)}>
          <form onClick={(e) => e.stopPropagation()} onSubmit={save} className="w-full max-w-lg rounded-2xl bg-white p-7 shadow-warm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-2xl font-bold text-ink">{editing ? "Edit Place" : "Add New Place"}</h3>
              <button type="button" onClick={() => setShowModal(false)} className="text-2xl text-muted-ink">×</button>
            </div>
            {(["name", "city", "state", "category", "image", "destination"] as const).map((f) => (
              <Field key={f} label={f} value={(form as any)[f]} onChange={(v) => setForm({ ...form, [f]: v })} />
            ))}
            <Field label="description" textarea value={form.description} onChange={(v) => setForm({ ...form, description: v })} />
            <button type="submit" className="mt-3 w-full rounded-lg px-5 py-3 font-semibold text-white shadow-warm transition hover:opacity-95" style={{ background: "var(--gradient-saffron)" }}>
              Save Place
            </button>
          </form>
        </div>
      )}

      <Footer />
    </div>
  );
};

const Field = ({ label, value, onChange, textarea }: { label: string; value: string; onChange: (v: string) => void; textarea?: boolean }) => (
  <div className="mb-3">
    <label className="block text-xs font-semibold uppercase tracking-widest text-muted-ink">{label}</label>
    {textarea ? (
      <textarea required rows={3} value={value} onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-lg border border-saffron/30 bg-cream px-4 py-2.5 text-sm outline-none focus:border-saffron" />
    ) : (
      <input required type="text" value={value} onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-lg border border-saffron/30 bg-cream px-4 py-2.5 text-sm outline-none focus:border-saffron" />
    )}
  </div>
);

const ExperiencesPanel = () => {
  const [exps, setExps] = useState<any[]>([]);
  useEffect(() => {
    const stored = localStorage.getItem("tb_experiences");
    if (stored) setExps(JSON.parse(stored));
  }, []);
  const remove = (id: string) => {
    if (!confirm("Remove this user post?")) return;
    const next = exps.filter((e) => e.id !== id);
    setExps(next);
    localStorage.setItem("tb_experiences", JSON.stringify(next));
  };
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-card">
      <div className="border-b border-saffron/10 p-5">
        <h2 className="font-display text-2xl font-bold text-ink">User Experiences ({exps.length})</h2>
      </div>
      {exps.length === 0 ? (
        <div className="p-10 text-center text-muted-ink">No community posts yet.</div>
      ) : (
        <div className="divide-y divide-saffron/10">
          {exps.map((e) => (
            <div key={e.id} className="flex items-start gap-4 p-5">
              {e.imageUrl && <img src={e.imageUrl} alt="" className="h-16 w-16 rounded object-cover" />}
              <div className="flex-1">
                <div className="font-semibold text-ink">{e.userName}</div>
                <div className="mt-1 text-sm text-muted-ink">"{e.content}"</div>
              </div>
              <button onClick={() => remove(e.id)} className="rounded bg-destructive px-3 py-1 text-xs font-semibold text-white hover:opacity-90">Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

function blank(): AdminPlace {
  return { id: "", name: "", state: "", category: categories[0].slug, image: "", description: "", city: "", bestTime: "", timing: "", entry: "", nearby: "", destination: "" };
}

export default Admin;
