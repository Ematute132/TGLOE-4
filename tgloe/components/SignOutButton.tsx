"use client";

import { usePathname } from "next/navigation";

export default function SignOutButton() {
  const pathname = usePathname();
  if (pathname.startsWith("/login")) return null;

  return (
    <form action="/auth/signout" method="post" className="fixed top-3 right-3 z-50">
      <button
        type="submit"
        className="rounded-lg border border-border bg-surface/90 px-3 py-1.5 text-xs text-ink-dim hover:text-ink hover:border-indigo-400 backdrop-blur"
      >
        Sign out
      </button>
    </form>
  );
}
