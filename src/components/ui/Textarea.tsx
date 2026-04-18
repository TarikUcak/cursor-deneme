"use client";

import type { TextareaHTMLAttributes } from "react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
};

export function Textarea({ className, label, ...props }: Props) {
  return (
    <label className="flex flex-col gap-1.5">
      {label ? (
        <span className="text-sm font-medium text-black">{label}</span>
      ) : null}
      <textarea
        className={cn(
          "min-h-24 rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--focus)]",
          className,
        )}
        {...props}
      />
    </label>
  );
}

