'use client';

import { useState } from 'react';
import { X, Check, ChevronDown } from 'lucide-react';

const CREDIT_CLASS_OPTIONS = ['CX 1', 'CX 4', 'CX 5', 'NLV'];

interface EditCreditClassModalProps {
  msisdn: string;
  email: string;
  currentCreditClass: string;
  onClose: () => void;
  onSuccess: (newCreditClass: string) => void;
}

/**
 * "Update Credit Class" flow: single dropdown (CX 1 / CX 4 / CX 5 / NLV), no custom input.
 * Owns its own edit -> success step state.
 */
export function EditCreditClassModal({
  msisdn,
  email,
  currentCreditClass,
  onClose,
  onSuccess,
}: EditCreditClassModalProps) {
  const [step, setStep] = useState<'edit' | 'success'>('edit');
  const [selectedClass, setSelectedClass] = useState(currentCreditClass);
  const [confirmedValue, setConfirmedValue] = useState(currentCreditClass);

  const canSubmit = selectedClass !== currentCreditClass;

  function handleUpdate() {
    if (!canSubmit) return;
    setConfirmedValue(selectedClass);
    setStep('success');
  }

  function handleFinish() {
    onSuccess(confirmedValue);
  }

  if (step === 'success') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
          <div className="flex items-start justify-between">
            <h4 className="w-full text-center text-lg font-bold text-foreground">Credit Class</h4>
            <button
              type="button"
              onClick={onClose}
              className="-mt-1 -mr-1 ml-2 rounded-full p-1 text-foreground hover:bg-black/5"
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
            <p className="mt-4 text-base font-bold text-foreground">Credit Class Berhasil diupdate</p>
            <p className="mt-1 text-sm text-ink-soft/60">
              Credit Class berhasil diupdate menjadi{' '}
              <span className="font-semibold text-foreground">{confirmedValue}</span> untuk pelanggan
              dengan nomor <span className="font-semibold text-foreground">{msisdn}</span>
            </p>
          </div>

          <button
            type="button"
            onClick={handleFinish}
            className="mt-6 w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white hover:bg-primary/90"
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
          <h4 className="w-full text-center text-lg font-bold text-foreground">Credit Class</h4>
          <button
            type="button"
            onClick={onClose}
            className="-mt-1 -mr-1 ml-2 rounded-full p-1 text-foreground hover:bg-black/5"
            aria-label="Tutup"
          >
            <X size={18} />
          </button>
        </div>

        <p className="mt-4 text-base font-bold text-foreground">Tipe Credit Class</p>

        <div className="mt-4 rounded-xl border border-black/10 bg-black/[0.02] p-4">
          <div className="flex divide-x divide-black/10">
            <div className="flex-1 pr-4">
              <p className="text-xs text-ink-soft/50">MSISDN</p>
              <p className="mt-1 text-sm font-bold text-foreground">{msisdn}</p>
            </div>
            <div className="flex-1 pl-4">
              <p className="text-xs text-ink-soft/50">Email</p>
              <p className="mt-1 text-sm font-bold text-foreground">{email}</p>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <p className="mb-2 text-sm font-semibold text-foreground">
            Tipe Credit Class<span className="text-rose-500">*</span>
          </p>
          <div className="relative">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full appearance-none rounded-lg border border-black/10 bg-white px-3 py-2.5 pr-9 text-sm font-semibold text-foreground focus:border-primary focus:outline-none"
            >
              {CREDIT_CLASS_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-soft/50"
            />
          </div>
        </div>

        <button
          type="button"
          disabled={!canSubmit}
          onClick={handleUpdate}
          className="mt-6 w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white transition-opacity hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Update
        </button>
      </div>
    </div>
  );
}
