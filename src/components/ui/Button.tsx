import type { ButtonHTMLAttributes } from "react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
};

export function Button({
  className,
  variant = "primary",
  disabled,
  ...props
}: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)] disabled:cursor-not-allowed disabled:opacity-60";

  const styles: Record<NonNullable<Props["variant"]>, string> = {
    primary:
      "border-slate-900 bg-slate-900 !text-white hover:bg-slate-800 hover:border-slate-800",
    secondary:
      "border-[var(--border)] bg-white text-black hover:bg-slate-50",
    ghost: "border-transparent bg-transparent text-black hover:bg-slate-100",
    danger:
      "border-red-600 bg-red-600 !text-white hover:bg-red-500 hover:border-red-500",
  };

  return (
    <button
      className={cn(base, styles[variant], className)}
      disabled={disabled}
      {...props}
    />
  );
}

