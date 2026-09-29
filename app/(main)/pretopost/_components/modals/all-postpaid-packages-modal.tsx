'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import type { PostpaidPackage } from '@/lib/types';
import { allPackages } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface AllPostpaidPackagesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectPackage?: (pkg: PostpaidPackage) => void;
}

const categories = ['Semua', 'Ultimate', 'Diamond', 'Gold'];
const durations = ['Semua', '28 Hari', '30 Hari'];

function formatRupiah(amount: number) {
  return `Rp ${amount.toLocaleString('id-ID')}`;
}

/** Searchable package catalog shown from the pretopost flow (Radix Dialog). */
export function AllPostpaidPackagesModal({
  open,
  onOpenChange,
  onSelectPackage,
}: AllPostpaidPackagesModalProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedDuration, setSelectedDuration] = useState('Semua');
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);

  const filtered = allPackages.filter((pkg) => {
    const matchSearch = pkg.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = selectedCategory === 'Semua' || pkg.name.includes(selectedCategory);
    const matchDuration = selectedDuration === 'Semua' || pkg.duration === selectedDuration;
    return matchSearch && matchCategory && matchDuration;
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl scrollbar-none">
        <DialogHeader>
          <DialogTitle className="text-center">Paket Postpaid</DialogTitle>
        </DialogHeader>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-icon -translate-y-1/2 text-ink-muted" />
          <Input
            type="text"
            placeholder="Cari paket..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-faint pl-10"
          />
        </div>

        <div className="flex gap-3">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="flex-1 bg-faint">
              <SelectValue placeholder="Pilih Kategori" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedDuration} onValueChange={setSelectedDuration}>
            <SelectTrigger className="flex-1 bg-faint">
              <SelectValue placeholder="Pilih masa berlangganan" />
            </SelectTrigger>
            <SelectContent>
              {durations.map((dur) => (
                <SelectItem key={dur} value={dur}>
                  {dur}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-3 gap-3">
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
                {pkg.image && (
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="mb-3 h-30 w-full border-b border-border pb-3"
                  />
                )}

                <div className="mb-3 space-y-1 border-b border-border pb-3">
                  <p className="flex items-center gap-1 text-sm">
                    <span className="font-bold text-foreground">{pkg.detail.quota}</span>
                    <span className="text-xs text-muted-foreground">Kuota Data</span>
                  </p>
                  <p className="flex items-center gap-1 text-sm">
                    <span className="font-bold text-foreground">{pkg.detail.call}</span>
                    <span className="text-xs text-muted-foreground">Panggilan</span>
                  </p>
                  <p className="flex items-center gap-1 text-sm">
                    <span className="font-bold text-foreground">{pkg.detail.callToAll}</span>
                    <span className="text-xs text-muted-foreground">Panggilan ke Semua</span>
                  </p>
                  <p className="flex items-center gap-1 text-sm">
                    <span className="font-bold text-foreground">{pkg.detail.smsToAll}</span>
                    <span className="text-xs text-muted-foreground">SMS ke Semua</span>
                  </p>
                </div>
                {pkg.salePrice > 0 && (
                  <p className="text-xs text-ink-muted line-through">
                    {formatRupiah(pkg.salePrice)}
                  </p>
                )}
                <p
                  className={cn(
                    'mt-0.5 text-sm font-bold text-info',
                    pkg.salePrice === 0 && 'mb-4'
                  )}
                >
                  {formatRupiah(pkg.price)}
                </p>
              </button>
            );
          })}

          {filtered.length === 0 && (
            <p className="col-span-3 py-8 text-center text-sm text-ink-muted">
              Tidak ada paket ditemukan
            </p>
          )}
        </div>

        {selectedPackageId && (
          <Button className="w-full" size="lg" onClick={() => onOpenChange(false)}>
            Pilih Paket
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}
