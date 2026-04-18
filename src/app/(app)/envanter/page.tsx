"use client";

import { useMemo, useState } from "react";

import { Page } from "@/components/Page";
import { ProductCard } from "@/components/ProductCard";
import { ProductFormModal } from "@/components/ProductFormModal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Tabs } from "@/components/ui/Tabs";
import {
  inventoryCategories,
  products,
  type InventoryCategory,
  type Product,
} from "@/lib/mock";

export default function EnvanterPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<InventoryCategory>(
    inventoryCategories[0],
  );

  /* null → kapalı | "new" → ekleme modu | Product → düzenleme modu */
  const [modalState, setModalState] = useState<Product | "new" | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products
      .filter((p) => p.category === category)
      .filter((p) => (q ? p.name.toLowerCase().includes(q) : true));
  }, [category, query]);

  return (
    <Page
      title="Envanter Yönetimi"
      right={
        <Button variant="secondary" onClick={() => setModalState("new")}>
          Ürün Ekle
        </Button>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="max-w-md">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ara"
          />
        </div>

        <div className="text-sm font-semibold text-black">
          Kategoriler ve Ürünler
        </div>
        <Tabs
          value={category}
          onChange={setCategory}
          options={inventoryCategories.map((c) => ({ value: c, label: c }))}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onEdit={(product) => setModalState(product)}
            />
          ))}
          {filtered.length === 0 ? (
            <div className="col-span-full rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-6 text-sm text-black/75">
              Bu kategoride gösterilecek ürün bulunamadı.
            </div>
          ) : null}
        </div>
      </div>

      {/* Modal */}
      {modalState !== null && (
        <ProductFormModal
          initialData={modalState === "new" ? null : modalState}
          onClose={() => setModalState(null)}
          onSave={(data) => {
            console.log("Kaydedildi:", data);
            setModalState(null);
          }}
          onDelete={() => {
            console.log("Silindi:", modalState);
            setModalState(null);
          }}
        />
      )}
    </Page>
  );
}


