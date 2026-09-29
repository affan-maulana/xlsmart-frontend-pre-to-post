'use client';

import { useMemo, useState } from 'react';
import { Search, X, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import type { PaketOption, PaketCategory } from '@/lib/types';

interface PaketUtamaModalProps {
  isOpen: boolean;
  onClose: () => void;
  options: PaketOption[];
  tipePembayaranOptions: { value: string; label: string }[];
  masaBerlanggananOptions: { value: string; label: string }[];
  onConfirm: (paket: PaketOption) => void;
  pageSize?: number;
  recommendedBadgeSrc?: string;
}

const providerLogo: Record<string, string> = {
  xl: '/icons/xllogo.svg',
};

function formatRupiah(amount: number) {
  return `Rp ${amount.toLocaleString('id-ID')}`;
}

export function PaketUtamaModal({
  isOpen,
  onClose,
  options,
  tipePembayaranOptions,
  masaBerlanggananOptions,
  onConfirm,
  pageSize = 9,
  recommendedBadgeSrc,
}: PaketUtamaModalProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<PaketCategory>('semua');
  const [tipePembayaran, setTipePembayaran] = useState<string | null>(null);
  const [masaBerlangganan, setMasaBerlangganan] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return options.filter((p) => {
      const matchCategory =
        category === 'semua' ||
        (category === 'flexmini' && p.planName.toLowerCase().includes('mini')) ||
        (category === 'flexmax' && p.planName.toLowerCase().includes('max'));

      const matchSearch =
        !search ||
        p.planName.toLowerCase().includes(search.toLowerCase()) ||
        p.quotaLabel.toLowerCase().includes(search.toLowerCase()) ||
        p.durationLabel.toLowerCase().includes(search.toLowerCase());

      const matchMasa = !masaBerlangganan || p.durationLabel.includes(masaBerlangganan);

      return matchCategory && matchSearch && matchMasa;
    });
  }, [options, category, search, masaBerlangganan]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  function resetFilter() {
    setSearch('');
    setCategory('semua');
    setTipePembayaran(null);
    setMasaBerlangganan(null);
    setPage(1);
  }

  function handlePilihPaket() {
    const paket = options.find((p) => p.id === selectedId);
    if (paket) {
      onConfirm(paket);
      onClose();
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col rounded-2xl bg-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-black/5 px-6 py-5">
          <div className="w-8" />
          <h2 className="text-lg font-bold text-foreground">Paket Utama</h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-extrabold text-foreground">Pilih Paket</h3>
            <button
              type="button"
              onClick={resetFilter}
              className="text-sm font-bold text-info"
            >
              Reset Filter
            </button>
          </div>

          {/* Search */}
          <div className="relative mt-4">
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Cari Nama Paket, Kuota Paket, Masa Berlaku Paket"
              className="w-full rounded-full border border-black/10 px-5 py-3 pr-12 text-sm outline-none focus:border-primary/40"
            />
            <Search className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-info" />
          </div>

          {/* Tabs + filters */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {(
              [
                { value: 'semua', label: 'Semua' },
                { value: 'flexmini', label: 'FlexMini' },
                { value: 'flexmax', label: 'FlexMax' },
              ] as { value: PaketCategory; label: string }[]
            ).map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => {
                  setCategory(tab.value);
                  setPage(1);
                }}
                className={`rounded-full border px-4 py-2 text-sm font-semibold ${
                  category === tab.value
                    ? 'border-primary text-primary'
                    : 'border-transparent bg-ink-50 text-ink-soft/70'
                }`}
              >
                {tab.label}
              </button>
            ))}

            <div className="relative">
              <select
                value={tipePembayaran ?? ''}
                onChange={(e) => setTipePembayaran(e.target.value || null)}
                className="appearance-none rounded-full border border-black/10 px-4 py-2 pr-9 text-sm text-ink-soft/70 outline-none"
              >
                <option value="">Tipe Pembayaran</option>
                {tipePembayaranOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
            </div>

            <div className="relative">
              <select
                value={masaBerlangganan ?? ''}
                onChange={(e) => {
                  setMasaBerlangganan(e.target.value || null);
                  setPage(1);
                }}
                className="appearance-none rounded-full border border-black/10 px-4 py-2 pr-9 text-sm text-ink-soft/70 outline-none"
              >
                <option value="">Masa Berlangganan</option>
                {masaBerlanggananOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
            </div>
          </div>

          {/* Grid */}
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {paginated.map((paket) => {
              const isSelected = paket.id === selectedId;
              const logoSrc = providerLogo[paket.provider];

              return (
                <button
                  key={paket.id}
                  type="button"
                  onClick={() => setSelectedId(paket.id)}
                  className={`relative flex flex-col rounded-xl border p-4 pt-5 text-left transition-colors ${
                    isSelected
                      ? 'border-transparent'
                      : 'border-black/10 hover:border-primary/40'
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
                    <p className="text-xs font-semibold text-ink-soft/60">• {paket.planName}</p>
                  </div>

                  <p className="mt-1 text-2xl font-extrabold text-foreground">{paket.quotaLabel}</p>
                  <p className="mt-0.5 text-xs text-ink-soft/50">
                    {paket.durationLabel} • {paket.locationLabel}
                  </p>

                  <div className="mt-3 border-t border-black/5 pt-3">
                    {paket.originalPrice && (
                      <p className="text-xs text-ink-soft/40 line-through">
                        {formatRupiah(paket.originalPrice)}
                      </p>
                    )}
                    <p className="text-sm font-bold text-info">{formatRupiah(paket.price)}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <p className="mt-8 text-center text-sm text-ink-soft/50">Paket tidak ditemukan.</p>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-2">
              <button
                type="button"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="flex h-8 w-8 items-center justify-center rounded-full text-ink-soft/50 disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPage(n)}
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                    page === n ? 'bg-primary/10 text-primary' : 'text-ink-soft/60'
                  }`}
                >
                  {n}
                </button>
              ))}

              <button
                type="button"
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="flex h-8 w-8 items-center justify-center rounded-full text-ink-soft/50 disabled:opacity-30"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-black/5 p-5">
          <button
            type="button"
            disabled={!selectedId}
            onClick={handlePilihPaket}
            className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-bold text-white disabled:opacity-40"
          >
            Pilih Paket
          </button>
        </div>
      </div>
    </div>
  );
}
