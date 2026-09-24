import { ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/Card";

/** Single-line entry point into the customer's full transaction history. */
export function TransactionHistoryRow() {
  return (
    <Card className="flex items-center justify-between p-5 sm:p-6">
      <h4 className="text-base font-bold text-ink-900">Histori Transaksi Pelanggan</h4>
      <button
        type="button"
        className="flex items-center gap-1 text-sm font-semibold text-brand-link"
      >
        Lihat Detil
        <ChevronRight size={16} />
      </button>
    </Card>
  );
}
