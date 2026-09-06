import { Network as NetworkIcon, Smartphone, MapPin, Phone, Users } from "lucide-react";

export default function NetworkPage(){return <div className="space-y-5">
  <div><div className="text-xs text-slate-500">RELATIONSHIP INTELLIGENCE</div><h1 className="text-3xl font-bold mt-1">Fraud Network</h1><p className="text-sm text-slate-500 mt-2">Visualisasikan relasi customer, phone, address, device, dan employer.</p></div>
  <div className="card p-8 grid-bg min-h-[520px] relative overflow-hidden">
    <div className="absolute inset-0 flex items-center justify-center"><div className="relative w-[620px] h-[380px]">
      <Node x="44%" y="44%" label="Andi Pratama" icon={Users} main/>
      <Node x="8%" y="12%" label="Phone •••932" icon={Phone}/><Node x="70%" y="10%" label="Device D-883" icon={Smartphone}/>
      <Node x="8%" y="72%" label="Address A-109" icon={MapPin}/><Node x="72%" y="75%" label="Employer E-72" icon={Users}/>
      <svg className="absolute inset-0 w-full h-full pointer-events-none"><line x1="50%" y1="50%" x2="14%" y2="20%" stroke="#7c5cff" strokeOpacity=".5"/><line x1="50%" y1="50%" x2="75%" y2="18%" stroke="#7c5cff" strokeOpacity=".5"/><line x1="50%" y1="50%" x2="14%" y2="78%" stroke="#00d4ff" strokeOpacity=".5"/><line x1="50%" y1="50%" x2="77%" y2="80%" stroke="#00d4ff" strokeOpacity=".5"/></svg>
    </div></div>
  </div>
</div>}
function Node({x,y,label,icon:Icon,main}:any){return <div style={{left:x,top:y}} className={`absolute -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-2 ${main?"scale-110":""}`}><div className={`w-14 h-14 rounded-full flex items-center justify-center border ${main?"bg-violet-500/20 border-violet-400 text-violet-300":"bg-[#111a2b] border-[#33435c] text-cyan-300"}`}><Icon size={20}/></div><div className="text-[11px] bg-[#0d1422] border border-[#29374c] px-2.5 py-1 rounded-lg whitespace-nowrap">{label}</div></div>}