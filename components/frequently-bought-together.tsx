"use client";

import { useState } from "react";
import { Check, Plus, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/store-data";
import { money } from "@/lib/store-data";
import { useStorefront } from "@/lib/storefront-context";
import { SkeletonImage } from "@/components/ui/skeleton-image";

export function FrequentlyBoughtTogether({ product }: { product: Product }) {
  const { catalog, addToCart, isCartUpdating } = useStorefront();

  // Find 2 complementary products from the same or complementary category
  const complements = catalog
    .filter(
      (item) =>
        item.id !== product.id &&
        (item.category === product.category ||
          (product.type === "Hair" && item.type === "Tools") ||
          (product.type === "Wigs" && item.category === "Hair care") ||
          (product.type === "Skin" && item.category === "Skin & body"))
    )
    .slice(0, 2);

  const bundleItems = [product, ...complements];
  const [selectedIds, setSelectedIds] = useState<string[]>(
    bundleItems.map((item) => item.id)
  );
  const [added, setAdded] = useState(false);

  if (complements.length === 0) return null;

  const toggleItem = (id: string) => {
    // Primary item can't be deselected
    if (id === product.id) return;
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
    setAdded(false);
  };

  const selectedProducts = bundleItems.filter((item) =>
    selectedIds.includes(item.id)
  );

  const totalPrice = selectedProducts.reduce(
    (sum, item) => sum + item.price,
    0
  );
  const totalCompare = selectedProducts.reduce(
    (sum, item) => sum + (item.compareAt || item.price),
    0
  );
  const savings = totalCompare - totalPrice;

  const handleAddBundle = async () => {
    try {
      for (const item of selectedProducts) {
        await addToCart(item);
      }
      setAdded(true);
    } catch {
      setAdded(false);
    }
  };

  return (
    <section className="fbt-container my-12 rounded-xl border border-[#dedfe8] bg-[#fbfafc] p-6 shadow-xs">
      <div className="mb-4">
        <span className="eyebrow text-[#9f70a5]">Frequently Bought Together</span>
        <h3 className="font-serif text-lg font-bold text-[#0d125d]">
          Complete Your Routine & Save
        </h3>
      </div>

      {/* Visual Image Combination */}
      <div className="flex flex-wrap items-center gap-3">
        {bundleItems.map((item, index) => {
          const isSelected = selectedIds.includes(item.id);
          return (
            <div key={item.id} className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => toggleItem(item.id)}
                aria-pressed={isSelected}
                aria-label={`${isSelected ? "Remove" : "Add"} ${item.name} from this selection`}
                className={`relative size-20 cursor-pointer overflow-hidden rounded-lg border-2 bg-white p-1.5 transition ${
                  isSelected
                    ? "border-[#0d125d] shadow-sm"
                    : "border-slate-200 opacity-40"
                }`}
              >
                <SkeletonImage
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain"
                  sizes="80px"
                />
                {isSelected && (
                  <div className="absolute right-1 top-1 flex size-4 items-center justify-center rounded-full bg-[#0d125d] text-white">
                    <Check size={10} />
                  </div>
                )}
              </button>

              {index < bundleItems.length - 1 && (
                <span className="text-slate-400">
                  <Plus size={16} />
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Checkboxes List */}
      <div className="mt-5 space-y-2 border-t border-[#eee] pt-4">
        {bundleItems.map((item) => {
          const isSelected = selectedIds.includes(item.id);
          const isMain = item.id === product.id;

          return (
            <label
              key={item.id}
              className="flex cursor-pointer items-center gap-2.5 text-xs text-[#0d125d]"
            >
              <input
                type="checkbox"
                checked={isSelected}
                disabled={isMain}
                onChange={() => toggleItem(item.id)}
                className="size-4 rounded border-slate-300 text-[#0d125d] focus:ring-[#0d125d]"
              />
              <span className="font-medium">
                {isMain ? <strong>This item: </strong> : null}
                {item.name} — <strong className="text-[#0d125d]">{money(item.price)}</strong>
              </span>
            </label>
          );
        })}
      </div>

      {/* Bundle Action Bar */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-[#eee] pt-4">
        <div>
          <div className="text-xs text-[#5d6077]">
            Price for {selectedProducts.length} {selectedProducts.length === 1 ? "item" : "items"}:
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-xl font-bold text-[#0d125d]">
              {money(totalPrice)}
            </span>
            {savings > 0 && (
              <span className="text-xs font-semibold text-emerald-700">
                Save {money(savings)}
              </span>
            )}
          </div>
        </div>

        <button
          type="button"
          disabled={isCartUpdating}
          onClick={() => void handleAddBundle()}
          className="button button-dark flex items-center gap-2 py-2.5 text-xs font-bold"
        >
          {added ? (
            <>
              Added bundle to bag <Check size={14} />
            </>
          ) : (
            <>
              Add bundle to bag <ShoppingBag size={14} />
            </>
          )}
        </button>
      </div>
    </section>
  );
}
