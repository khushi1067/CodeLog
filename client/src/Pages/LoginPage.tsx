import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAuth } from "../auth/AuthContext";

type Form = { email: string; password: string };

export default function LoginPage() {
  const { login } = useAuth();
  const nav = useNavigate();
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<Form>();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 grid place-items-center p-6">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 shadow">
        <h1 className="text-xl font-semibold">DevJournal</h1>
        <p className="mt-1 text-sm text-zinc-400">Log in to your private dev journal.</p>

        <form
          className="mt-6 space-y-4"
          onSubmit={handleSubmit(async (data) => {
            try {
              await login(data.email, data.password);
              toast.success("Welcome back!");
              nav("/app/today");
            } catch (e: any) {
              toast.error(e.message ?? "Login failed");
            }
          })}
        >
          <div>
            <label className="text-sm text-zinc-300">Email</label>
            <input
              className="mt-1 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-700"
              type="email"
              autoComplete="email"
              {...register("email", { required: true })}
            />
          </div>

          <div>
            <label className="text-sm text-zinc-300">Password</label>
            <input
              className="mt-1 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-700"
              type="password"
              autoComplete="current-password"
              {...register("password", { required: true })}
            />
          </div>

          <button
            disabled={isSubmitting}
            className="w-full rounded-xl bg-zinc-100 text-zinc-950 py-2 font-medium hover:bg-white disabled:opacity-60"
          >
            {isSubmitting ? "Logging in…" : "Log in"}
          </button>
        </form>

        <p className="mt-4 text-sm text-zinc-400">
          New here?{" "}
          <Link className="text-zinc-100 underline" to="/register">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}