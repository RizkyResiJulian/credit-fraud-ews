"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { scoreApplication } from "@/lib/fraud-engine";
import { ScoreRing, RiskBadge } from "@/components/ui";

export default function NewApplication() {
  const router = useRouter();
  const [form, setForm] = useState({ name:"", phone:"", income:"", loan:"", purpose:"Working Capital", phoneReuse:"0", addressReuse:"0", deviceReuse:"0", incomeAnomaly:false, velocity:false, documentDuplicate:false, geoMismatch:false, creditStress:false });
  const result = scoreApplication({phoneReuse:+form.phoneReuse,addressReuse:+form.addressReuse,deviceReuse:+form.deviceReuse,incomeAnomaly:form.incomeAnomaly,velocity:form.velocity,documentDuplicate:form.documentDuplicate,geoMismatch:form.geoMismatch,creditStress:form.creditStress});

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/applications", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({...form, income:+form.income, loan:+form.loan, score:result.score, risk:result.risk, factors:result.factors}) });
    if (res.ok) router.push("/applications");
  };
  const update = (k:string,v:any) => setForm(f=>({...f,[k]:v}));
  return <div className="max-w-6xl mx-auto space-y-5">
    <div><div className="text-xs text-slate-500">APPLICATION INTAKE</div><h1 className="text-3xl font-bold mt-1">Manual Credit Entry</h1><p className="text-sm text-slate-500 mt-2">Input data debitur dan jalankan fraud scoring sebelum disimpan.</p></div>
    <form onSubmit={submit} className="grid lg:grid-cols-[1.4fr_.6fr] gap-5">
      <div className="card p-6 space-y-5">
        <Section title="Customer profile">
          <Input label="Nama lengkap" value={form.name} onChange={v=>update("name",v)} required/>
          <Input label="Nomor telepon" value={form.phone} onChange={v=>update("phone",v)} required/>
          <Input label="Pendapatan bulanan" type="number" value={form.income} onChange={v=>update("income",v)} required/>
        </Section>
        <Section title="Credit request">
          <Input label="Jumlah pinjaman" type="number" value={form.loan} onChange={v=>update("loan",v)} required/>
          <label className="text-xs text-slate-500">Tujuan<select value={form.purpose} onChange={e=>update("purpose",e.target.value)} className="mt-2 w-full bg-[#090f1b] border border-[#29374c] rounded-xl p-3 text-sm outline-none"><option>Working Capital</option><option>Consumer</option><option>Investment</option><option>Emergency</option></select></label>
        </Section>
        <Section title="Fraud signals">
          <Signal label="Phone reuse count" value={form.phoneReuse} onChange={v=>update("phoneReuse",v)}/>
          <Signal label="Address reuse count" value={form.addressReuse} onChange={v=>update("addressReuse",v)}/>
          <Signal label="Device reuse count" value={form.deviceReuse} onChange={v=>update("deviceReuse",v)}/>
          {[
            ["incomeAnomaly","Income anomaly"],["velocity","High application velocity"],["documentDuplicate","Duplicate document"],["geoMismatch","Geographic mismatch"],["creditStress","Credit stress"]
          ].map(([k,l])=><label key={k} className="flex items-center gap-3 text-sm text-slate-300"><input type="checkbox" checked={(form as any)[k]} onChange={e=>update(k,e.target.checked)} className="accent-violet-500 w-4 h-4"/>{l}</label>)}
        </Section>
        <button className="w-full py-3 rounded-xl bg-violet-500 hover:bg-violet-400 font-semibold">Save & Analyze</button>
      </div>
      <div className="card p-6 h-fit sticky top-24">
        <div className="text-xs text-slate-500">LIVE FRAUD ASSESSMENT</div>
        <div className="flex justify-center py-7"><ScoreRing score={result.score}/></div>
        <div className="flex justify-between items-center mb-4"><span className="text-sm text-slate-400">Risk classification</span><RiskBadge risk={result.risk}/></div>
        <div className="space-y-3">{result.factors.length ? result.factors.map(f=><div key={f.name} className="flex justify-between text-xs"><span className="text-slate-400">{f.name}</span><span className="text-rose-300 font-semibold">+{Math.round(f.contribution)}</span></div>) : <div className="text-xs text-slate-600">Belum ada indikator aktif.</div>}</div>
      </div>
    </form>
  </div>
}
function Section({title,children}:{title:string,children:React.ReactNode}){return <section><h2 className="text-sm font-semibold mb-3">{title}</h2><div className="grid md:grid-cols-2 gap-4">{children}</div></section>}
function Input({label,value,onChange,type="text",required}:{label:string,value:string,onChange:(v:string)=>void,type?:string,required?:boolean}){return <label className="text-xs text-slate-500">{label}<input required={required} type={type} value={value} onChange={e=>onChange(e.target.value)} className="mt-2 w-full bg-[#090f1b] border border-[#29374c] rounded-xl p-3 text-sm text-white outline-none focus:border-violet-500"/></label>}
function Signal({label,value,onChange}:{label:string,value:string,onChange:(v:string)=>void}){return <label className="text-xs text-slate-500">{label}<input type="number" min="0" max="10" value={value} onChange={e=>onChange(e.target.value)} className="mt-2 w-full bg-[#090f1b] border border-[#29374c] rounded-xl p-3 text-sm text-white outline-none"/></label>}