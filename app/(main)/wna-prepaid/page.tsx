'use client';

import { useState } from 'react';
import { QueueBar } from '@/components/molecules/queue-bar';
import { PlanDetailCardWna } from '@/components/wna/PlanDetailCardWna';
import { MetricPanel } from '@/components/MetricPanel';
import { TransactionHistoryRow } from '@/components/TransactionHistoryRow';
import { PromoBannerCard } from '@/components/PromoBannerCard';
import {
  agent,
  agentQueue,
  connectivityMetrics,
  planDetail,
  promoBanners,
  registeredPhoneNumbers,
  usageMetrics,
  foreignCustomerProfile,
  foreignSubscriptionSummary,
  foreignPendingCase,
} from '@/lib/mockData';
import { ForeignCustomerProfileMain } from '@/components/wna/ForeignCustomerProfileMain';
import type { PhoneNumber } from '@/lib/types';

export default function CustomerProfilePage() {
  const [selectedNumber, setSelectedNumber] = useState<PhoneNumber | null>(null);

  return (
    <div className="flex h-screen bg-muted">
      <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        <QueueBar queue={agentQueue} />

        <main>
          <ForeignCustomerProfileMain
            customer={foreignCustomerProfile}
            summary={foreignSubscriptionSummary}
            pendingCase={foreignPendingCase}
            initialNumbers={registeredPhoneNumbers}
            showSubscriptionSummary={true}
            selectedNumberId={selectedNumber?.id}
            onSelectNumber={setSelectedNumber}
          />

          <div>
            <PlanDetailCardWna plan={planDetail} />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 p-5 sm:p-6">
            <MetricPanel
              title="Konektivitas"
              headlineLabel="Baik"
              headlineTone="good"
              metrics={connectivityMetrics}
            />
            <MetricPanel
              title="Pengunaan"
              headlineLabel="Tinggi"
              headlineTone="bad"
              metrics={usageMetrics}
            />
          </div>

          <div className="px-5">
            <TransactionHistoryRow />
          </div>

          <div className="grid grid-cols-1 gap-4 pb-8 sm:grid-cols-2 p-5 sm:p-6">
            {promoBanners.map((banner) => (
              <PromoBannerCard key={banner.id} banner={banner} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
