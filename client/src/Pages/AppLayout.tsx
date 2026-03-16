import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import toast from "react-hot-toast";
import { BookText, CalendarDays, LogOut } from "lucide-react";

export default function AppLayout() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <header className="flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold">DevJournal</div>
            <div className="text-xs text-zinc-400">Private journal for developers</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-sm text-zinc-300">
              {user?.name} <span className="text-zinc-500">({user?.email})</span>
            </div>
            <button
              onClick={async () => {
                await logout();
                toast.success("Logged out");
                nav("/login");
              }}
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/40 px-3 py-2 text-sm hover:bg-zinc-900"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </header>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-[240px_1fr]">
          <aside className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-3">
            <nav className="space-y-1">
              <SideLink to="/app/today" icon={<CalendarDays className="h-4 w-4" />}>Today</SideLink>
              <SideLink to="/app/entries" icon={<BookText className="h-4 w-4" />}>Entries</SideLink>
            </nav>
          </aside>

          <main className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

function SideLink({
  to,
  icon,
  children,
}: {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        "flex items-center gap-2 rounded-xl px-3 py-2 text-sm " +
        (isActive ? "bg-zinc-100 text-zinc-950" : "text-zinc-200 hover:bg-zinc-900")
      }
    >
      {icon}
      {children}
    </NavLink>
  );
}