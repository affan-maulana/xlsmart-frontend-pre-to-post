import { QueueBar } from '@/components/molecules/queue-bar';
import { MetricPanel } from '@/components/MetricPanel';
import { TransactionHistoryRow } from '@/components/TransactionHistoryRow';
import { PromoBannerCard } from '@/components/PromoBannerCard';
import { CustomerProfileMain } from '@/components/CustomerProfileMain';
import { PostpaidPlanDetailCard } from '@/components/postpaid/PostpaidPlanDetailCard';
import {
  agent,
  agentQueue,
  connectivityMetrics,
  customerProfile,
  homePlanDetail,
  pendingCase,
  planDetail,
  postpaidPlanDetail,
  promoBanners,
  registeredPhoneNumbers,
  subscriptionSummary,
  usageMetrics,
} from '@/lib/mockData';
import { HomePlanDetailCard } from '@/components/HomePlanDetailCard';

export default function CustomerProfilePage() {
  return (
    <div className="flex h-screen bg-muted">
      <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        <QueueBar queue={agentQueue} />

        <main>
          <CustomerProfileMain
            customer={customerProfile}
            summary={subscriptionSummary}
            pendingCase={pendingCase}
            initialNumbers={registeredPhoneNumbers}
            showSubscriptionSummary={false}
          />

          <div>
            <HomePlanDetailCard plan={homePlanDetail} />
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
