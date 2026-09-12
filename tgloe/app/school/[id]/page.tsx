import { courses, tasks } from "@/lib/mockData";
import { notFound } from "next/navigation";

export default function ClassPage({ params }: { params: { id: string } }) {
  const course = courses.find((c) => c.id === params.id);
  if (!course) return notFound();

  const courseTasks = tasks.filter((t) => t.courseId === course.id);

  return (
    <main className="min-h-screen bg-bg px-5 py-8 md:max-w-3xl md:mx-auto">
      <h1 className="font-display text-2xl text-ink">{course.code}</h1>
      <p className="text-ink-dim mb-6">{course.name}</p>

      <section className="mb-6">
        <p className="text-ink-dim text-xs uppercase tracking-wide mb-2">Due next</p>
        {courseTasks.length === 0 ? (
          <p className="text-sm text-ink-dim">Nothing pending.</p>
        ) : (
          <div className="space-y-2">
            {courseTasks.map((t) => (
              <div key={t.id} className="rounded-lg border border-border bg-surface px-3 py-2">
                <p className="text-sm text-ink">{t.title}</p>
                <p className="text-xs text-ink-dim">
                  Due {new Date(t.due).toLocaleString(undefined, { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* TODO: study guides, practice quizzes, and uploaded docs pull from `study_materials`
          once the Supabase schema is wired in. Canvas grade sync also lands here. */}
      <section>
        <p className="text-ink-dim text-xs uppercase tracking-wide mb-2">Study materials</p>
        <p className="text-sm text-ink-dim">No materials uploaded yet.</p>
      </section>
    </main>
  );
}
