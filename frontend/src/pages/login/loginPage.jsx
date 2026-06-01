import { Link } from "react-router-dom";

const inputClass =
  "w-full rounded-[5px] border border-[#182e4a] bg-[#071220] px-3 py-2 text-[0.84rem] text-[#cce0f5] outline-none transition focus:border-[#2070c8] focus:ring-4 focus:ring-[#2070c8]/10 placeholder:text-[#38536d]";

function GoogleMark() {
  return (
    <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-[0.72rem] font-bold text-[#1f2937] flex-shrink-0">
      G
    </span>
  );
}

const stats = [
  ["192", "SAMU"],
  ["24H", "Plantão"],
  ["SYNC", "Dados"],
];

const roles = [
  { label: "Usuário", to: "/usuario" },
  { label: "Socorrista", to: "/socorrista" },
  { label: "Médico", to: "/dashboard-medico" },
];

export default function LoginPage() {
  return (
    <main
      className="min-h-screen bg-[#050d18] text-[#cce0f5]"
      style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap');
        .mono { font-family: 'IBM Plex Mono', monospace; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.25} }
        .blink { animation: blink 1.4s ease-in-out infinite; }
        .lp-left::before {
          content: '';
          position: absolute;
          bottom: -60px; left: -60px;
          width: 260px; height: 260px;
          border-radius: 50%;
          border: 1px solid #182e4a;
          pointer-events: none;
        }
        .lp-left::after {
          content: '';
          position: absolute;
          bottom: -100px; left: -100px;
          width: 380px; height: 380px;
          border-radius: 50%;
          border: 1px solid #0f1f33;
          pointer-events: none;
        }
      `}</style>

      <section className="grid min-h-screen lg:h-screen lg:grid-cols-[1.02fr_0.98fr] lg:overflow-hidden">

        {/* — Painel esquerdo — */}
        <div className="lp-left relative hidden overflow-hidden border-r border-[#182e4a] bg-[#071220] px-9 py-7 lg:flex lg:flex-col gap-6">

          {/* Brand */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="grid h-8 w-8 place-items-center rounded-[6px] bg-[#d41f1f] shadow-[0_0_18px_rgba(212,31,31,0.28)] flex-shrink-0">
              <span className="text-lg font-bold leading-none text-white">+</span>
            </div>
            <div>
              <p className="mono text-[0.82rem] font-semibold uppercase tracking-[0.08em] text-[#ddeeff]">
                SOPS 2.0 <span className="text-[#5aa8ff]">· Acesso</span>
              </p>
              <p className="mono text-[0.52rem] uppercase tracking-[0.18em] text-[#4a6e90]">
                Sistema Organizacional de Primeiros Socorros
              </p>
            </div>
          </div>

          {/* Hero */}
          <div className="relative z-10 my-auto flex flex-col gap-5 max-w-[480px]">
            <span className="mono inline-flex items-center gap-2 rounded-[5px] border border-[#264a72] bg-[#0d1f38] px-3 py-[5px] text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-[#5aa8ff] w-fit">
              <span className="h-[7px] w-[7px] rounded-full bg-[#3ddc78] blink flex-shrink-0" />
              Núcleo integrado online
            </span>

            <h1 className="text-[clamp(1.8rem,3vw,3rem)] font-semibold leading-[1.05] text-[#ddeeff]">
              Acesso operacional para atendimento rápido.
            </h1>

            <p className="text-[0.88rem] leading-7 text-[#7d98b3] max-w-[420px]">
              Entre para sincronizar fichas, sinais vitais, chamados e dados clínicos entre socorristas e equipe médica.
            </p>

            <div className="grid grid-cols-3 gap-2 mt-2">
              {stats.map(([value, label]) => (
                <div key={label} className="rounded-[7px] border border-[#182e4a] bg-[#0d1f38] p-3">
                  <div className="mono text-xl font-semibold text-[#5aa8ff]">{value}</div>
                  <div className="mono mt-1 text-[0.52rem] font-semibold uppercase tracking-[0.12em] text-[#4a6e90]">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ECG bar */}
          <div className="relative z-10 flex items-center gap-4 rounded-[8px] border border-[#182e4a] bg-[#050d18] px-5 h-[50px]">
            <span className="mono text-[0.62rem] text-[#3ddc78]">ECG</span>
            <span className="h-px flex-1 bg-[repeating-linear-gradient(90deg,#18385c_0_18px,transparent_18px_28px)]" />
            <span className="mono text-[0.62rem] text-[#4a6e90]">FC 088 BPM</span>
          </div>
        </div>

        {/* — Painel direito — */}
        <div className="flex min-h-screen items-center justify-center px-5 py-8 sm:px-8 lg:min-h-0">
          <div className="w-full max-w-[400px]">

            {/* Mobile brand */}
            <Link to="/" className="mb-6 inline-flex items-center gap-3 text-[#ddeeff] no-underline lg:hidden">
              <span className="grid h-9 w-9 place-items-center rounded-[6px] bg-[#d41f1f] text-lg font-bold text-white">+</span>
              <span className="mono text-[0.84rem] font-semibold uppercase tracking-[0.08em]">SOPS 2.0</span>
            </Link>

            {/* Card */}
            <div className="rounded-[9px] border border-[#182e4a] bg-[#0d1f38] p-6 shadow-[0_18px_70px_rgba(0,0,0,0.3)]">
              <div className="mb-5">
                <p className="mono mb-1 text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-[#5aa8ff]">
                  Autenticação
                </p>
                <h2 className="text-[1.5rem] font-semibold text-[#ddeeff]">Login operacional</h2>
                <p className="mt-2 text-[0.8rem] leading-6 text-[#7d98b3]">
                  Use suas credenciais para acessar a área segura do sistema.
                </p>
              </div>

              <form className="space-y-3">
                <div>
                  <label
                    className="mono mb-1.5 block text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-[#4a6e90]"
                    htmlFor="email"
                  >
                    E-mail
                  </label>
                  <input id="email" type="email" className={inputClass} placeholder="seuemail@exemplo.com" />
                </div>

                <div>
                  <div className="mb-1.5 flex items-center justify-between gap-3">
                    <label
                      className="mono block text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-[#4a6e90]"
                      htmlFor="password"
                    >
                      Senha
                    </label>
                    <a href="#" className="text-[0.74rem] font-semibold text-[#5aa8ff] no-underline hover:text-[#88c8ff]">
                      Esqueci minha senha
                    </a>
                  </div>
                  <input id="password" type="password" className={inputClass} placeholder="Digite sua senha" />
                </div>

                <div className="flex items-center justify-between gap-4 py-1">
                  <label className="flex items-center gap-2 text-[0.8rem] font-medium text-[#7d98b3]">
                    <input type="checkbox" className="h-4 w-4 accent-[#2070c8]" />
                    Manter conectado
                  </label>
                  <span className="mono rounded-[5px] border border-[#14803a] bg-[#042010] px-2.5 py-1 text-[0.56rem] font-semibold uppercase tracking-[0.08em] text-[#3ddc78]">
                    Online
                  </span>
                </div>

                <button
                  type="button"
                  className="w-full rounded-[6px] border border-[#2070c8] bg-[#0c2340] px-5 py-2.5 text-[0.86rem] font-semibold text-[#88c8ff] transition hover:bg-[#103058]"
                >
                  Entrar na plataforma
                </button>

                <div className="flex items-center gap-3 py-1">
                  <span className="h-px flex-1 bg-[#182e4a]" />
                  <span className="mono text-[0.54rem] uppercase tracking-[0.12em] text-[#4a6e90]">ou</span>
                  <span className="h-px flex-1 bg-[#182e4a]" />
                </div>

                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-[6px] border border-[#182e4a] bg-[#071220] px-5 py-2.5 text-[0.84rem] font-semibold text-[#cce0f5] transition hover:border-[#264a72] hover:bg-[#09162a]"
                >
                  <GoogleMark />
                  Entrar com Google
                </button>
              </form>

              <div className="mt-5 border-t border-[#182e4a] pt-4 text-center text-[0.8rem] text-[#7d98b3]">
                Ainda não tem conta?{" "}
                <Link to="/cadastro" className="font-semibold text-[#5aa8ff] no-underline hover:text-[#88c8ff]">
                  Criar cadastro
                </Link>
              </div>
            </div>

            {/* Role shortcuts */}
            <div className="mono mt-3 grid grid-cols-3 gap-2 text-center text-[0.54rem] font-semibold uppercase tracking-[0.08em]">
              {roles.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  className="rounded-[6px] border border-[#182e4a] bg-[#071220] px-2 py-2 text-[#4a6e90] no-underline transition hover:border-[#264a72] hover:text-[#5aa8ff]"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}