"use client";

import { useMemo, useState } from "react";

import { Page } from "@/components/Page";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { juneReport } from "@/lib/mock";

type Msg = { role: "user" | "assistant"; text: string };

function downloadCsv(filename: string, rows: Array<Record<string, string | number>>) {
  const headers = Object.keys(rows[0] ?? {});
  const esc = (v: string | number) => {
    const s = String(v);
    if (/[",\n]/.test(s)) return `"${s.replaceAll('"', '""')}"`;
    return s;
  };
  const csv =
    [headers.join(","), ...rows.map((r) => headers.map((h) => esc(r[h] ?? "")).join(","))].join(
      "\n",
    ) + "\n";

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function BilgiHavuzuPage() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "user", text: "Bana Haziran ayının malzeme kullanım verilerini getir." },
    {
      role: "assistant",
      text: "Hemen hazırlıyorum...\nHaziran ayı envanter ve kullanım raporu oluşturuldu. Verileri sağdaki tablodan inceleyebilir veya dosya olarak indirebilirsiniz.",
    },
  ]);
  const [draft, setDraft] = useState("");

  const reportRows = useMemo(
    () =>
      juneReport.map((r) => ({
        "Malzeme Kodu": r.code,
        "Malzeme Adı": r.name,
        Kullanım: r.usage,
        Birim: r.unit,
      })),
    [],
  );

  return (
    <Page title="Bilgi Havuzu">
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="flex flex-col gap-3">
          <div className="text-sm font-semibold text-black">AI Asistan Sohbeti</div>
          <div className="flex min-h-[420px] flex-col gap-3 rounded-2xl border border-[var(--border)] bg-white p-4">
            <div className="flex flex-1 flex-col gap-3 overflow-auto">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={
                    m.role === "user"
                      ? "self-start rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-2 text-sm whitespace-pre-wrap text-black"
                      : "self-start rounded-xl border border-[var(--border)] bg-white px-3 py-2 text-sm whitespace-pre-wrap text-black"
                  }
                >
                  <span className="font-semibold">
                    {m.role === "user" ? "Kullanıcı:" : "Asistan:"}{" "}
                  </span>
                  {m.text}
                </div>
              ))}
            </div>

            <form
              className="flex gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                const text = draft.trim();
                if (!text) return;
                setMessages((prev) => [
                  ...prev,
                  { role: "user", text },
                  {
                    role: "assistant",
                    text: "İsteğini aldım. (Bu demo statik ön yüz olduğu için cevaplar mocktur.)",
                  },
                ]);
                setDraft("");
              }}
            >
              <div className="flex-1">
                <Input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Mesajınızı yazınız..."
                />
              </div>
              <Button type="submit">Gönder</Button>
            </form>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-semibold text-black">
              Veri Sonuçları: Haziran Ayı Raporu
            </div>
            <Button
              type="button"
              variant="secondary"
              onClick={() => downloadCsv("haziran_raporu.csv", reportRows)}
            >
              Excel&apos;e Aktar
            </Button>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
            <div className="max-h-[480px] overflow-auto">
              <table className="w-full border-collapse text-sm">
                <thead className="sticky top-0 bg-[var(--surface-muted)]">
                  <tr>
                    {Object.keys(reportRows[0] ?? {}).map((h) => (
                      <th
                        key={h}
                        className="border-b border-[var(--border)] px-3 py-2 text-left font-semibold text-black"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {reportRows.map((r, idx) => (
                    <tr key={idx} className={idx % 2 ? "bg-white" : "bg-slate-50/60"}>
                      {Object.values(r).map((v, j) => (
                        <td key={j} className="border-b border-[var(--border)] px-3 py-2">
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {reportRows.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-3 py-10 text-center text-black/70"
                      >
                        Kayıt bulunamadı.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </Page>
  );
}

