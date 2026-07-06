import { SectionHeading } from "./SectionHeading";

// Icon tones drawn from the logo's teal / gold / blue trio
const SERVICES = [
  { name: "Anxiety & Stress", desc: "Managing overwhelming thoughts and emotional pressure with compassionate, evidence-based support.", tone: "#40bcb7" },
  { name: "Relationship Counselling", desc: "Support for communication, trust and emotional connection in personal and family relationships.", tone: "#c99a3c" },
  { name: "Depression Support", desc: "A safe and understanding space to navigate sadness, emotional exhaustion and gradual healing.", tone: "#2571b4" },
  { name: "Child Psychology", desc: "Gentle emotional support and behavioural guidance tailored for children and their families.", tone: "#1c8f88" },
  { name: "Couples Therapy", desc: "Helping couples reconnect, heal emotional wounds and strengthen their bond together.", tone: "#6fc9c2" },
  { name: "Emotional Wellness", desc: "Encouraging confidence, clarity and emotional balance through supportive, ongoing therapy.", tone: "#3f9e97" },
];

function ServiceIcon({ tone }: { tone: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-12 w-12">
      <rect x="8" y="10" width="48" height="44" rx="14" fill={tone} fillOpacity="0.16" />
      <rect x="18" y="20" width="28" height="6" rx="3" fill={tone} />
      <rect x="18" y="31" width="20" height="6" rx="3" fill={tone} fillOpacity="0.75" />
      <rect x="18" y="42" width="24" height="5" rx="2.5" fill="#163030" fillOpacity="0.16" />
    </svg>
  );
}

export function Services() {
  return (
    <section id="services" className="bg-[#e9f5f3] px-[clamp(20px,5vw,40px)] py-[clamp(60px,9vw,96px)]">
      <SectionHeading
        tone="light"
        label="What We Offer"
        title={<>Support For Your<br /><em className="italic text-[#1c8f88]">Emotional Wellness</em></>}
      />

      <div className="mx-auto grid max-w-[1120px] grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {SERVICES.map((s) => (
          <div
            key={s.name}
            className="rounded-[16px] border border-[rgba(64,188,183,0.18)] bg-[#fbfaf6] px-7 py-8 transition hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(23,86,91,0.1)]"
          >
            <div className="mb-4">
              <ServiceIcon tone={s.tone} />
            </div>
            <div className="mb-2 font-cormorant t-h4 font-normal text-[#163030]">{s.name}</div>
            <p className="t-small leading-[1.6] text-[#5c6b6b]">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
