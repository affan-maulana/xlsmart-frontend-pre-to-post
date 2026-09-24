import Image from "next/image";
import { MapPin, Bell } from "lucide-react";
import type { AgentInfo } from "@/lib/types";

interface TopBarProps {
  agent: AgentInfo;
}

/** Global brand header: logo, current store location, notifications, agent identity. */
export function TopBar({ agent }: TopBarProps) {
  return (
    <header className="flex h-[76px] shrink-0 items-center justify-between border-b border-black/5 bg-white px-6">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-gradient">
          <span className="text-sm font-bold text-white">X</span>
        </div>
        <span className="text-xl font-extrabold tracking-tight text-ink-900">
          XLSMART
        </span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-1.5 rounded-pill bg-brand-gradient px-4 py-2 text-sm font-semibold text-white">
          <MapPin size={16} />
          {agent.location}
        </div>

        <div className="h-6 w-px bg-black/10" />

        <button
          type="button"
          aria-label="Notifikasi"
          className="relative flex h-9 w-9 items-center justify-center rounded-full text-brand-indigo hover:bg-black/5"
        >
          <Bell size={20} />
          {agent.hasNotification && (
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-brand-magenta" />
          )}
        </button>

        <div className="text-right leading-tight">
          <p className="text-sm font-semibold text-ink-900">{agent.name}</p>
          <p className="text-xs text-ink-700/60">{agent.crrCode}</p>
        </div>

        <div className="relative h-11 w-11 overflow-hidden rounded-full">
          <Image
            src={agent.avatarUrl}
            alt={agent.name}
            fill
            sizes="44px"
            className="object-cover"
          />
        </div>
      </div>
    </header>
  );
}
