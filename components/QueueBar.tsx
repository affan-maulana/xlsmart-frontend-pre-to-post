import { Timer, Users, Flag } from 'lucide-react';
import type { AgentQueueInfo } from '@/lib/types';

interface QueueBarProps {
  queue: AgentQueueInfo;
}

/** Ticket/queue meta strip: queue number, customer, handling time and actions. */
export function QueueBar({ queue }: QueueBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-10 gap-y-3 border-b border-black/5 bg-white px-6 py-4">
      <div>
        <p className="text-xs text-ink-700/50">No Antrian</p>
        <p className="text-base font-bold text-ink-900">{queue.queueNumber}</p>
      </div>

      <div>
        <p className="text-xs text-ink-700/50">Nama Pelanggan</p>
        <p className="text-base font-bold text-ink-900">{queue.customerName}</p>
      </div>

      <div>
        <p className="text-xs text-ink-700/50">Handling Time</p>
        <p className="flex items-center gap-1.5 text-base font-bold text-ink-900">
          <Timer size={16} className="text-brand-indigo" />
          {queue.handlingTime}
        </p>
      </div>

      <button
        type="button"
        className="rounded-lg border border-brand-indigo px-6 py-2 text-sm font-semibold text-brand-indigo hover:bg-brand-indigo/5"
      >
        Selesai
      </button>

      <button
        type="button"
        aria-label="Tandai"
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-brand-indigo text-brand-indigo hover:bg-brand-indigo/5"
      >
        <Flag size={16} />
      </button>

      <div className="ml-auto">
        <p className="text-xs text-ink-700/50">Longest Time in Queue</p>
        <p className="flex items-center gap-1.5 text-base font-bold text-ink-900">
          <Users size={16} className="text-brand-indigo" />
          {queue.longestTimeInQueue}
        </p>
      </div>
    </div>
  );
}
