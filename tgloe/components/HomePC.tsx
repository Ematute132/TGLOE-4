"use client";

import Link from "next/link";
import { todaySchedule, tasks, finances, courses, currentAndNext } from "@/lib/mockData";
import HermesChat from "@/components/HermesChat";
import { useNow } from "@/lib/useNow";

export default function HomePC() {
  const now = useNow();
  const { current, next } = currentAndNext(todaySchedule);

  const military = now
    ? now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
    : "--:--:--";
  const dateStr = now
    ? now.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })
    : "";

  const countdownTarget = current?.end;
  const remaining = now && countdownTarget ? Math.max(0, +new Date(countdownTarget) - +now) : null;
  const remMin = remaining !== null ? Math.floor(remaining / 60000) : null;
  const remSec = remaining !== null ? Math.floor((remaining % 60000) / 1000) : null;

  const openTasks = tasks.filter((t) => !t.done);

  return (
    <main className="hidden md:grid h-screen grid-cols-[280px_1fr_420px] grid-rows-[140px_1fr] gap-4 bg-bg p-4">
      {/* Top-left: military time + countdown */}
      <section className="row-start-1 col-start-1 rounded-2xl border border-border bg-surface p-4 flex flex-col justify-between">
        <div>
          <p className="font-mono text-3xl font-semibold text-ink">{military}</p>
          <p className="text-ink-dim text-xs mt-1">{dateStr}</p>
        </div>
        {current && remMin !== null && (
          <p className="font-mono text-sm text-amber-400">
            {String(remMin).padStart(2, "0")}:{String(remSec).padStart(2, "0")} left — {current.title}
          </p>
        )}
      </section>

      {/* Top-middle: finances */}
      <section className="row-start-1 col-start-2 rounded-2xl border border-border bg-surface p-4">
        <p className="text-ink-dim text-xs uppercase tracking-wide mb-2">Finances</p>
        <div className="flex items-center gap-6">
          <div>
            <p className="text-ink-dim text-xs">Savings</p>
            <p className="font-display text-2xl font-bold text-ink">${finances.savings.toLocaleString()}</p>
          </div>
          <div className="flex gap-4">
            {finances.stocks.map((s) => (
              <div key={s.symbol}>
                <p className="text-ink-dim text-xs">{s.symbol}</p>
                <p className={`font-mono text-sm ${s.changePct >= 0 ? "text-emerald-400" : "text-amber-400"}`}>
                  ${s.value.toFixed(2)} ({s.changePct >= 0 ? "+" : ""}
                  {s.changePct}%)
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom-left: classes */}
      <section className="row-start-2 col-start-1 rounded-2xl border border-indigo-500/30 bg-surface p-4 overflow-y-auto">
        <p className="text-ink-dim text-xs uppercase tracking-wide mb-3">Classes</p>
        <div className="space-y-2">
          {courses.map((c) => (
            <Link
              key={c.id}
              href={`/school/${c.id}`}
              className="block rounded-lg border border-border px-3 py-2 hover:border-indigo-400 transition-colors"
            >
              <span className="block text-sm text-amber-400 font-medium">{c.code}</span>
              <span className="block text-xs text-ink-dim">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom-middle: current + next task (largest) */}
      <section className="row-start-2 col-start-2 rounded-2xl border border-violet-400/30 bg-surface2 p-6 flex flex-col justify-center">
        <p className="text-ink-dim text-xs uppercase tracking-wide mb-2">
          {current ? "Doing now" : "Nothing scheduled"}
        </p>
        <p className="font-display text-4xl font-bold text-ink leading-tight">{current?.title ?? "Open block"}</p>
        {next && (
          <div className="mt-8">
            <p className="text-ink-dim text-xs uppercase tracking-wide mb-1">Next</p>
            <p className="text-lg text-ink-dim">{next.title}</p>
          </div>
        )}
        {openTasks.length > 0 && (
          <div className="mt-8">
            <p className="text-ink-dim text-xs uppercase tracking-wide mb-2">
              {openTasks.length} task{openTasks.length > 1 ? "s" : ""} open today
            </p>
            <ul className="space-y-1">
              {openTasks.slice(0, 3).map((t) => (
                <li key={t.id} className="text-sm text-ink-dim">
                  · {t.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Right: full-day calendar */}
      <section className="row-span-2 col-start-3 rounded-2xl border border-border bg-surface p-4 overflow-y-auto">
        <p className="text-ink-dim text-xs uppercase tracking-wide mb-3">Today</p>
        <div className="space-y-2">
          {todaySchedule.map((item) => (
            <div key={item.id} className="rounded-lg border border-border px-3 py-2">
              <p className="font-mono text-xs text-ink-dim">
                {new Date(item.start).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
                {" – "}
                {new Date(item.end).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
              </p>
              <p className="text-sm text-ink">{item.title}</p>
              {item.location && <p className="text-xs text-ink-dim">{item.location}</p>}
            </div>
          ))}
        </div>
      </section>

      <HermesChat />
    </main>
  );
}
