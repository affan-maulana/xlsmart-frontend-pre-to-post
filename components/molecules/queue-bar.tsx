import { Timer, Users, Flag } from 'lucide-react';
import type { AgentQueueInfo } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { InfoBlock } from '@/components/molecules/info-block';

interface QueueBarProps {
  queue: AgentQueueInfo;
  onFinish?: () => void;
  onMark?: () => void;
}

/** Ticket/queue meta strip: queue number, customer, handling time and actions. */
export function QueueBar({ queue, onFinish, onMark }: QueueBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-10 gap-y-3 border-b border-border bg-card px-6 py-4">
      <InfoBlock label="No Antrian" value={queue.queueNumber} />

      <InfoBlock label="Nama Pelanggan" value={queue.customerName} />

      <InfoBlock
        label="Handling Time"
        icon={<Timer className="size-icon text-primary" />}
        value={queue.handlingTime}
      />

      <Button type="button" variant="outline" className="px-6" onClick={onFinish}>
        Selesai
      </Button>

      <Button type="button" variant="outline" size="icon" aria-label="Tandai" onClick={onMark}>
        <Flag />
      </Button>

      <div className="ml-auto">
        <InfoBlock
          label="Longest Time in Queue"
          icon={<Users className="size-icon text-primary" />}
          value={queue.longestTimeInQueue}
        />
      </div>
    </div>
  );
}
