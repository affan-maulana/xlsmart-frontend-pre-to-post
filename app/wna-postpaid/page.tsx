"use client";

import { useState } from "react";
import { QueueBar } from "@/components/QueueBar";
import { PlanDetailCardWna } from "@/components/wna/PlanDetailCardWna";
import { MetricPanel } from "@/components/MetricPanel";
import { TransactionHistoryRow } from "@/components/TransactionHistoryRow";
import { PromoBannerCard } from "@/components/PromoBannerCard";
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
  getPostpaidPlanDetail,
  postpaidPlanDetail,
} from "@/lib/mockData";
import { ForeignCustomerProfileMain } from "@/components/wna/ForeignCustomerProfileMain";
import type { PhoneNumber } from "@/lib/types";
import { PostpaidPlanDetailCard } from "@/components/postpaid/PostpaidPlanDetailCard";

export default function CustomerProfilePage() {
  const [selectedNumber, setSelectedNumber] = useState<PhoneNumber>(
    registeredPhoneNumbers[0]
  );

   const currentPlan =
      getPostpaidPlanDetail(selectedNumber.msisdn) ?? postpaidPlanDetail;
  

  return (
    <div className="flex h-screen bg-[#F4F5F9]">

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
            <PostpaidPlanDetailCard
                key={currentPlan.msisdn}
                plan={currentPlan}
                msisdn={selectedNumber.msisdn}
            />
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
