import { Reveal } from "./Reveal";
import { button, eyebrow, section, wrap } from "./styles";

const points = [
  "Limited slots each week",
  "Reports reviewed personally",
  "No-pressure guidance",
];

export function FinalCtaSection() {
  return (
    <section className={`${section} bg-[radial-gradient(120%_120%_at_50%_0%,#42c8c8,#126e6e_60%)] text-white`} id="book">
      <div className={wrap}>
        <Reveal>
          <div className="grid grid-cols-[1fr_380px] items-center gap-12 max-[900px]:grid-cols-1 max-[900px]:gap-8">

            {/* Left: eyebrow + headline + points */}
            <div>
              <span className={`${eyebrow} text-white`}>Take the first step</span>
              <h2 className="mt-2 t-h2 leading-[1.08] text-white">
                Ignoring the symptoms will not give you answers. A proper evaluation will.
              </h2>
              <div className="mt-7 flex flex-col gap-3">
                {points.map((point) => (
                  <span className="flex items-center gap-3 t-small text-[#99e6e6]" key={point}>
                    <span className="h-1.5 w-1.5 flex-none rounded-full bg-[#99e6e6]" />
                    {point}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: frosted panel with paragraph + CTA */}
            <div className="rounded-[24px] border border-white/15 bg-white/10 p-7 backdrop-blur-sm max-[620px]:p-5">
              <p className="mb-6 t-body leading-relaxed text-[#c5f0f0]">
                Reserve your consultation with Dr. Preethi Mrinalini and finally understand
                your condition - before it affects your quality of life.
              </p>
              <a href="#" className={`${button} w-full`}>
                Book My Consultation 
              </a>
            </div>

          </div>
        </Reveal>
      </div>
    </section>
  );
}
