"use client";

import { useMemo, useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import {
  inventoryCategories,
  type InventoryCategory,
  type Product,
  type ProductUnit,
} from "@/lib/mock";

const units: ProductUnit[] = ["Adet", "Litre", "Kg", "Metre"];

interface ProductFormModalProps {
  /** null → ekleme modu, Product → düzenleme modu */
  initialData?: Product | null;
  onClose: () => void;
  onSave?: (data: Omit<Product, "id">) => void;
  onDelete?: () => void;
}

export function ProductFormModal({
  initialData,
  onClose,
  onSave,
  onDelete,
}: ProductFormModalProps) {
  const isEdit = !!initialData;

  const [name, setName] = useState(initialData?.name ?? "");
  const [brand, setBrand] = useState(initialData?.brand ?? "");
  const [category, setCategory] = useState<InventoryCategory>(
    initialData?.category ?? inventoryCategories[0],
  );
  const [quantity, setQuantity] = useState(initialData?.quantity ?? 1);
  const [unit, setUnit] = useState<ProductUnit>(initialData?.unit ?? "Adet");

  const canSave = useMemo(() => name.trim().length > 0, [name]);

  /* ESC tuşuyla kapatma */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  /* Açıkken arka planda scroll'u kapat */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSave) return;
    onSave?.({ name, brand, category, quantity, unit });
    onClose();
  };

  return (
    /* Arka plan overlay */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Modal kutusu */}
      <div className="w-full max-w-2xl rounded-2xl border border-[var(--border)] bg-white shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Başlık */}
        <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-4">
          <h2 className="text-base font-semibold text-black">
            {isEdit ? "Ürün Düzenle" : "Yeni Ürün Ekle"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Kapat"
            className="flex size-8 items-center justify-center rounded-lg text-black/50 transition-colors hover:bg-slate-100 hover:text-black"
          >
            ✕
          </button>
        </div>

        {/* İçerik */}
        <form
          id="product-form"
          onSubmit={handleSubmit}
          className="overflow-y-auto p-6"
        >
          <div className="grid gap-6 lg:grid-cols-[200px_1fr]">
            {/* Görsel */}
            <div className="flex flex-col items-center gap-3">
              <div className="aspect-square w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] flex items-center justify-center">
                <span className="text-xs font-semibold text-black/60">
                  Ürün Görseli
                </span>
              </div>
              <Button type="button" variant="secondary" className="w-full text-sm">
                Resim Ekle...
              </Button>
            </div>

            {/* Form alanları */}
            <div className="flex flex-col gap-4">
              <Input
                label="Ürün Adı"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
              <Input
                label="Marka"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
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

              <div className="grid grid-cols-2 gap-4">
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
            </div>
          </div>
        </form>

        {/* Alt butonlar */}
        <div className="flex items-center justify-between border-t border-[var(--border)] px-6 py-4">
          {isEdit && onDelete ? (
            <Button
              type="button"
              variant="danger"
              onClick={() => { onDelete(); onClose(); }}
            >
              Sil
            </Button>
          ) : (
            <div />
          )}

          <div className="flex gap-3">
            <Button type="button" variant="secondary" onClick={onClose}>
              İptal
            </Button>
            <Button
              type="submit"
              form="product-form"
              disabled={!canSave}
            >
              {isEdit ? "Güncelle" : "Ürünü Kaydet"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
