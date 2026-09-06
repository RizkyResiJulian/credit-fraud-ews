import Link from "next/link";
import { Plus, Search, SlidersHorizontal } from "lucide-react";
import { RiskBadge } from "@/components/ui";
import { money } from "@/lib/format";

const rows = [
  ["CR-10293","Andi Pratama","0812•••932","Rp 8.500.000","Rp 120.000.000",94,"CRITICAL"],
  ["CR-10281","Siti Rahma","0813•••210","Rp 12.000.000","Rp 85.000.000",91,"CRITICAL"],
  ["CR-10270","Budi Santoso","0821•••112","Rp 7.200.000","Rp 75.000.000",72,"HIGH"],
  ["CR-10265","Dewi Lestari","0857•••554","Rp 15.000.000","Rp 150.000.000",64,"HIGH"],
  ["CR-10258","Fajar Nugroho","0819•••778","Rp 18.000.000","Rp 100.000.000",38,"MEDIUM"],
  ["CR-10241","Rina Amelia","0896•••221","Rp 22.000.000","Rp 90.000.000",18,"LOW"]
] as const;

export default function ApplicationsPage() {
  return <div className="space-y-5">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div><div className="text-xs text-slate-500">CREDIT PORTFOLIO</div><h1 className="text-3xl font-bold mt-1">Applications</h1><p className="text-sm text-slate-500 mt-2">Kelola aplikasi kredit dan lihat fraud score.</p></div>
      <Link href="/applications/new" className="px-4 py-2.5 rounded-xl bg-violet-500 text-sm font-semibold flex items-center gap-2 w-fit"><Plus size={16}/> Add Application</Link>
    </div>
    <div className="card p-3 flex flex-col sm:flex-row gap-3">
      <div className="flex-1 relative"><Search className="absolute left-3 top-2.5 text-slate-600" size={16}/><input placeholder="Cari application, nama, atau nomor..." className="w-full bg-[#090f1b] border border-[#29374c] rounded-xl pl-10 pr-4 py-2 text-sm outline-none focus:border-violet-500"/></div>
      <button className="px-4 py-2 rounded-xl border border-[#29374c] text-sm flex items-center gap-2"><SlidersHorizontal size={15}/> Filter</button>
    </div>
    <div className="card overflow-auto">
      <table className="w-full text-sm min-w-[850px]"><thead className="text-xs text-slate-500 bg-white/[.02]"><tr>{["Application","Customer","Contact","Income","Loan","Risk","Score"].map(x=><th key={x} className="text-left px-5 py-4 font-medium">{x}</th>)}</tr></thead>
      <tbody className="divide-y divide-[#1d2a3d]">{rows.map(r=><tr key={r[0]} className="hover:bg-white/[.025]"><td className="px-5 py-4"><Link href={`/applications/${r[0]}`} className="text-violet-300 hover:text-violet-200 font-medium">{r[0]}</Link></td><td className="px-5 py-4">{r[1]}</td><td className="px-5 py-4 text-slate-500">{r[2]}</td><td className="px-5 py-4 text-slate-400">{r[3]}</td><td className="px-5 py-4 text-slate-400">{r[4]}</td><td className="px-5 py-4"><RiskBadge risk={r[6] as any}/></td><td className="px-5 py-4 font-bold">{r[5]}</td></tr>)}</tbody></table>
    </div>
  </div>
}