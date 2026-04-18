import Link from "next/link";

import { ButtonLink } from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--surface-muted)] px-6">
      <div className="w-full max-w-xl rounded-2xl border border-[var(--border)] bg-white p-10 text-center shadow-sm">
        <div className="text-2xl font-semibold">Sayfa bulunamadı</div>
        <p className="mt-2 text-sm text-black/75">
          Aradığınız sayfa mevcut değil.
        </p>
        <div className="mt-6 flex justify-center">
          <ButtonLink href="/dashboard" variant="secondary">
            Dashboard&apos;a dön
          </ButtonLink>
        </div>
        <div className="mt-4 text-xs text-black/70">
          veya <Link className="underline" href="/">giriş sayfası</Link>
        </div>
      </div>
    </div>
  );
}

