import { ArrowIcon, CheckIcon, CrossIcon } from "./Icons";
import { Reveal } from "./Reveal";
import { eyebrow, section, sectionTitle, shadowCard, wrap } from "./styles";

const before = [
  "Planning your movements around the discomfort",
  "Worrying quietly whether it is getting worse",
  "Avoiding lifting, exercise, even certain clothes",
  "Conflicting answers from Google and forums",
  "Putting off a decision month after month",
];

const after = [
  "You know exactly what type of hernia you have",
  "You understand your real options - not guesses",
  "You know what recovery would actually look like",
  "Your scans and reports reviewed by a specialist",
  "A decision you can make with confidence",
];

export function BeforeAfterSection() {
  return (
    <section
      className={`${section} relative isolate overflow-hidden bg-white before:absolute before:left-[-14%] before:top-20 before:-z-10 before:h-[340px] before:w-[340px] before:rounded-full before:bg-mist before:blur-3xl before:content-[''] after:absolute after:bottom-[-18%] after:right-[-10%] after:-z-10 after:h-[420px] after:w-[420px] after:rounded-full after:bg-teal/10 after:blur-3xl after:content-['']`}
      id="ba"
    >
      <div className={wrap}>
        <Reveal>
          <span className={eyebrow}>Before &amp; after a clear diagnosis</span>
          <h2 className={sectionTitle}>
            The difference is not just physical. It is the not-knowing.
          </h2>
          <div className="relative mt-9 grid grid-cols-2 gap-[22px] max-[620px]:grid-cols-1 max-[620px]:gap-[46px]">
            <div className="rounded-[22px] border border-[rgba(22,48,48,0.12)] px-[30px] py-8 max-[620px]:px-[18px] max-[620px]:py-6">
              <span className="mb-[18px] inline-block t-caption font-bold uppercase tracking-[0.1em] text-coral-deep">Living with it</span>
              <h3 className="mb-1.5 t-h3">Every day on hold</h3>
              <ul className="grid list-none gap-[13px]">
                {before.map((item) => (
                  <li className="flex items-start gap-3 t-body text-ink-soft [&_svg]:mt-[3px] [&_svg]:flex-none" key={item}>
                    <CrossIcon color="#D14224" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="absolute left-1/2 top-1/2 z-[2] grid h-[52px] w-[52px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-coral text-white shadow-[0_8px_22px_-8px_rgba(209,66,36,0.7)] max-[620px]:hidden">
              <ArrowIcon />
            </div>

            <div className={`${shadowCard} rounded-[22px] border border-transparent bg-teal-deep px-[30px] py-8 text-white max-[620px]:px-[18px] max-[620px]:py-6`}>
              <span className="mb-[18px] inline-block t-caption font-bold uppercase tracking-[0.1em] text-[#99e6e6]">After your assessment</span>
              <h3 className="mb-1.5 t-h3">Finally, clarity</h3>
              <ul className="grid list-none gap-[13px]">
                {after.map((item) => (
                  <li className="flex items-start gap-3 t-body text-[#d5f5f5] [&_svg]:mt-[3px] [&_svg]:flex-none" key={item}>
                    <CheckIcon color="#99e6e6" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
