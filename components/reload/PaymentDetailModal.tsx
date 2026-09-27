'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import type { PaymentMethodOption } from '@/lib/types';

interface PaymentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  method: PaymentMethodOption | null;
  defaultPhoneNumber?: string;
  onConfirm: (payload: { phoneNumber?: string }) => void;
}

export function PaymentDetailModal({
  isOpen,
  onClose,
  method,
  defaultPhoneNumber = '',
  onConfirm,
}: PaymentDetailModalProps) {
  const [phoneNumber, setPhoneNumber] = useState(defaultPhoneNumber);

  if (!isOpen || !method) return null;

  const isEwallet = method.type === 'ewallet';
  const canSubmit = !isEwallet || phoneNumber.trim().length > 0;

  function handleSubmit() {
    onConfirm({ phoneNumber: isEwallet ? phoneNumber : undefined });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-4 pt-16 sm:pt-24">
      <div className="w-full max-w-2xl rounded-2xl bg-white">
        {/* Header */}
        <div className="relative flex items-center justify-center px-6 py-5">
          <h2 className="text-xl font-extrabold text-ink-900">Pembayaran</h2>
          <button
            type="button"
            onClick={onClose}
            className="absolute right-6 flex h-8 w-8 items-center justify-center rounded-full bg-ink-900 text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-6 pb-6">
          <h3 className="text-lg font-extrabold text-ink-900">Bayar Dengan {method.name}</h3>

          {isEwallet && (
            <>
              <p className="mt-2 text-sm text-ink-700/60">
                Masukkan nomor HP yang terhubung ke akun {method.name} pelanggan.
              </p>

              <label className="mt-5 block text-sm font-bold text-ink-900">
                Nomor HP Akun {method.name}
              </label>
              <div className="mt-2 flex items-center rounded-xl border border-black/20 px-4 py-3 focus-within:border-brand-indigo/50">
                <span className="pr-3 text-sm font-bold text-ink-900">62</span>
                <span className="h-5 w-px bg-black/15" />
                <input
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="817282319920022"
                  inputMode="numeric"
                  className="ml-3 flex-1 text-sm text-ink-900 outline-none placeholder:text-ink-700/40"
                />
              </div>
            </>
          )}

          {method.type === 'virtual_account' && (
            <p className="mt-2 text-sm text-ink-700/60">
              Nomor Virtual Account akan dibuatkan setelah kamu menekan tombol Bayar.
            </p>
          )}

          {method.type === 'qris' && (
            <p className="mt-2 text-sm text-ink-700/60">
              Kode QR akan ditampilkan setelah kamu menekan tombol Bayar.
            </p>
          )}

          {method.type === 'credit_card' && (
            <p className="mt-2 text-sm text-ink-700/60">
              Kamu akan diarahkan ke halaman input kartu kredit.
            </p>
          )}

          {(method.type === 'cash' || method.type === 'invoice') && (
            <p className="mt-2 text-sm text-ink-700/60">
              Konfirmasi untuk melanjutkan proses {method.name.toLowerCase()}.
            </p>
          )}
        </div>

        <div className="border-t border-black/10 p-5">
          <button
            type="button"
            disabled={!canSubmit}
            onClick={handleSubmit}
            className="w-full rounded-lg bg-brand-indigo px-5 py-3 text-sm font-bold text-white hover:bg-brand-indigo/90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Bayar
          </button>
        </div>
      </div>
    </div>
  );
}
