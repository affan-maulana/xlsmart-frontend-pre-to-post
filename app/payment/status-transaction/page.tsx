"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { QueueBar } from "@/components/QueueBar";
import { agentQueue } from "@/lib/mockData";
import {
  InvoiceSentBanner,
  TransactionSummaryCard,
  TransactionStatusTimeline,
  TransactionStatusActions,
  type TransactionOverallStatus,
  type TransactionStatusStep,
} from "@/components/payment-type/TransactionStatusCard";


function StatusTransaksiContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const status = (searchParams.get("status") ?? "processing") as TransactionOverallStatus;

  const idTransaksi = searchParams.get("idTransaksi") ?? "-";
  const tanggalTransaksi = searchParams.get("tanggalTransaksi") ?? "-";
  const metodePembayaran = searchParams.get("metodePembayaran") ?? "-";
  const itemPembelian = searchParams.get("itemPembelian") ?? "-";
  const nominalPembayaran = searchParams.get("nominalPembayaran") ?? "-";
  const pelanggan = searchParams.get("pelanggan") ?? "-";
  const invoiceEmail = searchParams.get("invoiceEmail");
  const consentEmail = searchParams.get("consentEmail") ?? invoiceEmail ?? "-";
  const errorCode = searchParams.get("errorCode") ?? "402";

  const fields = [
    { label: "ID Transaksi", value: idTransaksi },
    { label: "Tanggal Transaksi", value: tanggalTransaksi },
    { label: "Metode Pembayaran", value: metodePembayaran },
    { label: "Item Pembelian", value: itemPembelian },
    { label: "Nominal Pembayaran", value: nominalPembayaran },
    { label: "Pelanggan", value: pelanggan },
  ];

  const titleMap: Record<TransactionOverallStatus, string> = {
    processing: "Transaksi dalam Proses",
    failed: "Transaksi Gagal",
    success: "Aktivasi Prepaid Berhasil",
  };

  const subtitleMap: Partial<Record<TransactionOverallStatus, string>> = {
    failed: "Kendala terjadi pada proses pembayaran.",
  };

  function handleResendConsent() {
    // TODO: sambungkan ke endpoint kirim ulang e-Consent
  }

  const stepsMap: Record<TransactionOverallStatus, TransactionStatusStep[]> = {
    processing: [
      {
        label: "Pembayaran",
        status: "done",
        timestamp: tanggalTransaksi,
        description: "Berhasil dikonfirmasi.",
      },
      {
        label: "e-Consent",
        status: "pending",
        timestamp: tanggalTransaksi,
        description: `Menunggu persetujuan pelanggan.\n\ne-Consent telah dikirim ke ${consentEmail}. Klik "Perbarui Status" setelah pelanggan menyetujui.`,
        extra: (
          <button
            type="button"
            onClick={handleResendConsent}
            className="rounded-lg border-2 border-brand-indigo px-4 py-2 text-sm font-bold text-brand-indigo hover:bg-brand-indigo/5"
          >
            Kirim Ulang e-Consent
          </button>
        ),
      },
      { label: "Transaksi Selesai", status: "waiting" },
    ],
    failed: [
      {
        label: "Pembayaran",
        status: "error",
        timestamp: tanggalTransaksi,
        description: `Proses transaksi melebihi waktu durasi. (Error Code: ${errorCode})`,
      },
    ],
    success: [
      {
        label: "Pembayaran",
        status: "done",
        timestamp: tanggalTransaksi,
        description: "Berhasil dikonfirmasi.",
      },
      {
        label: "e-Consent",
        status: "done",
        timestamp: tanggalTransaksi,
        description: "Disetujui oleh Pelanggan.",
      },
      {
        label: "Transaksi Selesai",
        status: "done",
        timestamp: tanggalTransaksi,
      },
    ],
  };

  function handleUpdateStatus() {
  }

  function handleSelesai() {
    router.push("/");
  }

  return (
    <main className="mx-auto max-w-2xl p-5 sm:p-6">
      {status !== "failed" && invoiceEmail && (
        <div className="mb-5">
          <InvoiceSentBanner email={invoiceEmail} />
        </div>
      )}

      <TransactionSummaryCard
        status={status}
        title={titleMap[status]}
        subtitle={subtitleMap[status]}
        fields={fields}
      />

      <TransactionStatusTimeline steps={stepsMap[status]} />

      <TransactionStatusActions
        status={status}
        onUpdateStatus={handleUpdateStatus}
        onSelesai={handleSelesai}
      />
    </main>
  );
}

export default function StatusTransaksiPage() {
  return (
    <div className="flex h-screen bg-[#F4F5F9]">
      <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        <Suspense fallback={null}>
          <StatusTransaksiContent />
        </Suspense>
      </div>
    </div>
  );
}