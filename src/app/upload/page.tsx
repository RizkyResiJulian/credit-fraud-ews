"use client";
import { useState } from "react";
import { CheckCircle2, FileSpreadsheet, FileText, UploadCloud, XCircle } from "lucide-react";

export default function UploadPage(){
  const [file,setFile]=useState<File|null>(null);
  const [busy,setBusy]=useState(false);
  const [result,setResult]=useState<any>(null);
  const upload=async()=>{ if(!file)return; setBusy(true); const fd=new FormData(); fd.append("file",file); const r=await fetch("/api/import", {method:"POST",body:fd}); const d=await r.json(); setResult(d); setBusy(false); };
  return <div className="max-w-5xl mx-auto space-y-5">
    <div><div className="text-xs text-slate-500">DATA INGESTION</div><h1 className="text-3xl font-bold mt-1">Universal Data Import</h1><p className="text-sm text-slate-500 mt-2">Upload CSV/XLSX untuk pipeline normalisasi dan fraud scoring. PDF/DOCX dapat ditambahkan pada phase berikutnya.</p></div>
    <div className="card p-8">
      <label className="border-2 border-dashed border-[#34445d] hover:border-violet-500/60 rounded-2xl min-h-[260px] flex flex-col items-center justify-center cursor-pointer bg-white/[.015]">
        <UploadCloud size={38} className="text-violet-300"/><div className="font-semibold mt-4">Drop file atau klik untuk memilih</div><div className="text-xs text-slate-600 mt-2">CSV, XLSX · maksimal sesuai konfigurasi server</div>
        <input type="file" accept=".csv,.xlsx,.xls" className="hidden" onChange={e=>setFile(e.target.files?.[0] ?? null)}/>
      </label>
      {file && <div className="mt-4 flex items-center justify-between p-4 rounded-xl bg-white/[.025] border border-[#1d2a3d]"><div className="flex items-center gap-3"><FileSpreadsheet size={20} className="text-emerald-300"/><div><div className="text-sm">{file.name}</div><div className="text-[11px] text-slate-600">{(file.size/1024).toFixed(1)} KB</div></div></div><button onClick={upload} disabled={busy} className="px-4 py-2 rounded-xl bg-violet-500 text-sm font-semibold disabled:opacity-50">{busy?"Processing...":"Analyze & Import"}</button></div>}
    </div>
    {result && <div className="card p-6"><h2 className="font-semibold">Import result</h2><div className="grid sm:grid-cols-3 gap-4 mt-5"><Metric icon={CheckCircle2} label="Valid rows" value={result.valid ?? 0}/><Metric icon={XCircle} label="Errors" value={result.errors ?? 0}/><Metric icon={FileText} label="Risk alerts" value={result.alerts ?? 0}/></div>{result.message && <p className="text-xs text-slate-500 mt-5">{result.message}</p>}</div>}
  </div>
}
function Metric({icon:Icon,label,value}:any){return <div className="p-4 rounded-xl bg-white/[.025] border border-[#1d2a3d]"><Icon size={16} className="text-slate-500"/><div className="text-xs text-slate-600 mt-3">{label}</div><div className="text-2xl font-bold mt-1">{value}</div></div>}