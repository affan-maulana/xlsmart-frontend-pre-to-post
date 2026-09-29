'use client';

import { useState } from 'react';
import type { DenomOption } from '@/lib/types';

interface DenomGridProps {
  options: DenomOption[];
  onSelect?: (option: DenomOption) => void;
}

function formatRupiah(amount: number) {
  return `Rp ${amount.toLocaleString('id-ID')}`;
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
      <p className="text-base font-bold text-foreground">Pilih Denom</p>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {options.map((option) => {
          const isSelected = selectedId === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSelect(option)}
              className={`rounded-xl border-2 p-4 text-left transition-colors ${
                isSelected ? 'border-transparent' : 'border-black/10 hover:border-primary/40'
              }`}
              style={
                isSelected
                  ? {
                      backgroundImage:
                        'linear-gradient(white, white), var(--gradient-brand)',
                      backgroundOrigin: 'border-box',
                      backgroundClip: 'padding-box, border-box',
                    }
                  : undefined
              }
            >
              <p className="text-xl font-extrabold text-foreground">
                {option.amount.toLocaleString('id-ID')}
              </p>
              <p className="mt-0.5 text-xs text-ink-soft/50">
                +{option.bonusDays} hari
                {option.bonusLabel ? ` • ${option.bonusLabel}` : ''}
              </p>
              <p className="mt-3 text-sm font-bold text-info">{formatRupiah(option.price)}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
