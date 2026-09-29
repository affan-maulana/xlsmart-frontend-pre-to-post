'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { QueueBar } from '@/components/molecules/queue-bar';
import { Breadcrumb } from '@/components/atoms/breadcrumb';
import { InfoBlock } from '@/components/molecules/info-block';
import { PhoneNumberList } from '@/components/organisms/phone-number-list';
import { MandatoryInfoPanel } from '@/components/organisms/mandatory-info-panel';
import { ServicePlaybookPanel } from '@/components/organisms/service-playbook-panel';
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
import { PostpaidPackages } from './_components/postpaid-packages';
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
    <div className="flex h-screen bg-card">
      <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        <QueueBar queue={agentQueue} />

        <main className="p-5 sm:p-6">
          <Breadcrumb trail={['Home', 'Prepaid to Postpaid']} />

          <h1 className="text-display mt-4">Prepaid to Postpaid</h1>

          <div className="mt-6">
            <PhoneNumberList
              numbers={numbers}
              totalCount={totalCount}
              customerName={agentQueue.customerName}
              selectedId={selectedNumber?.id}
              onSelect={setSelectedNumber}
            />
          </div>

          <div className="mt-6 grid grid-cols-1 divide-y divide-border rounded-2xl border border-border bg-muted p-6 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
            <InfoBlock
              className="py-4 lg:px-6 lg:py-0"
              label="MSISDN"
              value={pre2postPlanSummary.msisdn}
              hint={pre2postPlanSummary.email}
              valueClassName="text-xl"
            />
            <InfoBlock
              className="py-4 lg:px-6 lg:py-0"
              label="Service Plan"
              value={pre2postPlanSummary.servicePlan}
              valueClassName="text-xl"
            />
            <InfoBlock
              className="py-4 lg:px-6 lg:py-0"
              label="Mobile Balance"
              value={formatRupiah(pre2postPlanSummary.mobileBalance)}
              valueClassName="text-xl"
            />
          </div>

          <h2 className="text-section-title mt-6">
            Lengkapi Informasi Perubahan Prepaid ke Postpaid
          </h2>

          {error && (
            <div className="mt-4 rounded-lg border border-destructive/20 bg-destructive-subtle p-4 text-sm text-destructive">
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
