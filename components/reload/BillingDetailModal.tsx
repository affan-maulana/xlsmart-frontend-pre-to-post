'use client';

import { X } from 'lucide-react';
import type { BillingLineItem } from '@/lib/types';

interface BillingDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: BillingLineItem[];
  adminFee: number;
}

function formatRupiah(amount: number) {
  return `Rp ${amount.toLocaleString('id-ID')}`;
}

export function BillingDetailModal({ isOpen, onClose, items, adminFee }: BillingDetailModalProps) {
  if (!isOpen) return null;

  const totalProduk = items.reduce((sum, item) => sum + item.qty, 0);
  const totalHargaProduk = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalTagihan = totalHargaProduk + adminFee;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white px-6 pb-6 pt-3"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div className="flex justify-center">
          <span className="h-1 w-10 rounded-full bg-black/15" />
        </div>

        {/* Header */}
        <div className="relative mt-3 flex items-center justify-center">
          <h2 className="text-lg font-bold text-ink-900">Detil Tagihan</h2>
          <button
            type="button"
            onClick={onClose}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-ink-900"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Table header */}
        <div className="mt-6 grid grid-cols-[1fr_auto_auto] gap-x-4 text-sm font-bold text-ink-700/50">
          <p>Produk</p>
          <p className="text-center">Jumlah</p>
          <p className="text-right">Harga</p>
        </div>

        {/* Item rows */}
        <div className="mt-2 flex flex-col">
          {items.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4 border-b border-black/10 py-3"
            >
              <p className="text-sm font-semibold text-ink-900">{item.name}</p>
              <p className="text-center text-sm font-bold text-ink-900">{item.qty}</p>
              <p className="text-right text-sm font-bold text-ink-900">
                {formatRupiah(item.price)}
              </p>
            </div>
          ))}

          {/* Total Produk */}
          <div className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4 border-b border-black/10 py-3">
            <p className="text-sm font-bold text-ink-700/60">Total Produk</p>
            <p className="text-center text-sm font-bold text-ink-900">{totalProduk}</p>
            <p className="text-right text-sm font-bold text-ink-900">
              {formatRupiah(totalHargaProduk)}
            </p>
          </div>

          {/* Biaya Admin */}
          <div className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4 border-b border-black/10 py-3">
            <p className="text-sm font-bold text-ink-700/60">Biaya Admin</p>
            <p />
            <p className="text-right text-sm font-bold text-ink-900">{formatRupiah(adminFee)}</p>
          </div>

          {/* Total Tagihan */}
          <div className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4 py-3">
            <p className="text-sm font-bold text-ink-700/60">Total Tagihan</p>
            <p />
            <p className="text-right text-sm font-extrabold text-brand-link">
              {formatRupiah(totalTagihan)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
