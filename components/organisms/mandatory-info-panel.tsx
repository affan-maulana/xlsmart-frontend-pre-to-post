'use client';

import type { MandatoryInfoItem } from '@/lib/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface MandatoryInfoPanelProps {
  items: MandatoryInfoItem[];
}

/** Collapsible amber panel listing mandatory information the agent must convey. */
export function MandatoryInfoPanel({ items }: MandatoryInfoPanelProps) {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="mandatory-info"
      className="overflow-hidden rounded-2xl border border-warning/30 bg-warning-surface"
    >
      <AccordionItem value="mandatory-info" className="border-b-0">
        <AccordionTrigger className="px-5 hover:no-underline">Mandatory Info</AccordionTrigger>
        <AccordionContent className="px-5 pb-5">
          {items.map((item, index) => (
            <div
              key={item.id}
              className={index !== items.length - 1 ? 'border-b border-warning/30 py-3' : 'py-3'}
            >
              <p className="text-xs font-semibold text-muted-foreground">Info {index + 1}</p>
              <p className="mt-1 text-sm font-bold text-foreground">{item.title}</p>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
