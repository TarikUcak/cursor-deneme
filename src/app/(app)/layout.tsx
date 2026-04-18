import type { ReactNode } from "react";

import { Sidebar } from "@/components/Sidebar";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[var(--surface-muted)] text-black">
      <Sidebar />
      <main className="flex flex-1 flex-col">
        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
