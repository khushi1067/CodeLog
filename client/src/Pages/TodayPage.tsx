import { useMemo } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createEntry } from "../lib/entries";

type Form = {
  title: string;
  content: string;
  tags: string;
  mood: number;
  links: string;
  timeSpent: number;
};

function yyyyMmDd(d = new Date()) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export default function TodayPage() {
  const today = useMemo(() => yyyyMmDd(), []);

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<Form>({
    defaultValues: {
      title: "",
      content: "",
      tags: "",
      mood: 3,
      links: "",
      timeSpent: 0
    }
  });

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Today</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Add your entry for <span className="text-zinc-200">{today}</span>.
          </p>
        </div>
      </div>

      <form
        className="mt-6 grid gap-4"
        onSubmit={handleSubmit(async (data) => {
          try {
            await createEntry({
              date: today,
              title: data.title.trim(),
              content: data.content,
              tags: data.tags.split(",").map(t => t.trim()).filter(Boolean),
              links: data.links.split(",").map(l => l.trim()).filter(Boolean),
              mood: Number(data.mood),
              timeSpent: Number(data.timeSpent)
            });
            toast.success("Entry saved!");
            reset({ title: "", content: "", tags: "", mood: 3, links: "", timeSpent: 0 });
          } catch (e: any) {
            toast.error(e.message ?? "Could not save entry");
          }
        })}
      >
        <div>
          <label className="text-sm text-zinc-300">Title</label>
          <input
            className="mt-1 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-700"
            placeholder="What did you work on?"
            {...register("title", { required: true })}
          />
        </div>

        <div>
          <label className="text-sm text-zinc-300">Entry (Markdown supported)</label>
          <textarea
            className="mt-1 w-full min-h-[180px] rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-700"
            placeholder="- What I worked on\n- Blockers\n- Learning\n- Links"
            {...register("content")}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="text-sm text-zinc-300">Mood (1–5)</label>
            <input
              type="number"
              min={1}
              max={5}
              className="mt-1 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-700"
              {...register("mood", { valueAsNumber: true })}
            />
          </div>

          <div>
            <label className="text-sm text-zinc-300">Time spent (minutes)</label>
            <input
              type="number"
              min={0}
              className="mt-1 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-700"
              {...register("timeSpent", { valueAsNumber: true })}
            />
          </div>

          <div>
            <label className="text-sm text-zinc-300">Tags (comma separated)</label>
            <input
              className="mt-1 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-700"
              placeholder="mern, vite, bugs"
              {...register("tags")}
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-zinc-300">Links (comma separated)</label>
          <input
            className="mt-1 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-700"
            placeholder="https://github.com/..., https://docs..."
            {...register("links")}
          />
        </div>

        <button
          disabled={isSubmitting}
          className="mt-2 inline-flex w-fit items-center justify-center rounded-xl bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-950 hover:bg-white disabled:opacity-60"
        >
          {isSubmitting ? "Saving…" : "Save entry"}
        </button>
      </form>

      <p className="mt-4 text-xs text-zinc-500">
        Tip: Entries are private to your account.
      </p>
    </div>
  );
}