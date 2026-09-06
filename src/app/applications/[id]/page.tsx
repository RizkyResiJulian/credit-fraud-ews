import Link from "next/link";
import { ArrowLeft, FileText, MapPin, Phone, UserRound, ShieldAlert } from "lucide-react";
import { RiskBadge, ScoreRing } from "@/components/ui";

export default async function ApplicationDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const app = { id, name:"Andi Pratama", phone:"0812•••932", income:8500000, loan:120000000, score:94, risk:"CRITICAL" as const,
    factors:[["Phone number reuse",25,"HIGH"],["Shared address",18,"HIGH"],["Device reuse",15,"HIGH"],["Income anomaly",15,"HIGH"],["Application velocity",12,"MEDIUM"],["Document duplication",9,"MEDIUM"]] };
  return <div className="space-y-5">
    <Link href="/applications" className="text-xs text-slate-500 hover:text-white flex items-center gap-2"><ArrowLeft size={14}/> Back to applications</Link>
    <div className="flex flex-col lg:flex-row justify-between gap-5"><div><div className="text-xs text-slate-500">APPLICATION #{id}</div><h1 className="text-3xl font-bold mt-1">{app.name}</h1><p className="text-sm text-slate-500 mt-2">Submitted today · Working Capital</p></div><div className="flex items-center gap-4"><ScoreRing score={app.score}/><RiskBadge risk={app.risk}/></div></div>
    <div className="grid lg:grid-cols-[1fr_1fr] gap-5">
      <div className="card p-5"><h2 className="font-semibold mb-5">Applicant profile</h2><div className="grid sm:grid-cols-2 gap-4">{[
        [UserRound,"Name",app.name],[Phone,"Phone",app.phone],[FileText,"Monthly income","Rp 8.500.000"],[FileText,"Requested loan","Rp 120.000.000"],[MapPin,"Address","Jl. Merdeka • Bandung"],[ShieldAlert,"Credit status","Review required"]
      ].map(([I,k,v]:any)=><div key={k} className="p-4 rounded-xl bg-white/[.025] border border-[#1d2a3d]"><I size={15} className="text-slate-500"/><div className="text-[11px] text-slate-600 mt-3">{k}</div><div className="text-sm mt-1">{v}</div></div>)}</div></div>
      <div className="card p-5"><h2 className="font-semibold">Why was this flagged?</h2><p className="text-xs text-slate-500 mt-1 mb-5">Rule + anomaly evidence contributing to the score.</p><div className="space-y-4">{app.factors.map(([n,c,s])=><div key={n as string}><div className="flex justify-between text-sm"><span>{n}</span><span className="font-bold text-rose-300">+{c}</span></div><div className="h-2 bg-slate-800 rounded-full mt-2 overflow-hidden"><div className="h-full bg-rose-400 rounded-full" style={{width:`${Math.min(100,(c as number)*4)}%`}}/></div><div className="text-[10px] text-slate-600 mt-1">Severity: {s as string}</div></div>)}</div></div>
    </div>
    <div className="card p-5"><h2 className="font-semibold">System analysis</h2><p className="text-sm text-slate-400 leading-7 mt-3 max-w-4xl">Aplikasi menunjukkan kombinasi indikator kuat yang pernah muncul pada kasus fraud sebelumnya. Sinyal terkuat berasal dari reuse nomor telepon, alamat yang sama dengan beberapa profil, serta device yang digunakan lintas aplikasi. Sistem merekomendasikan <b className="text-rose-300">manual investigation</b> sebelum keputusan kredit.</p></div>
  </div>
}