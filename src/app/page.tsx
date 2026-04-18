"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const canSubmit = useMemo(
    () => username.trim().length > 0 && password.trim().length > 0,
    [username, password],
  );

  return (
    <div className="min-h-[calc(100vh-0px)] bg-[var(--surface-muted)] text-black">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-10 shadow-sm">
          <div className="mx-auto mb-10 flex w-full max-w-md flex-col items-center gap-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-[var(--border)] bg-white">
              <span className="text-sm font-semibold text-black">Logo</span>
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-black">
              Milli Teknoloji Atölyesi
            </h1>
          </div>

          <form
            className="mx-auto flex w-full max-w-sm flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (!canSubmit) return;
              router.push("/dashboard");
            }}
          >
            <Input
              label="Kullanıcı Adı"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
            <Input
              label="Şifre"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <div className="pt-2">
              <Button type="submit" disabled={!canSubmit} className="w-full">
                Giriş Yap
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
