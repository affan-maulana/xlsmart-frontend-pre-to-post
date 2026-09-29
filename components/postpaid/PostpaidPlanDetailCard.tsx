'use client';

import { useState } from 'react';
import { ChevronDown, Plus, Pencil, Eye, AlertCircle, Clock, RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { EditCreditLimitTypeModal } from './EditCreditLimitTypeModal';
import { EditCreditClassModal } from './EditCreditClassModal';
import { EditBillingDeliveryModal } from './EditBillingDeliveryModal';
import { UpdateCreditLimitModal } from './UpdateCreditLimitModal';
import { UpdatePPSBalanceModal } from './UpdatePPSBalanceModal';
import { ViewPaymentMethodModal } from './ViewPaymentMethodModal';
import type { PostpaidPlanDetail } from '@/lib/types';

interface PostpaidPlanDetailCardProps {
  plan: PostpaidPlanDetail;
  msisdn: string;
}

function formatRupiah(amount: number) {
  return amount.toLocaleString('id-ID');
}

export function PostpaidPlanDetailCard({ plan, msisdn }: PostpaidPlanDetailCardProps) {
  const isInactive = plan.status === 'inactive';

  const [expanded, setExpanded] = useState(true);

  const [creditLimitType, setCreditLimitType] = useState(plan.creditLimitType);
  const [creditLimit, setCreditLimit] = useState(plan.creditLimit);
  const [deposit] = useState(plan.deposit);
  const [ppsBalance, setPpsBalance] = useState(plan.ppsBalance);
  const [creditClass, setCreditClass] = useState(plan.creditClass);
  const [billingDelivery, setBillingDelivery] = useState(plan.billingDelivery);

  const [isEditLimitTypeOpen, setIsEditLimitTypeOpen] = useState(false);
  const [isEditCreditLimitOpen, setIsEditCreditLimitOpen] = useState(false);
  const [isEditPPSBalanceOpen, setIsEditPPSBalanceOpen] = useState(false);
  const [isEditCreditClassOpen, setIsEditCreditClassOpen] = useState(false);
  const [isEditBillingDeliveryOpen, setIsEditBillingDeliveryOpen] = useState(false);
  const [isViewPaymentMethodOpen, setIsViewPaymentMethodOpen] = useState(false);

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
        <div className="grid grid-cols-2 gap-6 border-b border-black/5 p-5 pb-5 sm:grid-cols-3 sm:p-6 lg:grid-cols-5 lg:gap-0 lg:divide-x lg:divide-black/5">
          <div className="lg:px-6 lg:first:pl-0">
            <p className="text-sm text-ink-soft/60">Servis Plan</p>
            <p className="mt-1 text-xl font-bold text-foreground">{plan.planName}</p>
            <p className="mt-0.5 text-xs text-ink-soft/50">{plan.planType}</p>
          </div>
          <div className="lg:px-6">
            <p className="flex items-center gap-2 text-sm text-ink-soft/60">
              Tipe Pelanggan
              <span className="rounded-pill bg-black/5 px-2 py-0.5 text-[11px] font-semibold text-ink-soft/70">
                {plan.customerTag}
              </span>
            </p>
            <p className="mt-1 text-xl font-bold text-foreground">{plan.customerType}</p>
            <p className="mt-0.5 text-xs text-ink-soft/50">Regular</p>
          </div>
          <div className="lg:px-6">
            <p className="text-sm text-ink-soft/60">Servis Status</p>
            <p className="mt-1 text-xl font-bold text-foreground">{plan.serviceStatus}</p>
            <p className="mt-0.5 text-xs text-ink-soft/50">Dari {plan.activeSince}</p>
          </div>
          <div className="lg:px-6">
            <p className="text-sm text-ink-soft/60">Mobile Balance</p>
            <p className="mt-1 text-xl font-bold text-foreground">
              Rp {formatRupiah(plan.mobileBalance)}
            </p>
            <p className="mt-0.5 text-xs text-ink-soft/50">{plan.billingCycle}</p>
          </div>
          <div className="lg:px-6">
            <p className="text-sm text-ink-soft/60">ARPU</p>
            <p className="mt-1 text-xl font-bold text-foreground">
              Rp {formatRupiah(plan.averageArpu)}
            </p>
            <p className="mt-0.5 text-xs text-ink-soft/50">/ Bulan</p>
          </div>
        </div>

        {isInactive ? (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-b-2xl bg-red-50 px-5 py-4 sm:px-6">
            <span className="flex items-center gap-2 text-sm font-semibold text-red-600">
              <AlertCircle size={16} />
              Nomor ini nonaktif sejak {plan.inactiveSince}
            </span>
            <button
              type="button"
              className="flex items-center gap-1.5 text-sm font-semibold text-info"
            >
              <RefreshCw size={14} />
              Reaktivasi Nomor
            </button>
          </div>
        ) : (
          <>
            {expanded && (
              <>
                <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-6">
                  <div className="flex items-center divide-x divide-black/5">
                    <div className="pr-8">
                      <p className="text-sm text-ink-soft/60">Billing Open</p>
                      <p className="mt-1 text-xl font-bold text-foreground">
                        Rp {formatRupiah(plan.billingOpen)}
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

                <div className="grid grid-cols-1 gap-x-10 gap-y-4 px-5 py-5 sm:grid-cols-2 sm:px-6">
                  <div className="flex items-center justify-between border-b border-black/5 pb-3">
                    <span className="text-sm text-ink-soft/60">Metode Pembayaran</span>
                    <span className="flex items-center gap-1.5 text-sm font-bold text-info">
                      {plan.paymentMethod}
                      <button
                        type="button"
                        onClick={() => setIsViewPaymentMethodOpen(true)}
                        className="text-info"
                        aria-label="Lihat Metode Pembayaran"
                      >
                        <Eye size={14} />
                      </button>
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-black/5 pb-3">
                    <span className="text-sm text-ink-soft/60">ICCID</span>
                    <span className="text-sm font-bold text-foreground">{plan.iccid}</span>
                  </div>

                  <div className="flex items-center justify-between border-b border-black/5 pb-3">
                    <span className="text-sm text-ink-soft/60">Estimasi Billing</span>
                    <span className="flex items-center gap-1.5 text-sm font-bold text-info">
                      Rp {formatRupiah(plan.estimatedBilling)}
                      <Pencil size={14} className="text-info" />
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-black/5 pb-3">
                    <span className="text-sm text-ink-soft/60">Kredit Limit</span>
                    <span className="flex items-center gap-1.5 text-sm font-bold text-info">
                      Rp {formatRupiah(creditLimit)}
                      <button
                        type="button"
                        onClick={() => setIsEditCreditLimitOpen(true)}
                        className="text-info"
                        aria-label="Update Kredit Limit"
                      >
                        <Pencil size={14} />
                      </button>
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-black/5 pb-3">
                    <span className="text-sm text-ink-soft/60">Unbill</span>
                    <span className="text-sm font-bold text-foreground">{plan.unbill}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-black/5 pb-3">
                    <span className="text-sm text-ink-soft/60">PPS Balance</span>
                    <span className="flex items-center gap-1.5 text-sm font-bold text-info">
                      Rp {formatRupiah(ppsBalance)}
                      <button
                        type="button"
                        onClick={() => setIsEditPPSBalanceOpen(true)}
                        className="text-info"
                        aria-label="Update PPS Balance"
                      >
                        <Pencil size={14} />
                      </button>
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-black/5 pb-3">
                    <span className="text-sm text-ink-soft/60">Deposit</span>
                    <span className="flex items-center gap-1.5 text-sm font-bold text-info">
                      Rp {formatRupiah(deposit)}
                      <Pencil size={14} className="text-info" />
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-black/5 pb-3">
                    <span className="text-sm text-ink-soft/60">Credit Class</span>
                    <span className="flex items-center gap-1.5 text-sm font-bold text-info">
                      {creditClass}
                      <button
                        type="button"
                        onClick={() => setIsEditCreditClassOpen(true)}
                        className="text-info"
                        aria-label="Ubah Credit Class"
                      >
                        <Pencil size={14} />
                      </button>
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-black/5 pb-3">
                    <span className="text-sm text-ink-soft/60">Billing Cycle</span>
                    <span className="text-sm font-bold text-foreground">{plan.billingCycle}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-black/5 pb-3">
                    <span className="text-sm text-ink-soft/60">Tipe Kredit Limit</span>
                    <span className="flex items-center gap-1.5 text-sm font-bold text-info">
                      {creditLimitType}
                      <button
                        type="button"
                        onClick={() => setIsEditLimitTypeOpen(true)}
                        className="text-info"
                        aria-label="Ubah Tipe Kredit Limit"
                      >
                        <Pencil size={14} />
                      </button>
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-black/5 pb-3">
                    <span className="text-sm text-ink-soft/60">Grace Period</span>
                    <span className="text-sm font-bold text-foreground">{plan.gracePeriod}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-black/5 pb-3">
                    <span className="text-sm text-ink-soft/60">Pengiriman Tagihan</span>
                    <span className="flex items-center gap-1.5 text-sm font-bold text-info">
                      {billingDelivery}
                      <button
                        type="button"
                        onClick={() => setIsEditBillingDeliveryOpen(true)}
                        className="text-info"
                        aria-label="Ubah Metode Pengiriman Tagihan"
                      >
                        <Pencil size={14} />
                      </button>
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-black/5 pb-3">
                    <span className="text-sm text-ink-soft/60">Dealer Balance</span>
                    <span className="text-sm font-bold text-foreground">
                      Rp {formatRupiah(plan.dealerBalance)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-black/5 pb-3">
                    <span className="text-sm text-ink-soft/60">Pembayaran Terakhir</span>
                    <span className="text-sm font-bold text-foreground">{plan.lastPayment}</span>
                  </div>
                </div>

                <div className="px-5 py-5 sm:px-6">
                  <p className="mb-4 text-sm font-semibold text-ink-soft/60">Segmentasi</p>
                  <div className="grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
                    <div className="flex items-center justify-between border-b border-black/5 pb-3">
                      <span className="text-sm text-ink-soft/60">FA ID</span>
                      <span className="flex items-center gap-1.5 text-sm font-bold text-foreground">
                        {plan.faId}
                        <Eye size={14} className="text-ink-soft/40" />
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-black/5 pb-3">
                      <span className="text-sm text-ink-soft/60">Special Status</span>
                      <span className="text-sm font-bold text-foreground">
                        {plan.specialStatus || '-'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-black/5 pb-3">
                      <span className="text-sm text-ink-soft/60">Device IMSI</span>
                      <span className="flex items-center gap-1.5 text-sm font-bold text-info">
                        {plan.deviceImsi}
                        <Pencil size={14} className="text-info" />
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-black/5 pb-3">
                      <span className="text-sm text-ink-soft/60">First Event Date</span>
                      <span className="text-sm font-bold text-foreground">{plan.firstEventDate}</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-black/5 pb-3">
                      <span className="text-sm text-ink-soft/60">Contact Role</span>
                      <span className="text-sm font-bold text-foreground">{plan.contactRole}</span>
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
                  Outstanding : Rp{formatRupiah(plan.outstanding)}
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
          </>
        )}
      </Card>

      {isEditLimitTypeOpen && (
        <EditCreditLimitTypeModal
          currentType={creditLimitType}
          onClose={() => setIsEditLimitTypeOpen(false)}
          onSuccess={(newType) => {
            setCreditLimitType(newType);
            setIsEditLimitTypeOpen(false);
          }}
        />
      )}

      {isEditCreditClassOpen && (
        <EditCreditClassModal
          msisdn={msisdn}
          email={plan.email}
          currentCreditClass={creditClass}
          onClose={() => setIsEditCreditClassOpen(false)}
          onSuccess={(newClass) => {
            setCreditClass(newClass);
            setIsEditCreditClassOpen(false);
          }}
        />
      )}

      {isEditBillingDeliveryOpen && (
        <EditBillingDeliveryModal
          msisdn={msisdn}
          email={plan.email}
          currentDelivery={billingDelivery}
          onClose={() => setIsEditBillingDeliveryOpen(false)}
          onSuccess={(newDelivery) => {
            setBillingDelivery(newDelivery);
            setIsEditBillingDeliveryOpen(false);
          }}
        />
      )}

      {isEditCreditLimitOpen && (
        <UpdateCreditLimitModal
          msisdn={msisdn}
          email={plan.email}
          paymentMethod={plan.paymentMethod}
          currentLimit={creditLimit}
          currentDeposit={deposit}
          onClose={() => setIsEditCreditLimitOpen(false)}
          onSuccess={(newLimit) => {
            setCreditLimit(newLimit);
            setIsEditCreditLimitOpen(false);
          }}
        />
      )}

      {isEditPPSBalanceOpen && (
        <UpdatePPSBalanceModal
          msisdn={msisdn}
          currentPPSBalance={ppsBalance}
          currentCreditLimit={creditLimit}
          onClose={() => setIsEditPPSBalanceOpen(false)}
          onSuccess={(newBalance) => {
            setPpsBalance(newBalance);
            setIsEditPPSBalanceOpen(false);
          }}
        />
      )}

      {isViewPaymentMethodOpen && (
        <ViewPaymentMethodModal
          msisdn={msisdn}
          paymentMethod={plan.paymentMethod}
          creditCardNumber={plan.creditCardNumber}
          creditCardExpiry={plan.creditCardExpiry}
          onClose={() => setIsViewPaymentMethodOpen(false)}
        />
      )}
    </section>
  );
}
