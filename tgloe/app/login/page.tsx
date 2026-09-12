"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const supabase = createClient();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "/";

  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signInWithGoogle = async () => {
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?redirectTo=${redirectTo}`,
      },
    });
    if (error) setError(error.message);
  };

  const signInWithEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?redirectTo=${redirectTo}`,
      },
    });
    if (error) setError(error.message);
    else setSent(true);
  };

  return (
    <main className="min-h-screen bg-bg flex items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-3xl text-ink mb-1">TGLOE</h1>
        <p className="text-ink-dim text-sm mb-8">The Great Library of Evan</p>

        <button
          onClick={signInWithGoogle}
          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-ink hover:border-indigo-400 transition-colors mb-4"
        >
          Continue with Google
        </button>

        <div className="flex items-center gap-3 my-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-ink-dim">or</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {sent ? (
          <p className="text-sm text-emerald-400">Check your email for a sign-in link.</p>
        ) : (
          <form onSubmit={signInWithEmail} className="space-y-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@ucr.edu"
              className="w-full rounded-lg border border-border bg-surface px-3 py-3 text-sm text-ink outline-none focus:border-indigo-400"
            />
            <button
              type="submit"
              className="w-full rounded-xl bg-violet-400 text-bg font-medium px-4 py-3 text-sm"
            >
              Send magic link
            </button>
          </form>
        )}

        {error && <p className="text-sm text-amber-400 mt-4">{error}</p>}
      </div>
    </main>
  );
}
