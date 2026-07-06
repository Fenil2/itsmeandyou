import { SectionHeading } from "./SectionHeading";

const STEPS = [
  { n: "1", title: "Share Your Details", desc: "Tell us a little about yourself. Takes under 2 minutes.", icon: "details" },
  { n: "2", title: "We Match You", desc: "Our team matches you with the right therapist for your needs.", icon: "match" },
  { n: "3", title: "Confirm Time", desc: "Choose a slot that works for you. Session via video or phone.", icon: "time" },
  { n: "4", title: "Begin Healing", desc: "A private, compassionate 45-minute session just for you.", icon: "care" },
];

function StepIcon({ type }: { type: string }) {
  if (type === "match") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true" className="h-9 w-9">
        <rect x="8" y="12" width="20" height="16" rx="4" fill="currentColor" fillOpacity="0.28" />
        <rect x="36" y="12" width="20" height="16" rx="4" fill="currentColor" fillOpacity="0.52" />
        <path d="M24 36h16M32 28v16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "time") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true" className="h-9 w-9">
        <rect x="12" y="14" width="40" height="36" rx="8" stroke="currentColor" strokeWidth="3" fill="none" />
        <path d="M22 10v8M42 10v8M20 28h24M32 28v10l7 4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "care") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true" className="h-9 w-9">
        <rect x="12" y="14" width="40" height="36" rx="10" fill="currentColor" fillOpacity="0.2" />
        <path d="M25 30h14M32 23v14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <rect x="24" y="40" width="16" height="4" rx="2" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-9 w-9">
      <rect x="12" y="14" width="40" height="36" rx="8" stroke="currentColor" strokeWidth="3" fill="none" />
      <rect x="20" y="24" width="24" height="4" rx="2" fill="currentColor" />
      <rect x="20" y="34" width="18" height="4" rx="2" fill="currentColor" fillOpacity="0.55" />
    </svg>
  );
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#17565b] px-[clamp(20px,5vw,40px)] py-[clamp(60px,9vw,96px)]">
      <SectionHeading label="Simple Process" title="How It Works" />

      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-[clamp(20px,4vw,32px)] sm:grid-cols-2 xl:grid-cols-4">
        {STEPS.map((s) => (
          <div key={s.n} className="p-5 text-center max-sm:p-3">
            <div className="mx-auto mb-5 flex h-[72px] w-[72px] items-center justify-center rounded-[20px] border border-[rgba(143,214,208,0.35)] bg-[rgba(143,214,208,0.14)] text-[#8fd6d0]">
              <StepIcon type={s.icon} />
            </div>
            <div className="mx-auto mb-3 inline-flex min-w-9 items-center justify-center rounded-[10px] border border-[rgba(201,154,60,0.4)] bg-[rgba(201,154,60,0.14)] px-3 py-1 t-caption tracking-[0.2em] text-[#e3c079]">
              {s.n}
            </div>
            <div className="mb-2 font-cormorant t-h4 font-normal text-[#faf7f2]">{s.title}</div>
            <p className="t-small leading-[1.6] text-[rgba(250,247,242,0.6)]">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
