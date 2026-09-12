import Link from "next/link";
import { courses } from "@/lib/mockData";

export default function SchoolPage() {
  return (
    <main className="min-h-screen bg-bg px-5 py-8 md:max-w-3xl md:mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl text-ink">Classes</h1>
        {/* TODO: hook this up to a syllabus-PDF upload flow that creates a course row */}
        <button className="rounded-lg border border-border px-3 py-2 text-sm text-ink-dim hover:border-indigo-400 hover:text-ink">
          + Add class
        </button>
      </div>
      <div className="space-y-3">
        {courses.map((c) => (
          <Link
            key={c.id}
            href={`/school/${c.id}`}
            className="block rounded-xl border border-border bg-surface px-4 py-3 hover:border-indigo-400 transition-colors"
          >
            <p className="text-ink">{c.code}</p>
            <p className="text-sm text-ink-dim">{c.name}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
