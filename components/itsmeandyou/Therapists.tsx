import { SectionHeading } from "./SectionHeading";

// Therapist data with image paths
const THERAPISTS = [
  { 
    image: "/images/therapists/priya-sharma.jpg", 
    name: "Dr. Priya Sharma", 
    spec: "Anxiety / Relationship", 
    city: "Mumbai" 
  },
  { 
    image: "/images/therapists/ananya-rao.jpg", 
    name: "Ms. Ananya Rao", 
    spec: "Depression / Trauma", 
    city: "Bangalore" 
  },
  { 
    image: "/images/therapists/kavya-nair.jpg", 
    name: "Dr. Kavya Nair", 
    spec: "Child Psychology", 
    city: "Chennai" 
  },
  { 
    image: "/images/therapists/rohit-mehta.jpg", 
    name: "Mr. Rohit Mehta", 
    spec: "Couples / Stress", 
    city: "Delhi" 
  },
  { 
    image: "/images/therapists/deepa-iyer.jpg", 
    name: "Ms. Deepa Iyer", 
    spec: "OCD / Emotional Wellness", 
    city: "Hyderabad" 
  },
];

export function Therapists() {
  return (
    <section id="therapists" className="bg-[#fbfaf6] px-[clamp(20px,5vw,40px)] py-[clamp(60px,9vw,96px)]">
      <SectionHeading
        tone="light"
        label="Our Professionals"
        title={<>Compassionate Therapists<br /><em className="italic text-[#1c8f88]">Across India</em></>}
      />

      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {THERAPISTS.map((t) => (
          <div
            key={t.name}
            className="rounded-[16px] border border-[rgba(64,188,183,0.2)] bg-white px-5 py-7 text-center shadow-[0_10px_30px_-24px_rgba(23,86,91,0.5)] transition hover:-translate-y-[3px] hover:border-[#1c8f88]"
          >
            <div
              className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full border-2"
              style={{ borderColor: "#40bcb755" }}
            >
              <img 
                src={t.image} 
                alt={t.name} 
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mb-1 font-cormorant t-h5 font-normal text-[#163030]">{t.name}</div>
            <div className="mb-2 t-caption text-[#1c8f88]">{t.spec}</div>
            <div className="flex items-center justify-center gap-1 t-caption text-[#8a9694]">
              <span>{t.city}</span>
            </div>
          </div>
        ))}
        <div className="col-span-full rounded-[16px] border border-dashed border-[rgba(64,188,183,0.35)] p-6 text-center t-small text-[#1c8f88] xl:col-span-5">
          45+ more therapists across India, matched to your needs after booking
        </div>
      </div>
    </section>
  );
}