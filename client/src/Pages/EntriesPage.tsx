import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { deleteEntry, listEntries } from "../lib/entries";
import type { Entry } from "../types";

export default function EntriesPage() {
  const [q, setQ] = useState("");
  const [items, setItems] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);

  async function load(search?: string) {
    setLoading(true);
    try {
      const data = await listEntries(search);
      setItems(data);
    } catch (e: any) {
      toast.error(e.message ?? "Failed to load entries");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Entries</h2>
          <p className="mt-1 text-sm text-zinc-400">Search, open, and delete your entries.</p>
        </div>

        <Link
          to="/app/today"
          className="rounded-xl bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-950 hover:bg-white"
        >
          New entry
        </Link>
      </div>

      <div className="mt-4 flex gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search title/content…"
          className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-700"
        />
        <button
          onClick={() => load(q)}
          className="rounded-xl border border-zinc-800 bg-zinc-900/40 px-3 py-2 text-sm hover:bg-zinc-900"
        >
          Search
        </button>
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="text-sm text-zinc-400">Loading…</div>
        ) : items.length === 0 ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-6 text-sm text-zinc-400">
            No entries yet. Create one from <span className="text-zinc-200">Today</span>.
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((e) => (
              <div
                key={e._id}
                className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm text-zinc-400">{e.date}</div>
                    <Link to={`/app/entries/${e._id}`} className="text-base font-semibold hover:underline">
                      {e.title}
                    </Link>
                    {e.tags?.length ? (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {e.tags.slice(0, 6).map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-zinc-800 px-2 py-0.5 text-xs text-zinc-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  <button
                    onClick={async () => {
                      if (!confirm("Delete this entry?")) return;
                      try {
                        await deleteEntry(e._id);
                        toast.success("Deleted");
                        setItems((prev) => prev.filter((x) => x._id !== e._id));
                      } catch (err: any) {
                        toast.error(err.message ?? "Delete failed");
                      }
                    }}
                    className="rounded-xl border border-zinc-800 bg-zinc-900/40 px-3 py-2 text-sm hover:bg-zinc-900"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}