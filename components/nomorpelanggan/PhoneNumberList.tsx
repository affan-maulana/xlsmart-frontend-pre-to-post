'use client';

import { useState } from 'react';
import { AlertCircle, LayoutGrid } from 'lucide-react';
import type { PhoneNumber } from '@/lib/types';
import { ProviderIcon } from './ProviderIcon';
import { AllNumbersModal } from './AllNumbersModal';

interface PhoneNumberListProps {
  numbers: PhoneNumber[];
  totalCount: number;
  onViewAll?: () => void;
  customerName?: string;
  selectedId?: string;
  onSelect?: (number: PhoneNumber) => void;
}

export function PhoneNumberList({
  numbers,
  totalCount,
  onViewAll,
  customerName = 'Pelanggan',
  selectedId,
  onSelect,
}: PhoneNumberListProps) {
  const showViewAll = numbers.length > 1;
  const [isAllNumbersOpen, setIsAllNumbersOpen] = useState(false);

  // fallback: kalau belum ada selectedId, pilih nomor pertama yang bukan suspend/nonaktif
  const effectiveSelectedId =
    selectedId ?? numbers.find((n) => n.status !== 'suspend' && n.status !== 'nonaktif')?.id;

  function handleViewAll() {
    setIsAllNumbersOpen(true);
    onViewAll?.();
  }

  return (
    <section className="">
      <h3 className="text-lg font-bold text-ink-900">
        Nomor Pelanggan Terdaftar ({numbers.length})
      </h3>

      <div className="mt-4 flex items-center gap-3">
        <div className="flex min-w-0 flex-1 gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {numbers.map((number) => {
            const isSuspend = number.status === 'suspend';
            const isNonaktif = number.status === 'nonaktif';
            const isSelected = number.id === effectiveSelectedId;

            return (
              <button
                key={number.id}
                type="button"
                onClick={() => onSelect?.(number)}
                className={`inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-pill border-2 py-2.5 text-sm font-semibold transition-colors ${
                  number.iconOnly ? 'px-2.5' : 'px-4'
                } ${isSelected ? 'bg-white' : 'bg-[#FAFAFA]'} ${
                  isSelected
                    ? 'border-brand-indigo bg-brand-indigo/5 text-brand-indigo'
                    : isSuspend
                      ? 'border-black/10 text-ink-700/40'
                      : isNonaktif
                        ? 'border-black/10 text-ink-700/70'
                        : 'border-black/10 text-ink-700/80 hover:border-brand-indigo/40'
                }`}
              >
                <ProviderIcon number={number} />

                {!number.iconOnly && <span>{number.msisdn}</span>}

                {isSuspend && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-500">
                    <AlertCircle size={14} />
                    Suspend
                  </span>
                )}

                {isNonaktif && (
                  <span className="inline-flex items-center gap-1 rounded-pill bg-red-500 px-2 py-0.5 text-xs font-semibold text-white">
                    <AlertCircle size={12} />
                    Nonaktif
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {showViewAll && (
          <button
            type="button"
            onClick={handleViewAll}
            className="inline-flex shrink-0 items-center gap-2 rounded-lg border-2 border-brand-indigo px-4 py-2.5 text-sm font-bold text-brand-indigo"
          >
            <LayoutGrid size={16} />
            Lihat Semua {totalCount}
          </button>
        )}
      </div>

      {isAllNumbersOpen && (
        <AllNumbersModal
          customerName={customerName}
          numbers={numbers}
          onClose={() => setIsAllNumbersOpen(false)}
        />
      )}
    </section>
  );
}
