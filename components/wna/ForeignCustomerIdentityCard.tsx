'use client';

import { Gift, AlertCircle } from 'lucide-react';
import type { ForeignCustomerProfile, PendingCase } from '@/lib/types';

interface ForeignCustomerIdentityCardProps {
  customer: ForeignCustomerProfile;
  pendingCase?: PendingCase;
  onViewCase?: () => void;
}

export function ForeignCustomerIdentityCard({
  customer,
  pendingCase,
  onViewCase,
}: ForeignCustomerIdentityCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-primary/20 bg-white shadow-sm">
      <div className="flex items-start justify-between gap-4 p-5 sm:p-6">
        <div className="min-w-0">
          <p className="text-sm text-ink-soft/50">
            Nomor Paspor : {customer.passportNumber}
            <span className="mx-2 text-ink-soft/30">|</span>
            {customer.birthDate}
          </p>

          <p className="mt-1 text-xl font-bold text-foreground">{customer.fullName}</p>
          <p className="mt-0.5 text-sm font-semibold text-foreground">
            {customer.gender} | {customer.maritalStatus}
          </p>

          <p className="mt-5 text-sm text-ink-soft/50">Alamat</p>
          <p className="mt-1 text-sm font-semibold text-foreground">{customer.address}</p>
        </div>

        {customer.isBirthdayToday && (
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-r from-magenta to-primary px-4 py-2 text-sm font-bold text-white">
            <Gift size={16} />
            Happy Birthday
          </span>
        )}
      </div>

      {pendingCase && (
        <div className="flex items-center justify-between gap-3 bg-amber-100/80 px-5 py-3 sm:px-6">
          <span className="flex items-center gap-2 text-sm font-semibold text-amber-700">
            <AlertCircle size={16} />
            {pendingCase.message}
          </span>
          <button
            type="button"
            onClick={onViewCase}
            className="text-sm font-bold text-info hover:underline"
          >
            {pendingCase.actionLabel}
          </button>
        </div>
      )}
    </div>
  );
}
