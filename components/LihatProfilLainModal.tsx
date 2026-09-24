"use client";

import { useState } from "react";
import { UserRoundPlus, X } from "lucide-react";

interface LihatProfilLainModalProps {
  onLookup: (query: string) => void;
}

export function LihatProfilLainModal({ onLookup }: LihatProfilLainModalProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  function handleSubmit() {
    if (!query.trim()) return;
    onLookup(query.trim());
    setOpen(false);
    setQuery("");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-lg border border-white/60 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
      >
        <UserRoundPlus size={16} />
        Lihat Profile Lain
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-ink-900">Lihat Profil Lain</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white hover:bg-black/80"
                aria-label="Tutup"
              >
                <X size={14} />
              </button>
            </div>

            <div className="mt-5">
              <h3 className="text-xl font-extrabold text-ink-900">Lihat Profil Lain</h3>
              <p className="mt-1 text-sm text-ink-700/60">
                Lihat profil lain dengan memasukkan informasi pelanggan
              </p>
            </div>

            <div className="mt-5">
              <label className="text-sm font-medium text-ink-900">
                NIK, MSISDN atau ID XL Satu
              </label>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="317282319920022"
                className="mt-2 w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm text-ink-900 outline-none focus:border-brand-indigo"
              />
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="mt-5 w-full rounded-lg bg-brand-indigo py-3 text-sm font-semibold text-white hover:opacity-90"
            >
              Lihat Profile
            </button>
          </div>
        </div>
      )}
    </>
  );
}