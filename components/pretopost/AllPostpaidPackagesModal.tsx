'use client';

import { useState } from 'react';
import { X, ChevronDown, Search, Globe, Phone, MessageSquare } from 'lucide-react';
import type { PostpaidPackage } from '@/lib/types';
import { allPackages } from '@/lib/mockData';

interface AllPostpaidPackagesModalProps {
  onClose: () => void;
  onSelectPackage?: (pkg: PostpaidPackage) => void;
}

const categories = ['Semua', 'Ultimate', 'Diamond', 'Gold'];
const durations = ['Semua', '28 Hari', '30 Hari'];

function formatRupiah(amount: number) {
  return `Rp ${amount.toLocaleString('id-ID')}`;
}

export function AllPostpaidPackagesModal({
  onClose,
  onSelectPackage,
}: AllPostpaidPackagesModalProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedDuration, setSelectedDuration] = useState('Semua');
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
  const [openCategory, setOpenCategory] = useState(false);
  const [openDuration, setOpenDuration] = useState(false);

  const filtered = allPackages.filter((pkg) => {
    const matchSearch = pkg.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = selectedCategory === 'Semua' || pkg.name.includes(selectedCategory);
    const matchDuration = selectedDuration === 'Semua' || pkg.duration === selectedDuration;
    return matchSearch && matchCategory && matchDuration;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex items-start justify-between">
          <h4 className="w-full text-center text-lg font-bold text-ink-900">Paket Postpaid</h4>
          <button
            type="button"
            onClick={onClose}
            className="-mt-1 -mr-1 ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-white hover:bg-black/80"
            aria-label="Tutup"
          >
            <X size={16} />
          </button>
        </div>

        {/* Search */}
        <div className="relative mt-5">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari paket..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-black/10 bg-[#F4F5F9] py-2.5 pl-10 pr-4 text-sm text-ink-900 outline-none placeholder:text-gray-400"
          />
        </div>

        {/* Dropdowns */}
        <div className="mt-4 flex gap-3">
          {/* Kategori */}
          <div className="relative flex-1">
            <button
              type="button"
              onClick={() => {
                setOpenCategory(!openCategory);
                setOpenDuration(false);
              }}
              className="flex w-full items-center justify-between rounded-lg border border-black/10 bg-[#F4F5F9] px-4 py-2.5 text-sm text-ink-900"
            >
              <span className={selectedCategory === 'Semua' ? 'text-gray-400' : ''}>
                {selectedCategory === 'Semua' ? 'Pilih Kategori' : selectedCategory}
              </span>
              <ChevronDown
                size={16}
                className={`transition-transform ${openCategory ? 'rotate-180' : ''}`}
              />
            </button>
            {openCategory && (
              <div className="absolute z-10 mt-1 w-full rounded-lg border border-black/10 bg-white shadow-lg">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat);
                      setOpenCategory(false);
                    }}
                    className={`block w-full px-4 py-2.5 text-left text-sm hover:bg-[#F4F5F9] ${selectedCategory === cat ? 'font-bold text-brand-indigo' : 'text-ink-900'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Masa Berlangganan */}
          <div className="relative flex-1">
            <button
              type="button"
              onClick={() => {
                setOpenDuration(!openDuration);
                setOpenCategory(false);
              }}
              className="flex w-full items-center justify-between rounded-lg border border-black/10 bg-[#F4F5F9] px-4 py-2.5 text-sm text-ink-900"
            >
              <span className={selectedDuration === 'Semua' ? 'text-gray-400' : ''}>
                {selectedDuration === 'Semua' ? 'Pilih masa berlangganan' : selectedDuration}
              </span>
              <ChevronDown
                size={16}
                className={`transition-transform ${openDuration ? 'rotate-180' : ''}`}
              />
            </button>
            {openDuration && (
              <div className="absolute z-10 mt-1 w-full rounded-lg border border-black/10 bg-white shadow-lg">
                {durations.map((dur) => (
                  <button
                    key={dur}
                    type="button"
                    onClick={() => {
                      setSelectedDuration(dur);
                      setOpenDuration(false);
                    }}
                    className={`block w-full px-4 py-2.5 text-left text-sm hover:bg-[#F4F5F9] ${selectedDuration === dur ? 'font-bold text-brand-indigo' : 'text-ink-900'}`}
                  >
                    {dur}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Package Grid */}
        <div className="mt-5 grid grid-cols-3 gap-3">
          {filtered.map((pkg) => {
            const isSelected = selectedPackageId === pkg.id;
            return (
              <button
                key={pkg.id}
                type="button"
                onClick={() => {
                  setSelectedPackageId(pkg.id);
                  onSelectPackage?.(pkg);
                }}
                className={`rounded-xl border-2 p-4 text-left transition-colors ${
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
                    : { backgroundColor: '#FAFAFA' }
                }
              >
                {pkg.image && (
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="mb-3 h-30 w-full border-b border-black/10 pb-3"
                  />
                )}

                <div className="mb-3 h-30 w-full border-b border-black/10 pb-3">
                  <p className="flex items-center gap-1">
                    <Globe size={14} className="text-ink-700/60" />
                    <text className="text-sm font-bold text-ink-900">{pkg.detail.quota} </text>
                    <text className="text-xs text-ink-700/50">Kuota Data</text>
                  </p>
                  <p className="flex items-center gap-1">
                    <Phone size={14} className="text-ink-700/60" />
                    <text className="text-sm font-bold text-ink-900">{pkg.detail.call} </text>
                    <text className="text-xs text-ink-700/50">Panggilan</text>
                  </p>
                  <p className="flex items-center gap-1">
                    <Phone size={14} className="text-ink-700/60" />
                    <text className="text-sm font-bold text-ink-900">{pkg.detail.callToAll} </text>
                    <text className="text-xs text-ink-700/50">Panggilan ke Semua</text>
                  </p>
                  <p className="flex items-center gap-1">
                    <MessageSquare size={14} className="text-ink-700/60" />
                    <text className="text-sm font-bold text-ink-900">{pkg.detail.smsToAll} </text>
                    <text className="text-xs text-ink-700/50">SMS ke Semua</text>
                  </p>
                </div>
                {pkg.salePrice > 0 && (
                  <p className="mt-2 text-xs text-gray-400 line-through">
                    {formatRupiah(pkg.salePrice)}
                  </p>
                )}
                <p
                  className={`mt-0.5 text-sm font-bold text-brand-link
                  ${pkg.salePrice > 0 ? '' : 'mb-4'}
                `}
                >
                  {formatRupiah(pkg.price)}
                </p>
              </button>
            );
          })}

          {filtered.length === 0 && (
            <p className="col-span-3 py-8 text-center text-sm text-gray-400">
              Tidak ada paket ditemukan
            </p>
          )}
        </div>
        {/* pilih paket button full width */}
        {selectedPackageId && (
          <div className="mt-6">
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-lg bg-brand-indigo px-5 py-3 text-sm font-bold text-white hover:bg-brand-indigo/90"
            >
              Pilih Paket
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
