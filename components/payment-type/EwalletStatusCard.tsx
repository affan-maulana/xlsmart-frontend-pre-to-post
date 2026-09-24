"use client";

import { formatRupiah, CountdownBadge } from "./PaymentStatusShared";

interface EwalletStatusCardProps {
  secondsLeft: number;
  methodName: string;
  accountNumber: string;
  totalTagihan: number;
}

export function EwalletStatusCard({
  secondsLeft,
  methodName,
  accountNumber,
  totalTagihan,
}: EwalletStatusCardProps) {
  const instructions = [
    `Buka aplikasi ${methodName} di HP pelanggan`,
    "Cek notifikasi pembayaran yang baru masuk",
    `Periksa nominal ${formatRupiah(totalTagihan)} sudah sesuai`,
    `Konfirmasi dan masukkan PIN ${methodName} untuk menyelesaikan transaksi`,
  ];

  return (
    <div className="mt-8 max-w-2xl rounded-2xl border border-black/10 bg-[#FAFAFB] p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-lg font-extrabold text-ink-900">Menunggu Pembayaran</p>
          <p className="mt-1 text-sm text-ink-700/60">
            Selesaikan pembayaran sebelum batas waktu habis.
          </p>
        </div>
        <CountdownBadge secondsLeft={secondsLeft} />
      </div>

      <div className="mt-4 flex items-center gap-3 rounded-xl border border-black/10 bg-white px-4 py-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#118EEA]">
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white">
            <rect x="3" y="7" width="18" height="12" rx="2" />
            <rect x="3" y="5" width="12" height="3" rx="1.5" />
          </svg>
        </span>
        <div>
          <p className="text-base font-extrabold text-ink-900">{methodName}</p>
          <p className="text-sm text-ink-700/60">{accountNumber}</p>
        </div>
      </div>

      <p className="mt-5 text-base font-extrabold text-ink-900">Cara Pembayaran</p>
      <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-sm text-ink-900/80">
        {instructions.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>
    </div>
  );
}