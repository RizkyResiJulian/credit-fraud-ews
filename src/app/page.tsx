"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Activity, AlertTriangle, ArrowUpRight, CheckCircle2, Clock3, ShieldAlert, TrendingUp, Upload } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, BarChart, Bar } from "recharts";
import { RiskBadge, StatCard } from "@/components/ui";
import { money } from "@/lib/format";

const trend = [
  { day: "25", risk: 28, fraud: 6 }, { day: "26", risk: 34, fraud: 8 },
  { day: "27", risk: 31, fraud: 7 }, { day: "28", risk: 44, fraud: 12 },
  { day: "29", risk: 39, fraud: 10 }, { day: "30", risk: 51, fraud: 15 },
  { day: "31", risk: 46, fraud: 13 }, { day: "01", risk: 62, fraud: 21 },
  { day: "02", risk: 55, fraud: 17 }, { day: "03", risk: 68, fraud: 25 }
];
const indicators = [
  ["Phone reuse", 32], ["Shared address", 24], ["Device reuse", 19], ["Income anomaly", 14], ["Velocity", 11]
];

export default function Dashboard() {
  const [stats, setStats] = useState({ applications: 18492, highRisk: 347, fraudCases: 128, fraudRate: 2.31 });
  useEffect(() => { fetch("/api/dashboard").then(r => r.ok ? r.json() : null).then(d => d && setStats(d)).catch(() => {}); }, []);

  return (
    <div className="space-y-6">
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-cyan-300 mb-2"><span className="w-2 h-2 rounded-full bg-cyan-300 animate-pulse"/> LIVE EWS MONITORING</div>
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">Fraud Command Center</h1>
          <p className="text-slate-500 mt-2 max-w-2xl">Pantau risiko kredit, anomali, dan alert fraud secara real-time dari satu workspace.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/upload" className="px-4 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-400 text-white text-sm font-semibold flex items-center gap-2"><Upload size={16}/> Import Data</Link>
          <Link href="/applications/new" className="px-4 py-2.5 rounded-xl border border-[#29374c] hover:bg-white/5 text-sm font-semibold">+ Manual Entry</Link>
        </div>
      </section>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Total Applications" value={stats.applications.toLocaleString("id-ID")} delta="+8.4% vs periode lalu" icon={Activity} tone="violet"/>
        <StatCard title="High / Critical Risk" value={stats.highRisk.toLocaleString("id-ID")} delta="1.88% dari total aplikasi" icon={ShieldAlert} tone="rose"/>
        <StatCard title="Fraud Cases" value={stats.fraudCases.toLocaleString("id-ID")} delta="+12 kasus minggu ini" icon={AlertTriangle} tone="amber"/>
        <StatCard title="Fraud Rate" value={`${stats.fraudRate}%`} delta="model confidence 91.4%" icon={TrendingUp} tone="cyan"/>
      </div>

      <div className="grid xl:grid-cols-[1.7fr_1fr] gap-5">
        <div className="card p-5">
          <div className="flex items-center justify-between mb-5">
            <div><h2 className="font-semibold">Risk & Fraud Trend</h2><p className="text-xs text-slate-500 mt-1">10 hari terakhir</p></div>
            <div className="flex gap-4 text-[11px] text-slate-500"><span>● Risk alerts</span><span>● Confirmed fraud</span></div>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trend}>
                <defs><linearGradient id="risk" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7c5cff" stopOpacity=".4"/><stop offset="100%" stopColor="#7c5cff" stopOpacity="0"/></linearGradient></defs>
                <XAxis dataKey="day" stroke="#526176" fontSize={11}/><YAxis stroke="#526176" fontSize={11}/><Tooltip contentStyle={{background:"#0d1422",border:"1px solid #29374c",borderRadius:12}}/>
                <Area type="monotone" dataKey="risk" stroke="#8b74ff" fill="url(#risk)" strokeWidth={2} />
                <Area type="monotone" dataKey="fraud" stroke="#00d4ff" fill="transparent" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card p-5">
          <h2 className="font-semibold">Top Fraud Indicators</h2>
          <p className="text-xs text-slate-500 mt-1 mb-5">Kontribusi terhadap alert</p>
          <div className="space-y-5">
            {indicators.map(([name, value]) => (
              <div key={name}>
                <div className="flex justify-between text-xs mb-2"><span>{name}</span><span className="text-slate-500">{value}%</span></div>
                <div className="h-2 rounded-full bg-slate-800 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" style={{width:`${value}%`}}/></div>
              </div>
            ))}
          </div>
          <Link href="/rules" className="mt-6 flex items-center justify-between text-xs text-violet-300 hover:text-violet-200">Manage indicators <ArrowUpRight size={14}/></Link>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="p-5 border-b border-[#1d2a3d] flex justify-between items-center">
          <div><h2 className="font-semibold">Real-time Alerts</h2><p className="text-xs text-slate-500 mt-1">Prioritas investigasi terbaru</p></div>
          <Link href="/fraud" className="text-xs text-violet-300">View all →</Link>
        </div>
        <div className="divide-y divide-[#1d2a3d]">
          {[
            ["CR-10293","Andi Pratama",94,"CRITICAL","2 menit lalu","Phone + device reuse"],
            ["CR-10281","Siti Rahma",91,"CRITICAL","8 menit lalu","Shared address"],
            ["CR-10270","Budi Santoso",72,"HIGH","12 menit lalu","Income anomaly"],
            ["CR-10265","Dewi Lestari",64,"HIGH","19 menit lalu","Application velocity"]
          ].map(([id,name,score,risk,time,reason]) => (
            <div key={id as string} className="p-4 flex items-center gap-4 hover:bg-white/[.025]">
              <div className="w-9 h-9 rounded-xl bg-rose-400/10 flex items-center justify-center text-rose-300"><AlertTriangle size={16}/></div>
              <div className="flex-1 min-w-0"><div className="text-sm font-medium">{name} <span className="text-slate-600">#{id}</span></div><div className="text-[11px] text-slate-500 mt-1">{reason}</div></div>
              <RiskBadge risk={risk as any}/><div className="text-lg font-bold w-10 text-right">{score}</div><div className="hidden sm:flex items-center gap-1 text-[11px] text-slate-600 w-24"><Clock3 size={12}/>{time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}