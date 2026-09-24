"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { CountdownBadge } from "./PaymentStatusShared";
import type { VABankTab } from "@/lib/types";

interface VirtualAccountStatusCardProps {
  secondsLeft: number;
  bankName: string;
  vaNumber: string;
  tabs: VABankTab[];
}

export function VirtualAccountStatusCard({
  secondsLeft,
  bankName,
  vaNumber,
  tabs,
}: VirtualAccountStatusCardProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id ?? "");
  const [copied, setCopied] = useState(false);

  const activeSteps = tabs.find((t) => t.id === activeTab)?.steps ?? [];

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(vaNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // no-op
    }
  }

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

      <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-black/10 bg-white px-4 py-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-700">
            {bankName.slice(0, 3).toUpperCase()}
          </span>
          <div>
            <p className="text-base font-extrabold text-ink-900">{bankName}</p>
            <p className="text-sm text-ink-700/60">{vaNumber}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-sm font-bold text-brand-link"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Tersalin" : "Salin"}
        </button>
      </div>

      <p className="mt-5 text-base font-extrabold text-ink-900">Cara Pembayaran</p>

      <div className="mt-2 flex gap-6 border-b border-black/10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`-mb-px border-b-2 pb-2 text-sm font-bold ${
              activeTab === tab.id
                ? "border-brand-indigo text-brand-indigo"
                : "border-transparent text-ink-700/40"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-ink-900/80">
        {activeSteps.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>
    </div>
  );
}