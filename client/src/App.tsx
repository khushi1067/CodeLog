import { Route, Routes, Navigate } from "react-router-dom";
import RequireAuth from "./auth/RequireAuth";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import AppLayout from "./Pages/AppLayout";
import EntriesPage from "./Pages/EntriesPage";
import TodayPage from "./Pages/TodayPage";
import EntryEditorPage from "./Pages/EntryEditorPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/app/today" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<RequireAuth />}>
        <Route path="/app" element={<AppLayout />}>
          <Route path="today" element={<TodayPage />} />
          <Route path="entries" element={<EntriesPage />} />
          <Route path="entries/:id" element={<EntryEditorPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
/*
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

export default function App() {
  return (
    <div className="min-h-screen grid place-items-center bg-zinc-950 text-zinc-100">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
        <h1 className="text-2xl font-semibold">Tailwind works ✅</h1>
        <p className="mt-2 text-sm text-zinc-400">DevJournal UI loading…</p>
      </div>
    </div>
  );
}
/*
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
*/