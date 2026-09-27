'use client';

import { useState } from 'react';
import { Check, CheckCircle2, AlertCircle, Clock3, ChevronUp, ChevronDown } from 'lucide-react';

export type TransactionOverallStatus = 'processing' | 'failed' | 'success';
export type TransactionStepStatus = 'done' | 'pending' | 'waiting' | 'error';

export interface TransactionDetailField {
  label: string;
  value: string;
}

export interface TransactionStatusStep {
  label: string;
  timestamp?: string;
  status: TransactionStepStatus;
  description?: string;
  extra?: React.ReactNode;
}

const STATUS_CONFIG: Record<TransactionOverallStatus, { icon: React.ElementType; bg: string }> = {
  processing: { icon: Clock3, bg: 'bg-amber-400' },
  failed: { icon: AlertCircle, bg: 'bg-rose-600' },
  success: { icon: CheckCircle2, bg: 'bg-emerald-500' },
};

export function InvoiceSentBanner({ email }: { email: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-5 py-3 text-sm text-emerald-800">
      <Check className="h-4 w-4 shrink-0 text-emerald-600" />
      <span>
        Invoice sudah dikirimkan ke email <span className="font-bold">{email}</span>
      </span>
    </div>
  );
}

function StepIcon({ status }: { status: TransactionStepStatus }) {
  const base = 'flex h-6 w-6 shrink-0 items-center justify-center rounded-full';
  if (status === 'done') {
    return (
      <div className={`${base} bg-emerald-500`}>
        <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
      </div>
    );
  }
  if (status === 'pending') {
    return (
      <div className={`${base} bg-amber-400`}>
        <Clock3 className="h-3.5 w-3.5 text-white" />
      </div>
    );
  }
  if (status === 'error') {
    return (
      <div className={`${base} bg-rose-600`}>
        <AlertCircle className="h-3.5 w-3.5 text-white" />
      </div>
    );
  }
  return <div className={`${base} border-2 border-black/15 bg-white`} />;
}

export function TransactionSummaryCard({
  status,
  title,
  subtitle,
  fields,
}: {
  status: TransactionOverallStatus;
  title: string;
  subtitle?: string;
  fields: TransactionDetailField[];
}) {
  const { icon: Icon, bg } = STATUS_CONFIG[status];

  return (
    <div className="rounded-2xl border border-black/10 bg-[#FAFAFB] p-6 sm:p-7">
      <div className="flex flex-col items-center text-center">
        <div className={`flex h-16 w-16 items-center justify-center rounded-full ${bg}`}>
          <Icon className="h-9 w-9 text-white" strokeWidth={2.25} />
        </div>
        <h2 className="mt-4 text-xl font-extrabold text-ink-900">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-ink-700/60">{subtitle}</p>}
      </div>

      <div className="mt-6 divide-y divide-black/10">
        {fields.map((field) => (
          <div key={field.label} className="flex items-center justify-between gap-4 py-3">
            <span className="text-sm text-ink-700/60">{field.label}</span>
            <span className="text-right text-sm font-extrabold text-ink-900">{field.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TransactionStatusTimeline({ steps }: { steps: TransactionStatusStep[] }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="mt-5 rounded-2xl border border-black/10 bg-[#FAFAFB] p-6 sm:p-7">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between"
      >
        <h3 className="text-lg font-extrabold text-ink-900">Status Transaksi</h3>
        {open ? (
          <ChevronUp className="h-5 w-5 text-ink-900" />
        ) : (
          <ChevronDown className="h-5 w-5 text-ink-900" />
        )}
      </button>

      {open && (
        <div className="mt-5">
          {steps.map((step, idx) => (
            <div key={step.label} className="relative flex gap-3 pb-6 last:pb-0">
              {idx < steps.length - 1 && (
                <span className="absolute left-3 top-6 h-full w-px -translate-x-1/2 bg-black/10" />
              )}
              <StepIcon status={step.status} />
              <div className="flex-1 pt-0.5">
                <p className="font-bold text-ink-900">{step.label}</p>
                {step.timestamp && <p className="text-xs text-ink-700/40">{step.timestamp}</p>}
                {step.description && (
                  <p className="mt-1 whitespace-pre-line text-sm text-ink-700/70">
                    {step.description}
                  </p>
                )}
                {step.extra && <div className="mt-3">{step.extra}</div>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function TransactionStatusActions({
  status,
  onUpdateStatus,
  onSelesai,
}: {
  status: TransactionOverallStatus;
  onUpdateStatus: () => void;
  onSelesai: () => void;
}) {
  if (status === 'processing') {
    return (
      <div className="mt-5 grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={onUpdateStatus}
          className="rounded-lg border-2 border-brand-indigo px-6 py-3 text-sm font-bold text-brand-indigo hover:bg-brand-indigo/5"
        >
          Perbaharui Status
        </button>
        <button
          type="button"
          onClick={onSelesai}
          className="rounded-lg bg-brand-indigo px-6 py-3 text-sm font-bold text-white hover:bg-brand-indigo/90"
        >
          Selesai
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onSelesai}
      className="mt-5 w-full rounded-lg bg-brand-indigo px-6 py-3 text-sm font-bold text-white hover:bg-brand-indigo/90"
    >
      Selesai
    </button>
  );
}
