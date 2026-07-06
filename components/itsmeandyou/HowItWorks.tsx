import { SectionHeading } from "./SectionHeading";

const STEPS = [
  { n: "1", title: "Share Your Details", desc: "Tell us a little about yourself. Takes under 2 minutes.", icon: "details" },
  { n: "2", title: "We Match You", desc: "Our team matches you with the right therapist for your needs.", icon: "match" },
  { n: "3", title: "Confirm Time", desc: "Choose a slot that works for you. Session via video or phone.", icon: "time" },
  { n: "4", title: "Begin Healing", desc: "A private, compassionate 45-minute session just for you.", icon: "care" },
];

function StepIcon({ type }: { type: string }) {
  if (type === "details") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true" className="h-9 w-9">
        <circle cx="32" cy="22" r="10" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <path d="M16 48c0-8.8 7.2-16 16-16s16 7.2 16 16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <rect x="38" y="10" width="16" height="4" rx="2" fill="currentColor" fillOpacity="0.3" />
        <rect x="38" y="18" width="12" height="3" rx="1.5" fill="currentColor" fillOpacity="0.3" />
        <rect x="38" y="25" width="14" height="3" rx="1.5" fill="currentColor" fillOpacity="0.3" />
      </svg>
    );
  }

  if (type === "match") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true" className="h-9 w-9">
        <circle cx="22" cy="22" r="8" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <circle cx="42" cy="22" r="8" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <path d="M30 38c0-6.6 5.4-12 12-12s12 5.4 12 12" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M10 38c0-6.6 5.4-12 12-12s12 5.4 12 12" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M32 48l4-4-4-4M32 48l-4-4 4-4" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "time") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true" className="h-9 w-9">
        <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <path d="M32 14v18h12" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <circle cx="32" cy="32" r="2" fill="currentColor" />
        <rect x="14" y="10" width="36" height="4" rx="2" fill="currentColor" fillOpacity="0.3" />
        <rect x="14" y="50" width="36" height="4" rx="2" fill="currentColor" fillOpacity="0.3" />
      </svg>
    );
  }

  if (type === "care") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true" className="h-9 w-9">
        <path d="M32 54C20 48 8 40 8 28c0-8.8 6.6-16 16-16 4.4 0 8.4 1.8 11.2 4.6L32 20l-3.2-3.4C31.6 13.8 35.6 12 40 12c8.8 0 16 7.2 16 16 0 12-12 20-24 26z" 
          stroke="currentColor" strokeWidth="2.5" fill="currentColor" fillOpacity="0.2" />
        <path d="M24 28l6 6 12-12" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="32" cy="28" r="1.5" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-9 w-9">
      <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <path d="M32 18v14l8 8" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#17565b] px-[clamp(20px,5vw,40px)] py-[clamp(60px,9vw,96px)]">
      <SectionHeading label="Simple Process" title="How It Works" />

      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-[clamp(20px,4vw,32px)] sm:grid-cols-2 xl:grid-cols-4">
        {STEPS.map((s) => (
          <div
            key={s.n}
            className="group relative rounded-3xl bg-[rgba(143,214,208,0.06)] p-6 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[rgba(143,214,208,0.12)] hover:shadow-xl hover:shadow-[rgba(0,0,0,0.15)] max-sm:p-4"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[rgba(143,214,208,0.05)] to-transparent" />

            <div className="relative mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[rgba(143,214,208,0.2)] to-[rgba(143,214,208,0.05)] text-[#8fd6d0] shadow-lg shadow-[rgba(143,214,208,0.1)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-[rgba(143,214,208,0.2)]">
              <StepIcon type={s.icon} />
            </div>

            <div className="relative mx-auto mb-3 inline-flex min-w-9 items-center justify-center rounded-full border border-[rgba(201,154,60,0.4)] bg-[rgba(201,154,60,0.14)] px-3.5 py-1.5 t-caption tracking-[0.2em] text-[#e3c079] transition-all duration-300 group-hover:border-[rgba(201,154,60,0.6)] group-hover:bg-[rgba(201,154,60,0.2)]">
              {s.n}
            </div>

            <div className="relative mb-2 font-cormorant t-h4 font-normal text-[#faf7f2] transition-colors duration-300 group-hover:text-white">
              {s.title}
            </div>

            <p className="relative t-small leading-[1.6] text-[rgba(250,247,242,0.6)] transition-colors duration-300 group-hover:text-[rgba(250,247,242,0.8)]">
              {s.desc}
            </p>

            <div className="absolute inset-0 rounded-3xl border border-[rgba(143,214,208,0.08)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        ))}
      </div>
    </section>
  );
}