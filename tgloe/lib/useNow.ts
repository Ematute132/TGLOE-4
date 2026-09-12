"use client";

import { useEffect, useState } from "react";

// Returns null on the server and on the very first client render (so the
// server-rendered HTML and the client's first render match exactly), then
// starts ticking once mounted in the browser. Components should render a
// static placeholder while this is null.
export function useNow() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return now;
}
