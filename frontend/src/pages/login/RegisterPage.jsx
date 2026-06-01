import { Link } from "react-router-dom";

const fieldClass =
  "w-full rounded-[5px] border border-[#182e4a] bg-[#071220] px-3 py-2 text-[0.8rem] text-[#cce0f5] outline-none transition focus:border-[#2070c8] focus:ring-4 focus:ring-[#2070c8]/10 placeholder:text-[#38536d]";

function GoogleMark() {
  return (
    <span className="grid h-4.5 w-4.5 place-items-center rounded-full bg-white text-[0.62rem] font-bold text-[#1f2937] shrink-0">
      G
    </span>
  );
}

function Field({ id, label, children }) {
  return (
    <div>
      <label
        className="mono mb-1.5 block text-[0.54rem] font-semibold uppercase tracking-widest text-[#4a6e90]"
        htmlFor={id}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const infoCards = [
  { tag: "Perfil", text: "Alergias, medicamentos e condições importantes." },
  { tag: "Contato", text: "Responsável para avisos rápidos em ocorrências." },
  { tag: "Função", text: "Usuário, socorrista ou equipe médica." },
];

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function RegisterPage() {
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
      `}</style>

      {/* — Header — */}
      <header className="flex items-center justify-between border-b border-[#182e4a] bg-[#071220] px-6 py-3">
        <Link to="/login" className="flex items-center gap-3 text-[#ddeeff] no-underline">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-[#d41f1f] text-base font-bold text-white shadow-[0_0_14px_rgba(212,31,31,0.28)] shrink-0">
            +
          </span>
          <span className="mono text-[0.76rem] font-semibold uppercase tracking-[0.08em]">
            SOPS 2.0 <span className="text-[#5aa8ff]">· Cadastro</span>
          </span>
        </Link>
        <Link
          to="/login"
          className="rounded-md border border-[#182e4a] bg-[#071220] px-3 py-1.5 text-[0.76rem] font-semibold text-[#7d98b3] no-underline transition hover:text-[#5aa8ff]"
        >
          Já tenho conta
        </Link>
      </header>

      {/* — Body — */}
      <div className="mx-auto flex min-h-[calc(100vh-53px)] w-full max-w-275 gap-0">

        {/* Aside */}
        <aside className="hidden w-70 shrink-0 flex-col gap-4 border-r border-[#182e4a] bg-[#071220] p-6 lg:flex">
          <div className="inline-flex w-fit items-center gap-2 rounded-[5px] border border-[#264a72] bg-[#0d1f38] px-2.5 py-1.25">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3ddc78] blink shrink-0" />
            <span className="mono text-[0.54rem] font-semibold uppercase tracking-[0.14em] text-[#5aa8ff]">
              Registro integrado
            </span>
          </div>

          <h2 className="text-[1.3rem] font-semibold leading-[1.1] text-[#ddeeff]">
            Cadastro clínico e operacional.
          </h2>

          <p className="text-[0.76rem] leading-[1.7] text-[#7d98b3]">
            Registre dados pessoais, contato de emergência e informações médicas para a equipe durante uma ocorrência.
          </p>

          <div className="flex flex-col gap-2 mt-1 flex-1">
            {infoCards.map(({ tag, text }) => (
              <div key={tag} className="rounded-[7px] border border-[#182e4a] bg-[#0d1f38] p-3">
                <p className="mono text-[0.54rem] font-semibold tracking-widest uppercase text-[#5aa8ff]">{tag}</p>
                <p className="mt-1 text-[0.72rem] leading-5 text-[#7d98b3]">{text}</p>
              </div>
            ))}
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-2 mt-auto">
            <span className="h-1 w-6 rounded-full bg-[#2070c8]" />
            <span className="h-1 w-6 rounded-full bg-[#182e4a]" />
            <span className="h-1 w-6 rounded-full bg-[#182e4a]" />
            <span className="mono ml-1 text-[0.5rem] uppercase tracking-widest text-[#4a6e90]">Passo 1 de 3</span>
          </div>
        </aside>

        {/* Form */}
        <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8">
          <div className="mb-5">
            <p className="mono mb-1 text-[0.56rem] font-semibold uppercase tracking-[0.14em] text-[#5aa8ff]">
              Nova credencial
            </p>
            <h2 className="text-[1.4rem] font-semibold text-[#ddeeff]">Cadastro</h2>
            <p className="mt-1.5 max-w-140 text-[0.78rem] leading-5 text-[#7d98b3]">
              Preencha os dados para liberar acesso à plataforma e manter seu histórico disponível para emergências.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
            <Field id="full-name" label="Nome completo">
              <input id="full-name" className={fieldClass} type="text" placeholder="Ex: Maria da Silva" />
            </Field>
            <Field id="register-email" label="E-mail">
              <input id="register-email" className={fieldClass} type="email" placeholder="seuemail@exemplo.com" />
            </Field>
            <Field id="cpf" label="CPF">
              <input id="cpf" className={fieldClass} type="text" placeholder="000.000.000-00" />
            </Field>
            <Field id="birth-date" label="Data de nascimento">
              <input id="birth-date" className={fieldClass} type="date" />
            </Field>
            <Field id="phone" label="Telefone">
              <input id="phone" className={fieldClass} type="tel" placeholder="(00) 00000-0000" />
            </Field>
            <Field id="emergency-phone" label="Telefone de emergência">
              <input id="emergency-phone" className={fieldClass} type="tel" placeholder="(00) 00000-0000" />
            </Field>
            <Field id="access-type" label="Tipo de acesso">
              <select id="access-type" className={fieldClass} defaultValue="">
                <option value="" disabled>Selecione uma opção</option>
                <option>Usuário</option>
                <option>Socorrista</option>
                <option>Médico</option>
              </select>
            </Field>
            <Field id="blood-type" label="Tipo sanguíneo">
              <select id="blood-type" className={fieldClass} defaultValue="">
                <option value="" disabled>Selecione</option>
                {bloodTypes.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </Field>
            <Field id="register-password" label="Senha">
              <input id="register-password" className={fieldClass} type="password" placeholder="Crie uma senha segura" />
            </Field>
            <Field id="confirm-password" label="Confirmar senha">
              <input id="confirm-password" className={fieldClass} type="password" placeholder="Repita sua senha" />
            </Field>
            <div className="sm:col-span-2">
              <Field id="allergies-medicines" label="Alergias e medicamentos importantes">
                <textarea
                  id="allergies-medicines"
                  className={`${fieldClass} min-h-12 resize-y leading-5`}
                  placeholder="Ex: Penicilina, Dipirona, Losartana 50mg..."
                />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field id="preexisting-conditions" label="Condições pré-existentes ou observações">
                <textarea
                  id="preexisting-conditions"
                  className={`${fieldClass} min-h-12 resize-y leading-5`}
                  placeholder="Ex: Hipertensão, diabetes, marca-passo, cirurgias recentes..."
                />
              </Field>
            </div>
          </div>

          {/* Consent */}
          <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-[7px] border border-[#182e4a] bg-[#071220] p-3 text-[0.76rem] leading-5 text-[#7d98b3]">
            <input type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 accent-[#2070c8]" />
            Autorizo o uso dos meus dados de saúde para atendimento emergencial conforme a necessidade da ocorrência.
          </label>

          {/* Actions */}
          <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
            <button
              type="button"
              className="rounded-md border border-[#2070c8] bg-[#0c2340] px-4 py-2.5 text-[0.84rem] font-semibold text-[#88c8ff] transition hover:bg-[#103058]"
            >
              Criar conta
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-md border border-[#182e4a] bg-[#071220] px-4 py-2.5 text-[0.82rem] font-semibold text-[#cce0f5] transition hover:border-[#264a72] hover:bg-[#09162a]"
            >
              <GoogleMark />
              Google
            </button>
            <Link
              to="/login"
              className="rounded-md border border-[#182e4a] bg-[#071220] px-4 py-2.5 text-center text-[0.82rem] font-semibold text-[#7d98b3] no-underline transition hover:text-[#5aa8ff]"
            >
              Voltar ao login
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
