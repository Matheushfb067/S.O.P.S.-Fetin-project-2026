import { useState, useEffect, useRef } from "react";

// ─── ECG Canvas ───────────────────────────────────────────────────────────────
function ECGCanvas() {
  const canvasRef = useRef(null);
  const dataRef = useRef([]);
  const tickRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    function resize() {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function ecgPulse(t) {
      const phase = t % 1;
      if (phase < 0.08) return Math.sin((phase / 0.08) * Math.PI) * 0.08;
      if (phase < 0.12) return -0.04;
      if (phase < 0.18) return Math.sin(((phase - 0.12) / 0.06) * Math.PI) * 1.0;
      if (phase < 0.22) return -0.25;
      if (phase < 0.28) return -0.25 + Math.sin(((phase - 0.22) / 0.06) * Math.PI) * 0.1;
      if (phase < 0.45) return Math.sin(((phase - 0.28) / 0.17) * Math.PI) * 0.18;
      return 0;
    }

    function draw() {
      const W = canvas.width, H = canvas.height;
      ctx.fillStyle = "#07090F";
      ctx.fillRect(0, 0, W, H);

      ctx.strokeStyle = "rgba(16,185,129,0.06)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x < W; x += 20) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 14) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

      tickRef.current += 0.018;
      dataRef.current.push(ecgPulse(tickRef.current));
      if (dataRef.current.length > W) dataRef.current.shift();

      ctx.strokeStyle = "#10B981";
      ctx.lineWidth = 1.5;
      ctx.shadowColor = "#10B981";
      ctx.shadowBlur = 4;
      ctx.beginPath();
      dataRef.current.forEach((v, i) => {
        const y = H / 2 - v * (H * 0.42);
        i === 0 ? ctx.moveTo(i, y) : ctx.lineTo(i, y);
      });
      ctx.stroke();
      ctx.shadowBlur = 0;

      const lastY = H / 2 - (dataRef.current[dataRef.current.length - 1] || 0) * (H * 0.42);
      ctx.fillStyle = "#10B981";
      ctx.shadowColor = "#10B981";
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(dataRef.current.length - 1, lastY, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      rafRef.current = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const patients = [
  { id: "carlos", name: "Carlos E. Mendes", status: "emergencia", statusLabel: "🚨 Ambulância", gender: "M", age: 47, blood: "O+", condition: "Trauma craniano", meta2: "Trauma craniano", extra: "⟳ ETA ~4 min · Via SAMU 192", extraColor: "text-red-500", urgent: true },
  { id: "maria",  name: "Maria da Silva",   status: "atendimento", statusLabel: "Em Atendimento", gender: "F", age: 41, blood: "B+", condition: "Hipertensão — queixa de tontura", meta2: "Hipertensão — queixa de tontura", extra: "Iniciado 08:32 · 34 min", extraColor: "text-slate-500", active: true },
  { id: "joao",   name: "João P. Ferreira", status: "aguardando", statusLabel: "Aguardando", gender: "M", age: 63, blood: "A−", condition: "Dor torácica leve", extra: "Triagem 08:55 · Aguarda 11 min", extraColor: "text-slate-500" },
  { id: "ana",    name: "Ana Beatriz Costa",status: "aguardando", statusLabel: "Aguardando", gender: "F", age: 28, blood: "AB+", condition: "Queimadura 2º grau — mão", extra: "Triagem 09:08 · Aguarda 4 min", extraColor: "text-slate-500" },
  { id: "pedro",  name: "Pedro H. Nunes",   status: "aguardando", statusLabel: "Aguardando", gender: "M", age: 9, blood: "O−", condition: "Engasgo leve — pais presentes", extra: "Triagem 09:10 · Aguarda 2 min", extraColor: "text-slate-500" },
  { id: "luiza",  name: "Luiza M. Rodrigues",status: "alta", statusLabel: "Alta Liberada", gender: "F", age: 55, blood: "A+", condition: "Pós-crise de ansiedade", extra: "Alta às 09:01 · Documentação OK", extraColor: "text-emerald-500" },
];

const statusStyles = {
  atendimento: "bg-blue-500/15 text-blue-400",
  aguardando:  "bg-amber-500/15 text-amber-400",
  emergencia:  "bg-red-500/15 text-red-400 animate-pulse",
  alta:        "bg-emerald-500/15 text-emerald-400",
};

const notifications = [
  { type: "crit", title: "🚨 SAMU — Paciente a caminho", time: "09:08", body: "Carlos E. Mendes, 47a · Trauma craniano após queda de moto. PA: 90/60, FC: 118, Glasgow: 12. Necessita TC urgente.", source: "Via Socorrista · SAMU 192 · Unidade 07", dotColor: "bg-red-500" },
  { type: "warn", title: "⚠ PA crítica — Maria da Silva", time: "09:04", body: "Pressão arterial 158/96 mmHg — acima do limiar configurado (140/90). Tendência de alta nos últimos 8 min.", source: "Monitor de leito · Sala 3", dotColor: "bg-amber-400" },
  { type: "warn", title: "⚠ Glicemia elevada — Maria da Silva", time: "08:58", body: "Glicemia 142 mg/dL em jejum. Verificar histórico de diabetes não diagnosticado. Considerar HbA1c.", source: "Monitor de leito · Sala 3", dotColor: "bg-amber-400" },
  { type: "info", title: "ℹ Novo paciente na triagem", time: "08:55", body: "João P. Ferreira, 63a — dor torácica leve. Triagem Amarela. Perfil de saúde disponível via app.", source: "Triagem · Interface do Usuário", dotColor: "bg-blue-400" },
  { type: "info", title: "ℹ Alta de Luiza M. Rodrigues", time: "09:01", body: "Paciente recebeu alta após estabilização. Receituário gerado. Retorno em 7 dias.", source: "Sistema de Alta · Sala 3", dotColor: "bg-blue-400" },
];

const notifBorder = { crit: "border-l-red-500", warn: "border-l-amber-400", info: "border-l-blue-400" };

// ─── Component ────────────────────────────────────────────────────────────────
export default function DashboardMedico() {
  const [clock, setClock] = useState("");
  const [date, setDate] = useState("");
  const [alertSeconds, setAlertSeconds] = useState(12);
  const [showAlert, setShowAlert] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState("maria");
  const [vitals, setVitals] = useState({ FC: 98, PA: "158/96", SpO2: 97, FR: 18, Glic: 142, HR: 72 });

  useEffect(() => {
    const t = setInterval(() => {
      const now = new Date();
      setClock(now.toLocaleTimeString("pt-BR"));
      setDate(now.toLocaleDateString("pt-BR"));
      setAlertSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      const r = (base, range) => +(base + (Math.random() - 0.5) * range).toFixed(0);
      const sys = Math.round(158 + (Math.random() - 0.5) * 10);
      const dia = Math.round(96 + (Math.random() - 0.5) * 6);
      setVitals({ FC: r(98, 6), PA: `${sys}/${dia}`, SpO2: r(97, 2), FR: r(18, 3), Glic: r(142, 8), HR: Math.round(72 + (Math.random() - 0.5) * 8) });
    }, 2000);
    return () => clearInterval(t);
  }, []);

  const alertTime = () => {
    const m = String(Math.floor(alertSeconds / 60)).padStart(2, "0");
    const s = String(alertSeconds % 60).padStart(2, "0");
    return `há ${m}:${s}`;
  };

  return (
    <div className="flex flex-col h-screen bg-[#07090F] text-slate-100 overflow-hidden" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap');
        .mono { font-family: 'IBM Plex Mono', monospace; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.14); border-radius: 2px; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.3} }
        @keyframes slideDown { from{transform:translateY(-100%);opacity:0} to{transform:translateY(0);opacity:1} }
        @keyframes pulseTag { 0%,100%{opacity:1} 50%{opacity:.6} }
        .blink { animation: blink 2.5s ease-in-out infinite; }
        .slide-down { animation: slideDown .4s ease; }
        .pulse-tag { animation: pulseTag 1s ease-in-out infinite; }
      `}</style>

      {/* ── TOPBAR ── */}
      <div className="h-[52px] bg-[#0D1117] border-b border-white/[0.07] flex items-center px-5 gap-0 flex-shrink-0">
        <div className="mono text-[0.85rem] font-semibold text-emerald-400 tracking-[0.06em] flex items-center gap-2 pr-5 border-r border-white/[0.07] mr-5">
          <div className="w-[22px] h-[22px] bg-emerald-400 rounded-[4px] grid place-items-center">
            <span className="text-[#07090F] font-bold text-[14px]">+</span>
          </div>
          SOCORRO<span className="text-slate-400">FÁCIL</span> · MÉDICO
        </div>
        <div className="mono text-[0.72rem] text-slate-500 flex gap-6">
          <div>UNIDADE <span className="text-slate-400">UPA Central — Sala 3</span></div>
          <div>PLANTÃO <span className="text-slate-400">Matutino 07h–13h</span></div>
          <div>DATA <span className="text-slate-400">{date || "--/--/----"}</span></div>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <div className="w-[7px] h-[7px] rounded-full bg-emerald-400 blink" style={{ boxShadow: "0 0 8px rgba(16,185,129,0.35)" }} />
          <span className="mono text-[0.72rem] text-emerald-400">SISTEMA ONLINE</span>
          <span className="mono text-[0.85rem] font-semibold text-slate-100 min-w-[64px] text-right">{clock || "--:--:--"}</span>
          <div className="bg-[#111827] border border-white/[0.14] rounded-lg px-3 py-[5px] text-[0.78rem] font-medium text-slate-400 flex items-center gap-[7px]">
            <div className="w-[22px] h-[22px] rounded-full bg-blue-500/15 border border-blue-500 grid place-items-center text-[10px] text-blue-400 font-semibold">RA</div>
            Dr. Rafael Almeida
          </div>
        </div>
      </div>

      {/* ── ALERT BANNER ── */}
      {showAlert && (
        <div className="slide-down bg-gradient-to-r from-red-500/15 to-transparent border-b border-red-500 px-5 py-2 flex items-center gap-3 flex-shrink-0 cursor-pointer" onClick={() => setShowAlert(false)}>
          <div className="bg-red-500 text-white mono text-[0.65rem] font-semibold tracking-[0.1em] px-2 py-[3px] rounded pulse-tag flex-shrink-0">⚑ EMERGÊNCIA</div>
          <div className="text-[0.82rem] font-medium text-slate-100 flex-1">Paciente <strong>Carlos Eduardo Mendes</strong> — SAMU a caminho · Trauma craniano · ETA ~4 min</div>
          <div className="mono text-[0.72rem] text-red-400">{alertTime()}</div>
          <button className="bg-transparent border-none text-slate-500 text-base px-1" onClick={e => { e.stopPropagation(); setShowAlert(false); }}>✕</button>
        </div>
      )}

      {/* ── MAIN GRID ── */}
      <div className="flex-1 grid overflow-hidden" style={{ gridTemplateColumns: "320px 1fr 280px" }}>

        {/* ── COL 1: PATIENTS ── */}
        <div className="border-r border-white/[0.07] flex flex-col overflow-hidden">
          <div className="px-4 py-[14px] border-b border-white/[0.07] flex items-center justify-between flex-shrink-0">
            <div className="mono text-[0.72rem] font-semibold tracking-[0.1em] text-slate-500 uppercase">Pacientes</div>
            <div className="flex gap-[6px]">
              <span className="mono text-[0.68rem] font-semibold px-2 py-[2px] rounded-full border border-red-500 bg-red-500/15 text-red-400">1 EMERGÊNCIA</span>
              <span className="mono text-[0.68rem] font-semibold px-2 py-[2px] rounded-full border border-blue-400 bg-blue-500/15 text-blue-400">6 TOTAL</span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {patients.map(p => (
              <div
                key={p.id}
                onClick={() => setSelectedPatient(p.id)}
                className={`px-4 py-3 border-b border-white/[0.07] cursor-pointer transition-colors duration-[0.12s] relative
                  ${p.urgent ? "border-l-2 border-l-red-500" : ""}
                  ${selectedPatient === p.id && !p.urgent ? "bg-[#111827] border-l-2 border-l-blue-400" : ""}
                  ${selectedPatient === p.id && p.urgent ? "bg-red-500/[0.06]" : ""}
                  hover:bg-[#1A2233]`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="text-[0.875rem] font-semibold text-slate-100">{p.name}</div>
                  <div className={`mono text-[0.65rem] font-semibold px-[7px] py-[2px] rounded uppercase tracking-[0.06em] ${statusStyles[p.status]}`}>{p.statusLabel}</div>
                </div>
                <div className="text-[0.75rem] text-slate-500 flex gap-[10px]">
                  <span className="text-slate-400">{p.gender}, {p.age}a · {p.blood}</span>
                  <span className="text-slate-400">{p.condition}</span>
                </div>
                <div className={`mono text-[0.65rem] mt-[5px] ${p.extraColor}`}>{p.extra}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── COL 2: VITALS + PROFILE ── */}
        <div className="border-r border-white/[0.07] flex flex-col overflow-hidden">
          {/* Patient header */}
          <div className="p-4 border-b border-white/[0.07] flex-shrink-0">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-[1.05rem] font-semibold text-slate-100 mb-[3px]">Maria da Silva</div>
                <div className="mono text-[0.72rem] text-slate-500">F · 41 anos · CPF 123.456.789-00</div>
                <div className="flex flex-wrap gap-[5px] mt-[6px]">
                  {[
                    { label: "Hipertensão", cls: "text-red-400 border-red-400/40 bg-red-500/15" },
                    { label: "Marca-passo 2021", cls: "text-red-400 border-red-400/40 bg-red-500/15" },
                    { label: "Losartana 50mg", cls: "text-amber-400 border-amber-400/40 bg-amber-500/15" },
                    { label: "B+", cls: "text-blue-400 border-blue-400/40 bg-blue-500/15" },
                  ].map(t => (
                    <span key={t.label} className={`mono text-[0.65rem] px-2 py-[2px] rounded border ${t.cls}`}>{t.label}</span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <div className="mono text-[0.65rem] font-semibold px-[7px] py-[2px] rounded uppercase tracking-[0.06em] bg-blue-500/15 text-blue-400 inline-block mb-[6px]">Em Atendimento</div>
                <div className="mono text-[0.65rem] text-slate-500">SALA 3 · 08:32</div>
              </div>
            </div>

            {/* Vitals grid */}
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: "FC", val: vitals.FC, unit: "bpm", warn: "warn", trend: "↑", trendCls: "text-red-500" },
                { label: "PA", val: vitals.PA, unit: "mmHg", warn: "crit", trend: "↑↑", trendCls: "text-red-500" },
                { label: "SpO₂", val: vitals.SpO2, unit: "%", warn: "", trend: "✓", trendCls: "text-emerald-400" },
                { label: "TEMP", val: "37.2", unit: "°C", warn: "", trend: "✓", trendCls: "text-emerald-400" },
                { label: "FR", val: vitals.FR, unit: "irpm", warn: "", trend: "✓", trendCls: "text-emerald-400" },
                { label: "GLICEMIA", val: vitals.Glic, unit: "mg/dL", warn: "warn", trend: "↑", trendCls: "text-red-500" },
                { label: "GLASGOW", val: "15", unit: "/ 15", warn: "", trend: "✓", trendCls: "text-emerald-400" },
                { label: "DOR (EVA)", val: "4", unit: "/ 10", warn: "", trend: "→", trendCls: "text-blue-400" },
              ].map(v => (
                <div key={v.label} className={`bg-[#07090F] border rounded-lg px-3 py-[10px] relative overflow-hidden
                  ${v.warn === "warn" ? "border-amber-500/50" : v.warn === "crit" ? "border-red-500/50" : "border-white/[0.07]"}`}>
                  <div className="mono text-[0.6rem] tracking-[0.1em] text-slate-500 uppercase mb-1">{v.label}</div>
                  <div className={`mono text-[1.35rem] font-semibold leading-none
                    ${v.warn === "warn" ? "text-amber-400" : v.warn === "crit" ? "text-red-400" : "text-slate-100"}`}>{v.val}</div>
                  <div className="mono text-[0.65rem] text-slate-500 mt-[2px]">{v.unit}</div>
                  <div className={`absolute bottom-[6px] right-2 text-[0.65rem] font-semibold ${v.trendCls}`}>{v.trend}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ECG */}
          <div className="px-4 pb-4 border-b border-white/[0.07] flex-shrink-0">
            <div className="mono text-[0.65rem] tracking-[0.1em] text-slate-500 uppercase py-[10px] flex items-center gap-2">
              <div className="w-[6px] h-[6px] rounded-full bg-emerald-400" style={{ boxShadow: "0 0 6px rgba(16,185,129,0.35)" }} />
              TRAÇADO ECG — TEMPO REAL
              <span className="ml-auto text-emerald-400 text-[0.68rem]">{vitals.HR} BPM</span>
            </div>
            <div className="bg-[#07090F] border border-white/[0.07] rounded-lg overflow-hidden h-[72px] relative">
              <ECGCanvas />
            </div>
          </div>

          {/* Patient profile */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="mono text-[0.65rem] tracking-[0.1em] text-slate-500 uppercase mb-3">◈ Dados Cadastrais — Interface do Usuário</div>

            <div className="mb-5">
              <div className="grid grid-cols-2 gap-2 mb-2">
                {[["Nome", "Maria da Silva"], ["Nascimento", "12/04/1985"], ["Tipo Sanguíneo", "B+"], ["Tel. Emergência", "(35) 98765-4321"]].map(([l, v]) => (
                  <div key={l} className="bg-[#07090F] border border-white/[0.07] rounded-[6px] px-[10px] py-2">
                    <div className="mono text-[0.6rem] text-slate-500 tracking-[0.08em] uppercase mb-[2px]">{l}</div>
                    <div className="text-[0.82rem] font-medium text-slate-100">{v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <div className="mono text-[0.6rem] text-slate-500 tracking-[0.08em] uppercase mb-[6px]">Alergias</div>
              <div className="flex flex-wrap gap-[5px]">
                {["⚠ Penicilina", "⚠ Dipirona"].map(a => (
                  <span key={a} className="bg-red-500/15 border border-red-500/35 text-red-400 mono text-[0.65rem] px-2 py-[2px] rounded">{a}</span>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <div className="mono text-[0.6rem] text-slate-500 tracking-[0.08em] uppercase mb-[6px]">Condições Pré-existentes</div>
              <div className="flex flex-wrap gap-[5px]">
                {["Hipertensão", "Marca-passo (2021)"].map(c => (
                  <span key={c} className="bg-amber-500/15 border border-amber-500/35 text-amber-400 mono text-[0.65rem] px-2 py-[2px] rounded">{c}</span>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <div className="mono text-[0.6rem] text-slate-500 tracking-[0.08em] uppercase mb-[6px]">Medicamentos em Uso</div>
              <div className="bg-[#07090F] border border-white/[0.07] rounded-[6px] px-[10px] py-2">
                <div className="text-[0.8rem] text-slate-100">Losartana 50mg · 1x/dia (manhã)</div>
              </div>
            </div>

            <div className="mb-5">
              <div className="mono text-[0.6rem] text-slate-500 tracking-[0.08em] uppercase mb-[6px]">Observações Médicas</div>
              <div className="bg-[#07090F] border-l-2 border-l-amber-400 rounded-r-[6px] px-3 py-[10px] text-[0.8rem] text-slate-400 leading-[1.6]">
                Marca-passo cardíaco implantado em 2021. <strong className="text-amber-400">Não usar desfibrilador sem avaliação cardiológica.</strong> Paciente refere tontura ao levantar há 3 dias.
              </div>
            </div>
          </div>
        </div>

        {/* ── COL 3: NOTIFICATIONS ── */}
        <div className="flex flex-col overflow-hidden">
          <div className="px-4 py-[14px] border-b border-white/[0.07] flex items-center justify-between flex-shrink-0">
            <div className="mono text-[0.72rem] font-semibold tracking-[0.1em] text-slate-500 uppercase">Notificações</div>
            <span className="mono text-[0.68rem] font-semibold px-2 py-[2px] rounded-full border border-red-500 bg-red-500/15 text-red-400">4 NOVAS</span>
          </div>
          <div className="flex-1 overflow-y-auto">
            {notifications.map((n, i) => (
              <div key={i} className={`px-4 py-3 border-b border-white/[0.07] cursor-pointer hover:bg-[#1A2233] transition-colors border-l-2 ${notifBorder[n.type]}`}>
                <div className="flex justify-between items-start mb-1">
                  <div className="text-[0.8rem] font-semibold text-slate-100 leading-[1.3] flex-1 mr-2">{n.title}</div>
                  <div className="mono text-[0.65rem] text-slate-500 whitespace-nowrap">{n.time}</div>
                </div>
                <div className="text-[0.75rem] text-slate-400 leading-[1.5] mb-[6px]">{n.body}</div>
                <div className="mono text-[0.62rem] text-slate-500 flex items-center gap-[5px]">
                  <div className={`w-[5px] h-[5px] rounded-full ${n.dotColor}`} />
                  {n.source}
                </div>
              </div>
            ))}
            <div className="p-4 text-center">
              <div className="mono text-[0.65rem] text-slate-500">— Fim das notificações recentes —</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── STATUS BAR ── */}
      <div className="h-7 bg-[#0D1117] border-t border-white/[0.07] flex items-center px-4 gap-6 flex-shrink-0">
        {[
          { dot: "bg-emerald-400", label: "Monitor Conectado" },
          { dot: "bg-emerald-400", label: "SAMU Online" },
          { dot: "bg-red-500 animate-pulse", label: "1 Emergência Ativa" },
        ].map(s => (
          <div key={s.label} className="mono text-[0.65rem] text-slate-500 flex items-center gap-[5px]">
            <div className={`w-[5px] h-[5px] rounded-full ${s.dot}`} />
            {s.label}
          </div>
        ))}
        <div className="mono text-[0.65rem] text-slate-500">BD <span className="text-slate-400">Sincronizado 09:11:34</span></div>
        <div className="mono text-[0.65rem] text-slate-500 ml-auto">SocorroFácil v2.1.0 · UPA Central</div>
      </div>
    </div>
  );
}
