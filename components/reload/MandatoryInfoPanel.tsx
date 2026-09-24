"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import type { MandatoryInfoItem } from "@/lib/types";

interface MandatoryInfoPanelProps {
  items: MandatoryInfoItem[];
}

export function MandatoryInfoPanel({ items }: MandatoryInfoPanelProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="overflow-hidden rounded-2xl border border-amber-200 bg-amber-100/70">
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="flex w-full items-center justify-between px-5 py-4"
      >
        <span className="text-base font-bold text-ink-900">Mandatory Info</span>
        {expanded ? (
          <ChevronUp size={18} className="text-ink-900" />
        ) : (
          <ChevronDown size={18} className="text-ink-900" />
        )}
      </button>

      {expanded && (
        <div className="px-5 pb-5">
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`py-3 ${index !== items.length - 1 ? "border-b border-amber-200" : ""}`}
            >
              <p className="text-xs font-semibold text-ink-700/60">Info {index + 1}</p>
              <p className="mt-1 text-sm font-bold text-ink-900">{item.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
