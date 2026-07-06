import { SectionHeading } from "./SectionHeading";
import Image from "next/image";

// Therapist data with image paths
const THERAPISTS = [
  { 
    image: "/punitha.png", 
    name: "Agnes Punitha", 
    spec: "Counselling Psychologist", 
    city: "Anxiety / Wellness / Support" 
  },
  { 
    image: "/mumeenul.png", 
    name: "Mumeenul Afrin", 
    spec: "Counselling Psychologist", 
    city: "Anxiety / Wellness / Support" 
  },
  { 
    image: "/sakthi.jpeg", 
    name: "Sakthi", 
    spec: "Counselling Psychologist", 
    city: "Anxiety / Wellness / Support" 
  },
  { 
    image: "/prabu.jpeg", 
    name: "Prabu Devan", 
    spec: "Counselling Psychologist", 
    city: "Anxiety / Wellness / Support" 
  },
  { 
    image: "/shifana.jpeg", 
    name: "Shifana Banu", 
    spec: "Counselling Psychologist", 
    city: "Anxiety / Wellness / Support" 
  },
  { 
    image: "/sunitha.png", 
    name: "Sunitha", 
    spec: "Counselor", 
    city: "Anxiety / Wellness / Support" 
  },
  { 
    image: "/akshaya.png", 
    name: "Akshaya B", 
    spec: "Psychologist", 
    city: "Anxiety / Wellness / Support" 
  },
];

export function Therapists() {
  // Split therapists into two rows: first 4, then remaining 3
  const firstRow = THERAPISTS.slice(0, 4);
  const secondRow = THERAPISTS.slice(4);

  return (
    <section id="therapists" className="bg-[#fbfaf6] px-[clamp(20px,5vw,40px)] py-[clamp(60px,9vw,96px)]">
      <SectionHeading
        tone="light"
        label="Our Professionals"
        title={<>Compassionate Therapists<br /><em className="italic text-[#1c8f88]">Across India</em></>}
      />

      <div className="mx-auto max-w-[1280px]">
        {/* First Row - 4 cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {firstRow.map((t) => (
            <div
              key={t.name}
              className="rounded-[20px] border border-[rgba(64,188,183,0.2)] bg-white px-6 py-8 text-center shadow-[0_10px_30px_-24px_rgba(23,86,91,0.5)] transition hover:-translate-y-[3px] hover:border-[#1c8f88]"
            >
              <div
                className="mx-auto mb-5 h-32 w-32 overflow-hidden rounded-full border-2 shadow-md"
                style={{ borderColor: "#40bcb755" }}
              >
                <Image 
                  src={t.image} 
                  alt={t.name} 
                  width={128}
                  height={128}
                  className="h-full w-full object-cover"
                  quality={100}
                  priority={false}
                />
              </div>
              <div className="mb-1.5 font-cormorant t-h4 font-normal text-[#163030]">{t.name}</div>
              <div className="mb-2.5 t-small text-[#1c8f88]">{t.spec}</div>
              <div className="flex items-center justify-center gap-1 t-small text-[#8a9694]">
                <span>{t.city}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Second Row - 3 cards centered */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:justify-items-center" style={{ maxWidth: "calc(33.333% * 3 + 1.5rem * 2)" }}>
          {secondRow.map((t) => (
            <div
              key={t.name}
              className="w-full rounded-[20px] border border-[rgba(64,188,183,0.2)] bg-white px-6 py-8 text-center shadow-[0_10px_30px_-24px_rgba(23,86,91,0.5)] transition hover:-translate-y-[3px] hover:border-[#1c8f88]"
            >
              <div
                className="mx-auto mb-5 h-32 w-32 overflow-hidden rounded-full border-2 shadow-md"
                style={{ borderColor: "#40bcb755" }}
              >
                <Image 
                  src={t.image} 
                  alt={t.name} 
                  width={128}
                  height={128}
                  className="h-full w-full object-cover"
                  quality={100}
                  priority={false}
                />
              </div>
              <div className="mb-1.5 font-cormorant t-h4 font-normal text-[#163030]">{t.name}</div>
              <div className="mb-2.5 t-small text-[#1c8f88]">{t.spec}</div>
              <div className="flex items-center justify-center gap-1 t-small text-[#8a9694]">
                <span>{t.city}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Banner */}
        <div className="mt-6 rounded-[20px] border border-dashed border-[rgba(64,188,183,0.35)] p-8 text-center t-small text-[#1c8f88]">
          45+ more therapists across India, matched to your needs after booking
        </div>
      </div>
    </section>
  );
}