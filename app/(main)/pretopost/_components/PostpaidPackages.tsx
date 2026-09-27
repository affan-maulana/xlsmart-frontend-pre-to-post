'use client';

import { useState } from 'react';
import type { PostpaidPackageOption } from '@/lib/types';
import { AllPostpaidPackagesModal } from '@/components/pretopost/AllPostpaidPackagesModal';
import type { FieldErrors } from '../_hook/usePretopostSubmit';

interface PostpaidPackagesProps {
  packageCategories: string[];
  onSelectPackageCategory?: (category: string) => void;
  options: PostpaidPackageOption[];
  onSelect?: (option: PostpaidPackageOption) => void;
  email?: string;
  onEmailChange?: (value: string) => void;
  phoneNumber?: string;
  onPhoneNumberChange?: (value: string) => void;
  onSubmit?: () => void;
  isSubmitting?: boolean;
  fieldErrors?: FieldErrors;
}

function formatRupiah(amount: number) {
  return `Rp ${amount.toLocaleString('id-ID')}`;
}

export function PostpaidPackages({
  packageCategories,
  options,
  onSelect,
  onSelectPackageCategory,
  email = '',
  onEmailChange,
  phoneNumber = '',
  onPhoneNumberChange,
  onSubmit,
  isSubmitting = false,
  fieldErrors,
}: PostpaidPackagesProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showAllPackages, setShowAllPackages] = useState(false);

  function handleSelectCategory(category: string) {
    setSelectedCategory(category);
    onSelectPackageCategory?.(category);
  }

  function handleSelect(option: PostpaidPackageOption) {
    setSelectedId(option.id);
    onSelect?.(option);
  }

  return (
    <div>
      <div className="rounded-2xl border border-black/10 bg-gray-100 p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <p className="text-base font-bold text-ink-900">
            Pilih Paket Postpaid<span className="text-red-500">*</span>
          </p>
          <button
            type="button"
            onClick={() => setShowAllPackages(true)}
            className="mt-1 text-sm font-medium text-[#1E22AA] hover:underline"
          >
            Lihat semua paket
          </button>
        </div>

        {fieldErrors?.packageId && (
          <p className="mt-2 text-xs text-red-600">{fieldErrors.packageId}</p>
        )}

        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {packageCategories.map((category) => (
              <button
                key={category}
                type="button"
                className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-ink-900 hover:bg-brand-indigo/10"
                style={
                  selectedCategory === category
                    ? {
                        borderColor: '#1E22AA',
                        color: '#1E22AA',
                      }
                    : { backgroundColor: '#FAFAFA' }
                }
                onClick={() => handleSelectCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          {options.map((option) => {
            const isSelected = selectedId === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSelect(option)}
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
                <img
                  src={option.image}
                  alt={option.id}
                  className="mb-3 h-30 w-full border-b border-black/10 pb-3"
                />

                {option.salePrice > 0 && (
                  <p className="text-xs text-gray-400 line-through">
                    {formatRupiah(option.salePrice)}
                  </p>
                )}
                <p className="mt-0.5 text-sm font-bold text-brand-link">
                  {formatRupiah(option.price)}
                </p>
              </button>
            );
          })}
        </div>
      </div>
      <div className="rounded-2xl border mt-4 border-black/10 bg-gray-100 p-5 sm:p-6">
        <div className=" space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-ink-900">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="Masukkan email"
              value={email}
              onChange={(e) => onEmailChange?.(e.target.value)}
              className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-ink-900 outline-none transition-colors focus:border-brand-indigo placeholder:text-gray-400 ${
                fieldErrors?.email ? 'border-red-500' : 'border-black/10'
              }`}
            />
            {fieldErrors?.email && (
              <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>
            )}
          </div>
          <div>
            <label htmlFor="nomor-hp" className="mb-1 block text-sm font-medium text-ink-900">
              Nomor HP Alternatif
            </label>
            <input
              id="nomor-hp"
              type="tel"
              placeholder="Masukkan nomor HP"
              value={phoneNumber}
              onChange={(e) => onPhoneNumberChange?.(e.target.value)}
              className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-ink-900 outline-none transition-colors focus:border-brand-indigo placeholder:text-gray-400 ${
                fieldErrors?.phoneNumber ? 'border-red-500' : 'border-black/10'
              }`}
            />
            {fieldErrors?.phoneNumber && (
              <p className="mt-1 text-xs text-red-600">{fieldErrors.phoneNumber}</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button
          type="button"
          className="w-full rounded-lg border-2 border-brand-indigo px-5 py-3 text-sm font-bold text-brand-indigo hover:bg-brand-indigo/5"
        >
          Save as Draft
        </button>
        <button
          type="button"
          disabled={isSubmitting}
          onClick={onSubmit}
          className="w-full rounded-lg bg-brand-indigo px-5 py-3 text-sm font-bold text-white hover:bg-brand-indigo/90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isSubmitting ? 'Proses...' : 'Proses'}
        </button>
      </div>

      {showAllPackages && (
        <AllPostpaidPackagesModal onClose={() => setShowAllPackages(false)} />
      )}
    </div>
  );
}
