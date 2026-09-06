"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity, AlertTriangle, BarChart3, BrainCircuit, Database,
  FileUp, Gauge, LayoutDashboard, Network, Settings, ShieldCheck,
  SlidersHorizontal, Users, ChevronRight
} from "lucide-react";

const nav = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/applications", label: "Applications", icon: Database },
  { href: "/upload", label: "Data Import", icon: FileUp },
  { href: "/fraud", label: "Fraud Cases", icon: AlertTriangle },
  { href: "/rules", label: "Rules & Indicators", icon: SlidersHorizontal },
  { href: "/ml", label: "ML Intelligence", icon: BrainCircuit },
  { href: "/network", label: "Fraud Network", icon: Network },
  { href: "/reports", label: "Reports", icon: BarChart3 },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="min-h-screen flex">
      <aside className="hidden lg:flex w-[270px] shrink-0 border-r border-[#1d2a3d] bg-[#080d17]/95 sticky top-0 h-screen flex-col">
        <div className="p-5 border-b border-[#1d2a3d]">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center">
              <ShieldCheck size={22} />
            </div>
            <div>
              <div className="font-bold tracking-tight">CreditGuard</div>
              <div className="text-[11px] text-slate-500 tracking-widest">FRAUD EWS</div>
            </div>
          </Link>
        </div>

        <div className="px-3 py-5 flex-1">
          <div className="text-[10px] uppercase tracking-[.2em] text-slate-600 px-3 mb-3">Workspace</div>
          <nav className="space-y-1">
            {nav.map((item) => {
              const Icon = item.icon;
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link key={item.href} href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition ${
                    active ? "bg-violet-500/15 text-violet-300 border border-violet-500/20" : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}>
                  <Icon size={17} />
                  <span className="flex-1">{item.label}</span>
                  {active && <ChevronRight size={14} />}
                </Link>
              );
            })}
          </nav>

          <div className="text-[10px] uppercase tracking-[.2em] text-slate-600 px-3 mt-7 mb-3">System</div>
          <Link href="/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:bg-white/5">
            <Settings size={17} /> Settings
          </Link>
        </div>

        <div className="p-4">
          <div className="card p-4">
            <div className="flex items-center gap-2 text-xs text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              EWS Operational
            </div>
            <div className="text-[11px] text-slate-500 mt-2">Rule engine and scoring service online</div>
          </div>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <header className="h-16 border-b border-[#1d2a3d] glass sticky top-0 z-20 flex items-center justify-between px-5 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="lg:hidden w-9 h-9 rounded-lg bg-violet-500/15 flex items-center justify-center"><Activity size={18}/></div>
            <div className="text-sm font-medium">Credit Fraud Early Warning System</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
              <Gauge size={15}/> Live monitoring
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 border border-slate-600 flex items-center justify-center text-xs font-bold">FA</div>
          </div>
        </header>
        <div className="p-5 lg:p-8">{children}</div>
      </main>
    </div>
  );
}