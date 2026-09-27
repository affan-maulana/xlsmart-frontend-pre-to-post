'use client';

import { X, ChevronRight, Check } from 'lucide-react';
import type { PhoneNumber } from '@/lib/types';
import { ProviderIconWna } from './ProviderIconWna';

interface AllNumbersModalWnaProps {
  customerName: string;
  numbers: PhoneNumber[];
  onClose: () => void;
  onSelectNumber?: (number: PhoneNumber) => void;
}

const providerLabel: Record<string, string> = {
  xl: 'XL Axiata',
  axis: 'AXIS',
  smartfren: 'Smartfren',
  other: 'Lainnya',
};

type RowStatus = 'aktif' | 'outstanding' | 'nonaktif';

function getRowStatus(number: PhoneNumber): RowStatus {
  if (number.status === 'suspend') return 'nonaktif';
  if (number.outstanding) return 'outstanding';
  return 'aktif';
}

function StatusBadge({ status }: { status: RowStatus }) {
  if (status === 'aktif') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-bold text-emerald-500">
        <Check size={16} strokeWidth={3} />
        Aktif
      </span>
    );
  }
  if (status === 'outstanding') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-sm font-bold text-amber-500">
        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold leading-none text-white">
          !
        </span>
        Outstanding
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1.5 text-sm font-bold text-rose-600">
      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold leading-none text-white">
        !
      </span>
      Nonaktif
    </span>
  );
}

function NumberRow({
  number,
  onSelect,
}: {
  number: PhoneNumber;
  onSelect?: (number: PhoneNumber) => void;
}) {
  const status = getRowStatus(number);
  const label = providerLabel[number.provider ?? 'other'] ?? providerLabel.other;

  return (
    <button
      type="button"
      onClick={() => onSelect?.(number)}
      className="flex w-full items-center justify-between gap-3 rounded-xl border border-black/5 bg-black/[0.015] px-4 py-3 text-left transition-colors hover:border-brand-indigo/30"
    >
      <div className="flex min-w-0 items-center gap-3">
        <ProviderIconWna number={number} size="md" />
        <div className="min-w-0">
          <p className="truncate text-sm text-ink-700/60">{label}</p>
          <p className="mt-0.5 text-lg font-extrabold text-ink-900">{number.msisdn}</p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <StatusBadge status={status} />
        <ChevronRight size={18} className="text-ink-700/30" />
      </div>
    </button>
  );
}

export function AllNumbersModalWna({
  customerName,
  numbers,
  onClose,
  onSelectNumber,
}: AllNumbersModalWnaProps) {
  const activeNumbers = numbers.filter((n) => getRowStatus(n) !== 'nonaktif');
  const inactiveNumbers = numbers.filter((n) => getRowStatus(n) === 'nonaktif');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex items-start justify-between">
          <h4 className="w-full text-center text-lg font-bold text-ink-900">Semua Nomor</h4>
          <button
            type="button"
            onClick={onClose}
            className="-mt-1 -mr-1 ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-white hover:bg-black/80"
            aria-label="Tutup"
          >
            <X size={16} />
          </button>
        </div>

        <p className="mt-5 text-xl font-bold text-ink-900">
          {customerName} • {numbers.length} Nomor
        </p>

        {activeNumbers.length > 0 && (
          <div className="mt-5">
            <p className="mb-3 text-sm font-bold text-ink-900">
              Nomor Aktif ({activeNumbers.length} Nomor)
            </p>
            <div className="flex flex-col gap-3">
              {activeNumbers.map((number) => (
                <NumberRow key={number.id} number={number} onSelect={onSelectNumber} />
              ))}
            </div>
          </div>
        )}

        {inactiveNumbers.length > 0 && (
          <div className="mt-6">
            <p className="mb-3 text-sm font-bold text-ink-900">
              Nonaktif ({inactiveNumbers.length} Nomor)
            </p>
            <div className="flex flex-col gap-3">
              {inactiveNumbers.map((number) => (
                <NumberRow key={number.id} number={number} onSelect={onSelectNumber} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
