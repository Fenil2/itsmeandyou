import { SectionHeading } from "./SectionHeading";

const SERVICES = [
  { 
    name: "Anxiety & Stress", 
    desc: "Managing overwhelming thoughts and emotional pressure with compassionate, evidence-based support.", 
    tone: "#40bcb7",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
        <path d="M12 2v4" />
        <path d="M12 18v4" />
        <path d="M4.93 4.93l2.83 2.83" />
        <path d="M16.24 16.24l2.83 2.83" />
        <path d="M2 12h4" />
        <path d="M18 12h4" />
        <path d="M4.93 19.07l2.83-2.83" />
        <path d="M16.24 7.76l2.83-2.83" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    )
  },
  { 
    name: "Relationship Counselling", 
    desc: "Support for communication, trust and emotional connection in personal and family relationships.", 
    tone: "#c99a3c",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
        <path d="M21 8v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5z" />
        <path d="M7 10l3 3 7-7" />
      </svg>
    )
  },
  { 
    name: "Depression Support", 
    desc: "A safe and understanding space to navigate sadness, emotional exhaustion and gradual healing.", 
    tone: "#2571b4",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M8 10l2 2 4-4" />
      </svg>
    )
  },
  { 
    name: "Child Psychology", 
    desc: "Gentle emotional support and behavioural guidance tailored for children and their families.", 
    tone: "#1c8f88",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
        <circle cx="12" cy="8" r="4" />
        <path d="M5.5 16c.5-2 3-3 6.5-3s6 1 6.5 3" />
        <path d="M5.5 20c.5-2 3-3 6.5-3s6 1 6.5 3" />
      </svg>
    )
  },
  { 
    name: "Couples Therapy", 
    desc: "Helping couples reconnect, heal emotional wounds and strengthen their bond together.", 
    tone: "#6fc9c2",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
        <path d="M17 22v-4a4 4 0 0 1-4-4H7a4 4 0 0 1-4-4V8" />
        <circle cx="17" cy="4" r="2" />
        <path d="M17 8v6" />
        <path d="M21 12v6" />
        <circle cx="21" cy="4" r="2" />
        <path d="M5 4L3 6l2 2" />
      </svg>
    )
  },
  { 
    name: "Emotional Wellness", 
    desc: "Encouraging confidence, clarity and emotional balance through supportive, ongoing therapy.", 
    tone: "#3f9e97",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
        <path d="M12 2a10 10 0 1 0 10 10 10 10 0 0 0-10-10z" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <path d="M9 9h.01" />
        <path d="M15 9h.01" />
      </svg>
    )
  },
];

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
            className="group rounded-[20px] border border-[rgba(64,188,183,0.18)] bg-[#fbfaf6] px-7 py-8 transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(64,188,183,0.4)] hover:shadow-[0_12px_40px_rgba(23,86,91,0.12)]"
          >
            {/* Icon container */}
            <div 
              className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
              style={{ 
                backgroundColor: `${s.tone}20`,
                color: s.tone
              }}
            >
              {s.svg}
              
              {/* Decorative ring */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ 
                  border: `2px solid ${s.tone}40`,
                  boxShadow: `0 0 20px ${s.tone}20`
                }}
              />
            </div>
            
            <div className="mb-2 font-cormorant t-h4 font-normal text-[#163030] transition-colors duration-300 group-hover:text-[#1c8f88]">
              {s.name}
            </div>
            <p className="t-small leading-[1.6] text-[#5c6b6b] transition-colors duration-300 group-hover:text-[#3a4f4f]">
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}