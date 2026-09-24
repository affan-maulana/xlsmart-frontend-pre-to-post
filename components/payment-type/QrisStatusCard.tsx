"use client";

import { CountdownBadge, formatRupiah } from "./PaymentStatusShared";

function MockQrPattern() {
  // Pola QR statis/dekoratif, bukan QR asli yang bisa di-scan.
  const cells: boolean[] = [];
  let seed = 42;
  for (let i = 0; i < 21 * 21; i++) {
    seed = (seed * 9301 + 49297) % 233280;
    cells.push(seed / 233280 > 0.5);
  }

  const size = 21;
  const cellSize = 8;

  function isFinderZone(row: number, col: number) {
    const zones = [
      [0, 0],
      [0, size - 7],
      [size - 7, 0],
    ];
    return zones.some(([r, c]) => row >= r && row < r + 7 && col >= c && col < c + 7);
  }

  return (
    <svg viewBox={`0 0 ${size * cellSize} ${size * cellSize}`} className="h-full w-full">
      <rect width={size * cellSize} height={size * cellSize} fill="white" />
      {cells.map((filled, i) => {
        const row = Math.floor(i / size);
        const col = i % size;
        if (isFinderZone(row, col) || !filled) return null;
        return (
          <rect
            key={i}
            x={col * cellSize}
            y={row * cellSize}
            width={cellSize}
            height={cellSize}
            fill="black"
          />
        );
      })}
      {[
        [0, 0],
        [0, size - 7],
        [size - 7, 0],
      ].map(([r, c], idx) => (
        <g key={idx}>
          <rect x={c * cellSize} y={r * cellSize} width={7 * cellSize} height={7 * cellSize} fill="black" />
          <rect
            x={(c + 1) * cellSize}
            y={(r + 1) * cellSize}
            width={5 * cellSize}
            height={5 * cellSize}
            fill="white"
          />
          <rect
            x={(c + 2) * cellSize}
            y={(r + 2) * cellSize}
            width={3 * cellSize}
            height={3 * cellSize}
            fill="black"
          />
        </g>
      ))}
    </svg>
  );
}

interface QrisStatusCardProps {
  secondsLeft: number;
  totalTagihan: number;
}

export function QrisStatusCard({ secondsLeft, totalTagihan }: QrisStatusCardProps) {
  const instructions = [
    "Buka aplikasi e-wallet atau m-banking apa pun yang mendukung QRIS",
    "Pilih menu Scan QR, lalu arahkan kamera ke kode di samping",
    `Periksa nominal ${formatRupiah(totalTagihan)} sudah sesuai`,
    "Konfirmasi dan selesaikan pembayaran dari aplikasi pelanggan",
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

      <div
        className="mx-auto mt-5 flex w-full max-w-xs flex-col items-center gap-4 rounded-2xl p-5"
        style={{ background: "linear-gradient(160deg, #C026D3 0%, #6D28D9 100%)" }}
      >
        <p className="text-lg font-black italic tracking-wide text-white">QRIS</p>
        <div className="w-full rounded-xl bg-white p-3">
          <MockQrPattern />
        </div>
        <p className="text-center text-xs font-semibold text-white/90">
          Kode QR ini hanya berlaku untuk satu kali transaksi
        </p>
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