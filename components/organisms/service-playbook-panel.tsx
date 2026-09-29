'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { ServicePlaybook } from '@/lib/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';

interface ServicePlaybookPanelProps {
  playbook: ServicePlaybook;
}

/**
 * Collapsible service playbook: Q&A interactions the agent ticks off while
 * handling the case, with progress and elapsed time in the footer.
 */
export function ServicePlaybookPanel({ playbook }: ServicePlaybookPanelProps) {
  const [checked, setChecked] = useState<Record<string, boolean>>(
    Object.fromEntries(playbook.interactions.map((item) => [item.id, item.checked ?? false]))
  );

  const completedCount = Object.values(checked).filter(Boolean).length;

  function toggle(id: string) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="service-playbook"
      className="overflow-hidden rounded-2xl border border-primary/10 bg-info-subtle"
    >
      <AccordionItem value="service-playbook" className="border-b-0">
        <AccordionTrigger className="px-5 hover:no-underline">
          <span className="flex items-center gap-2">
            <Image src="/icons/xllogo2.svg" alt="" width={18} height={18} />
            {playbook.title}
          </span>
        </AccordionTrigger>
        <AccordionContent className="pb-0">
          <div className="border-t border-primary/10 bg-card px-5">
            {playbook.interactions.map((item, index) => (
              <div
                key={item.id}
                className={
                  index !== playbook.interactions.length - 1
                    ? 'flex items-start justify-between gap-3 border-b border-primary/10 py-3'
                    : 'flex items-start justify-between gap-3 py-3'
                }
              >
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-muted-foreground">
                    Interaksi {index + 1}
                  </p>
                  <p className="mt-1 text-sm font-bold text-foreground">Q : {item.question}</p>
                  <p className="mt-1 text-sm text-ink-soft/70">
                    A : {item.answer}
                    {item.note && (
                      <>
                        {' '}
                        <span className="cursor-pointer underline">{item.note}</span>
                      </>
                    )}
                  </p>
                </div>
                <Checkbox
                  checked={checked[item.id]}
                  onCheckedChange={() => toggle(item.id)}
                  aria-label={`Tandai interaksi ${index + 1} selesai`}
                  className="mt-1"
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between bg-primary/10 px-5 py-3">
            <div>
              <p className="text-sm font-bold text-foreground">{playbook.elapsedTime}</p>
              <p className="text-xs text-muted-foreground">Waktu Berjalan</p>
            </div>
            <p className="text-sm font-bold text-info">
              Tahap {completedCount}/{playbook.interactions.length}
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
