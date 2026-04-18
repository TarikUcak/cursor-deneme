"use client";

import type { SelectHTMLAttributes } from "react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
};

export function Select({ className, label, children, ...props }: Props) {
  return (
    <label className="flex flex-col gap-1.5">
      {label ? (
        <span className="text-sm font-medium text-black">{label}</span>
      ) : null}
      <select
        className={cn(
          "h-10 rounded-lg border border-[var(--border)] bg-white px-3 text-sm text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--focus)]",
          className,
        )}
        {...props}
      >
        {children}
      </select>
    </label>
  );
}

