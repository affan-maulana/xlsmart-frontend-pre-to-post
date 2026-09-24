"use client";

import { useState } from "react";
import { X, ArrowRight, Check } from "lucide-react";

interface EditCreditLimitTypeModalProps {
  currentType: string;
  onClose: () => void;
  onSuccess: (newType: string) => void;
}

function getOppositeType(type: string): string {
  const normalized = type.trim().toUpperCase();
  if (normalized === "FLT") return "FXD";
  if (normalized === "FXD") return "FLT";
  return type;
}


export function EditCreditLimitTypeModal({
  currentType,
  onClose,
  onSuccess,
}: EditCreditLimitTypeModalProps) {
  const [step, setStep] = useState<"edit" | "success">("edit");
  const newType = getOppositeType(currentType);

  function handleConfirm() {
    setStep("success");
  }

  function handleFinish() {
    onSuccess(newType);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between">
          <h4 className="w-full text-center text-lg font-bold text-ink-900">
            {step === "edit" ? "Ubah Tipe Kredit Limit" : "Tipe Kredit Limit"}
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

        {step === "edit" ? (
          <>
            <p className="mt-4 text-base font-bold text-ink-900">
              Apakah anda yakin ingin mengubah tipe kredit limit pelanggan ke {newType}?
            </p>

            <div className="mt-5 flex items-center gap-3">
              <div className="flex-1">
                <p className="mb-1 text-sm text-ink-700/60">Tipe Kredit Limit Lama</p>
                <div className="rounded-lg border border-black/10 px-3 py-2.5 text-sm font-semibold text-ink-900">
                  {currentType}
                </div>
              </div>
              <ArrowRight size={18} className="mt-5 shrink-0 text-ink-700/40" />
              <div className="flex-1">
                <p className="mb-1 text-sm text-ink-700/60">Tipe Kredit Limit Baru</p>
                <div className="rounded-lg border border-brand-indigo bg-brand-indigo/5 px-3 py-2.5 text-sm font-semibold text-brand-indigo">
                  {newType}
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-lg border border-brand-indigo px-4 py-2.5 text-sm font-semibold text-brand-indigo hover:bg-brand-indigo/5"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="flex-1 rounded-lg bg-brand-indigo px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-indigo/90"
              >
                Ubah
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="mt-5 flex flex-col items-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500">
                  <Check size={28} strokeWidth={3} className="text-white" />
                </div>
              </div>
              <p className="mt-4 text-base font-bold text-ink-900">
                Tipe Kredit Limit Berhasil diupdate
              </p>
              <p className="mt-1 text-sm text-ink-700/60">
                Tipe Kredit Limit berhasil diupdate menjadi{" "}
                <span className="font-semibold text-ink-900">{newType}</span>
              </p>
            </div>
            <button
              type="button"
              onClick={handleFinish}
              className="mt-6 w-full rounded-lg bg-brand-indigo px-4 py-3 text-sm font-semibold text-white hover:bg-brand-indigo/90"
            >
              Kembali
            </button>
          </>
        )}
      </div>
    </div>
  );
}
