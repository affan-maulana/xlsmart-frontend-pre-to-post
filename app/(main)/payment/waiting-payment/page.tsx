'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { QueueBar } from '@/components/molecules/queue-bar';
import { agentQueue, getVABankTabs, getCreditCardStatusSteps } from '@/lib/mockData';
import {
  OrderSummaryBar,
  PaymentStatusActions,
} from '@/components/payment-type/PaymentStatusShared';
import { EwalletStatusCard } from '@/components/payment-type/EwalletStatusCard';
import { VirtualAccountStatusCard } from '@/components/payment-type/VirtualAccountStatusCard';
import { CreditCardStatusCard } from '@/components/payment-type/CreditCardStatusCard';
import { QrisStatusCard } from '@/components/payment-type/QrisStatusCard';
import type { OrderSummaryField, PaymentStatusVariant } from '@/lib/types';
import { Breadcrumb } from '@/components/atoms/breadcrumb';

function StatusPembayaranContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const variant = (searchParams.get('variant') ?? 'ewallet') as PaymentStatusVariant;
  const orderId = searchParams.get('orderId') ?? '-';
  const pembelian = searchParams.get('pembelian') ?? '-';
  const metodePembayaran = searchParams.get('metodePembayaran') ?? '-';
  const msisdn = searchParams.get('msisdn');
  const totalTagihan = Number(searchParams.get('totalTagihan') ?? '0');
  const methodName = searchParams.get('methodName') ?? '-';
  const accountNumber = searchParams.get('accountNumber') ?? '-';
  const email = searchParams.get('email') ?? '-';

  const [secondsLeft, setSecondsLeft] = useState(4 * 60 * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function handleGantiMetode() {
    router.back();
  }

  function handlePrimaryAction() {
    const params = new URLSearchParams({
      status: 'processing',
      idTransaksi: orderId,
      tanggalTransaksi: new Date().toLocaleString('id-ID'),
      metodePembayaran,
      itemPembelian: pembelian,
      nominalPembayaran: `Rp ${totalTagihan.toLocaleString('id-ID')}`,
      pelanggan: '-',
      ...(email && email !== '-' ? { invoiceEmail: email, consentEmail: email } : {}),
    });

    router.push(`/payment/status-transaction?${params.toString()}`);
  }

  const fields: OrderSummaryField[] = [
    { label: 'Order ID', value: orderId },
    { label: 'Pembelian', value: pembelian },
    { label: 'Metode Pembayaran', value: metodePembayaran },
    ...(msisdn ? [{ label: 'MSISDN', value: msisdn }] : []),
    { label: 'Tagihan', value: `Rp ${totalTagihan.toLocaleString('id-ID')}` },
  ];

  return (
    <main className="p-5 sm:p-6">
      <Breadcrumb trail={['Home', 'Isi Pulsa', 'Pembayaran']} />

      <h1 className="mt-4 text-3xl font-extrabold text-foreground">Pembayaran</h1>

      <OrderSummaryBar fields={fields} />

      <div className="mt-5 flex w-full justify-center">
        {variant === 'ewallet' && (
          <EwalletStatusCard
            secondsLeft={secondsLeft}
            methodName={methodName}
            accountNumber={accountNumber}
            totalTagihan={totalTagihan}
          />
        )}

        {variant === 'virtual_account' && (
          <VirtualAccountStatusCard
            secondsLeft={secondsLeft}
            bankName={methodName}
            vaNumber={accountNumber}
            tabs={getVABankTabs(methodName, accountNumber)}
          />
        )}

        {variant === 'credit_card' && (
          <CreditCardStatusCard
            email={email}
            steps={getCreditCardStatusSteps(email)}
            onResendEmail={() => {
              // TODO: sambungkan ke endpoint kirim ulang email
            }}
          />
        )}

        {variant === 'qris' && (
          <QrisStatusCard secondsLeft={secondsLeft} totalTagihan={totalTagihan} />
        )}
      </div>

      <div className="mt-5 flex justify-center">
        <PaymentStatusActions
          onGantiMetode={handleGantiMetode}
          onPrimaryAction={handlePrimaryAction}
          primaryLabel={
            variant === 'virtual_account' ? 'Konfirmasi Pembayaran' : 'Update Status Pembayaran'
          }
        />
      </div>
    </main>
  );
}

export default function StatusPembayaranPage() {
  return (
    <div className="flex h-screen bg-muted">
      <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        <QueueBar queue={agentQueue} />
        <Suspense fallback={null}>
          <StatusPembayaranContent />
        </Suspense>
      </div>
    </div>
  );
}
