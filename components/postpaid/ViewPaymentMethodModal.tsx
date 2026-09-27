'use client';

import { X } from 'lucide-react';

interface ViewPaymentMethodModalProps {
  msisdn: string;
  paymentMethod: string;
  creditCardNumber?: string;
  creditCardExpiry?: string;
  onClose: () => void;
}

function maskCreditCardNumber(cardNumber: string) {
  const digitsOnly = cardNumber.replace(/[^0-9]/g, '');
  if (!digitsOnly) return '-';
  const last4 = digitsOnly.slice(-4);
  return `xxxx-xxxx-${last4}`;
}

export function ViewPaymentMethodModal({
  msisdn,
  paymentMethod,
  creditCardNumber,
  creditCardExpiry,
  onClose,
}: ViewPaymentMethodModalProps) {
  const isCash = paymentMethod.trim().toLowerCase() === 'cash';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between">
          <h4 className="w-full text-center text-lg font-bold text-ink-900">Metode Pembayaran</h4>
          <button
            type="button"
            onClick={onClose}
            className="-mt-1 -mr-1 ml-2 rounded-full p-1 text-ink-900 hover:bg-black/5"
            aria-label="Tutup"
          >
            <X size={18} />
          </button>
        </div>

        <p className="mt-4 text-base font-bold text-ink-900">Metode Pembayaran</p>

        <div className="mt-4 rounded-xl border border-black/10 bg-black/[0.02] p-4">
          {isCash ? (
            <div className="flex divide-x divide-black/10">
              <div className="flex-1 pr-4">
                <p className="text-xs text-ink-700/50">MSISDN</p>
                <p className="mt-1 text-sm font-bold text-ink-900">{msisdn || '087825696966'}</p>
              </div>
              <div className="flex-1 pl-4">
                <p className="text-xs text-ink-700/50">Metode Pembayaran</p>
                <p className="mt-1 text-sm font-bold text-ink-900">{paymentMethod}</p>
              </div>
            </div>
          ) : (
            <div className="flex divide-x divide-black/10">
              <div className="flex-1 pr-4">
                <p className="text-xs text-ink-700/50">MSISDN</p>
                <p className="mt-1 text-sm font-bold text-ink-900">{msisdn || '087825696966'}</p>
              </div>
              <div className="flex-1 px-4">
                <p className="text-xs text-ink-700/50">Nomor Credit Card</p>
                <p className="mt-1 text-sm font-bold text-ink-900">
                  {creditCardNumber ? maskCreditCardNumber(creditCardNumber) : '-'}
                </p>
              </div>
              <div className="flex-1 pl-4">
                <p className="text-xs text-ink-700/50">Tanggal Kadaluarsa</p>
                <p className="mt-1 text-sm font-bold text-ink-900">{creditCardExpiry || '-'}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
