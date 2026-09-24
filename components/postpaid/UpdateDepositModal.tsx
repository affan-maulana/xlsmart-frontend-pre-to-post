"use client";

import { useState } from "react";
import { X, Check } from "lucide-react";

const PRESET_NOMINALS = [100000, 200000, 300000, 400000, 600000, 700000, 800000];

function formatRupiah(amount: number) {
  return amount.toLocaleString("id-ID");
}

interface UpdateDepositModalProps {
  msisdn: string;
  email?: string;
  paymentMethod: string;
  currentLimit: number;
  currentDeposit?: number;
  onClose: () => void;
  onSuccess: (newLimit: number) => void;
}

export function UpdateDepositModal({
  msisdn,
  email,
  paymentMethod,
  currentLimit,
  currentDeposit,
  onClose,
  onSuccess,
}: UpdateDepositModalProps) {
  const isCash = paymentMethod.trim().toLowerCase() === "cash";

  const [step, setStep] = useState<"edit" | "success">("edit");
  const [mode, setMode] = useState<"preset" | "input">("preset");
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [customValue, setCustomValue] = useState("");
  const [confirmedValue, setConfirmedValue] = useState(currentLimit);

  const customNumber = Number(customValue.replace(/[^0-9]/g, "")) || 0;
  const isCustomValid = customNumber > 0 && customNumber % 100000 === 0;

  const canSubmit =
    !isCash && mode === "input"
      ? isCustomValid
      : selectedPreset !== null && selectedPreset !== currentLimit;

  function handleCustomValueChange(raw: string) {
    // Keep only digits, then re-render as a live "Rp 1.234.567" formatted string.
    const digitsOnly = raw.replace(/[^0-9]/g, "");
    if (!digitsOnly) {
      setCustomValue("");
      return;
    }
    const numeric = Number(digitsOnly);
    setCustomValue(`Rp ${formatRupiah(numeric)}`);
  }

  function handleUpdate() {
    const newValue = !isCash && mode === "input" ? customNumber : selectedPreset!;
    setConfirmedValue(newValue);
    setStep("success");
  }

  function handleFinish() {
    onSuccess(confirmedValue);
  }

  if (step === "success") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
          <div className="flex items-start justify-between">
            <h4 className="w-full text-center text-lg font-bold text-ink-900">Kredit Limit</h4>
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
            <p className="mt-4 text-base font-bold text-ink-900">Kredit Limit Berhasil diupdate</p>
            <p className="mt-1 text-sm text-ink-700/60">
              Kredit Limit berhasil diupdate menjadi{" "}
              <span className="font-semibold text-ink-900">Rp {formatRupiah(confirmedValue)}</span>{" "}
              untuk pelanggan dengan nomor{" "}
              <span className="font-semibold text-ink-900">{"087825696966"}</span>
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
          <h4 className="w-full text-center text-lg font-bold text-ink-900">Kredit Limit</h4>
          <button
            type="button"
            onClick={onClose}
            className="-mt-1 -mr-1 ml-2 rounded-full p-1 text-ink-900 hover:bg-black/5"
            aria-label="Tutup"
          >
            <X size={18} />
          </button>
        </div>

        <p className="mt-4 text-base font-bold text-ink-900">Update Deposit</p>

        {/* Info box: dividers only run across the top row; the second row
            (Current Limit / Current Deposit) sits below with no vertical rules. */}
        <div className="mt-4 rounded-xl border border-black/10 bg-black/[0.02] p-4">
          <div className="flex divide-x divide-black/10">
            <div className="flex-1 pr-4">
              <p className="text-xs text-ink-700/50">MSISDN</p>
              <p className="mt-1 text-sm font-bold text-ink-900">{"087825696966"}</p>
            </div>

            <div className="flex-1 px-4">
              <p className="text-xs text-ink-700/50">{isCash ? "Metode Pembayaran" : "Email"}</p>
              <p className="mt-1 text-sm font-bold text-ink-900">
                {isCash ? paymentMethod : email || "-"}
              </p>
            </div>

            <div className="flex-1 pl-4">
              <p className="text-xs text-ink-700/50">
                {isCash ? "Current Limit" : "Metode Pembayaran"}
              </p>
              <p className="mt-1 text-sm font-bold text-ink-900">
                {isCash ? `Rp ${formatRupiah(currentLimit)}` : paymentMethod}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-xs text-ink-700/50">
              {isCash ? "Current Deposit" : "Current Limit"}
            </p>
            <p className="mt-1 text-sm font-bold text-ink-900">
              Rp {formatRupiah(isCash ? currentDeposit ?? 0 : currentLimit)}
            </p>
          </div>
        </div>

        {!isCash && (
          <div className="mt-5">
            <p className="mb-2 text-sm font-semibold text-ink-900">Nominal*</p>
            <div className="grid grid-cols-2 gap-2 rounded-lg bg-black/5 p-1">
              <button
                type="button"
                onClick={() => setMode("preset")}
                className={`rounded-md py-2 text-sm font-semibold transition-colors ${
                  mode === "preset"
                    ? "border border-brand-indigo bg-white text-brand-indigo shadow-sm"
                    : "text-ink-700/60"
                }`}
              >
                Pilih Nominal
              </button>
              <button
                type="button"
                onClick={() => setMode("input")}
                className={`rounded-md py-2 text-sm font-semibold transition-colors ${
                  mode === "input"
                    ? "border border-brand-indigo bg-white text-brand-indigo shadow-sm"
                    : "text-ink-700/60"
                }`}
              >
                Input Nominal
              </button>
            </div>
          </div>
        )}

        {isCash || mode === "preset" ? (
          <div className="mt-4">
            <p className="mb-2 text-sm text-ink-700/60">Pilih Nominal Limit</p>
            <div className="grid grid-cols-3 gap-3">
              {PRESET_NOMINALS.map((amount) => {
                const isCurrent = amount === currentLimit;
                const isSelected = selectedPreset === amount;
                return (
                  <div
                    key={amount}
                    className={`relative rounded-lg p-[2px] transition-colors ${
                      isCurrent
                        ? "bg-black/10"
                        : isSelected
                        ? "bg-gradient-to-b from-[#1E22AA] to-[#E5005A]"
                        : "bg-black/10 hover:bg-gradient-to-b hover:from-[#1E22AA] hover:to-[#E5005A]"
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
                          ? "cursor-not-allowed text-ink-700/30"
                          : isSelected
                          ? "text-brand-indigo"
                          : "text-ink-900 hover:text-brand-indigo"
                      }`}
                    >
                      Rp {formatRupiah(amount)}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="mt-4">
            <p className="mb-2 text-sm text-ink-700/60">Nominal Deposit</p>
            <input
              type="text"
              inputMode="numeric"
              value={customValue}
              onChange={(e) => handleCustomValueChange(e.target.value)}
              placeholder="Rp 0"
              className={`w-full rounded-lg border px-3 py-2.5 text-sm font-semibold text-ink-900 focus:outline-none ${
                customValue && !isCustomValid
                  ? "border-rose-400 focus:border-rose-400"
                  : "border-black/10 focus:border-brand-indigo"
              }`}
            />
            <p
              className={`mt-1.5 text-xs ${
                customValue && !isCustomValid ? "text-rose-500" : "text-ink-700/50"
              }`}
            >
              Nominal harus kelipatan Rp 100.000
            </p>
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
