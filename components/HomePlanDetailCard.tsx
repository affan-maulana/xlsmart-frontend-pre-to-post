'use client';

import { useState } from 'react';
import { ChevronDown, Plus, Eye, AlertCircle, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import type { HomePlanDetail } from '@/lib/types';

interface HomePlanDetailCardProps {
  plan: HomePlanDetail;
}

/** "Detail Nomor Pelanggan" card: home plan, installation, billing and device info. */
export function HomePlanDetailCard({ plan }: HomePlanDetailCardProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <section className="p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground">Detail Nomor Pelanggan</h3>
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-lg border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/5"
        >
          <Plus size={16} />
          Create Case
        </button>
      </div>

      <Card className="mt-4">
        <div className="grid grid-cols-1 gap-6 p-5 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-black/5 sm:p-6 border-b border-black/5 pb-3">
          <div className="sm:px-6 sm:first:pl-0">
            <p className="text-sm text-ink-soft/60">Servis Plan</p>
            <p className="mt-1 text-xl font-bold text-foreground">{plan.planName}</p>
          </div>
          <div className="sm:px-6">
            <p className="text-sm text-ink-soft/60">Tipe Pelanggan</p>
            <p className="mt-1 text-xl font-bold text-foreground">{plan.customerType}</p>
          </div>
          <div className="sm:px-6">
            <p className="text-sm text-ink-soft/60">Servis Status</p>
            <p className="mt-1 text-xl font-bold text-foreground">{plan.serviceStatus}</p>
            <p className="mt-0.5 text-xs text-ink-soft/50">Dari {plan.activeSince}</p>
          </div>
        </div>

        {expanded && (
          <>
            <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-6">
              <div className="flex items-center divide-x divide-black/5">
                <div className="pr-8">
                  <p className="text-sm text-ink-soft/60">Billing Open</p>
                  <p className="mt-1 text-xl font-bold text-foreground">
                    Rp {plan.billingOpen.toLocaleString('id-ID')}
                  </p>
                </div>
                <div className="pl-8">
                  <p className="text-sm text-ink-soft/60">Jatuh Tempo</p>
                  <p className="mt-1 text-xl font-bold text-foreground">{plan.dueDate}</p>
                </div>
              </div>
              <button
                type="button"
                className="rounded-lg border border-primary px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary/5"
              >
                Bayar Tagihan
              </button>
            </div>

            <div className="grid grid-cols-1 gap-x-10 gap-y-5 px-5 py-5 sm:grid-cols-2 sm:px-6">
              <div className="flex items-center justify-between border-b border-black/5 pb-3">
                <p className="text-sm text-ink-soft/60">User ID</p>
                <p className="mt-1 text-sm font-bold text-foreground">{plan.userId}</p>
              </div>
              <div className="flex items-center justify-between border-b border-black/5 pb-3">
                <p className="text-sm text-ink-soft/60">First Activation</p>
                <p className="mt-1 text-sm font-bold text-foreground">{plan.firstActivation}</p>
              </div>

              <div className="flex items-center justify-between border-b border-black/5 pb-3">
                <p className="text-sm text-ink-soft/60">Alamat Instalasi</p>
                <p className="mt-1 text-sm font-bold text-foreground">{plan.installAddress}</p>
              </div>
              <div className="flex items-center justify-between border-b border-black/5 pb-3">
                <p className="text-sm text-ink-soft/60">Plan Aktif</p>
                <p className="mt-1 text-sm font-bold text-foreground">{plan.activePlanPeriod}</p>
              </div>
            </div>

            <div className=" px-5 py-5 sm:px-6">
              <p className="mb-4 text-sm font-semibold text-ink-soft/60">Tagihan</p>
              <div className="grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2">
                <div className="flex items-center justify-between border-b border-black/5 pb-3">
                  <p className="text-sm text-ink-soft/60">Individual ID</p>
                  <p className="mt-1 text-sm font-bold text-foreground">{plan.individualId}</p>
                </div>
                <div className="flex items-center justify-between border-b border-black/5 pb-3">
                  <p className="text-sm text-ink-soft/60">Last Payment Amount</p>
                  <p className="mt-1 text-sm font-bold text-foreground">
                    {plan.lastPaymentAmount || '-'}
                  </p>
                </div>

                <div className="flex items-center justify-between border-b border-black/5 pb-3">
                  <p className="text-sm text-ink-soft/60">Billing Payment &amp;</p>
                  <p className="mt-1 flex items-center gap-1.5 text-sm font-bold text-foreground">
                    {plan.billingPayment}
                    <Eye size={14} className="text-ink-soft/40" />
                  </p>
                </div>
              </div>
            </div>

            <div className="px-5 py-5 sm:px-6">
              <p className="mb-4 text-sm font-semibold text-ink-soft/60">Perangkat &amp; Layanan</p>
              <div className="grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2">
                <div className="flex items-center justify-between border-b border-black/5 pb-3">
                  <p className="text-sm text-ink-soft/60">Device</p>
                  <p className="mt-1 text-sm font-bold text-foreground">{plan.device}</p>
                </div>
                <div className="flex items-center justify-between border-b border-black/5 pb-3">
                  <p className="text-sm text-ink-soft/60">Add On Aktif</p>
                  <p className="mt-1 text-sm font-bold text-foreground">{plan.addOnActive || '-'}</p>
                </div>

                <div className="flex items-center justify-between border-b border-black/5 pb-3">
                  <p className="text-sm text-ink-soft/60">Customer Type</p>
                  <p className="mt-1 text-sm font-bold text-foreground">
                    {plan.customerTypeDetail || '-'}
                  </p>
                </div>
                <div className="flex items-center justify-between border-b border-black/5 pb-3">
                  <p className="text-sm text-ink-soft/60">Incident Status</p>
                  <p className="mt-1 text-sm font-bold text-foreground">
                    {plan.incidentStatus || '-'}
                  </p>
                </div>

                <div className="flex items-center justify-between border-b border-black/5 pb-3">
                  <p className="text-sm text-ink-soft/60">Device IMSI</p>
                  <p className="mt-1 flex items-center gap-1.5 text-sm font-bold text-foreground">
                    {plan.deviceImsi1}
                    <Eye size={14} className="text-ink-soft/40" />
                  </p>
                </div>
                <div className="flex items-center justify-between border-b border-black/5 pb-3">
                  <p className="text-sm text-ink-soft/60">Credit Adjustment</p>
                  <p className="mt-1 text-sm font-bold text-foreground">
                    {plan.creditAdjustment || '-'}
                  </p>
                </div>

                <div className="flex items-center justify-between border-b border-black/5 pb-3">
                  <p className="text-sm text-ink-soft/60">Device IMSI</p>
                  <p className="mt-1 flex items-center gap-1.5 text-sm font-bold text-foreground">
                    {plan.deviceImsi1Date}
                    <Eye size={14} className="text-ink-soft/40" />
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-6">
          <p className="text-sm text-ink-soft/70">Email Pelanggan : {plan.email}</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-sm text-amber-600">
              <AlertCircle size={14} />
              Outstanding : Rp{plan.outstanding.toLocaleString('id-ID')}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-amber-600">
              <Clock size={14} />
              Jatuh Tempo: {plan.dueDate}
            </span>
            <button
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              className="flex items-center gap-1 text-sm font-semibold text-info"
            >
              Info Selengkapnya
              <ChevronDown
                size={16}
                className={`transition-transform ${expanded ? 'rotate-180' : ''}`}
              />
            </button>
          </div>
        </div>
      </Card>
    </section>
  );
}
