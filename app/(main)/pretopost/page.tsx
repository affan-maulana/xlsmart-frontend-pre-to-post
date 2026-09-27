'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { QueueBar } from '@/components/QueueBar';
import { Breadcrumb } from '@/components/Breadcrumb';
import { PhoneNumberList } from '@/components/nomorpelanggan/PhoneNumberList';
import { MandatoryInfoPanel } from '@/components/reload/MandatoryInfoPanel';
import { ServicePlaybookPanel } from '@/components/reload/ServicePlaybookPanel';
import {
  agentQueue,
  customerProfile,
  getNumbersByNik,
  postpaidOptions,
  isiPulsaMandatoryInfo,
  isiPulsaServicePlaybook,
  pre2postPlanSummary,
  packageCategories,
} from '@/lib/mockData';
import type { PhoneNumber, PostpaidPackageOption } from '@/lib/types';
import { PostpaidPackages } from './_components/PostpaidPackages';
import { usePretopostSubmit } from './_hook/usePretopostSubmit';

function formatRupiah(amount: number) {
  return amount.toLocaleString('id-ID');
}

export default function IsiPulsaPage() {
  const router = useRouter();
  const { numbers, totalCount } = getNumbersByNik(customerProfile.nik);
  const { submit, isSubmitting, error, fieldErrors } = usePretopostSubmit();

  const [selectedNumber, setSelectedNumber] = useState<PhoneNumber | null>(
    numbers.find((n) => n.status !== 'suspend' && n.status !== 'nonaktif') ?? numbers[0] ?? null
  );
  const [selectedPackage, setSelectedPackage] = useState<PostpaidPackageOption | null>(null);
  const [selectedPackageCategory, setSelectedPackageCategory] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  async function handleProses() {
    const result = await submit({
      packageId: selectedPackage?.id ?? '',
      email,
      phoneNumber: phoneNumber || undefined,
    });

    if (result) {
      router.push(`/payment/status-transaction?orderId=${result.orderId}`);
    }
  }

  return (
    <div className="flex h-screen bg-white">
      <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        <QueueBar queue={agentQueue} />

        <main className="p-5 sm:p-6">
          <Breadcrumb trail={['Home', 'Prepaid to Postpaid']} />

          <h1 className="mt-4 text-3xl font-extrabold text-ink-900">Prepaid to Postpaid</h1>

          <div className="mt-6">
            <PhoneNumberList
              numbers={numbers}
              totalCount={totalCount}
              customerName={agentQueue.customerName}
              selectedId={selectedNumber?.id}
              onSelect={setSelectedNumber}
            />
          </div>

          <div className="mt-4 grid grid-cols-1 divide-y rounded-lg border border-black/10 bg-[#F4F5F9] p-6 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
            <div className="space-y-1 py-4 lg:px-6 lg:py-0">
              <p className="text-sm text-ink-700/60">MSISDN</p>
              <p className="text-xl font-bold text-ink-900">{pre2postPlanSummary.msisdn}</p>
              <p className="text-xs text-ink-700/50">{pre2postPlanSummary.email}</p>
            </div>
            <div className="space-y-1 py-4 lg:px-6 lg:py-0">
              <p className="text-sm text-ink-700/60">Service Plan</p>
              <p className="text-xl font-bold text-ink-900">{pre2postPlanSummary.servicePlan}</p>
            </div>
            <div className="space-y-1 py-4 lg:px-6 lg:py-0">
              <p className="text-sm text-ink-700/60">Mobile Balance</p>
              <p className="text-xl font-bold text-ink-900">
                {formatRupiah(pre2postPlanSummary.mobileBalance)}
              </p>
            </div>
          </div>

          <h2 className="mt-6 text-lg font-bold text-ink-900">
            Lengkapi Informasi Perubahan Prepaid ke Postpaid
          </h2>

          {error && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="mt-4 grid grid-cols-1 gap-5 lg:grid-cols-[700px_380px]">
            <PostpaidPackages
              packageCategories={packageCategories}
              options={postpaidOptions}
              onSelectPackageCategory={setSelectedPackageCategory}
              onSelect={setSelectedPackage}
              email={email}
              onEmailChange={setEmail}
              phoneNumber={phoneNumber}
              onPhoneNumberChange={setPhoneNumber}
              onSubmit={handleProses}
              isSubmitting={isSubmitting}
              fieldErrors={fieldErrors}
            />

            <div className="flex flex-col gap-5">
              <MandatoryInfoPanel items={isiPulsaMandatoryInfo} />
              <ServicePlaybookPanel playbook={isiPulsaServicePlaybook} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
