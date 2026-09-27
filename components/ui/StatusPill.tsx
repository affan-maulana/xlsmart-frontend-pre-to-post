import Image from 'next/image';
import type { StatusTone } from '@/lib/types';

const toneStyles: Record<StatusTone, { text: string; bg: string; icon: string }> = {
  good: {
    text: 'text-status-good',
    bg: 'bg-status-goodBg',
    icon: '/icons/broadcastinggreen.svg',
  },
  warn: {
    text: 'text-status-warn',
    bg: 'bg-status-warnBg',
    icon: '/icons/broadcastRed.svg',
  },
  bad: {
    text: 'text-status-bad',
    bg: 'bg-status-badBg',
    icon: '/icons/broadcastRed.svg',
  },
};

interface StatusPillProps {
  label: string;
  tone: StatusTone;
}

/** Small inline "Baik / Cukup / Tinggi / Rendah" style status marker. */
export function StatusPill({ label, tone }: StatusPillProps) {
  const { text, bg, icon } = toneStyles[tone];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-pill px-2 py-0.5 text-sm font-medium ${text} ${bg}`}
    >
      <Image src={icon} alt="" width={14} height={14} />
      {label}
    </span>
  );
}
