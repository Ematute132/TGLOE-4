"use client";

import { useState } from "react";

export default function HermesChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {open && (
        <div className="mb-2 w-80 rounded-2xl border border-border bg-surface2 p-3 shadow-xl">
          <p className="text-ink-dim text-xs uppercase tracking-wide mb-2">Hermes</p>
          <p className="text-sm text-ink-dim mb-3">
            Ask anything — "what's due tomorrow", "add CS100 study session Thursday 4pm".
          </p>
          {/* TODO: wire this input to the Hermes service running on the Mac Mini
              instead of a local stub once that service exists. */}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Hermes..."
            className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-indigo-400"
          />
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        className="h-12 w-12 rounded-full bg-violet-400 text-bg font-display text-lg shadow-lg"
        aria-label="Toggle Hermes chat"
      >
        H
      </button>
    </div>
  );
}
