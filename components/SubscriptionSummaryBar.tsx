import type { SubscriptionSummary } from '@/lib/types';
import { AlertRow } from './AlertRow';
import { billingAlert } from '@/lib/mockData';
import { Card } from './ui/card';

type SummaryField = 'subscription' | 'mobile' | 'home' | 'billingPostpaid' | 'billingHome';

interface SubscriptionSummaryBarProps {
  summary: SubscriptionSummary;
  /** Which stat columns to show, in order. Defaults to all five (original behaviour). */
  fields?: SummaryField[];
  /** Set to false to hide the billing alert row below the stats. Defaults to true. */
  showBillingAlert?: boolean;
}

function formatRupiah(amount: number) {
  return `Rp ${amount.toLocaleString('id-ID')}`;
}

interface Stat {
  label: string;
  value: string;
  caption?: string;
}

const DEFAULT_FIELDS: SummaryField[] = [
  'subscription',
  'mobile',
  'home',
  'billingPostpaid',
  'billingHome',
];

const smColsByCount: Record<number, string> = {
  1: 'sm:grid-cols-1',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-3',
  5: 'sm:grid-cols-3',
};

const lgColsByCount: Record<number, string> = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5',
};

export function SubscriptionSummaryBar({
  summary,
  fields = DEFAULT_FIELDS,
  showBillingAlert = true,
}: SubscriptionSummaryBarProps) {
  const statByField: Record<SummaryField, Stat> = {
    subscription: {
      label: 'Produk Subscription',
      value: String(summary.productSubscriptionTotal),
      caption: `${summary.mobileTotal} Mobile • ${summary.homeTotal} Home`,
    },
    mobile: {
      label: 'Product Mobile',
      value: String(summary.mobileTotal),
      caption: `${summary.mobileBreakdown.active} Aktif • ${summary.mobileBreakdown.inactive} Nonaktif`,
    },
    home: {
      label: 'Product Home',
      value: String(summary.homeTotal),
      caption: `${summary.homeBreakdown.active} Aktif • ${summary.homeBreakdown.inactive} Nonaktif`,
    },
    billingPostpaid: { label: 'Billing Postpaid', value: formatRupiah(summary.billingPostpaid) },
    billingHome: { label: 'Billing Home', value: formatRupiah(summary.billingHome) },
  };

  const stats: Stat[] = fields.map((field) => statByField[field]);
  const smCols = smColsByCount[stats.length] ?? 'sm:grid-cols-3';
  const lgCols = lgColsByCount[stats.length] ?? 'lg:grid-cols-5';

  return (
    <Card className="mt-4">
      <div
        className={`grid grid-cols-2 gap-6 p-5 sm:p-6 lg:gap-0 lg:divide-x lg:divide-black/5 ${smCols} ${lgCols}`}
      >
        {stats.map((stat, index) => (
          <div key={stat.label} className={index === 0 ? '' : 'lg:px-6'}>
            <p className="text-sm text-ink-soft/60">{stat.label}</p>
            <p className="mt-1 text-2xl font-bold text-foreground">{stat.value}</p>
            {stat.caption && <p className="mt-0.5 text-xs text-ink-soft/50">{stat.caption}</p>}
          </div>
        ))}
      </div>

      {showBillingAlert && (
        <div className="border-t border-black/5">
          <AlertRow
            message={`${billingAlert.message} ${billingAlert.dueDate}`}
            actionLabel={billingAlert.actionLabel}
          />
        </div>
      )}
    </Card>
  );
}
