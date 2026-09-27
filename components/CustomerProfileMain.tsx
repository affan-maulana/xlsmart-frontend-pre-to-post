'use client';

import { useState, type ComponentProps } from 'react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { CustomerIdentityCard } from '@/components/CustomerIdentityCard';
import { SubscriptionSummaryBar } from '@/components/SubscriptionSummaryBar';
import { AlertRow } from '@/components/AlertRow';
import { PhoneNumberList } from '@/components/nomorpelanggan/PhoneNumberList';
import { LihatProfilLainModal } from '@/components/LihatProfilLainModal';
import { getNumbersByNik, registeredPhoneNumbersTotal } from '@/lib/mockData';
import type { PhoneNumber } from '@/lib/types';

interface CustomerProfileMainProps {
  customer: ComponentProps<typeof CustomerIdentityCard>['customer'];
  summary: ComponentProps<typeof SubscriptionSummaryBar>['summary'];
  pendingCase: { message: string; actionLabel: string };
  initialNumbers: PhoneNumber[];
  /** Set to false to hide the SubscriptionSummaryBar (e.g. postpaid). Defaults to true. */
  showSubscriptionSummary?: boolean;
  /** id nomor yang lagi dipilih/ditampilkan di Detail Nomor Pelanggan. */
  selectedNumberId?: string;
  /** Dipanggil saat user klik salah satu nomor di daftar. */
  onSelectNumber?: (number: PhoneNumber) => void;
}

export function CustomerProfileMain({
  customer,
  summary,
  pendingCase,
  initialNumbers,
  showSubscriptionSummary = true,
  selectedNumberId,
  onSelectNumber,
}: CustomerProfileMainProps) {
  const [numbers, setNumbers] = useState<PhoneNumber[]>(initialNumbers);
  const [totalCount, setTotalCount] = useState(registeredPhoneNumbersTotal);

  function handleLookup(query: string) {
    const digitsOnly = query.replace(/\D/g, '');
    const isNik = digitsOnly.length >= 15;

    if (isNik) {
      const result = getNumbersByNik(digitsOnly);
      setNumbers(result.numbers);
      setTotalCount(result.totalCount);

      // pindah pilihan ke nomor pertama dari hasil lookup baru
      const firstSelectable =
        result.numbers.find((n) => n.status !== 'suspend' && n.status !== 'nonaktif') ??
        result.numbers[0];
      if (firstSelectable) {
        onSelectNumber?.(firstSelectable);
      }
    }
  }

  return (
    <>
      <section className="bg-brand-gradient p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <Breadcrumb trail={['Home', 'Profil Pelanggan']} />
          <LihatProfilLainModal onLookup={handleLookup} />
        </div>

        <h1 className="mt-4 text-3xl font-extrabold text-white">Profil Pelanggan</h1>

        <div className="mt-5">
          <CustomerIdentityCard customer={customer} />
        </div>

        {showSubscriptionSummary && (
          <div className="mt-5">
            <SubscriptionSummaryBar summary={summary} />
          </div>
        )}

        <div className="mt-5">
          <AlertRow
            message={pendingCase.message}
            actionLabel={pendingCase.actionLabel}
            variant="warnBanner"
          />
        </div>
      </section>

      <div className="mt-8">
        <PhoneNumberList
          numbers={numbers}
          totalCount={totalCount}
          customerName={customer.fullName}
          selectedId={selectedNumberId}
          onSelect={onSelectNumber}
        />
      </div>
    </>
  );
}
