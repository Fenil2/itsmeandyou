import { CheckIcon } from "./Icons";
import { Reveal } from "./Reveal";
import { button, eyebrow, lead, section, sectionTitle, shadowCard, wrap } from "./styles";

const includes = [
  [
    "Detailed hernia assessment",
    "A proper evaluation of what is actually going on.",
  ],
  ["Symptom evaluation", "Your specific signs, mapped to what they may mean."],
  [
    "Review of reports & scans",
    "Bring what you have - it will be looked at properly.",
  ],
  [
    "Discussion of treatment options",
    "Clear, plain-language explanation of your choices.",
  ],
  [
    "Recovery expectations",
    "What life realistically looks like through recovery.",
  ],
  [
    "Surgical guidance - if required",
    "Only if it is genuinely the right step for you.",
  ],
];

const offerItems = [
  "Reports & scans reviewed",
  "Treatment options explained",
  "Second opinions welcome",
];

export function ConsultationSection() {
  return (
    <section
      className={`${section} relative isolate overflow-hidden bg-white before:absolute before:left-[-14%] before:top-20 before:-z-10 before:h-[340px] before:w-[340px] before:rounded-full before:bg-mist before:blur-3xl before:content-[''] after:absolute after:bottom-[-18%] after:right-[-10%] after:-z-10 after:h-[420px] after:w-[420px] after:rounded-full after:bg-teal/10 after:blur-3xl after:content-['']`}
      id="consult"
    >
      <div className={wrap}>
        <Reveal>
          {/* Centered header */}
          <div className="grid grid-cols-2 items-end gap-10 max-[900px]:grid-cols-1 max-[900px]:gap-4">
            <div>
              <span className={eyebrow}>Your consultation with Dr. Preethi Mrinalini</span>
              <h2 className={sectionTitle}>
                For people serious about understanding their condition.
              </h2>
            </div>
            <p className={lead}>
              This is not a quick glance. It is a focused, honest session designed to give you real answers.
            </p>
          </div>

          {/* Numbered 3-col includes grid */}
          <div className="mt-10 grid grid-cols-3 gap-x-8 max-[900px]:grid-cols-2 max-[620px]:grid-cols-1">
            {includes.map(([title, copy], i) => (
              <div className="border-t border-[rgba(22,48,48,0.12)] py-6" key={title}>
                <span className="font-display t-caption font-bold text-teal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <b className="mt-2 block t-body font-semibold text-ink">{title}</b>
                <p className="mt-1 t-small leading-relaxed text-ink-soft">{copy}</p>
              </div>
            ))}
          </div>

          {/* Full-width horizontal pricing banner */}
          <div className={`${shadowCard} mt-10 grid grid-cols-[1fr_auto] items-center gap-8 rounded-[22px] bg-[linear-gradient(135deg,#126e6e,#0d5252)] px-9 py-7 max-[900px]:grid-cols-1 max-[620px]:px-5 max-[620px]:py-6`}>
            <div>
              <div className="t-h6 font-bold uppercase tracking-[0.12em] text-[#99e6e6]">Consultation fee</div>
              <div className="mt-1.5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="t-small text-[#b5e8e8]">One focused session with the surgeon</span>
              </div>
              <ul className="mt-4 flex list-none flex-wrap gap-x-6 gap-y-2">
                {offerItems.map((item) => (
                  <li className="flex items-center gap-2 t-small text-[#d5f5f5]" key={item}>
                    <CheckIcon color="#99e6e6" size={13} strokeWidth={2.6} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-end gap-3 max-[900px]:items-start">
              <a href="#book" className={`${button} whitespace-nowrap`}>
                Book My Consultation
              </a>
              <div className="whitespace-nowrap rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 t-small font-semibold text-[#ffd9cc]">
                Only <i className="not-italic text-white">a few slots</i> open each week
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
