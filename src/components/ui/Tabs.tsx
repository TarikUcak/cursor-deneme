"use client";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export type TabOption<T extends string> = { value: T; label: string };

export function Tabs<T extends string>({
  value,
  onChange,
  options,
  className,
}: {
  value: T;
  onChange: (next: T) => void;
  options: Array<TabOption<T>>;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex w-full flex-wrap gap-2 rounded-xl border border-[var(--border)] bg-white p-2",
        className,
      )}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
              active
                ? "border-2 border-slate-900 bg-slate-200 text-black shadow-sm"
                : "border-2 border-transparent bg-transparent text-black hover:bg-slate-100",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
