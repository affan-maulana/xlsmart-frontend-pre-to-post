import Image from 'next/image';
import type { StatusTone } from '@/lib/types';

const toneStyles: Record<StatusTone, { bg: string; icon: string }> = {
  good: { bg: 'bg-status-goodBg text-status-good', icon: '/icons/broadcastinggreen.svg' },
  warn: { bg: 'bg-status-warnBg text-status-warn', icon: '/icons/broadcastRed.svg' },
  bad: { bg: 'bg-status-badBg text-status-bad', icon: '/icons/broadcastRed.svg' },
};

interface StatusBadgeProps {
  label: string;
  tone: StatusTone;
}

/** Rounded chip used next to section titles, e.g. "Baik" / "Tinggi". */
export function StatusBadge({ label, tone }: StatusBadgeProps) {
  const { bg, icon } = toneStyles[tone];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-pill px-3 py-1 text-xs font-semibold ${bg}`}
    >
      <Image src={icon} alt="" width={14} height={14} />
      {label}
    </span>
  );
}
