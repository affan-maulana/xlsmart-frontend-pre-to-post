'use client';

import { useState } from 'react';
import { X, Check } from 'lucide-react';

const DELIVERY_OPTIONS = ['Pos', 'Email'] as const;
type DeliveryMethod = (typeof DELIVERY_OPTIONS)[number];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface EditBillingDeliveryModalProps {
  msisdn: string;
  /** Customer's email, shown as read-only info and used to prefill "Email Pelanggan" when Email is selected. */
  email: string;
  currentDelivery: string;
  onClose: () => void;
  /** deliveryEmail is only passed when the chosen method is "Email". */
  onSuccess: (newDelivery: string, deliveryEmail?: string) => void;
}

/**
 * "Update Metode Pengiriman Tagihan" flow:
 * - Toggle between Pos / Email.
 * - Choosing Email reveals a required "Email Pelanggan" field, prefilled with
 *   the customer's email but editable.
 * Owns its own edit -> success step state.
 */
export function EditBillingDeliveryModal({
  msisdn,
  email,
  currentDelivery,
  onClose,
  onSuccess,
}: EditBillingDeliveryModalProps) {
  const [step, setStep] = useState<'edit' | 'success'>('edit');
  const [selectedMethod, setSelectedMethod] = useState<DeliveryMethod>(
    currentDelivery === 'Pos' ? 'Pos' : 'Email'
  );
  const [emailValue, setEmailValue] = useState(email);
  const [emailTouched, setEmailTouched] = useState(false);
  const [confirmedMethod, setConfirmedMethod] = useState<DeliveryMethod>(selectedMethod);
  const [confirmedEmail, setConfirmedEmail] = useState(email);

  const isEmailValid = EMAIL_PATTERN.test(emailValue.trim());
  const showEmailError = selectedMethod === 'Email' && emailTouched && !isEmailValid;

  const hasChanged =
    selectedMethod !== currentDelivery ||
    (selectedMethod === 'Email' && emailValue.trim() !== email.trim());

  const canSubmit = hasChanged && (selectedMethod !== 'Email' || isEmailValid);

  function handleUpdate() {
    if (!canSubmit) {
      setEmailTouched(true);
      return;
    }
    setConfirmedMethod(selectedMethod);
    setConfirmedEmail(emailValue.trim());
    setStep('success');
  }

  function handleFinish() {
    onSuccess(confirmedMethod, confirmedMethod === 'Email' ? confirmedEmail : undefined);
  }

  if (step === 'success') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
          <div className="flex items-start justify-between">
            <h4 className="w-full text-center text-lg font-bold text-ink-900">
              Metode Pengiriman Tagihan
            </h4>
            <button
              type="button"
              onClick={onClose}
              className="-mt-1 -mr-1 ml-2 rounded-full p-1 text-ink-900 hover:bg-black/5"
              aria-label="Tutup"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mt-5 flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500">
                <Check size={28} strokeWidth={3} className="text-white" />
              </div>
            </div>
            <p className="mt-4 text-base font-bold text-ink-900">
              Metode Pengiriman Tagihan Berhasil diupdate
            </p>
            <p className="mt-1 text-sm text-ink-700/60">
              {confirmedMethod === 'Email' ? (
                <>
                  Metode Pengiriman Tagihan berhasil diupdate menjadi email{' '}
                  <span className="font-semibold text-ink-900">{confirmedEmail}</span>
                </>
              ) : (
                <>
                  Metode Pengiriman Tagihan berhasil diupdate menjadi{' '}
                  <span className="font-semibold text-ink-900">Pos</span>
                </>
              )}
            </p>
          </div>

          <button
            type="button"
            onClick={handleFinish}
            className="mt-6 w-full rounded-lg bg-brand-indigo px-4 py-3 text-sm font-semibold text-white hover:bg-brand-indigo/90"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between">
          <h4 className="w-full text-center text-lg font-bold text-ink-900">
            Metode Pengiriman Tagihan
          </h4>
          <button
            type="button"
            onClick={onClose}
            className="-mt-1 -mr-1 ml-2 rounded-full p-1 text-ink-900 hover:bg-black/5"
            aria-label="Tutup"
          >
            <X size={18} />
          </button>
        </div>

        <p className="mt-4 text-base font-bold text-ink-900">Metode Pengiriman Tagihan</p>

        <div className="mt-4 rounded-xl border border-black/10 bg-black/[0.02] p-4">
          <div className="flex divide-x divide-black/10">
            <div className="flex-1 pr-4">
              <p className="text-xs text-ink-700/50">MSISDN</p>
              <p className="mt-1 text-sm font-bold text-ink-900">{msisdn}</p>
            </div>
            <div className="flex-1 pl-4">
              <p className="text-xs text-ink-700/50">Email</p>
              <p className="mt-1 text-sm font-bold text-ink-900">{email}</p>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <p className="mb-2 text-sm font-semibold text-ink-900">
            Metode Pengiriman<span className="text-rose-500">*</span>
          </p>
          <div className="grid grid-cols-2 gap-3">
            {DELIVERY_OPTIONS.map((option) => {
              const isSelected = selectedMethod === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSelectedMethod(option)}
                  className={`rounded-lg border-2 py-3 text-sm font-semibold transition-colors ${
                    isSelected
                      ? 'border-brand-indigo bg-brand-indigo/5 text-ink-900'
                      : 'border-black/10 text-ink-900 hover:border-black/20'
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {selectedMethod === 'Email' && (
          <div className="mt-5">
            <p className="mb-2 text-sm font-semibold text-ink-900">
              Email Pelanggan<span className="text-rose-500">*</span>
            </p>
            <input
              type="email"
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              onBlur={() => setEmailTouched(true)}
              placeholder="Email pelanggan"
              aria-invalid={showEmailError}
              className={`w-full rounded-lg border px-3 py-2.5 text-sm font-semibold text-ink-900 focus:outline-none ${
                showEmailError
                  ? 'border-rose-400 focus:border-rose-400'
                  : 'border-black/10 focus:border-brand-indigo'
              }`}
            />
            {showEmailError && (
              <p className="mt-1.5 text-xs text-rose-500">Masukkan email yang valid</p>
            )}
          </div>
        )}

        <button
          type="button"
          disabled={!canSubmit}
          onClick={handleUpdate}
          className="mt-6 w-full rounded-lg bg-brand-indigo px-4 py-3 text-sm font-semibold text-white transition-opacity hover:bg-brand-indigo/90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Update
        </button>
      </div>
    </div>
  );
}
