"use client";

import type { InputHTMLAttributes } from "react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
};

export function Input({ className, label, hint, id, ...props }: Props) {
  const inputId = id ?? (label ? `input_${label.replaceAll(" ", "_")}` : undefined);

  return (
    <label className="flex flex-col gap-1.5">
      {label ? (
        <span className="text-sm font-medium text-black">{label}</span>
      ) : null}
      <input
        id={inputId}
        className={cn(
          "h-10 rounded-lg border border-[var(--border)] bg-white px-3 text-sm text-black shadow-sm placeholder:text-black/45 focus:outline-none focus:ring-2 focus:ring-[var(--focus)]",
          className,
        )}
        {...props}
      />
      {hint ? (
        <span className="text-xs text-black/70">
          {hint}
        </span>
      ) : null}
    </label>
  );
}

