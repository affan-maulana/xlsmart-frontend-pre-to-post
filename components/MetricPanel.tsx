'use client';

import { RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { StatusPill } from '@/components/ui/StatusPill';
import { StatusBadge } from '@/components/ui/StatusBadge';
import type { StatusTone } from '@/lib/types';

interface MetricItem {
  id: string;
  label: string;
  value: string;
  tone: StatusTone;
  pillLabel: string;
}

interface MetricPanelProps {
  title: string;
  headlineTone: StatusTone;
  headlineLabel: string;
  metrics: MetricItem[];
  onRefresh?: () => void;
}

/** Two-column metric card with a headline status badge and a refresh action. */
export function MetricPanel({
  title,
  headlineTone,
  headlineLabel,
  metrics,
  onRefresh,
}: MetricPanelProps) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <h4 className="text-base font-bold text-ink-900">{title}</h4>
          <StatusBadge label={headlineLabel} tone={headlineTone} />
        </div>
        <button
          type="button"
          onClick={onRefresh}
          className="flex items-center gap-1.5 text-sm font-semibold text-brand-link"
        >
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      <dl className="mt-4 divide-y divide-black/5">
        {metrics.map((metric) => (
          <div
            key={metric.id}
            className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
          >
            <dt className="text-sm text-ink-700/70">{metric.label}</dt>
            <dd className="flex items-center gap-3">
              <span className="text-base font-bold text-ink-900">{metric.value}</span>
              <StatusPill label={metric.pillLabel} tone={metric.tone} />
            </dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}
