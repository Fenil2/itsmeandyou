import { SectionHeading } from "./SectionHeading";

const REVIEWS = [
  { quote: "Talking here made me finally feel heard and understood. The warmth and support truly helped me heal emotionally.", tag: "Emotional Wellness / Mumbai" },
  { quote: "A safe and compassionate environment where I could openly express myself without fear or judgement.", tag: "Relationship Support / Delhi" },
  { quote: "The therapists are genuinely caring and supportive. I finally found clarity, peace and emotional balance.", tag: "Personal Growth / Bangalore" },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-[#fbfaf6] px-[clamp(20px,5vw,40px)] py-[clamp(60px,9vw,96px)]">
      <SectionHeading
        tone="light"
        label="Client Experiences"
        title={<>Stories of <em className="italic text-[#1c8f88]">Healing &amp; Hope</em></>}
      />

      <div className="mx-auto grid max-w-[960px] grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-5">
        {REVIEWS.map((r) => (
          <div key={r.tag} className="rounded-[16px] border border-[rgba(64,188,183,0.16)] bg-white p-7 shadow-[0_10px_30px_-24px_rgba(23,86,91,0.5)]">
            <div className="mb-3.5 t-caption tracking-[2px] text-[#c99a3c]">★★★★★</div>
            <p className="mb-5 font-cormorant t-body font-light italic leading-[1.65] text-[#163030]">&ldquo;{r.quote}&rdquo;</p>
            <div className="t-small font-medium text-[#5c6b6b]">Anonymous Client</div>
            <div className="mt-0.5 t-caption text-[#1c8f88]">{r.tag}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
