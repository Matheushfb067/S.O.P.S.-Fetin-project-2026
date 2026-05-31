import { useState, useEffect } from "react";

// ─── Toast ────────────────────────────────────────────────────────────────────
function useToast() {
  const [toast, setToast] = useState({ show: false, msg: "" });
  let timer;
  function showToast(msg) {
    setToast({ show: true, msg });
    clearTimeout(timer);
    timer = setTimeout(() => setToast(t => ({ ...t, show: false })), 3200);
  }
  return [toast, showToast];
}

// ─── Tag ──────────────────────────────────────────────────────────────────────
function Tag({ label, active = true, onClick }) {
  return (
    <span onClick={onClick} className={`text-[0.75rem] font-semibold px-[10px] py-1 rounded-full cursor-pointer transition-colors
      ${active ? "bg-[#FEE4E2] text-[#D92D20]" : "bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0]"}`}>
      {label}
    </span>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function PaginaUsuario() {
  const [activeNav, setActiveNav] = useState("emergencia");
  const [sosModal, setSosModal] = useState(false);
  const [toast, showToast] = useToast();
  const [catFilter, setCatFilter] = useState("all");
  const [allergies, setAllergies] = useState(["Penicilina","Dipirona"]);
  const [conditions, setConditions] = useState({ "Hipertensão": true, "Diabetes": false, "Asma": false });

  function confirmSos() {
    setSosModal(false);
    showToast("📞 Ligando para o SAMU 192 — Localização e perfil enviados!");
  }

  const videos = [
    { cat: "queimadura", bg: "#7C2D12", badge: "🔥 Queimadura", badgeCls: "bg-[#92400E] text-[#FDE68A]", title: "Como tratar queimaduras de 1º e 2º grau em casa", dur: "8 min", lvl: "Básico" },
    { cat: "engasgo",    bg: "#1E3A5F", badge: "😮‍💨 Engasgo",   badgeCls: "bg-[#1E3A8A] text-[#BFDBFE]", title: "Manobra de Heimlich: adultos, crianças e bebês", dur: "6 min", lvl: "Essencial" },
    { cat: "cardiaco",   bg: "#4C0519", badge: "❤️ Parada Cardíaca", badgeCls: "bg-[#881337] text-[#FECDD3]", title: "RCP — Reanimação cardiopulmonar passo a passo", dur: "12 min", lvl: "Avançado" },
    { cat: "desmaio",    bg: "#134E4A", badge: "💫 Desmaio",    badgeCls: "bg-[#134E4A] text-[#99F6E4]", title: "O que fazer quando alguém desmaia ou tem convulsão", dur: "7 min", lvl: "Básico" },
    { cat: "fratura",    bg: "#2E1065", badge: "🦴 Fratura",    badgeCls: "bg-[#4C1D95] text-[#DDD6FE]", title: "Imobilização de fraturas com materiais do dia a dia", dur: "9 min", lvl: "Intermediário" },
    { cat: "hemorragia", bg: "#7F1D1D", badge: "🩸 Hemorragia", badgeCls: "bg-[#991B1B] text-[#FECACA]", title: "Como controlar sangramentos externos com pressão direta", dur: "5 min", lvl: "Essencial" },
  ];

  const articles = [
    { icon: "🧰", iconBg: "#FEF3C7", title: "Monte o kit de emergência doméstico perfeito", desc: "O que ter em casa para atender os casos mais comuns de acidente, incluindo lista de materiais essenciais." },
    { icon: "👶", iconBg: "#DBEAFE", title: "Primeiros socorros para bebês: diferenças importantes", desc: "Técnicas adaptadas para lactentes em casos de engasgo, quedas e febre alta." },
    { icon: "☠️", iconBg: "#FCE7F3", title: "Intoxicação por produtos domésticos: como agir", desc: "Procedimentos para ingestão acidental de produtos de limpeza, medicamentos e plantas tóxicas." },
    { icon: "🧓", iconBg: "#D1FAE5", title: "Acidentes domésticos em idosos: queda e fratura de quadril", desc: "Como identificar uma fratura de quadril, não mover incorretamente e acionar o socorro adequado." },
    { icon: "⚡", iconBg: "#FEF9C3", title: "Choque elétrico doméstico: o que NÃO fazer", desc: "Os erros mais comuns ao socorrer vítimas de choque elétrico e como proceder com segurança." },
    { icon: "🌊", iconBg: "#E0F2FE", title: "Afogamento em piscina doméstica: protocolo de resposta", desc: "Passo a passo desde o resgate até a RCP, incluindo posicionamento de recuperação." },
  ];

  const catPills = [
    { val: "all", label: "Todos" },
    { val: "queimadura", label: "🔥 Queimadura" },
    { val: "engasgo", label: "😮‍💨 Engasgo" },
    { val: "desmaio", label: "💫 Desmaio" },
    { val: "fratura", label: "🦴 Fratura" },
    { val: "hemorragia", label: "🩸 Hemorragia" },
    { val: "cardiaco", label: "❤️ Parada Cardíaca" },
  ];

  const inputCls = "w-full bg-white border-[1.5px] border-[#E2E8F0] rounded-lg px-3 py-[9px] font-[DM_Sans] text-[0.875rem] text-[#0F172A] outline-none transition-colors focus:border-[#D92D20]";
  const labelCls = "block text-[0.78rem] font-semibold text-[#334155] mb-[5px] tracking-[0.02em]";

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] leading-[1.6]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        .syne { font-family: 'Syne', sans-serif; }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.7)} }
        @keyframes modalIn { from{opacity:0;transform:scale(.94) translateY(8px)} to{opacity:1;transform:scale(1) translateY(0)} }
        .pulse-dot { animation: pulse 1.4s ease-in-out infinite; }
        .modal-in { animation: modalIn .2s ease; }
        html { scroll-behavior: smooth; }
        * { box-sizing: border-box; }
      `}</style>

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-[100] h-16 bg-white/92 border-b border-[#E2E8F0] px-[5%] flex items-center justify-between" style={{ backdropFilter: "blur(12px)" }}>
        <a href="#" className="syne font-extrabold text-[1.25rem] text-[#D92D20] flex items-center gap-2 no-underline">
          <div className="w-8 h-8 bg-[#D92D20] rounded-lg flex items-center justify-center">
            <svg viewBox="0 0 20 20" className="w-[18px] h-[18px] fill-white"><path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm1 11H9v-2h2v2zm0-4H9V5h2v4z"/></svg>
          </div>
          SocorroFácil
        </a>
        <div className="flex gap-2">
          {[["emergencia","Emergência"],["treinamento","Treinamento"]].map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={() => setActiveNav(id)}
              className={`text-[0.875rem] font-medium px-4 py-2 rounded-lg transition-colors no-underline
                ${activeNav === id ? "bg-[#FEE4E2] text-[#D92D20]" : "text-[#334155] hover:bg-[#F8FAFC] hover:text-[#0F172A]"}`}>
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="bg-[#0F172A] text-white px-[5%] pt-[80px] pb-[100px] relative overflow-hidden">
        <div className="absolute top-[-120px] right-[-80px] w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(217,45,32,0.25) 0%, transparent 70%)" }} />
        <div className="max-w-[1100px] mx-auto grid grid-cols-2 gap-[60px] items-center">
          <div>
            <div className="inline-flex items-center gap-[6px] bg-[rgba(217,45,32,0.2)] border border-[rgba(217,45,32,0.4)] text-[#F97066] text-[0.75rem] font-semibold tracking-[0.08em] uppercase px-3 py-[5px] rounded-full mb-5">
              <div className="w-[7px] h-[7px] rounded-full bg-[#F97066] pulse-dot" />
              Plataforma de Saúde Emergencial
            </div>
            <h1 className="syne text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[1.15] mb-5">
              Primeiros socorros<br />ao alcance de <span className="text-[#F97066]">todos</span>
            </h1>
            <p className="text-[1.05rem] text-white/65 max-w-[460px] leading-[1.75] mb-9">
              Acione socorro, compartilhe seu histórico médico com a equipe de atendimento e aprenda a agir em emergências domésticas.
            </p>
            <div className="flex gap-3 flex-wrap">
              <a href="#emergencia" onClick={() => setSosModal(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] text-[0.9rem] font-semibold text-white no-underline transition-transform hover:-translate-y-[1px] active:translate-y-0 cursor-pointer"
                style={{ background: "#D92D20", boxShadow: "0 4px 14px rgba(217,45,32,0.4)" }}>
                🚨 Chamar Socorristas
              </a>
              <a href="#treinamento"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] text-[0.9rem] font-semibold text-white bg-white/10 border border-white/25 no-underline transition-transform hover:-translate-y-[1px]">
                📚 Aprender Primeiros Socorros
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { icon: "🚑", iconCls: "bg-[rgba(217,45,32,0.25)]", num: "SAMU 192", label: "Acionamento com 1 toque + localização automática" },
              { icon: "🎓", iconCls: "bg-[rgba(13,148,136,0.25)]", num: "20+ vídeos", label: "Tutoriais de primeiros socorros por categoria" },
              { icon: "📋", iconCls: "bg-[rgba(220,104,3,0.2)]", num: "Perfil médico", label: "Histórico compartilhado com socorristas em tempo real" },
            ].map(s => (
              <div key={s.num} className="bg-white/[0.06] border border-white/10 rounded-xl px-6 py-5 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-[10px] flex items-center justify-center flex-shrink-0 text-[22px] ${s.iconCls}`}>{s.icon}</div>
                <div>
                  <div className="syne text-[1.6rem] font-bold text-white leading-none">{s.num}</div>
                  <div className="text-[0.8rem] text-white/50 mt-[2px]">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EMERGÊNCIA ── */}
      <section id="emergencia" className="bg-white py-[80px] px-[5%]">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-[0.75rem] font-bold tracking-[0.12em] uppercase text-[#D92D20] mb-[10px]">Página 1</div>
          <h2 className="syne text-[clamp(1.6rem,3vw,2.25rem)] font-bold text-[#0F172A] mb-3">Chamada de Socorristas</h2>
          <p className="text-[1rem] text-[#64748B] max-w-[560px] leading-[1.75] mb-12">Acione o atendimento de emergência rapidamente e mantenha seu perfil médico sempre atualizado para acelerar o socorro.</p>

          <div className="grid grid-cols-2 gap-8 items-start">
            {/* SOS Panel */}
            <div className="bg-[#D92D20] rounded-[20px] p-9 text-white relative overflow-hidden">
              <div className="absolute bottom-[-40px] right-[-40px] w-[200px] h-[200px] rounded-full bg-white/7 pointer-events-none" />
              <div className="syne text-[1.5rem] font-bold mb-2">🚨 Central de Emergência</div>
              <div className="text-[0.9rem] text-white/75 mb-8">Sua localização será enviada automaticamente ao acionar.</div>

              <button onClick={() => setSosModal(true)}
                className="w-full bg-white text-[#D92D20] border-none rounded-xl px-6 py-[18px] syne text-[1.15rem] font-bold cursor-pointer flex items-center justify-center gap-[10px] mb-3 transition-transform hover:scale-[1.02] active:scale-[0.99]"
                style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
                📞 Chamar SAMU — 192
              </button>

              <button onClick={() => showToast("📍 Localização enviada ao SAMU!")}
                className="w-full bg-white/15 text-white border border-white/30 rounded-xl py-[14px] text-[0.9rem] font-semibold cursor-pointer hover:bg-white/22 transition-colors mb-7">
                Enviar localização sem ligar
              </button>

              <div className="text-[0.75rem] text-white/50 uppercase tracking-[0.08em] mb-3">Outros Serviços de Emergência</div>
              <div className="grid grid-cols-2 gap-[10px]">
                {[["193","Bombeiros"],["190","Polícia"],["199","Defesa Civil"],["188","CVV"]].map(([num, lbl]) => (
                  <button key={num} onClick={() => showToast(`Ligando para ${lbl}...`)}
                    className="bg-white/12 border border-white/20 rounded-[10px] py-3 text-center cursor-pointer hover:bg-white/20 transition-colors">
                    <div className="syne text-[1.25rem] font-bold">{num}</div>
                    <div className="text-[0.75rem] text-white/70 mt-[2px]">{lbl}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Profile Panel */}
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[20px] p-8">
              <div className="syne text-[1.1rem] font-bold text-[#0F172A] mb-[6px]">📋 Meu Perfil de Saúde</div>
              <div className="text-[0.85rem] text-[#64748B] mb-6">Dados enviados automaticamente aos socorristas ao acionar a chamada.</div>

              <div className="grid grid-cols-2 gap-[14px]">
                <div>
                  <label className={labelCls}>Nome completo</label>
                  <input type="text" defaultValue="Maria da Silva" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Data de nascimento</label>
                  <input type="date" defaultValue="1985-04-12" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Tipo sanguíneo</label>
                  <select defaultValue="B+" className={inputCls}>
                    {["A+","A−","B+","B−","AB+","AB−","O+","O−"].map(v => <option key={v}>{v}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Telefone de emergência</label>
                  <input type="tel" defaultValue="(35) 98765-4321" className={inputCls} />
                </div>
                <div className="col-span-2">
                  <label className={labelCls}>Alergias conhecidas</label>
                  <div className="flex flex-wrap gap-[6px] mt-[6px]">
                    {allergies.map(a => <Tag key={a} label={a} />)}
                    <Tag label="+ Adicionar" active={false} onClick={() => {}} />
                  </div>
                </div>
                <div className="col-span-2">
                  <label className={labelCls}>Condições pré-existentes</label>
                  <div className="flex flex-wrap gap-[6px] mt-[6px]">
                    {Object.entries(conditions).map(([k, v]) => (
                      <Tag key={k} label={k} active={v} onClick={() => setConditions(c => ({ ...c, [k]: !c[k] }))} />
                    ))}
                    <Tag label="+ Mais" active={false} />
                  </div>
                </div>
                <div className="col-span-2">
                  <label className={labelCls}>Medicamentos em uso</label>
                  <input type="text" defaultValue="Losartana 50mg" placeholder="Ex: Losartana 50mg, Metformina 500mg" className={inputCls} />
                </div>
                <div className="col-span-2">
                  <label className={labelCls}>Observações médicas</label>
                  <textarea defaultValue="Marca-passo cardíaco implantado em 2021. Não usar desfibrilador sem avaliação." className={`${inputCls} resize-y min-h-[80px]`} />
                </div>
              </div>
              <button onClick={() => showToast("✅ Perfil salvo e sincronizado!")}
                className="w-full bg-[#0F172A] text-white border-none rounded-[10px] py-[13px] syne text-[0.95rem] font-bold cursor-pointer mt-[18px] hover:bg-[#334155] transition-colors">
                Salvar e Sincronizar Perfil
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── TREINAMENTO ── */}
      <section id="treinamento" className="bg-[#F8FAFC] py-[80px] px-[5%]">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-[0.75rem] font-bold tracking-[0.12em] uppercase text-[#D92D20] mb-[10px]">Página 2</div>
          <h2 className="syne text-[clamp(1.6rem,3vw,2.25rem)] font-bold text-[#0F172A] mb-3">Treinamento em Primeiros Socorros</h2>
          <p className="text-[1rem] text-[#64748B] max-w-[560px] leading-[1.75] mb-12">Aprenda a agir rápido em situações de emergência doméstica. Vídeos práticos e guias por tipo de acidente.</p>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-9">
            {catPills.map(p => (
              <button key={p.val} onClick={() => setCatFilter(p.val)}
                className={`px-[18px] py-[7px] rounded-full text-[0.85rem] font-medium border-[1.5px] cursor-pointer transition-all
                  ${catFilter === p.val ? "bg-[#D92D20] text-white border-[#D92D20]" : "bg-white text-[#334155] border-[#E2E8F0] hover:border-[#D92D20] hover:text-[#D92D20]"}`}>
                {p.label}
              </button>
            ))}
          </div>

          {/* Videos */}
          <h3 className="syne text-[1.05rem] font-semibold text-[#0F172A] mb-[18px]">▶ Vídeos Educativos</h3>
          <div className="grid grid-cols-3 gap-6 mb-10">
            {videos.filter(v => catFilter === "all" || v.cat === catFilter).map(v => (
              <div key={v.title} onClick={() => showToast(`▶ Abrindo vídeo: ${v.title}`)}
                className="bg-white border border-[#E2E8F0] rounded-[20px] overflow-hidden cursor-pointer transition-all hover:-translate-y-[3px] hover:shadow-[0_8px_32px_rgba(15,23,42,0.1)]">
                <div className="aspect-video relative flex items-center justify-center overflow-hidden" style={{ background: v.bg }}>
                  <span className={`absolute top-3 left-3 text-[0.72rem] font-semibold px-[8px] py-[3px] rounded-full ${v.badgeCls}`}>{v.badge}</span>
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center z-[1] transition-transform hover:scale-110">
                    <svg viewBox="0 0 20 20" className="w-[18px] h-[18px] fill-[#0F172A]"><path d="M6.3 4.5l9.4 5.5-9.4 5.5V4.5z"/></svg>
                  </div>
                </div>
                <div className="p-4">
                  <div className="syne text-[0.9rem] font-semibold text-[#0F172A] mb-[6px] leading-[1.4]">{v.title}</div>
                  <div className="text-[0.78rem] text-[#64748B] flex gap-[6px]">
                    <span>{v.dur}</span><span>·</span><span>{v.lvl}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Articles */}
          <h3 className="syne text-[1.05rem] font-semibold text-[#0F172A] mb-[18px]">📖 Guias e Artigos</h3>
          <div className="grid grid-cols-2 gap-5">
            {articles.map(a => (
              <div key={a.title} onClick={() => showToast(`📄 Abrindo artigo: ${a.title}`)}
                className="bg-white border border-[#E2E8F0] rounded-xl px-6 py-5 flex gap-4 items-start cursor-pointer hover:border-[#CBD5E1] hover:shadow-[0_4px_12px_rgba(15,23,42,0.06)] transition-all">
                <div className="w-10 h-10 rounded-[10px] flex items-center justify-center text-[18px] flex-shrink-0" style={{ background: a.iconBg }}>{a.icon}</div>
                <div>
                  <div className="syne text-[0.9rem] font-semibold text-[#0F172A] mb-1 leading-[1.4]">{a.title}</div>
                  <div className="text-[0.8rem] text-[#64748B] leading-[1.55]">{a.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#0F172A] text-white/50 text-center py-8 px-[5%] text-[0.85rem]">
        <strong className="text-white syne">SocorroFácil</strong> — Plataforma de Saúde Emergencial &nbsp;·&nbsp;
        Em caso de emergência ligue <strong className="text-white">192 (SAMU)</strong> &nbsp;·&nbsp;
        Este site não substitui atendimento médico profissional.
      </footer>

      {/* ── SOS MODAL ── */}
      {sosModal && (
        <div className="fixed inset-0 z-[200] bg-[#0F172A]/60 flex items-center justify-center" onClick={e => e.target === e.currentTarget && setSosModal(false)}>
          <div className="bg-white rounded-[20px] p-9 max-w-[420px] w-[90%] text-center modal-in">
            <div className="text-[48px] mb-4">🚨</div>
            <h2 className="syne text-[1.3rem] font-bold text-[#D92D20] mb-2">Confirmação de Chamada</h2>
            <p className="text-[0.9rem] text-[#64748B] mb-6 leading-[1.65]">Você está prestes a ligar para o <strong>SAMU — 192</strong>. Sua localização atual e perfil médico serão enviados automaticamente à central.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={confirmSos} className="bg-[#D92D20] text-white border-none rounded-[10px] px-8 py-3 syne font-bold text-[0.9rem] cursor-pointer">Confirmar — Ligar agora</button>
              <button onClick={() => setSosModal(false)} className="bg-[#F8FAFC] text-[#0F172A] border-none rounded-[10px] px-8 py-3 syne font-bold text-[0.9rem] cursor-pointer">Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* ── TOAST ── */}
      <div className={`fixed bottom-6 right-6 z-[300] bg-[#0F172A] text-white rounded-xl px-5 py-[14px] text-[0.875rem] font-medium flex items-center gap-[10px] max-w-[320px] transition-all duration-300
        ${toast.show ? "translate-y-0 opacity-100" : "translate-y-[80px] opacity-0"}`}>
        {toast.msg}
      </div>
    </div>
  );
}
