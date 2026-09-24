"use client";

import { useState } from "react";
import { ChevronDown, Plus, Pencil } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { PlanDetail } from "@/lib/types";

interface PlanDetailCardProps {
  plan: PlanDetail;
}

function formatRupiah(amount: number) {
  return amount.toLocaleString("id-ID");
}

/** "Detail Nomor Pelanggan" card: plan, status, balance, ARPU and email. */
export function PlanDetailCard({ plan }: PlanDetailCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-ink-900">Detail Nomor Pelanggan</h3>
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-lg border border-brand-indigo px-4 py-2 text-sm font-semibold text-brand-indigo hover:bg-brand-indigo/5"
        >
          <Plus size={16} />
          Create Case
        </button>
      </div>

      <Card className="mt-4" padded={false}>
        <div className="grid grid-cols-2 gap-6 p-5 sm:grid-cols-3 sm:p-6 lg:grid-cols-5 lg:gap-0 lg:divide-x lg:divide-black/5 border-b border-black/5 pb-3">
          <div className="lg:px-6 lg:first:pl-0">
            <p className="text-sm text-ink-700/60">Servis Plan</p>
            <p className="mt-1 text-xl font-bold text-ink-900">{plan.planName}</p>
            <p className="mt-0.5 text-xs text-ink-700/50">{plan.planType}</p>
          </div>
          <div className="lg:px-6">
            <p className="flex items-center gap-2 text-sm text-ink-700/60">
              Tipe Pelanggan
              <span className="rounded-pill bg-black/5 px-2 py-0.5 text-[11px] font-semibold text-ink-700/70">
                {plan.customerTag}
              </span>
            </p>
            <p className="mt-1 text-xl font-bold text-ink-900">{plan.customerType}</p>
            <p className="mt-0.5 text-xs text-ink-700/50">Regular</p>
          </div>
          <div className="lg:px-6">
            <p className="text-sm text-ink-700/60">Servis Status</p>
            <p className="mt-1 text-xl font-bold text-ink-900">{plan.serviceStatus}</p>
            <p className="mt-0.5 text-xs text-ink-700/50">Sejak {plan.activeSince}</p>
          </div>
          <div className="lg:px-6">
            <p className="text-sm text-ink-700/60">Mobile Balance</p>
            <p className="mt-1 text-xl font-bold text-ink-900">
              {formatRupiah(plan.mobileBalance)}
            </p>
          </div>
          <div className="lg:px-6">
            <p className="text-sm text-ink-700/60">Avg. ARPU</p>
            <p className="mt-1 text-xl font-bold text-ink-900">
              Rp {formatRupiah(plan.averageArpu)}
            </p>
            <p className="mt-0.5 text-xs text-ink-700/50">/ Bulan</p>
          </div>
        </div>

      
        {expanded && (
          <div className="px-5 py-5 sm:px-6">
            <p className="mb-4 text-sm font-semibold text-ink-700/60">Segmentasi</p>
            <div className="grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
              <div className="flex items-center justify-between border-b border-black/5 pb-3">
                <span className="text-sm text-ink-700/60">ICCID</span>
                <span className="text-sm font-bold text-ink-900">{plan.iccid}</span>
              </div>
              <div className="flex items-center justify-between border-b border-black/5 pb-3">
                <span className="text-sm text-ink-700/60">Contact Role</span>
                <span className="text-sm font-bold text-ink-900">{plan.contactRole}</span>
              </div>

              <div className="flex items-center justify-between border-b border-black/5 pb-3">
                <span className="text-sm text-ink-700/60">Individual ID</span>
                <span className="text-sm font-bold text-ink-900">{plan.individualId}</span>
              </div>
              <div className="flex items-center justify-between border-b border-black/5 pb-3">
                <span className="text-sm text-ink-700/60">Special Status</span>
                <span className="text-sm font-bold text-ink-900">
                  {plan.specialStatus || "-"}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-black/5 pb-3">
                <span className="text-sm text-ink-700/60">Customer Type</span>
                <span className="text-sm font-bold text-ink-900">{plan.customerType}</span>
              </div>
              <div className="flex items-center justify-between border-b border-black/5 pb-3">
                <span className="text-sm text-ink-700/60">Grace Period</span>
                <span className="text-sm font-bold text-ink-900">{plan.gracePeriod}</span>
              </div>

              <div className="flex items-center justify-between border-b border-black/5 pb-3">
                <span className="text-sm text-ink-700/60">Device Info</span>
                <span className="flex items-center gap-1.5 text-sm font-bold text-brand-link">
                  {plan.deviceInfo}
                  <Pencil size={14} className="text-brand-link" />
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-black/5 pb-3">
                <span className="text-sm text-ink-700/60">First Event Date</span>
                <span className="text-sm font-bold text-ink-900">{plan.firstEventDate}</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between px-5 py-4 sm:px-6">
          <p className="text-sm text-ink-700/70">Email Pelanggan : {plan.email}</p>
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="flex items-center gap-1 text-sm font-semibold text-brand-link"
          >
            Info Selengkapnya
            <ChevronDown
              size={16}
              className={`transition-transform ${expanded ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </Card>
    </section>
  );
}