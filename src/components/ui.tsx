import { RiskLevel } from "@/lib/types";

export function RiskBadge({ risk }: { risk: RiskLevel }) {
  const styles = {
    LOW: "bg-emerald-400/10 text-emerald-300 border-emerald-400/20",
    MEDIUM: "bg-amber-400/10 text-amber-300 border-amber-400/20",
    HIGH: "bg-orange-400/10 text-orange-300 border-orange-400/20",
    CRITICAL: "bg-rose-400/10 text-rose-300 border-rose-400/20",
  }[risk];
  return <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${styles}`}>{risk}</span>;
}

export function ScoreRing({ score }: { score: number }) {
  const risk = score >= 80 ? "CRITICAL" : score >= 60 ? "HIGH" : score >= 30 ? "MEDIUM" : "LOW";
  const ring = risk === "CRITICAL" ? "border-rose-400 text-rose-300" :
    risk === "HIGH" ? "border-orange-400 text-orange-300" :
    risk === "MEDIUM" ? "border-amber-400 text-amber-300" : "border-emerald-400 text-emerald-300";
  return (
    <div className={`w-20 h-20 rounded-full border-4 ${ring} flex flex-col items-center justify-center`}>
      <span className="text-xl font-bold">{score}</span>
      <span className="text-[8px] tracking-widest">{risk}</span>
    </div>
  );
}

export function StatCard({ title, value, delta, icon: Icon, tone = "violet" }: any) {
  const tones: any = {
    violet: "from-violet-500/20 to-violet-500/0 text-violet-300",
    cyan: "from-cyan-500/20 to-cyan-500/0 text-cyan-300",
    rose: "from-rose-500/20 to-rose-500/0 text-rose-300",
    amber: "from-amber-500/20 to-amber-500/0 text-amber-300",
  };
  return (
    <div className="card p-5 relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${tones[tone]}`} />
      <div className="relative flex justify-between">
        <div>
          <div className="text-xs text-slate-500">{title}</div>
          <div className="text-2xl font-bold mt-2">{value}</div>
          <div className="text-[11px] text-slate-500 mt-2">{delta}</div>
        </div>
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center"><Icon size={19}/></div>
      </div>
    </div>
  );
}