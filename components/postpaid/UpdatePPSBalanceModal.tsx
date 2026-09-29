'use client';

import { useState } from 'react';
import { X, Check } from 'lucide-react';

const PRESET_NOMINALS = [100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000];

function formatRupiah(amount: number) {
  return amount.toLocaleString('id-ID');
}

interface UpdatePPSBalanceModalProps {
  msisdn: string;
  currentPPSBalance: number;
  currentCreditLimit: number;
  onClose: () => void;
  onSuccess: (newBalance: number, reason: string) => void;
}

/**
 * "Update PPS Balance" flow:
 * - Preset nominal buttons only (no custom input mode).
 * - "Alasan Update" is required — the Update button stays disabled until a
 *   nominal is picked (different from the current balance) AND a reason is filled in.
 * Owns its own edit -> success step state.
 */
export function UpdatePPSBalanceModal({
  msisdn,
  currentPPSBalance,
  currentCreditLimit,
  onClose,
  onSuccess,
}: UpdatePPSBalanceModalProps) {
  const [step, setStep] = useState<'edit' | 'success'>('edit');
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [reason, setReason] = useState('');
  const [reasonTouched, setReasonTouched] = useState(false);
  const [confirmedValue, setConfirmedValue] = useState(currentPPSBalance);

  const isReasonValid = reason.trim().length > 0;
  const showReasonError = reasonTouched && !isReasonValid;

  const canSubmit =
    selectedPreset !== null && selectedPreset !== currentPPSBalance && isReasonValid;

  function handleUpdate() {
    // Guard in case this is ever reached without a valid form (e.g. programmatic submit).
    if (!canSubmit || selectedPreset === null) {
      setReasonTouched(true);
      return;
    }
    setConfirmedValue(selectedPreset);
    setStep('success');
  }

  function handleFinish() {
    onSuccess(confirmedValue, reason.trim());
  }

  if (step === 'success') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
          <div className="flex items-start justify-between">
            <h4 className="w-full text-center text-lg font-bold text-foreground">PPS Balance</h4>
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
            <p className="mt-4 text-base font-bold text-foreground">PPS Balance Berhasil diupdate</p>
            <p className="mt-1 text-sm text-ink-soft/60">
              PPS Balance berhasil diupdate menjadi{' '}
              <span className="font-semibold text-foreground">Rp {formatRupiah(confirmedValue)}</span>{' '}
              untuk pelanggan dengan nomor{' '}
              <span className="font-semibold text-foreground">{'087825696966'}</span>
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
          <h4 className="w-full text-center text-lg font-bold text-foreground">PPS Balance</h4>
          <button
            type="button"
            onClick={onClose}
            className="-mt-1 -mr-1 ml-2 rounded-full p-1 text-foreground hover:bg-black/5"
            aria-label="Tutup"
          >
            <X size={18} />
          </button>
        </div>

        <p className="mt-4 text-base font-bold text-foreground">PPS Balance</p>

        <div className="mt-4 rounded-xl border border-black/10 bg-black/[0.02] p-4">
          <div className="flex divide-x divide-black/10">
            <div className="flex-1 pr-4">
              <p className="text-xs text-ink-soft/50">MSISDN</p>
              <p className="mt-1 text-sm font-bold text-foreground">{'087825696966'}</p>
            </div>

            <div className="flex-1 px-4">
              <p className="text-xs text-ink-soft/50">Current PPS Balance</p>
              <p className="mt-1 text-sm font-bold text-foreground">
                Rp {formatRupiah(currentPPSBalance)}
              </p>
            </div>

            <div className="flex-1 pl-4">
              <p className="text-xs text-ink-soft/50">Current Credit Limit</p>
              <p className="mt-1 text-sm font-bold text-foreground">
                Rp {formatRupiah(currentCreditLimit)}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <p className="mb-2 text-sm text-ink-soft/60">Pilih Nominal Limit</p>
          <div className="grid grid-cols-4 gap-3">
            {PRESET_NOMINALS.map((amount) => {
              const isCurrent = amount === currentPPSBalance;
              const isSelected = selectedPreset === amount;
              return (
                <div
                  key={amount}
                  className={`relative rounded-lg p-[2px] transition-colors ${
                    isCurrent
                      ? 'bg-black/10'
                      : isSelected
                        ? 'bg-gradient-to-b from-primary to-magenta'
                        : 'bg-black/10 hover:bg-gradient-to-b hover:from-primary hover:to-magenta'
                  }`}
                >
                  {isCurrent && (
                    <span className="absolute -top-2.5 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-semibold text-white">
                      Current Limit
                    </span>
                  )}
                  <button
                    type="button"
                    disabled={isCurrent}
                    onClick={() => setSelectedPreset(amount)}
                    className={`flex h-full w-full items-center justify-center rounded-[6px] bg-white px-3 py-2.5 text-sm font-semibold transition-colors ${
                      isCurrent
                        ? 'cursor-not-allowed text-ink-soft/30'
                        : isSelected
                          ? 'text-primary'
                          : 'text-foreground hover:text-primary'
                    }`}
                  >
                    Rp {formatRupiah(amount)}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-5">
          <p className="mb-2 text-sm font-semibold text-foreground">
            Alasan Update<span className="text-rose-500">*</span>
          </p>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            onBlur={() => setReasonTouched(true)}
            placeholder="Alasan"
            aria-invalid={showReasonError}
            className={`w-full rounded-lg border px-3 py-2.5 text-sm font-semibold text-foreground focus:outline-none ${
              showReasonError
                ? 'border-rose-400 focus:border-rose-400'
                : 'border-black/10 focus:border-primary'
            }`}
          />
          {showReasonError && <p className="mt-1.5 text-xs text-rose-500">Alasan wajib diisi</p>}
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
