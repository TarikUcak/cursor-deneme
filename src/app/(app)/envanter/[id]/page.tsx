"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { Page } from "@/components/Page";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import {
  inventoryCategories,
  products,
  type InventoryCategory,
  type ProductUnit,
} from "@/lib/mock";

const units: ProductUnit[] = ["Adet", "Litre", "Kg", "Metre"];

export default function UrunDuzenlePage() {
  const router = useRouter();
  const params = useParams();
  const raw = params?.id;
  const id = typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] : "";

  const product = id ? products.find((p) => p.id === id) : undefined;

  if (!product) {
    return (
      <Page title="Ürün bulunamadı">
        <p className="text-sm text-black">
          Bu ürün bulunamadı veya bağlantı geçersiz.
        </p>
        <div className="mt-4">
          <ButtonLink href="/envanter" variant="secondary">
            Envantere dön
          </ButtonLink>
        </div>
      </Page>
    );
  }

  const [name, setName] = useState(product.name);
  const [brand, setBrand] = useState(product.brand ?? "");
  const [category, setCategory] = useState<InventoryCategory>(product.category);
  const [quantity, setQuantity] = useState(product.quantity);
  const [unit, setUnit] = useState<ProductUnit>(product.unit);

  const canUpdate = useMemo(() => name.trim().length > 0, [name]);

  return (
    <Page title="Ürün Düzenle">
      <form
        className="grid gap-8 lg:grid-cols-[360px_1fr]"
        onSubmit={(e) => {
          e.preventDefault();
          if (!canUpdate) return;
          router.push("/envanter");
        }}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="aspect-square w-full max-w-[320px] rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]">
            <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-black">
              Ürün Görseli
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Input label="Ürün Adı" value={name} onChange={(e) => setName(e.target.value)} />
          <Input label="Marka" value={brand} onChange={(e) => setBrand(e.target.value)} />
          <Select
            label="Kategori"
            value={category}
            onChange={(e) => setCategory(e.target.value as InventoryCategory)}
          >
            {inventoryCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Miktar"
              type="number"
              min={0}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <Select
              label="Birim"
              value={unit}
              onChange={(e) => setUnit(e.target.value as ProductUnit)}
            >
              {units.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </Select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={!canUpdate} className="min-w-32">
              Güncelle
            </Button>
            <Button
              type="button"
              variant="danger"
              onClick={() => router.push("/envanter")}
              className="min-w-32"
            >
              Sil
            </Button>
          </div>
        </div>
      </form>
    </Page>
  );
}
