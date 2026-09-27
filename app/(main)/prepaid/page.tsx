import { QueueBar } from '@/components/QueueBar';
import { PlanDetailCard } from '@/components/PlanDetailCard';
import { MetricPanel } from '@/components/MetricPanel';
import { TransactionHistoryRow } from '@/components/TransactionHistoryRow';
import { PromoBannerCard } from '@/components/PromoBannerCard';
import { CustomerProfileMain } from '@/components/CustomerProfileMain';

import {
  agent,
  agentQueue,
  connectivityMetrics,
  customerProfile,
  pendingCase,
  planDetail,
  promoBanners,
  registeredPhoneNumbers,
  subscriptionSummary,
  usageMetrics,
} from '@/lib/mockData';

export default function CustomerProfilePage() {
  return (
    <div className="flex h-screen bg-[#F4F5F9]">
      <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        <QueueBar queue={agentQueue} />

        <main>
          <CustomerProfileMain
            customer={customerProfile}
            summary={subscriptionSummary}
            pendingCase={pendingCase}
            initialNumbers={registeredPhoneNumbers}
          />

          <div>
            <PlanDetailCard plan={planDetail} />
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
