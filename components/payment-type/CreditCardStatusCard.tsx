'use client';

import { useState } from 'react';
import { CheckCircle2, Circle, ChevronUp, ChevronDown } from 'lucide-react';
import type { CreditCardStatusStep } from '@/lib/types';

interface CreditCardStatusCardProps {
  email: string;
  steps: CreditCardStatusStep[];
  onResendEmail: () => void;
}

export function CreditCardStatusCard({ email, steps, onResendEmail }: CreditCardStatusCardProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="mt-8 max-w-2xl rounded-2xl border border-black/10 bg-faint p-5 sm:p-6">
      <p className="text-lg font-extrabold text-foreground">Pembayaran Kartu Kredit</p>

      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="mt-4 flex w-full items-center justify-between text-base font-extrabold text-foreground"
      >
        Status
        {expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </button>

      {expanded && (
        <div className="mt-3">
          {steps.map((step, i) => (
            <div key={step.id} className="flex gap-3">
              <div className="flex flex-col items-center">
                {step.status === 'done' ? (
                  <CheckCircle2 className="h-5 w-5 shrink-0 fill-green-500 text-white" />
                ) : (
                  <Circle className="h-5 w-5 shrink-0 text-ink-soft/30" />
                )}
                {i < steps.length - 1 && <span className="mt-1 h-full w-px flex-1 bg-black/10" />}
              </div>
              <div className={`pb-5 ${i === steps.length - 1 ? 'pb-0' : ''}`}>
                <p className="text-sm font-bold text-foreground">{step.label}</p>
                {step.description && (
                  <p className="mt-0.5 text-sm text-ink-soft/60">{step.description}</p>
                )}
                {step.actionLabel && (
                  <button
                    type="button"
                    onClick={onResendEmail}
                    className="mt-2 rounded-lg border-2 border-primary px-4 py-2 text-xs font-bold text-primary hover:bg-primary/5"
                  >
                    {step.actionLabel}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="mt-2 text-base font-extrabold text-foreground">Cara Pembayaran</p>
      <p className="mt-2 text-sm text-foreground/80">
        Link pembayaran telah dikirim ke <span className="font-bold">{email}</span>. Pelanggan perlu
        memasukkan detail kartu (nomor, CVV, masa berlaku) langsung di HP/perangkatnya sendiri untuk
        keamanan data kartu.
      </p>
    </div>
  );
}
