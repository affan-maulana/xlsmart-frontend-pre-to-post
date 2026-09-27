'use client';

import { Suspense, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { QueueBar } from '@/components/QueueBar';
import { Breadcrumb } from '@/components/Breadcrumb';
import { PaymentMethodSelector } from '@/components/reload/PaymentMethodSelector';
import { PaketUtamaSelector } from '@/components/reload/PaketUtamaSelector';
import { PaketUtamaModal } from '@/components/reload/PaketUtamaModal'; // ⬅️ tambahkan
import { MandatoryInfoPanel } from '@/components/reload/MandatoryInfoPanel';
import { ServicePlaybookPanel } from '@/components/reload/ServicePlaybookPanel';
import {
  agentQueue,
  paymentMethodGroups,
  paketUtamaOptions,
  mockPaketList,
  tipePembayaranOptions,
  masaBerlanggananOptions,
  isiPulsaMandatoryInfo,
  isiPulsaServicePlaybook,
  isiPulsaBillingItems,
} from '@/lib/mockData';
import type { PaketOption, PaymentMethodOption } from '@/lib/types';
import { BillingDetailModal } from '@/components/reload/BillingDetailModal';
import { PaymentDetailModal } from '@/components/reload/PaymentDetailModal';

function formatRupiah(amount: number) {
  return `Rp ${amount.toLocaleString('id-ID')}`;
}

function PembayaranContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const msisdn = searchParams.get('msisdn') ?? '-';
  const email = searchParams.get('email') ?? '';
  const pembelian = searchParams.get('pembelian') ?? '-';
  const baseTagihan = Number(searchParams.get('tagihan') ?? '0');
  const showPaket = searchParams.get('showPaket') === '1';

  const [selectedPaket, setSelectedPaket] = useState<PaketOption | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodOption | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBillingModalOpen, setIsBillingModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const itemTagihan = showPaket ? (selectedPaket?.price ?? 0) : baseTagihan;
  const adminFee = selectedMethod?.adminFee ?? 0;
  const totalTagihan = itemTagihan + adminFee;
  const totalItem = itemTagihan > 0 ? 1 : 0;

  const canPay = (!showPaket || Boolean(selectedPaket)) && Boolean(selectedMethod);

  const selectedMethodGroupTitle =
    paymentMethodGroups.find((g) => g.methods.some((m) => m.id === selectedMethod?.id))?.title ??
    '-';

  function handleOpenPayment() {
    setIsPaymentModalOpen(true);
  }

  function handleConfirmPayment(payload: { phoneNumber?: string }) {
    setIsPaymentModalOpen(false);

    const params = new URLSearchParams({
      variant: selectedMethod?.type ?? 'ewallet',
      orderId: 'ORD-01030226',
      pembelian,
      metodePembayaran: selectedMethodGroupTitle,
      ...(msisdn !== '-' ? { msisdn } : {}),
      totalTagihan: String(totalTagihan),
      methodName: selectedMethod?.name ?? '-',
      accountNumber: payload.phoneNumber ? `62${payload.phoneNumber}` : '2983489230222',
      email: 'fazhar@mail.com',
    });

    router.push(`/payment/waiting-payment?${params.toString()}`);
  }

  return (
    <main className="p-5 sm:p-6">
      <Breadcrumb trail={['Home', 'Isi Pulsa', 'Pembayaran']} />

      <h1 className="mt-4 text-3xl font-extrabold text-ink-900">Pembayaran</h1>

      <div className="mt-6 grid grid-cols-1 rounded-2xl border border-black/10 bg-white p-5 sm:grid-cols-3 sm:p-6">
        <div className="border-black/10 pb-4 sm:border-r sm:pb-0 sm:pr-6">
          <p className="text-sm text-ink-700/60">MSISDN</p>
          <p className="mt-1 text-xl font-bold text-ink-900">{msisdn}</p>
          {email && <p className="mt-0.5 text-xs text-ink-700/50">{email}</p>}
        </div>
        <div className="border-black/10 py-4 sm:border-r sm:py-0 sm:px-6">
          <p className="text-sm text-ink-700/60">Pembelian</p>
          <p className="mt-1 text-xl font-bold text-ink-900">{pembelian}</p>
        </div>
        <div className="pt-4 sm:pt-0 sm:pl-6">
          <p className="text-sm text-ink-700/60">Tagihan</p>
          <p className="mt-1 text-xl font-bold text-ink-900">{formatRupiah(baseTagihan)}</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-5">
          <PaketUtamaSelector
            options={paketUtamaOptions}
            selectedId={selectedPaket?.id ?? null}
            onSelect={setSelectedPaket}
            onLihatSemuaPaket={() => setIsModalOpen(true)}
            recommendedBadgeSrc="/icons/Rekomendasi.svg"
          />

          <PaketUtamaModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            options={mockPaketList}
            tipePembayaranOptions={tipePembayaranOptions}
            masaBerlanggananOptions={masaBerlanggananOptions}
            onConfirm={setSelectedPaket}
            recommendedBadgeSrc="/icons/Rekomendasi.svg"
          />

          <PaymentMethodSelector
            groups={paymentMethodGroups}
            selectedId={selectedMethod?.id ?? null}
            onSelect={setSelectedMethod}
            totalTagihan={totalTagihan}
            totalItem={totalItem}
            onOpenDetail={() => setIsBillingModalOpen(true)}
          />

          <BillingDetailModal
            isOpen={isBillingModalOpen}
            onClose={() => setIsBillingModalOpen(false)}
            items={isiPulsaBillingItems}
            adminFee={adminFee}
          />

          <button
            type="button"
            disabled={!canPay}
            onClick={handleOpenPayment}
            className="w-full rounded-lg bg-brand-indigo px-5 py-3 text-sm font-bold text-white hover:bg-brand-indigo/90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Bayar
          </button>

          <PaymentDetailModal
            isOpen={isPaymentModalOpen}
            onClose={() => setIsPaymentModalOpen(false)}
            method={selectedMethod}
            defaultPhoneNumber={msisdn !== '-' ? msisdn.replace(/^62/, '') : ''}
            onConfirm={handleConfirmPayment}
          />
        </div>

        <div className="flex flex-col gap-5">
          <MandatoryInfoPanel items={isiPulsaMandatoryInfo} />
          <ServicePlaybookPanel playbook={isiPulsaServicePlaybook} />
        </div>
      </div>
    </main>
  );
}

export default function PembayaranPage() {
  return (
    <div className="flex h-screen bg-[#F4F5F9]">
      <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        <QueueBar queue={agentQueue} />

        <Suspense fallback={null}>
          <PembayaranContent />
        </Suspense>
      </div>
    </div>
  );
}
