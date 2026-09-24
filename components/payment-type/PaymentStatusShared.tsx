"use client";

import type { OrderSummaryField } from "@/lib/types";
import { Timer } from "lucide-react";

export function formatRupiah(amount: number) {
  return `Rp ${amount.toLocaleString("id-ID")}`;
}

export function formatCountdown(totalSeconds: number) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `-${pad(h)}:${pad(m)}:${pad(s)}`;
}

export function OrderSummaryBar({ fields }: { fields: OrderSummaryField[] }) {
  return (
    <div
      className="mt-6 grid grid-cols-2 gap-6 rounded-2xl border border-black/10 bg-[#FAFAFB] p-5 sm:p-6"
      style={{ gridTemplateColumns: `repeat(${Math.min(fields.length, 5)}, minmax(0, 1fr))` }}
    >
      {fields.map((field) => (
        <div key={field.label}>
          <p className="text-sm text-ink-700/50">{field.label}</p>
          <p className="mt-1 text-lg font-extrabold text-ink-900">{field.value}</p>
        </div>
      ))}
    </div>
  );
}

export function CountdownBadge({ secondsLeft }: { secondsLeft: number }) {
  return (
    <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-rose-100 px-3 py-1.5 text-sm font-bold text-rose-600">
      <Timer className="h-4 w-4" />
      {formatCountdown(secondsLeft)}
    </span>
  );
}

export function PaymentStatusActions({
  onGantiMetode,
  onPrimaryAction,
  primaryLabel = "Update Status Pembayaran",
}: {
  onGantiMetode: () => void;
  onPrimaryAction: () => void;
  primaryLabel?: string;
}) {
  return (
    <div className="mt-6 flex gap-4">
      <button
        type="button"
        onClick={onGantiMetode}
        className="min-w-[260px] whitespace-nowrap rounded-lg border-2 border-brand-indigo px-6 py-3 text-sm font-bold text-brand-indigo hover:bg-brand-indigo/5"
      >
        Ganti Metode Pembayaran
      </button>
      <button
        type="button"
        onClick={onPrimaryAction}
        className="min-w-[260px] whitespace-nowrap rounded-lg bg-brand-indigo px-6 py-3 text-sm font-bold text-white hover:bg-brand-indigo/90"
      >
        {primaryLabel}
      </button>
    </div>
  );
}