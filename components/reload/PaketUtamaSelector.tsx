'use client';

import type { PaketOption } from '@/lib/types';

interface PaketUtamaSelectorProps {
  options: PaketOption[];
  selectedId: string | null;
  onSelect: (paket: PaketOption) => void;
  onLihatSemuaPaket?: () => void;
  onTanyaPreferensi?: () => void;
  recommendedBadgeSrc?: string;
}

const providerLogo: Record<string, string> = {
  xl: '/icons/xllogo.svg',
};

function formatRupiah(amount: number) {
  return `Rp ${amount.toLocaleString('id-ID')}`;
}

export function PaketUtamaSelector({
  options,
  selectedId,
  onSelect,
  onLihatSemuaPaket,
  onTanyaPreferensi,
  recommendedBadgeSrc,
}: PaketUtamaSelectorProps) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <p className="text-base font-bold text-ink-900">Pilih Paket Utama</p>
        <button
          type="button"
          onClick={onLihatSemuaPaket}
          className="text-sm font-bold text-brand-link"
        >
          Lihat Semua Paket
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {options.map((paket) => {
          const isSelected = paket.id === selectedId;
          const logoSrc = providerLogo[paket.provider];

          return (
            <button
              key={paket.id}
              type="button"
              onClick={() => onSelect(paket)}
              className={`relative rounded-xl border-2 p-4 pt-5 text-left transition-colors ${
                isSelected ? 'border-transparent' : 'border-black/10 hover:border-brand-indigo/40'
              }`}
              style={
                isSelected
                  ? {
                      backgroundImage:
                        'linear-gradient(white, white), linear-gradient(0deg, #1E22AA 0%, #E5005A 100%)',
                      backgroundOrigin: 'border-box',
                      backgroundClip: 'padding-box, border-box',
                    }
                  : undefined
              }
            >
              {paket.recommended && (
                <>
                  {recommendedBadgeSrc ? (
                    <img
                      src={recommendedBadgeSrc}
                      alt="Rekomendasi"
                      className="absolute -top-2.5 left-3 h-6"
                    />
                  ) : (
                    <span className="absolute -top-2.5 left-3 rounded-pill bg-rose-500 px-2 py-0.5 text-[10px] font-bold text-white">
                      Rekomendasi
                    </span>
                  )}
                </>
              )}

              <div className="flex items-center gap-1.5">
                {logoSrc && (
                  <img src={logoSrc} alt={paket.provider} className="h-4 w-4 object-contain" />
                )}
                <p className="text-xs font-semibold text-ink-700/60">• {paket.planName}</p>
              </div>

              <p className="mt-1 text-xl font-extrabold text-ink-900">{paket.quotaLabel}</p>
              <p className="mt-0.5 text-xs text-ink-700/50">
                {paket.durationLabel} • {paket.locationLabel}
              </p>

              {paket.originalPrice && (
                <p className="mt-3 text-xs text-ink-700/40 line-through">
                  {formatRupiah(paket.originalPrice)}
                </p>
              )}
              <p className="text-sm font-bold text-brand-link">{formatRupiah(paket.price)}</p>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onTanyaPreferensi}
        className="mt-4 w-full rounded-lg border-2 border-brand-indigo px-4 py-3 text-sm font-bold text-brand-indigo hover:bg-brand-indigo/5"
      >
        Tanya Preferensi Paket
      </button>
    </div>
  );
}
