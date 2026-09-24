"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown, Sparkle } from "lucide-react";
import type { ServicePlaybook } from "@/lib/types";
import Image from "next/image";

interface ServicePlaybookPanelProps {
  playbook: ServicePlaybook;
}

export function ServicePlaybookPanel({ playbook }: ServicePlaybookPanelProps) {
  const [expanded, setExpanded] = useState(true);
  const [checked, setChecked] = useState<Record<string, boolean>>(
    Object.fromEntries(playbook.interactions.map((item) => [item.id, item.checked ?? false]))
  );

  const completedCount = Object.values(checked).filter(Boolean).length;

  function toggle(id: string) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-indigo-100 bg-indigo-50/40">
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="flex w-full items-center justify-between px-5 py-4"
      >
        <span className="flex items-center gap-2 text-base font-bold text-ink-900">
          <Image src="/icons/xllogo2.svg" alt="" width={18} height={18} />
          {playbook.title}
        </span>
        {expanded ? (
          <ChevronUp size={18} className="text-ink-900" />
        ) : (
          <ChevronDown size={18} className="text-ink-900" />
        )}
      </button>

      {expanded && (
        <>
          <div className="px-5 border-t border-indigo-100">
            {playbook.interactions.map((item, index) => (
              <div
                key={item.id}
                className={`flex items-start justify-between gap-3 py-3 ${
                  index !== playbook.interactions.length - 1 ? "border-b border-indigo-100" : ""
                }`}
              >
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-ink-700/60">Interaksi {index + 1}</p>
                  <p className="mt-1 text-sm font-bold text-ink-900">Q : {item.question}</p>
                  <p className="mt-1 text-sm text-ink-700/70">
                    A : {item.answer}
                    {item.note && (
                      <>
                        {" "}
                        <span className="cursor-pointer underline">{item.note}</span>
                      </>
                    )}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  aria-label={`Tandai interaksi ${index + 1} selesai`}
                  className={`mt-1 h-4 w-4 shrink-0 rounded border ${
                    checked[item.id]
                      ? "border-brand-indigo bg-brand-indigo"
                      : "border-ink-700/30 bg-white"
                  }`}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between bg-indigo-100/60 px-5 py-3">
            <div>
              <p className="text-sm font-bold text-ink-900">{playbook.elapsedTime}</p>
              <p className="text-xs text-ink-700/60">Waktu Berjalan</p>
            </div>
            <p className="text-sm font-bold text-brand-link">
              Tahap {completedCount}/{playbook.interactions.length}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
