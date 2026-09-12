// Placeholder data shaped like what will come from Supabase.
// Swap each of these for a real query once the schema (supabase/schema.sql) is applied.

export type ScheduleItem = {
  id: string;
  title: string;
  kind: "class" | "study" | "workout" | "meeting" | "task";
  start: string; // ISO
  end: string; // ISO
  location?: string;
};

export type Task = {
  id: string;
  title: string;
  courseId?: string;
  done: boolean;
  due: string; // ISO
};

export type Course = {
  id: string;
  code: string; // "CHEM 1A"
  name: string;
  color: string;
};

export const courses: Course[] = [
  { id: "chem1a", code: "CHEM 1A", name: "General Chemistry", color: "#E3A857" },
  { id: "math9c", code: "MATH 9C", name: "Calculus III", color: "#5FA8A0" },
  { id: "writ10", code: "WRIT 010", name: "Introductory Composition", color: "#8B93A1" },
  { id: "hnrs10", code: "HNRS 10", name: "Honors Colloquium", color: "#B98EA7" },
];

const now = new Date();
const at = (h: number, m = 0) => {
  const d = new Date(now);
  d.setHours(h, m, 0, 0);
  return d.toISOString();
};

export const todaySchedule: ScheduleItem[] = [
  { id: "1", title: "CHEM 1A Lecture", kind: "class", start: at(9), end: at(10, 20), location: "Chem 101" },
  { id: "2", title: "Study block — Calc III", kind: "study", start: at(11), end: at(12, 30) },
  { id: "3", title: "Lift — Pasadena", kind: "workout", start: at(13), end: at(14) },
  { id: "4", title: "WRIT 010 Discussion", kind: "class", start: at(15), end: at(16) },
  { id: "5", title: "Study group — WRIT paper", kind: "meeting", start: at(19), end: at(20) },
];

export const tasks: Task[] = [
  { id: "t1", title: "Problem set 3", courseId: "math9c", done: false, due: at(23, 59) },
  { id: "t2", title: "Reading response — Ch. 4", courseId: "writ10", done: false, due: at(23, 59) },
  { id: "t3", title: "Lab prelab quiz", courseId: "chem1a", done: true, due: at(8) },
];

export const finances = {
  savings: 4820.13,
  stocks: [
    { symbol: "VTI", value: 1250.4, changePct: 0.8 },
    { symbol: "AAPL", value: 610.2, changePct: -1.2 },
  ],
};

export const school = { name: "UCR", term: "Fall 2026", weekOfTerm: 2, totalWeeks: 16 };
export const streak = { days: 4 };


export function currentAndNext(schedule: ScheduleItem[]) {
  const nowMs = Date.now();
  const sorted = [...schedule].sort((a, b) => +new Date(a.start) - +new Date(b.start));
  const current = sorted.find((s) => +new Date(s.start) <= nowMs && nowMs < +new Date(s.end));
  const next = sorted.find((s) => +new Date(s.start) > nowMs);
  return { current, next };
}
