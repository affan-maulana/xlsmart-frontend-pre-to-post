"use client";

import { useState } from "react";
import type { DenomOption } from "@/lib/types";

interface DenomGridProps {
  options: DenomOption[];
  onSelect?: (option: DenomOption) => void;
}

function formatRupiah(amount: number) {
  return `Rp ${amount.toLocaleString("id-ID")}`;
}

/** "Pilih Denom Untuk Isi Pulsa" card: grid of nominal buttons. */
export function DenomGrid({ options, onSelect }: DenomGridProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  function handleSelect(option: DenomOption) {
    setSelectedId(option.id);
    onSelect?.(option);
  }

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-5 sm:p-6">
      <p className="text-base font-bold text-ink-900">Pilih Denom</p>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {options.map((option) => {
          const isSelected = selectedId === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSelect(option)}
              className={`rounded-xl border-2 p-4 text-left transition-colors ${
                isSelected
                  ? "border-transparent"
                  : "border-black/10 hover:border-brand-indigo/40"
              }`}
              style={
                isSelected
                  ? {
                      backgroundImage:
                        "linear-gradient(white, white), linear-gradient(0deg, #1E22AA 0%, #E5005A 100%)",
                      backgroundOrigin: "border-box",
                      backgroundClip: "padding-box, border-box",
                    }
                  : undefined
              }
            >
              <p className="text-xl font-extrabold text-ink-900">
                {option.amount.toLocaleString("id-ID")}
              </p>
              <p className="mt-0.5 text-xs text-ink-700/50">
                +{option.bonusDays} hari
                {option.bonusLabel ? ` • ${option.bonusLabel}` : ""}
              </p>
              <p className="mt-3 text-sm font-bold text-brand-link">
                {formatRupiah(option.price)}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
