import type { Product } from "@/lib/mock";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
}

export function ProductCard({ product, onEdit }: ProductCardProps) {
  return (
    <div
      className="flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-white p-4 shadow-sm transition-colors hover:bg-slate-50 cursor-pointer"
      onClick={() => onEdit(product)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onEdit(product); }}
      aria-label={`${product.name} — düzenle`}
    >
      <div className="block rounded-xl outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-[var(--focus)]">
        <div className="aspect-[4/3] w-full rounded-xl border border-[var(--border)] bg-[var(--surface-muted)]">
          <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-black">
            Ürün Görseli
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm font-semibold text-black">
          {product.name}
        </span>
        <div className="text-xs text-black/70">
          {product.brand ? `${product.brand} • ` : ""}
          {product.quantity} {product.unit}
        </div>
      </div>
    </div>
  );
}
