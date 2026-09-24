"use client";

import type { PaymentMethodGroup, PaymentMethodOption } from "@/lib/types";
import { Wallet, QrCode, CreditCard, Landmark, Banknote, FileText, ChevronDown } from "lucide-react";

interface PaymentMethodSelectorProps {
  groups: PaymentMethodGroup[];
  selectedId: string | null;
  onSelect: (method: PaymentMethodOption) => void;
  totalTagihan: number;
  totalItem: number;
  onOpenDetail: () => void;
}

function formatRupiah(amount: number) {
  return `Rp ${amount.toLocaleString("id-ID")}`;
}

const groupIcon: Record<string, typeof Wallet> = {
  "Dompet Digital": Wallet,
  "QRIS (Scan QR)": QrCode,
  "Kartu Kredit": CreditCard,
  "Transfer Bank (Virtual Account)": Landmark,
  Tunai: Banknote,
  Invoice: FileText,
};

export function PaymentMethodSelector({
  groups,
  selectedId,
  onSelect,
  totalTagihan,
  totalItem,
  onOpenDetail,
}: PaymentMethodSelectorProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
      <div className="p-5 sm:p-6">
        <p className="text-lg font-bold text-ink-900">Pilih Metode Pembayaran</p>

        <div className="mt-5 flex flex-col gap-5">
          {groups.map((group) => {
            const Icon = groupIcon[group.title] ?? Wallet;
            return (
              <div key={group.id}>
                <p className="mb-3 text-sm font-semibold text-ink-900/70">{group.title}</p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {group.methods.map((method) => {
                    const isSelected = method.id === selectedId;
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => onSelect(method)}
                        className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3.5 text-left transition-colors ${
                          isSelected
                            ? "border-transparent"
                            : "border-black/10 hover:border-brand-indigo/40"
                        }`}
                        style={
                          isSelected
                            ? {
                                backgroundImage:
                                  "linear-gradient(white, white), linear-gradient(0deg, #1E22AA 0%, #E5005A 100%)",
                                backgroundOrigin: "border-box",
                                backgroundClip: "padding-box, border-box",
                              }
                            : undefined
                        }
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center text-ink-700/70">
                          {method.iconSrc ? (
                            <img
                              src={method.iconSrc}
                              alt={method.name}
                              className="h-6 w-6 object-contain"
                            />
                          ) : (
                            <Icon size={16} />
                          )}
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-bold text-ink-900">
                            {method.name}
                          </span>
                          <span className="block text-xs text-ink-700/50">
                            {method.caption ??
                              (method.adminFee > 0
                                ? `Admin ${formatRupiah(method.adminFee)}`
                                : "Tanpa biaya admin")}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer: Total Tagihan / Total Item */}
      <div className="grid grid-cols-2 border-t border-black/10">
        <div className="px-5 py-4 sm:px-6">
          <button
            type="button"
            onClick={onOpenDetail}
            className="flex items-center gap-1.5 text-sm text-ink-700/50"
          >
            Total Tagihan
            <ChevronDown size={16} />
          </button>
          <p className="mt-1 text-xl font-extrabold text-ink-900">
            {formatRupiah(totalTagihan)}
          </p>
        </div>
        <div className="border-l border-black/10 px-5 py-4 sm:px-6">
          <p className="text-sm text-ink-700/50">Total Item</p>
          <p className="mt-1 text-xl font-extrabold text-ink-900">{totalItem}</p>
        </div>
      </div>
    </div>
  );
}