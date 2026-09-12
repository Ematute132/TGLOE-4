"use client";

import { useState } from "react";
import { todaySchedule } from "@/lib/mockData";

export default function CalendarPage() {
  const [input, setInput] = useState("");

  return (
    <main className="min-h-screen bg-bg px-5 py-8 md:max-w-2xl md:mx-auto">
      <h1 className="font-display text-2xl text-ink mb-6">Calendar</h1>

      <div className="space-y-2 mb-6">
        {todaySchedule.map((item) => (
          <div key={item.id} className="rounded-lg border border-border bg-surface px-3 py-2">
            <p className="font-mono text-xs text-ink-dim">
              {new Date(item.start).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
              {" – "}
              {new Date(item.end).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
            </p>
            <p className="text-sm text-ink">{item.title}</p>
          </div>
        ))}
      </div>

      {/* TODO: this box is rules-based text parsing for now (Phase 1).
          Phase 2 swaps it for the Hermes service so natural language actually
          creates rows in `calendar_events`. */}
      <div className="rounded-xl border border-border bg-surface2 p-3">
        <p className="text-ink-dim text-xs uppercase tracking-wide mb-2">Add event</p>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='e.g. "CS100 study session Thursday 4pm"'
          className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-indigo-400"
        />
      </div>
    </main>
  );
}
