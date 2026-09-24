"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QueueBar } from "@/components/QueueBar";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PhoneNumberList } from "@/components/nomorpelanggan/PhoneNumberList";
import { DenomGrid } from "@/components/reload/DenomGrid";
import { MandatoryInfoPanel } from "@/components/reload/MandatoryInfoPanel";
import { ServicePlaybookPanel } from "@/components/reload/ServicePlaybookPanel";
import {
  agentQueue,
  customerProfile,
  getNumbersByNik,
  isiPulsaPlanSummary,
  denomOptions,
  isiPulsaMandatoryInfo,
  isiPulsaServicePlaybook,
} from "@/lib/mockData";
import type { DenomOption, PhoneNumber } from "@/lib/types";

function formatRupiah(amount: number) {
  return amount.toLocaleString("id-ID");
}

export default function IsiPulsaPage() {
  const router = useRouter();
  const { numbers, totalCount } = getNumbersByNik(customerProfile.nik);

  const [selectedNumber, setSelectedNumber] = useState<PhoneNumber | null>(
    numbers.find((n) => n.status !== "suspend" && n.status !== "nonaktif") ?? numbers[0] ?? null
  );
  const [selectedDenom, setSelectedDenom] = useState<DenomOption | null>(null);

  function handleProses() {
    if (!selectedDenom) return;

    const params = new URLSearchParams({
      msisdn: selectedNumber?.msisdn ?? "",
      pembelian: `Isi Pulsa Rp ${selectedDenom.amount.toLocaleString("id-ID")}`,
      tagihan: String(selectedDenom.price),
    });

    router.push(`/reload/pembayaran?${params.toString()}`);
  }

  return (
    <div className="flex h-screen bg-[#FFFFFF]">

      <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        <QueueBar queue={agentQueue} />

        <main className="p-5 sm:p-6">
          <Breadcrumb trail={["Home", "Prepaid to Postpaid"]} />

          <h1 className="mt-4 text-3xl font-extrabold text-ink-900">Prepaid to Postpaid</h1>

          <div className="mt-6">
            <PhoneNumberList
              numbers={numbers}
              totalCount={totalCount}
              customerName={agentQueue.customerName}
              selectedId={selectedNumber?.id}
              onSelect={setSelectedNumber}
            />
          </div>

          <div className="mt-4 grid grid-cols-2 rounded-2xl border border-black/10 bg-white p-5 sm:p-6">
            <div className="border-r border-black/10 pr-6">
              <p className="text-sm text-ink-700/60">Servis Plan</p>
              <p className="mt-1 text-xl font-bold text-ink-900">{isiPulsaPlanSummary.planName}</p>
              <p className="mt-0.5 text-xs text-ink-700/50">{isiPulsaPlanSummary.planType}</p>
            </div>
            <div className="pl-6">
              <p className="text-sm text-ink-700/60">Mobile Balance</p>
              <p className="mt-1 text-xl font-bold text-ink-900">
                {formatRupiah(isiPulsaPlanSummary.mobileBalance)}
              </p>
            </div>
          </div>

          <h2 className="mt-6 text-lg font-bold text-ink-900">Pilih Denom Untuk Isi Pulsa</h2>

          <div className="mt-4 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_360px]">
            <DenomGrid options={denomOptions} onSelect={setSelectedDenom} />

            <div className="flex flex-col gap-5">
              <MandatoryInfoPanel items={isiPulsaMandatoryInfo} />
              <ServicePlaybookPanel playbook={isiPulsaServicePlaybook} />
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              className="flex-1 rounded-lg border-2 border-brand-indigo px-5 py-3 text-sm font-bold text-brand-indigo hover:bg-brand-indigo/5 lg:flex-none lg:px-8"
            >
              Save as Draft
            </button>
            <button
              type="button"
              disabled={!selectedDenom}
              onClick={handleProses}
              className="flex-1 rounded-lg bg-brand-indigo px-5 py-3 text-sm font-bold text-white hover:bg-brand-indigo/90 disabled:cursor-not-allowed disabled:opacity-40 lg:flex-none lg:px-8"
            >
              Proses
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
