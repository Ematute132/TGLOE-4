"use client";

import { useState } from "react";
import {
  todaySchedule,
  tasks as initialTasks,
  currentAndNext,
  courses,
  school,
  streak,
} from "@/lib/mockData";
import { useNow } from "@/lib/useNow";

function weekStrip(now: Date | null) {
  if (!now) return [];
  const day = now.getDay(); // 0 = Sun
  const mondayOffset = day === 0 ? -6 : 1 - day;
  const monday = new Date(now);
  monday.setDate(now.getDate() + mondayOffset);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

function ProgressRing({ pct }: { pct: number }) {
  const r = 22;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-14 w-14 shrink-0">
      <svg viewBox="0 0 52 52" className="h-14 w-14 -rotate-90">
        <circle cx="26" cy="26" r={r} fill="none" stroke="#1E2023" strokeWidth="4" />
        <circle
          cx="26"
          cy="26"
          r={r}
          fill="none"
          stroke="#A78BFA"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (c * pct) / 100}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-ink">
        {pct}%
      </span>
    </div>
  );
}

export default function HomePhone() {
  const now = useNow();
  const [taskState, setTaskState] = useState(initialTasks);
  const { current, next } = currentAndNext(todaySchedule);
  const upNext = current ?? next;

  const toggle = (id: string) =>
    setTaskState((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const dateStr = now
    ? now.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })
    : "";

  const doneCount = taskState.filter((t) => t.done).length;
  const totalCount = taskState.length;
  const pct = totalCount ? Math.round((doneCount / totalCount) * 100) : 0;

  const todaysClasses = todaySchedule.filter((s) => s.kind === "class");
  const week = weekStrip(now);
  const todayIdx = now ? (now.getDay() === 0 ? 6 : now.getDay() - 1) : -1;

  return (
    <main className="md:hidden min-h-screen bg-bg px-4 pt-6 pb-6">
      {/* Header */}
      <div className="mb-5 flex items-start justify-between">
        <div>
          <p className="text-ink-dim text-sm">{dateStr}</p>
          <p className="font-display text-2xl font-bold text-ink">Kelvin&apos;s day</p>
        </div>
        <ProgressRing pct={pct} />
      </div>

      {/* Classes card */}
      <div className="mb-4 rounded-2xl border border-indigo-500/30 bg-surface p-4">
        <div className="flex items-center justify-between mb-1">
          <p className="font-semibold text-ink">🎓 Classes</p>
          <span className="rounded-full bg-surface2 px-2.5 py-0.5 text-xs text-ink-dim">
            Week {school.weekOfTerm} of {school.totalWeeks}
          </span>
        </div>
        {todaysClasses.length === 0 ? (
          <p className="text-sm text-ink-dim">No classes today.</p>
        ) : (
          <div className="mt-2 divide-y divide-border">
            {todaysClasses.map((c) => (
              <div key={c.id} className="flex items-center justify-between py-2.5 first:pt-0">
                <div>
                  <span className="text-amber-400 font-medium text-sm">{c.title}</span>
                </div>
                <div className="text-right">
                  <p className="text-xs text-ink-dim font-mono">
                    {new Date(c.start).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}
                    {" – "}
                    {new Date(c.end).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}
                  </p>
                  {c.location && <p className="text-xs text-ink-dim">{c.location}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
        <p className="mt-3 pt-3 border-t border-border text-xs text-ink-dim">
          {school.name} · {school.term} · {courses.length} classes enrolled
        </p>
      </div>

      {/* Stats row */}
      <div className="mb-4 grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-border bg-surface p-3">
          <p className="text-2xl font-bold text-ink">{streak.days}</p>
          <p className="text-xs text-ink-dim">Day streak</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-3">
          <p className="text-2xl font-bold text-ink">{doneCount}</p>
          <p className="text-xs text-ink-dim">Done today</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-3">
          <p className="text-2xl font-bold text-ink">{totalCount}</p>
          <p className="text-xs text-ink-dim">Goals today</p>
        </div>
      </div>

      {/* CTA */}
      {upNext && (
        <button className="mb-4 w-full rounded-xl bg-violet-400 px-4 py-3.5 text-center font-semibold text-bg">
          {current ? "Continue — " : "Up next — "}
          {upNext.title}
        </button>
      )}

      {/* Today checklist */}
      <div className="rounded-2xl border border-border bg-surface p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="font-semibold text-ink">Today</p>
          <span className="text-xs text-ink-dim">
            {doneCount} / {totalCount}
          </span>
        </div>

        {week.length > 0 && (
          <div className="mb-3 grid grid-cols-7 gap-1.5">
            {week.map((d, i) => {
              const isToday = i === todayIdx;
              return (
                <div
                  key={i}
                  className={`rounded-lg py-2 text-center ${
                    isToday ? "border border-emerald-400 bg-emerald-400/10" : "bg-surface2"
                  }`}
                >
                  <p className={`text-[10px] ${isToday ? "text-emerald-400" : "text-ink-dim"}`}>
                    {d.toLocaleDateString(undefined, { weekday: "narrow" })}
                  </p>
                  <p className={`text-sm font-semibold ${isToday ? "text-emerald-400" : "text-ink"}`}>
                    {d.getDate()}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        <div className="divide-y divide-border">
          {taskState.map((t) => {
            const course = courses.find((c) => c.id === t.courseId);
            return (
              <button
                key={t.id}
                onClick={() => toggle(t.id)}
                className="flex w-full items-center gap-3 py-3 text-left first:pt-0 last:pb-0"
              >
                <span
                  className={`h-5 w-5 shrink-0 rounded-md border ${
                    t.done ? "bg-emerald-400 border-emerald-400" : "border-ink-dim"
                  }`}
                />
                <span className={`flex-1 text-sm ${t.done ? "text-ink-dim line-through" : "text-ink"}`}>
                  {t.title}
                </span>
                {course && (
                  <span className="rounded-full border border-indigo-500/40 px-2 py-0.5 text-[10px] text-indigo-300">
                    {course.code}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
}
