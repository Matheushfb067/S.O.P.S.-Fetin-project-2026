import { useState, useEffect, useRef } from "react";

// ─── Mini ECG Canvas ──────────────────────────────────────────────────────────
function ECGStrip() {
  const canvasRef = useRef(null);
  const frameRef = useRef(0);
  const rafRef = useRef(null);
  const W = 298, H = 36;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    function ecgWave(x) {
      const period = 60, phase = x % period;
      if (phase < 2) return 0;
      if (phase < 4) return (phase - 2) * 4;
      if (phase < 5) return 8 - (phase - 4) * 16;
      if (phase < 6) return -8 + (phase - 5) * 20;
      if (phase < 8) return 12 - (phase - 6) * 12;
      if (phase < 10) return 0 + (phase - 8) * 3;
      if (phase < 12) return 6 - (phase - 10) * 3;
      return 0;
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = "#1a3050"; ctx.lineWidth = 0.5;
      for (let x = 0; x < W; x += 10) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 9) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
      ctx.beginPath(); ctx.strokeStyle = "#3ddc78"; ctx.lineWidth = 1.5;
      ctx.shadowColor = "#3ddc78"; ctx.shadowBlur = 3;
      for (let px = 0; px < W; px++) {
        const py = H / 2 - ecgWave(frameRef.current - (W - px));
        px === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.stroke(); ctx.shadowBlur = 0;
      frameRef.current += 0.7;
      rafRef.current = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return <canvas ref={canvasRef} width={W} height={H} className="absolute inset-0" />;
}

// ─── Chip ──────────────────────────────────────────────────────────────────────
function Chip({ label, defaultOn = false, colorOn = "blue" }) {
  const [on, setOn] = useState(defaultOn);
  const cls = on
    ? colorOn === "red"
      ? "bg-[#1e0404] border-[#d41f1f] text-[#ff8888]"
      : "bg-[#0c2340] border-[#2070c8] text-[#88c8ff]"
    : "bg-[#071220] border-[#182e4a] text-[#5aa8ff] hover:border-[#264a72]";
  return (
    <button onClick={() => setOn(!on)} className={`border rounded px-[9px] py-1 text-[11.5px] cursor-pointer transition-all duration-[0.12s] ${cls}`}>
      {label}
    </button>
  );
}

// ─── Pill (radio) ─────────────────────────────────────────────────────────────
function Pills({ options, defaultIdx = 0 }) {
  const [sel, setSel] = useState(defaultIdx);
  return (
    <div className="flex flex-wrap gap-1">
      {options.map((opt, i) => (
        <button key={opt} onClick={() => setSel(i)}
          className={`border rounded px-[10px] py-1 text-[11.5px] cursor-pointer transition-all duration-[0.12s]
            ${i === sel ? "bg-[#0c2340] border-[#2070c8] text-[#5aa8ff]" : "bg-[#071220] border-[#182e4a] text-[#4a6e90] hover:text-[#cce0f5]"}`}>
          {opt}
        </button>
      ))}
    </div>
  );
}

// ─── Field ────────────────────────────────────────────────────────────────────
function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[9.5px] font-medium uppercase tracking-[0.8px] text-[#4a6e90]">{label}</label>
      {children}
    </div>
  );
}

function Input({ placeholder = "", type = "text", ...rest }) {
  return (
    <input type={type} placeholder={placeholder} {...rest}
      className="bg-[#071220] border border-[#182e4a] rounded-[5px] px-[9px] py-[7px] text-[#cce0f5] text-[12.5px] outline-none transition-colors focus:border-[#2070c8] focus:shadow-[0_0_0_2px_rgba(32,112,200,0.1)] w-full placeholder-[#243c54]"
      style={{ fontFamily: "'IBM Plex Sans', sans-serif" }} />
  );
}

function Select({ children, ...rest }) {
  return (
    <select {...rest}
      className="bg-[#071220] border border-[#182e4a] rounded-[5px] px-[9px] py-[7px] text-[#cce0f5] text-[12.5px] outline-none transition-colors focus:border-[#2070c8] w-full"
      style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
      {children}
    </select>
  );
}

function Textarea({ placeholder = "", ...rest }) {
  return (
    <textarea placeholder={placeholder} {...rest}
      className="bg-[#071220] border border-[#182e4a] rounded-[5px] px-[9px] py-[7px] text-[#cce0f5] text-[12.5px] outline-none resize-y min-h-[58px] leading-[1.6] w-full placeholder-[#243c54] focus:border-[#2070c8]"
      style={{ fontFamily: "'IBM Plex Sans', sans-serif" }} />
  );
}

function CardLabel({ color = "blue", children }) {
  const barColors = { red: "bg-[#d41f1f]", blue: "bg-[#2070c8]", green: "bg-[#14803a]", amber: "bg-[#b87800]", purple: "bg-[#6030b8]", orange: "bg-[#d44800]" };
  return (
    <div className="text-[9.5px] font-semibold uppercase tracking-[1.3px] text-[#4a6e90] mb-3 flex items-center gap-[6px]">
      <span className={`w-[3px] h-[11px] rounded-[2px] inline-block ${barColors[color]}`} />
      {children}
    </div>
  );
}

function Card({ children }) {
  return <div className="bg-[#0d1f38] border border-[#182e4a] rounded-[9px] p-4 mb-3">{children}</div>;
}

function SecHead({ children }) {
  return (
    <div className="flex items-center gap-2 text-[9.5px] font-semibold uppercase tracking-[1.6px] text-[#4a6e90] mb-[10px]">
      {children}
      <div className="flex-1 h-px bg-[#182e4a]" />
    </div>
  );
}

// ─── Vitals data ──────────────────────────────────────────────────────────────
const bpms  = [82,85,88,91,87,84,90,93,88,86,95,92,88,104,88];
const spo2s = [97,96,97,98,97,96,94,97,98,96,95,97,98,97,96];
const temps = [36.8,36.9,36.8,37.0,36.8,36.7,36.9,36.8,37.1,36.8,36.9,36.8,36.7,37.2,36.8];
const pas   = ["120/80","122/82","118/78","124/80","120/80","116/76","122/80","120/82","118/80","122/78","120/80","118/80","124/82","120/80","122/82"];
const glis  = [102,104,100,105,102,98,106,102,100,108,102,104,100,102,106];
const resps = [16,17,16,18,16,15,17,16,18,16,17,16,15,16,18];

// ─── Glasgow ──────────────────────────────────────────────────────────────────
function Glasgow() {
  const [g1, setG1] = useState(4);
  const [g2, setG2] = useState(5);
  const [g3, setG3] = useState(6);
  const total = +g1 + +g2 + +g3;
  const badge = total >= 13 ? ["Leve (13-15)", "bg-[#042010] text-[#3ddc78]"] : total >= 9 ? ["Moderado (9-12)", "bg-[#1c1200] text-[#f5b93e]"] : ["Grave (≤8)", "bg-[#1e0404] text-[#ff8080]"];

  const selCls = "w-full bg-[#09162a] border border-[#182e4a] rounded-[4px] px-[6px] py-1 text-[#cce0f5] text-[11.5px] outline-none";
  return (
    <div className="grid gap-[7px]" style={{ gridTemplateColumns: "1fr 1fr 1fr 88px" }}>
      {[
        { id: "g1", label: "Abertura ocular", val: g1, set: setG1, opts: [[4,"4 — Espontânea"],[3,"3 — A voz"],[2,"2 — A pressão"],[1,"1 — Ausente"]] },
        { id: "g2", label: "Resposta verbal", val: g2, set: setG2, opts: [[5,"5 — Orientado"],[4,"4 — Confuso"],[3,"3 — Palavras inapropriadas"],[2,"2 — Sons / Gemidos"],[1,"1 — Ausente"]] },
        { id: "g3", label: "Resposta motora", val: g3, set: setG3, opts: [[6,"6 — Obedece comandos"],[5,"5 — Localiza dor"],[4,"4 — Retira à pressão"],[3,"3 — Flexão anormal"],[2,"2 — Extensão anormal"],[1,"1 — Ausente"]] },
      ].map(g => (
        <div key={g.id} className="bg-[#071220] border border-[#182e4a] rounded-[6px] p-[9px]">
          <label className="text-[9px] text-[#4a6e90] block mb-1 font-medium uppercase tracking-[0.7px]">{g.label}</label>
          <select value={g.val} onChange={e => g.set(e.target.value)} className={selCls} style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
            {g.opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>
      ))}
      <div className="bg-[#0a2040] border border-[#2070c8] rounded-[6px] flex flex-col items-center justify-center gap-[2px] text-center">
        <div className="text-[30px] font-semibold text-[#5aa8ff] leading-none" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{total}</div>
        <div className="text-[8.5px] text-[#4a6e90] uppercase tracking-[0.8px]">Total ECG</div>
        <div className={`text-[9.5px] px-[6px] py-[2px] rounded-[3px] mt-[3px] ${badge[1]}`}>{badge[0]}</div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PaginaSocorrista() {
  const [clock, setClock] = useState("--:--:--");
  const [lastSync, setLastSync] = useState("--:--");
  const [vitIdx, setVitIdx] = useState(0);
  const [toast, setToast] = useState({ show: false, msg: "", error: false });
  const [activeTab, setActiveTab] = useState("ficha");
  const [txDone, setTxDone] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      const now = new Date();
      setClock(now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
      setLastSync(now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setVitIdx(i => (i + 1) % bpms.length), 2200);
    return () => clearInterval(t);
  }, []);

  const bpm = bpms[vitIdx], spo2 = spo2s[vitIdx], temp = temps[vitIdx], pa = pas[vitIdx], gli = glis[vitIdx], resp = resps[vitIdx];

  function showToast(msg, error = false) {
    setToast({ show: true, msg, error });
    setTimeout(() => setToast(t => ({ ...t, show: false })), 3800);
  }

  function transmitir() { showToast("Ficha APH + sinais vitais transmitidos ao painel do médico!"); setTxDone(true); }
  function salvar() { showToast("Rascunho salvo localmente no dispositivo."); }

  const vStatus = (val, ok, warnHi, warnLo) => val > warnHi ? ["Alerta", "bg-[#2a1400] text-[#ff7a30]"] : val < (warnLo ?? -Infinity) ? ["Crítico", "bg-[#1e0404] text-[#ff8080]"] : ["Normal", "bg-[#042010] text-[#3ddc78]"];

  const vitals = [
    { cls: "bpm", color: "border-l-[#d41f1f]", label: "FC", val: bpm, unit: "bpm", valCls: "text-[#f07070]", status: bpm > 100 ? ["Taquicardia","bg-[#2a1400] text-[#ff7a30]"] : bpm < 60 ? ["Bradicardia","bg-[#1e0404] text-[#ff8080]"] : ["Normal","bg-[#042010] text-[#3ddc78]"] },
    { cls: "spo2", color: "border-l-[#2070c8]", label: "SpO₂", val: spo2, unit: "%", valCls: "text-[#5aa8ff]", status: spo2 < 90 ? ["Crítico","bg-[#1e0404] text-[#ff8080]"] : spo2 < 94 ? ["Alerta","bg-[#2a1400] text-[#ff7a30]"] : ["Normal","bg-[#042010] text-[#3ddc78]"] },
    { cls: "temp", color: "border-l-[#b87800]", label: "Temp", val: temp.toFixed(1), unit: "°C", valCls: "text-[#f5b93e]", status: temp >= 38 ? ["Febre","bg-[#2a1400] text-[#ff7a30]"] : temp < 36 ? ["Hipotermia","bg-[#1e0404] text-[#ff8080]"] : ["Normal","bg-[#042010] text-[#3ddc78]"] },
    { cls: "pa", color: "border-l-[#14803a]", label: "PA", val: pa, unit: "mmHg", valCls: "text-[#3ddc78] !text-[16px] mt-[3px]", status: ["—","bg-[#071220] text-[#4a6e90]"] },
    { cls: "gli", color: "border-l-[#b87800]", label: "Glicemia", val: gli, unit: "mg/dL", valCls: "text-[#f5b93e]", status: gli > 180 ? ["Hiperglicemia","bg-[#2a1400] text-[#ff7a30]"] : gli < 70 ? ["Hipoglicemia","bg-[#1e0404] text-[#ff8080]"] : ["Normal","bg-[#042010] text-[#3ddc78]"] },
    { cls: "resp", color: "border-l-[#d44800]", label: "F. Resp.", val: resp, unit: "rpm", valCls: "text-[#ff7a30]", status: resp > 20 ? ["Taquipneia","bg-[#2a1400] text-[#ff7a30]"] : resp < 12 ? ["Bradipneia","bg-[#2a1400] text-[#ff7a30]"] : ["Normal","bg-[#042010] text-[#3ddc78]"] },
  ];

  return (
    <div className="flex flex-col h-screen bg-[#050d18] text-[#cce0f5] overflow-hidden text-[13px] leading-[1.5]" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap');
        .mono { font-family: 'IBM Plex Mono', monospace; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.25} }
        @keyframes ping { 0%,100%{box-shadow:0 0 0 5px rgba(212,31,31,0.2)} 50%{box-shadow:0 0 0 11px rgba(212,31,31,0.04)} }
        @keyframes prog { from{width:55%} to{width:70%} }
        @keyframes pulse-bar { from{opacity:.3} to{opacity:1} }
        @keyframes pulse-border { 0%,100%{border-color:#d41f1f} 50%{border-color:#800} }
        .blink { animation: blink 1.4s ease-in-out infinite; }
        .ping-anim { animation: ping 1.8s ease-in-out infinite; }
        .prog-anim { animation: prog 3s ease-in-out infinite alternate; }
        .pulse-border { animation: pulse-border 2s ease-in-out infinite; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #182e4a; border-radius: 2px; }
      `}</style>

      {/* ── TOPBAR ── */}
      <header className="fixed top-0 left-0 right-0 z-[200] h-[52px] bg-[#09162a] border-b border-[#182e4a] flex items-center justify-between px-5 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-[34px] h-[34px] rounded-full bg-[#d41f1f] flex items-center justify-center flex-shrink-0" style={{ boxShadow: "0 0 12px rgba(212,31,31,0.4)" }}>
            <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-5h2v5zm0-8h-2V7h2v2z"/></svg>
          </div>
          <div>
            <div className="text-[14px] font-semibold text-[#ddeeff] tracking-[0.2px]">SOPS 2.0 — Interface do Socorrista</div>
            <div className="mono text-[10px] text-[#4a6e90]">Sistema Organizacional de Primeiros Socorros · APH</div>
          </div>
          <div className="w-px h-7 bg-[#182e4a] mx-1" />
          <div className="mono text-[11px] text-[#5aa8ff] bg-[#0d1f38] border border-[#264a72] rounded-[5px] px-[10px] py-[3px]">OCR #2025-1142</div>
          <div className="mono text-[11px] bg-[#0d1f38] border border-[#b87800] rounded-[5px] px-[10px] py-[3px] text-[#f5b93e]">SAMU 192</div>
        </div>
        <div className="flex items-center gap-2">
          {["Ficha APH", "Sinais Vitais", "Transmissão"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab.toLowerCase().replace(" ", ""))}
              className={`px-[14px] py-[5px] rounded-[5px] text-[11px] font-medium uppercase tracking-[0.8px] cursor-pointer border transition-all duration-[0.15s]
                ${activeTab === tab.toLowerCase().replace(" ", "") ? "bg-[#0d1f38] border-[#264a72] text-[#5aa8ff]" : "border-transparent text-[#4a6e90] hover:text-[#cce0f5]"}`}>
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-[14px]">
          <div className="mono text-[11px] text-[#4a6e90] flex items-center gap-[5px]">
            <div className={`w-[6px] h-[6px] rounded-full ${txDone ? "bg-[#3ddc78] blink" : "bg-[#4a6e90]"}`} />
            {txDone ? "Transmissão concluída" : "Transmitindo ao médico"}
          </div>
          <div className="w-px h-7 bg-[#182e4a]" />
          <div className="flex items-center gap-[6px] mono text-[11px] text-[#3ddc78]">
            <div className="w-[7px] h-[7px] rounded-full bg-[#3ddc78] blink" />
            Sensores ativos
          </div>
          <div className="mono text-[17px] font-medium text-[#5aa8ff] min-w-[76px] text-right">{clock}</div>
        </div>
      </header>

      {/* ── MAIN ── */}
      <div className="mt-[52px] flex flex-1 overflow-hidden h-[calc(100vh-52px-44px)]">

        {/* ── FORM COLUMN ── */}
        <main className="flex-1 overflow-y-auto px-[22px] py-[18px] pb-[60px]">

          {/* IDENTIFICAÇÃO */}
          <Card>
            <CardLabel color="red">Identificação da ocorrência</CardLabel>
            <div className="grid grid-cols-4 gap-[9px] mb-[9px]">
              <Field label="Nº da ocorrência"><div className="mono bg-[#071220] border border-[#182e4a] rounded-[5px] px-[9px] py-[7px] text-[#5aa8ff] text-[12.5px]">2025-1142</div></Field>
              <Field label="Data"><Input type="date" /></Field>
              <Field label="Médico regulador"><Input placeholder="Nome do médico" /></Field>
              <Field label="Base / VTR">
                <Select><option>USA — Viatura 01</option><option selected>USB — Viatura 07</option><option>VTR — Viatura 12</option></Select>
              </Field>
            </div>
            <div className="grid gap-[9px] mb-[9px]" style={{ gridTemplateColumns: "2fr 1fr" }}>
              <Field label="Motivo da solicitação">
                <div className="flex flex-wrap gap-1">
                  {["Cirúrgico","Clínico","Trauma","Pediátrico","Obstétrico","Transp. Inter Unidades","Outros"].map((c, i) => (
                    <Chip key={c} label={c} defaultOn={c === "Clínico"} />
                  ))}
                </div>
              </Field>
              <Field label="Local da ocorrência">
                <Pills options={["Via pública","Espaço público","Residência","Rodovia"]} defaultIdx={0} />
              </Field>
            </div>
            <div className="grid gap-[9px]" style={{ gridTemplateColumns: "2fr 1fr" }}>
              <Field label="Endereço / logradouro"><Input placeholder="Rua, número, complemento" /></Field>
              <Field label="Bairro / Município"><Input placeholder="Bairro — Cidade" /></Field>
            </div>
          </Card>

          {/* SITUAÇÃO DO LOCAL */}
          <Card>
            <CardLabel color="amber">Situação do local e intercorrências</CardLabel>
            <div className="grid grid-cols-3 gap-[9px]">
              <Field label="Situação do local">
                <div className="flex flex-wrap gap-1">
                  {["Cena Segura","Difícil Acesso","Cena Insegura","Aglomeração","Produto Perigoso","Animais c/ Risco","Terceiros c/ Risco","Rua Sem Identificação","Óleo na Via","Incêndio"].map(c => (
                    <Chip key={c} label={c} defaultOn={c === "Cena Segura"} />
                  ))}
                </div>
              </Field>
              <Field label="Situação da vítima">
                <div className="flex flex-wrap gap-1">
                  {["Evasão","Vítima Agressiva","Não Localizada","Presa às Ferragens"].map(c => (
                    <Chip key={c} label={c} />
                  ))}
                </div>
              </Field>
              <Field label="Intercorrências">
                <div className="flex flex-wrap gap-1 mb-[6px]">
                  {["Chamado Falso","QTA no Local","QTA no Trajeto","Múltiplas Vítimas"].map(c => (
                    <Chip key={c} label={c} />
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-[9px]">
                  <Field label="Nº de vítimas"><Input type="number" placeholder="--" /></Field>
                  <Field label="Apoio"><Pills options={["Não","USA","USB","190","193"]} /></Field>
                </div>
              </Field>
            </div>
          </Card>

          {/* DADOS DA VÍTIMA */}
          <Card>
            <CardLabel color="red">Dados da vítima</CardLabel>
            <div className="grid grid-cols-5 gap-[9px] mb-[9px]">
              <div className="col-span-2"><Field label="Nome completo"><Input placeholder="Nome da vítima" /></Field></div>
              <Field label="Data de nasc."><Input type="date" /></Field>
              <Field label="Idade"><Input type="number" placeholder="--" /></Field>
              <Field label="Sexo"><Select><option>-- Sel.</option><option>M</option><option>F</option></Select></Field>
            </div>
            <div className="grid grid-cols-4 gap-[9px] mb-[9px]">
              <Field label="CNS"><Input placeholder="Cartão SUS" /></Field>
              <Field label="CPF"><Input placeholder="000.000.000-00" /></Field>
              <Field label="Telefone"><Input placeholder="(00) 00000-0000" /></Field>
              <Field label="Cidade"><Input placeholder="Cidade" /></Field>
            </div>
            <div className="grid grid-cols-2 gap-[9px]">
              <Field label="Endereço da vítima"><Input placeholder="Rua, número, bairro" /></Field>
              <Field label="Acompanhante"><Input placeholder="Nome e telefone do acompanhante" /></Field>
            </div>
          </Card>

          {/* ANTECEDENTES */}
          <Card>
            <CardLabel color="blue">Antecedentes pessoais, alergias e medicamentos</CardLabel>
            <div className="grid grid-cols-3 gap-[9px]">
              <div className="col-span-2">
                <Field label="Antecedentes">
                  <div className="flex flex-wrap gap-1">
                    {["HAS","Cardiopatia","Diabetes","Asma / DPOC","AVE anterior","IAM anterior","Convulsões","Cirúrgico","Nega tratamento","Não informa"].map(c => (
                      <Chip key={c} label={c} />
                    ))}
                  </div>
                  <Input placeholder="Outros antecedentes..." />
                </Field>
              </div>
              <Field label="Alergias">
                <div className="mb-[5px]"><Pills options={["Nega","Não informa","Sim"]} /></div>
                <Input placeholder="Quais alergias?" />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-[9px] mt-2">
              <Field label="Medicamentos em uso">
                <div className="mb-[5px]"><Pills options={["Nega","Não informa","Sim"]} /></div>
                <Input placeholder="Quais medicamentos e doses?" />
              </Field>
              <Field label="Observações clínicas / queixa principal">
                <Textarea placeholder="Descreva a queixa principal, histórico e contexto clínico..." />
              </Field>
            </div>
          </Card>

          {/* SINAIS VITAIS MANUAIS */}
          <Card>
            <CardLabel color="green">Sinais vitais — registro manual e responsividade</CardLabel>
            <div className="grid grid-cols-5 gap-[9px]">
              {[["PA (mmHg)","120/80"],["Sat. O₂ (%)","97"],["Temp. (°C)","36.8"],["F. Resp. (rpm)","16"],["Glicemia (mg/dL)","100"]].map(([l, p]) => (
                <Field key={l} label={l}><Input placeholder={p} /></Field>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-[9px] mt-2">
              <Field label="Responsivo"><Pills options={["Sim","Não"]} /></Field>
              <Field label="Pulso"><Pills options={["Regular","Cheio","Fino","Irregular","Ausente — PCR"]} /></Field>
              <Field label="Frequência cardíaca (bpm)"><Input type="number" placeholder="--" /></Field>
            </div>
          </Card>

          {/* GLASGOW */}
          <Card>
            <CardLabel color="blue">Escala de Coma de Glasgow — Adulto</CardLabel>
            <Glasgow />
            <div className="mt-2 flex items-center gap-2">
              <label className="text-[10px] text-[#4a6e90] uppercase tracking-[0.8px]">Glasgow Pediátrico (0–2 anos)</label>
              <Pills options={["Não aplicável","Usar escala pediátrica"]} />
            </div>
          </Card>

          {/* EXAME FÍSICO */}
          <Card>
            <CardLabel color="blue">Exame físico dirigido</CardLabel>
            <div className="grid grid-cols-3 gap-[7px]">
              {[
                { title: "Vias Aéreas", items: ["Livre","Obstrução total","Obstrução parcial","Corpo estranho","Secreção","Aspiração"], defaults: ["Livre"] },
                { title: "Respiração", items: ["Normal","Apneia","Bradipneia","Taquipneia","Gasping","Não realizada"], defaults: ["Normal"] },
                { title: "Ausculta Pulmonar", items: ["Murmúrio vesicular presente","Roncos D / E","Sibilos D / E","MV diminuído D / E","MV ausente D / E","Estertores D / E"], defaults: ["Murmúrio vesicular presente"] },
              ].map(block => (
                <div key={block.title} className="bg-[#071220] border border-[#182e4a] rounded-[6px] p-[10px]">
                  <div className="text-[9px] font-semibold uppercase tracking-[0.8px] text-[#4a6e90] mb-[6px]">{block.title}</div>
                  <div className="flex flex-col gap-[3px]">
                    {block.items.map(item => <Chip key={item} label={item} defaultOn={block.defaults.includes(item)} />)}
                  </div>
                </div>
              ))}
            </div>
          </Card>

        </main>

        {/* ── SIDEBAR ── */}
        <aside className="w-[298px] bg-[#09162a] border-l border-[#182e4a] overflow-y-auto px-[14px] py-4 flex flex-col gap-4 pb-[60px]">

          {/* Alert */}
          <div className="bg-[#1e0404] border border-[#d41f1f] rounded-[6px] px-3 py-2 flex items-center gap-2 text-[11.5px] text-[#ff3a3a] pulse-border">
            <svg viewBox="0 0 24 24" className="w-[14px] h-[14px] fill-[#ff3a3a] flex-shrink-0"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
            Regulação ativa · Dr. Alves aguarda
          </div>

          {/* Live vitals */}
          <div>
            <SecHead>Sinais vitais ao vivo</SecHead>
            <div className="grid grid-cols-2 gap-[7px] mb-2">
              {vitals.map(v => (
                <div key={v.label} className={`bg-[#0d1f38] border border-[#182e4a] rounded-[8px] px-[10px] pt-[10px] pb-2 relative overflow-hidden border-l-[3px] ${v.color}`}>
                  <div className="text-[9.5px] text-[#4a6e90] mb-[2px]">{v.label}</div>
                  <div className={`text-[26px] font-semibold leading-none mono ${v.valCls}`}>{v.val}</div>
                  <div className="text-[9.5px] text-[#4a6e90] mt-[1px]">{v.unit}</div>
                  <div className={`text-[9.5px] px-[5px] py-[1px] rounded-[3px] inline-block mt-1 ${v.status[1]}`}>{v.status[0]}</div>
                </div>
              ))}
            </div>

            {/* ECG strip */}
            <div className="h-9 bg-[#071220] border border-[#182e4a] rounded-[5px] overflow-hidden relative">
              <ECGStrip />
            </div>

            {/* Sensor badges */}
            <div className="flex flex-wrap gap-[5px] mt-[6px]">
              {[["ECG","ok"],["SpO₂","ok"],["Termôm.","ok"],["Glicosím.","warn"]].map(([label, type]) => (
                <div key={label} className={`mono text-[9.5px] px-[7px] py-[2px] rounded-[3px] border flex items-center gap-1
                  ${type === "ok" ? "border-[#14803a] text-[#3ddc78] bg-[#041f10]" : "border-[#b87800] text-[#f5b93e] bg-[#1c1200]"}`}>
                  <div className="w-[5px] h-[5px] rounded-full bg-current" />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Manchester */}
          <div>
            <SecHead>Classificação Manchester</SecHead>
            <div className="grid grid-cols-2 gap-[5px]">
              {[
                { label: "Vermelho", sub: "Imediato", cls: "bg-[#1e0404] border-[#d41f1f] text-[#f07070]" },
                { label: "Laranja",  sub: "Muito urgente", cls: "bg-[#1c0a00] border-[#d44800] text-[#ff7a30]" },
                { label: "Amarelo",  sub: "Urgente", cls: "bg-[#1c1200] border-[#b87800] text-[#f5b93e]", sel: true },
                { label: "Verde",    sub: "Pouco urgente", cls: "bg-[#041f10] border-[#14803a] text-[#3ddc78]" },
                { label: "Azul",     sub: "Não urgente", cls: "bg-[#040c1e] border-[#2070c8] text-[#5aa8ff]" },
              ].map(b => (
                <button key={b.label} className={`border rounded-[5px] px-[5px] py-[7px] text-center text-[11.5px] font-medium leading-[1.3] transition-opacity ${b.cls} ${b.sel ? "opacity-100" : "opacity-[0.32] hover:opacity-70"}`}>
                  {b.label}<small className="text-[9.5px] font-normal block">{b.sub}</small>
                </button>
              ))}
            </div>
          </div>

          {/* GPS */}
          <div>
            <SecHead>Localização GPS</SecHead>
            <div className="bg-[#071220] border border-[#182e4a] rounded-[7px] h-[90px] relative overflow-hidden flex items-center justify-center flex-col gap-1">
              <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(#182e4a 1px, transparent 1px), linear-gradient(90deg, #182e4a 1px, transparent 1px)", backgroundSize: "20px 20px", opacity: 0.4 }} />
              <div className="w-[11px] h-[11px] rounded-full bg-[#d41f1f] z-[1] ping-anim" />
              <div className="mono text-[10.5px] text-[#4a6e90] z-[1]">Av. Paulista, 1000 — SP</div>
            </div>
            <div className="h-[3px] bg-[#182e4a] rounded-[2px] my-[7px] overflow-hidden">
              <div className="h-full bg-[#2070c8] rounded-[2px] prog-anim" />
            </div>
            <div className="flex justify-between mono text-[10.5px] text-[#4a6e90]">
              <span>~3.2 km · 8 min</span>
              <span>UPA Central</span>
            </div>
          </div>

          {/* Notifications */}
          <div>
            <SecHead>Notificações</SecHead>
            <div className="flex flex-col gap-[6px]">
              {[
                { type: "danger", text: "Regulação médica ativa — Dr. Alves aguarda transmissão da ficha." },
                { type: "warn", text: "SpO₂ instável nas últimas 3 leituras." },
                { type: "", text: "Perfil da vítima recebido do app do usuário." },
              ].map((n, i) => (
                <div key={i} className={`bg-[#071220] rounded-r-[5px] px-[9px] py-[7px] text-[11.5px] text-[#cce0f5] border-l-[3px]
                  ${n.type === "danger" ? "border-l-[#d41f1f]" : n.type === "warn" ? "border-l-[#b87800]" : "border-l-[#2070c8]"}`}>
                  {n.text}
                </div>
              ))}
            </div>
          </div>

          {/* Destination */}
          <div>
            <SecHead>Destino</SecHead>
            <div className="flex flex-col gap-[7px]">
              <div className="flex flex-col gap-1">
                <label className="text-[9.5px] text-[#4a6e90] uppercase tracking-[0.8px] font-medium">Hospital de destino</label>
                <Select><option>UPA Central — Sala 3</option><option>Hospital São Lucas</option><option>Pronto-Socorro Municipal</option></Select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[9.5px] text-[#4a6e90] uppercase tracking-[0.8px] font-medium">Condição no transporte</label>
                <Pills options={["Estável","Instável","Crítico"]} />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-[7px] mt-auto pt-[14px]">
            <button onClick={transmitir}
              className="w-full bg-[#d41f1f] border-none rounded-[7px] py-3 text-white text-[13.5px] font-semibold flex items-center justify-center gap-[7px] cursor-pointer hover:bg-[#b81818] active:scale-[0.98] transition-all"
              style={{ boxShadow: "0 4px 14px rgba(212,31,31,0.3)" }}>
              <svg viewBox="0 0 24 24" className="w-[15px] h-[15px] fill-white flex-shrink-0"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/></svg>
              Transmitir ao Médico
            </button>
            <button onClick={salvar}
              className="w-full bg-transparent border border-[#264a72] rounded-[7px] py-[9px] text-[#5aa8ff] text-[12.5px] cursor-pointer hover:bg-[#0d1f38] transition-colors">
              Salvar Rascunho
            </button>
          </div>
        </aside>
      </div>

      {/* ── TX BAR ── */}
      <footer className="fixed bottom-0 left-0 right-[298px] z-[100] grid h-[44px] grid-cols-[minmax(0,1fr)_auto] items-center gap-5 overflow-hidden border-t border-[#182e4a] bg-[#09162a] px-[22px]">
        <div className="mono flex min-w-0 items-center gap-4 overflow-hidden text-[11px] text-[#4a6e90]">
          <span className="flex shrink-0 items-center gap-[5px]">
            <span className="h-[6px] w-[6px] rounded-full bg-[#3ddc78] blink" />
            Wi-Fi 72%
          </span>
          <span className="shrink-0">OCR #2025-1142</span>
          <span className="min-w-0 truncate">
            Última sync: <span className="text-[#cce0f5]">{lastSync}</span>
          </span>
        </div>
        <div className="mono flex min-w-0 items-center justify-end gap-2 overflow-hidden text-[11px] text-[#3ddc78]">
          <span className="shrink-0 rounded-[3px] border border-[#14803a] bg-[#041f10] px-2 py-[2px] text-[10px] text-[#3ddc78]">
            SAMU 192
          </span>
          <span className="min-w-0 truncate">Médico Dr. Alves aguardando</span>
        </div>
      </footer>

      {/* ── TOAST ── */}
      <div className={`fixed left-1/2 z-[999] bg-[#042010] border border-[#14803a] rounded-[7px] px-[18px] py-[11px] text-[#3ddc78] text-[12.5px] font-medium flex items-center gap-2 transition-all duration-300
        ${toast.show ? "-translate-x-1/2 translate-y-0 opacity-100" : "pointer-events-none -translate-x-1/2 translate-y-[150px] opacity-0"}`}
        style={{ bottom: "58px" }}>
        <svg viewBox="0 0 24 24" className="w-[15px] h-[15px] fill-[#3ddc78]"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
        {toast.msg}
      </div>
    </div>
  );
}
