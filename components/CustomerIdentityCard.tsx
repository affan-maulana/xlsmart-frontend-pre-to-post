'use client';

import { useState } from 'react';
import { Gift, ChevronDown } from 'lucide-react';
import type { CustomerProfile } from '@/lib/types';

interface CustomerIdentityCardProps {
  customer: CustomerProfile;
}

/** White card showing NIK, full name, demographics and address. */
export function CustomerIdentityCard({ customer }: CustomerIdentityCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-card bg-white p-5 sm:p-6 shadow-card">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <p className="text-sm text-ink-700/60">
          NIK : {customer.nik} &nbsp;|&nbsp; {customer.birthDate}
        </p>

        {customer.isBirthdayToday && (
          <span className="inline-flex items-center gap-1.5 rounded-pill bg-brand-gradient px-3.5 py-1.5 text-xs font-semibold text-white">
            <Gift size={14} />
            Happy Birthday
          </span>
        )}
      </div>

      <h2 className="mt-2 text-2xl font-bold text-ink-900">{customer.fullName}</h2>
      <p className="mt-1 text-sm text-ink-700/70">
        {customer.gender} | {customer.maritalStatus}
      </p>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-ink-700/70">Alamat</p>
          <p
            className={`mt-1 max-w-2xl text-sm text-ink-900 font-bold ${
              expanded ? '' : 'line-clamp-1'
            }`}
          >
            {customer.address}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="flex items-center gap-1 whitespace-nowrap text-sm font-semibold text-brand-link"
        >
          Detil Info
          <ChevronDown
            size={16}
            className={`transition-transform ${expanded ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {expanded && (
        <div className="mt-4 grid grid-cols-1 gap-x-10 gap-y-4 pt-4 sm:grid-cols-2">
          <div className="flex items-center justify-between border-b border-black/5 pb-3">
            <span className="text-sm text-ink-700/60">Agama</span>
            <span className="text-sm font-bold text-ink-900">{customer.religion || '-'}</span>
          </div>
          <div className="flex items-center justify-between border-b border-black/5 pb-3">
            <span className="text-sm text-ink-700/60">Pekerjaan</span>
            <span className="text-sm font-bold text-ink-900">{customer.occupation || '-'}</span>
          </div>

          <div className="flex items-center justify-between border-b border-black/5 pb-3">
            <span className="text-sm text-ink-700/60">Nama Ibu Kandung</span>
            <span className="text-sm font-bold text-ink-900">{customer.motherName}</span>
          </div>
          <div className="flex items-center justify-between border-b border-black/5 pb-3">
            <span className="text-sm text-ink-700/60">Income</span>
            <span className="text-sm font-bold text-ink-900">{customer.income}</span>
          </div>
        </div>
      )}
    </div>
  );
}
