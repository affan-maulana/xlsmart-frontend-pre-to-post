"use client";

import {
  Menu,
  UserCircle2,
  FolderClosed,
  RadioTower,
  Smartphone,
  ScanLine,
  Sun,
  Wallet,
  ArrowLeftRight,
  UserPlus,
  Activity,
  BookOpen,
  ShoppingCart,
  Users,
  BarChart3,
  UserCog,
  LogOut,
} from "lucide-react";
import { useState } from "react";

interface NavItem {
  key: string;
  icon: React.ElementType;
  label: string;
}

const navItems: NavItem[] = [
  { key: "profile", icon: UserCircle2, label: "Profil Pelanggan" },
  { key: "folder", icon: FolderClosed, label: "Dokumen" },
  { key: "network", icon: RadioTower, label: "Jaringan" },
  { key: "mobile", icon: Smartphone, label: "Perangkat" },
  { key: "scan", icon: ScanLine, label: "Verifikasi" },
  { key: "sun", icon: Sun, label: "Aktivitas" },
  { key: "wallet", icon: Wallet, label: "Pembayaran" },
  { key: "transfer", icon: ArrowLeftRight, label: "Migrasi" },
  { key: "userplus", icon: UserPlus, label: "Tambah Pelanggan" },
  { key: "activity", icon: Activity, label: "Monitoring" },
  { key: "book", icon: BookOpen, label: "Katalog" },
  { key: "cart", icon: ShoppingCart, label: "Pemesanan" },
  { key: "users", icon: Users, label: "Tim" },
  { key: "chart", icon: BarChart3, label: "Laporan" },
  { key: "usercog", icon: UserCog, label: "Pengaturan Akun" },
];

/** Fixed icon-rail sidebar. Active item is highlighted to mirror the reference UI. */
export function Sidebar() {
  const [active, setActive] = useState("profile");

  return (
    <aside className="hidden md:flex w-[72px] shrink-0 flex-col items-center bg-ink-900 py-4">
      <button
        type="button"
        aria-label="Toggle menu"
        className="mb-6 flex h-10 w-10 items-center justify-center text-white/80 hover:text-white"
      >
        <Menu size={22} />
      </button>

      <nav className="flex flex-1 flex-col items-center gap-1 overflow-y-auto">
        {navItems.map(({ key, icon: Icon, label }) => {
          const isActive = key === active;
          return (
            <button
              key={key}
              type="button"
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
              onClick={() => setActive(key)}
              className={`relative flex h-11 w-11 items-center justify-center rounded-xl transition-colors ${
                isActive
                  ? "bg-white text-brand-indigo"
                  : "text-white/50 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.4 : 2} />
            </button>
          );
        })}
      </nav>

      <button
        type="button"
        aria-label="Keluar"
        className="mt-4 flex h-10 w-10 items-center justify-center text-white/50 hover:text-white"
      >
        <LogOut size={20} />
      </button>
    </aside>
  );
}
