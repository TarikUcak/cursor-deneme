import { Page } from "@/components/Page";
import { monthlyStats } from "@/lib/mock";

function BarGroup({
  a,
  b,
  label,
  max,
}: {
  a: number;
  b: number;
  label: string;
  max: number;
}) {
  const ha = Math.round((a / max) * 180);
  const hb = Math.round((b / max) * 180);
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-end gap-3">
        <div
          className="w-16 rounded-md border border-[var(--border)] bg-slate-100"
          style={{ height: ha }}
          title={`A: ${a}`}
        />
        <div
          className="w-16 rounded-md border border-[var(--border)] bg-slate-400"
          style={{ height: hb }}
          title={`B: ${b}`}
        />
      </div>
      <div className="text-xs font-semibold text-black">{label}</div>
    </div>
  );
}

export default function DashboardPage() {
  const max = Math.max(...monthlyStats.flatMap((s) => [s.a, s.b]), 1);

  return (
    <Page title="Milli Teknoloji Atölyesi" subtitle="Aylık İstatistikleri">
      <div className="flex min-h-[360px] w-full items-end justify-center gap-10 px-4 py-8">
        {monthlyStats.map((s) => (
          <BarGroup key={s.month} a={s.a} b={s.b} label={s.month} max={max} />
        ))}
      </div>
    </Page>
  );
}

