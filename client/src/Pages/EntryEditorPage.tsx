import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import type { Entry } from "../types";
import { getEntry, updateEntry } from "../lib/entries";

export default function EntryEditorPage() {
  const { id } = useParams();
  const nav = useNavigate();

  const [loading, setLoading] = useState(true);
  const [entry, setEntry] = useState<Entry | null>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [links, setLinks] = useState("");
  const [mood, setMood] = useState(3);
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    (async () => {
      if (!id) return;
      setLoading(true);
      try {
        const e = await getEntry(id);
        setEntry(e);
        setTitle(e.title ?? "");
        setContent(e.content ?? "");
        setTags((e.tags ?? []).join(", "));
        setLinks((e.links ?? []).join(", "));
        setMood(e.mood ?? 3);
        setTimeSpent(e.timeSpent ?? 0);
      } catch (err: any) {
        toast.error(err.message ?? "Failed to load entry");
        nav("/app/entries");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, nav]);

  if (loading) return <div className="text-sm text-zinc-400">Loading…</div>;
  if (!entry) return null;

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Edit entry</h2>
          <p className="mt-1 text-sm text-zinc-400">Date: <span className="text-zinc-200">{entry.date}</span></p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => nav("/app/entries")}
            className="rounded-xl border border-zinc-800 bg-zinc-900/40 px-3 py-2 text-sm hover:bg-zinc-900"
          >
            Back
          </button>

          <button
            className="rounded-xl bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-950 hover:bg-white"
            onClick={async () => {
              try {
                const updated = await updateEntry(entry._id, {
                  title: title.trim(),
                  content,
                  tags: tags.split(",").map(t => t.trim()).filter(Boolean),
                  links: links.split(",").map(l => l.trim()).filter(Boolean),
                  mood: Number(mood),
                  timeSpent: Number(timeSpent)
                });
                setEntry(updated);
                toast.success("Saved");
              } catch (e: any) {
                toast.error(e.message ?? "Save failed");
              }
            }}
          >
            Save
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4">
        <div>
          <label className="text-sm text-zinc-300">Title</label>
          <input
            className="mt-1 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-700"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm text-zinc-300">Content</label>
          <textarea
            className="mt-1 w-full min-h-[260px] rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-700"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="text-sm text-zinc-300">Mood (1–5)</label>
            <input
              className="mt-1 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-700"
              type="number"
              min={1}
              max={5}
              value={mood}
              onChange={(e) => setMood(Number(e.target.value))}
            />
          </div>

          <div>
            <label className="text-sm text-zinc-300">Time spent (min)</label>
            <input
              className="mt-1 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-700"
              type="number"
              min={0}
              value={timeSpent}
              onChange={(e) => setTimeSpent(Number(e.target.value))}
            />
          </div>

          <div>
            <label className="text-sm text-zinc-300">Tags</label>
            <input
              className="mt-1 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-700"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-zinc-300">Links</label>
          <input
            className="mt-1 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-700"
            value={links}
            onChange={(e) => setLinks(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}