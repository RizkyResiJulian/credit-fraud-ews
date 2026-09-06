import Link from "next/link";
import { AlertTriangle, Search, UserRound } from "lucide-react";
import { RiskBadge } from "@/components/ui";

const cases = [
  ["FC-2026-0081","CR-10293","Andi Pratama",94,"CRITICAL","Phone + device reuse","OPEN"],
  ["FC-2026-0080","CR-10281","Siti Rahma",91,"CRITICAL","Shared address + velocity","OPEN"],
  ["FC-2026-0079","CR-10270","Budi Santoso",72,"HIGH","Income anomaly","INVESTIGATING"],
  ["FC-2026-0078","CR-10265","Dewi Lestari",64,"HIGH","Application velocity","OPEN"],
  ["FC-2026-0075","CR-10258","Fajar Nugroho",38,"MEDIUM","Address similarity","REVIEW"]
] as const;

export default function FraudPage(){return <div className="space-y-5">
  <div><div className="text-xs text-slate-500">INVESTIGATION WORKSPACE</div><h1 className="text-3xl font-bold mt-1">Fraud Cases</h1><p className="text-sm text-slate-500 mt-2">Prioritaskan alert dan dokumentasikan hasil investigasi.</p></div>
  <div className="card p-3 flex gap-3"><div className="flex-1 relative"><Search className="absolute left-3 top-2.5 text-slate-600" size={16}/><input placeholder="Cari case ID, customer, atau application..." className="w-full bg-[#090f1b] border border-[#29374c] rounded-xl pl-10 p-2.5 text-sm outline-none"/></div></div>
  <div className="grid sm:grid-cols-3 gap-4"><div className="card p-5"><div className="text-xs text-slate-500">Critical</div><div className="text-2xl font-bold text-rose-300 mt-2">42</div></div><div className="card p-5"><div className="text-xs text-slate-500">Investigating</div><div className="text-2xl font-bold text-amber-300 mt-2">31</div></div><div className="card p-5"><div className="text-xs text-slate-500">Open queue</div><div className="text-2xl font-bold mt-2">76</div></div></div>
  <div className="card overflow-auto"><table className="w-full min-w-[900px] text-sm"><thead className="bg-white/[.02] text-xs text-slate-500"><tr>{["Case","Customer","Score","Risk","Primary evidence","Status","Action"].map(x=><th key={x} className="text-left px-5 py-4 font-medium">{x}</th>)}</tr></thead><tbody className="divide-y divide-[#1d2a3d]">{cases.map(c=><tr key={c[0]} className="hover:bg-white/[.025]"><td className="px-5 py-4 font-medium text-violet-300">{c[0]}</td><td className="px-5 py-4">{c[2]}<div className="text-[10px] text-slate-600">{c[1]}</div></td><td className="px-5 py-4 font-bold">{c[3]}</td><td className="px-5 py-4"><RiskBadge risk={c[4] as any}/></td><td className="px-5 py-4 text-slate-400">{c[5]}</td><td className="px-5 py-4 text-xs">{c[6]}</td><td className="px-5 py-4"><Link href={`/applications/${c[1]}`} className="text-xs text-violet-300">Investigate →</Link></td></tr>)}</tbody></table></div>
</div>}