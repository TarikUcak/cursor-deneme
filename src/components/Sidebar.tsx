"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const nav = [
  { href: "/kayit", label: "Kayıt Oluştur" },
  { href: "/bilgi-havuzu", label: "Bilgi Havuzu" },
  { href: "/envanter", label: "Envanter Yönetimi" },
  { href: "/", label: "Çıkış Yap" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 h-screen w-[280px] border-r border-[var(--border)] bg-[var(--surface)]">
      <div className="flex h-full flex-col gap-6 p-6">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] bg-white text-xs font-semibold">
            Logo
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold">MTA</span>
            <span className="text-xs text-black/70">
              Milli Teknoloji Atölyesi
            </span>
          </div>
        </Link>

        <nav className="flex flex-col gap-3">
          {nav.map((item) => {
            const active =
              item.href !== "/"
                ? pathname === item.href || pathname.startsWith(item.href + "/")
                : pathname === "/";
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg border px-4 py-3 text-sm font-semibold shadow-sm transition-colors",
                  active
                    ? "border-slate-900 bg-slate-200 text-black shadow-sm"
                    : "border-[var(--border)] bg-white text-black hover:bg-slate-50",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

