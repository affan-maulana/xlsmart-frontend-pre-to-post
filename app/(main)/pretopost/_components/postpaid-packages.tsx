'use client';

import { useState } from 'react';
import type { PostpaidPackageOption } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormField } from '@/components/molecules/form-field';
import { FieldError } from '@/components/atoms/field-error';
import { cn } from '@/lib/utils';
import { AllPostpaidPackagesModal } from './modals/all-postpaid-packages-modal';
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

/**
 * Prepaid-to-postpaid package picker + contact details form.
 * Feature organism owned by the pretopost page (not shared).
 */
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
  const [isAllPackagesOpen, setIsAllPackagesOpen] = useState(false);

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
      <div className="rounded-2xl border border-border bg-muted p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <p className="text-base font-bold text-foreground">
            Pilih Paket Postpaid<span className="text-destructive">*</span>
          </p>
          <Button
            type="button"
            variant="link"
            className="h-auto p-0 text-sm font-medium"
            onClick={() => setIsAllPackagesOpen(true)}
          >
            Lihat semua paket
          </Button>
        </div>

        <FieldError message={fieldErrors?.packageId} />

        <div className="mt-4 flex flex-wrap gap-2">
          {packageCategories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                aria-pressed={isSelected}
                className={cn(
                  'rounded-pill border px-4 py-2 text-sm font-medium transition-colors',
                  isSelected
                    ? 'border-primary bg-card text-primary'
                    : 'border-border bg-faint text-foreground hover:bg-accent'
                )}
                onClick={() => handleSelectCategory(category)}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          {options.map((option) => {
            const isSelected = selectedId === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSelect(option)}
                aria-pressed={isSelected}
                className={cn(
                  'rounded-xl border-2 p-4 text-left transition-colors',
                  isSelected
                    ? 'border-transparent'
                    : 'border-border bg-faint hover:border-primary/40'
                )}
                style={
                  isSelected
                    ? {
                        backgroundImage:
                          'linear-gradient(hsl(var(--card)), hsl(var(--card))), var(--gradient-brand)',
                        backgroundOrigin: 'border-box',
                        backgroundClip: 'padding-box, border-box',
                      }
                    : undefined
                }
              >
                <img
                  src={option.image}
                  alt={option.id}
                  className="mb-3 h-30 w-full border-b border-border pb-3"
                />

                {option.salePrice > 0 && (
                  <p className="text-xs text-ink-muted line-through">
                    {formatRupiah(option.salePrice)}
                  </p>
                )}
                <p className="mt-0.5 text-sm font-bold text-info">{formatRupiah(option.price)}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 space-y-4 rounded-2xl border border-border bg-muted p-5 sm:p-6">
        <FormField id="email" label="Email" required error={fieldErrors?.email}>
          <Input
            id="email"
            type="email"
            placeholder="Masukkan email"
            value={email}
            invalid={Boolean(fieldErrors?.email)}
            onChange={(e) => onEmailChange?.(e.target.value)}
          />
        </FormField>

        <FormField id="nomor-hp" label="Nomor HP Alternatif" error={fieldErrors?.phoneNumber}>
          <Input
            id="nomor-hp"
            type="tel"
            placeholder="Masukkan nomor HP"
            value={phoneNumber}
            invalid={Boolean(fieldErrors?.phoneNumber)}
            onChange={(e) => onPhoneNumberChange?.(e.target.value)}
          />
        </FormField>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <Button type="button" variant="outline" size="lg" className="flex-1 border-2">
          Save as Draft
        </Button>
        <Button
          type="button"
          size="lg"
          disabled={isSubmitting}
          onClick={onSubmit}
          className="flex-1"
        >
          {isSubmitting ? 'Proses...' : 'Proses'}
        </Button>
      </div>

      <AllPostpaidPackagesModal open={isAllPackagesOpen} onOpenChange={setIsAllPackagesOpen} />
    </div>
  );
}
