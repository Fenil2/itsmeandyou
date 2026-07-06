import { Reveal } from "./Reveal";
import { eyebrow, section, sectionTitle, shadowCard, wrap } from "./styles";

const mistakes = [
  ["hope the swelling disappears", "on its own."],
  ["avoid it out of fear", "of surgery."],
  ["search Google and YouTube", "for answers instead of clarity."],
  ["live with discomfort", "every single day."],
];

export function MistakeSection() {
  return (
    <section className={`${section} bg-mist`} id="mistake">
      <div className={wrap}>
        <Reveal>
          <div className="rounded-[32px] border border-[rgba(22,48,48,0.07)] bg-white p-8 shadow-[0_18px_50px_-34px_rgba(18,110,110,0.45)] max-[620px]:p-5">
            <div className="grid items-end gap-8 border-b border-[rgba(22,48,48,0.07)] pb-8 md:grid-cols-[minmax(0,0.78fr)_minmax(240px,0.42fr)]">
              <div className="max-w-[620px] text-left">
                <span className={eyebrow}>The biggest mistake</span>
                <h2 className={sectionTitle}>
                  Most hernia patients make the same costly mistake: they wait.
                </h2>
              </div>
              {/* <div className="hidden h-full rounded-[24px] border border-[rgba(22,48,48,0.07)] bg-paper md:block" /> */}
            </div>

            <div className="mt-7 grid grid-cols-4 gap-3.5 max-[900px]:grid-cols-2 max-[620px]:hidden">
              {mistakes.map(([bold, rest], index) => (
                <div
                  className="group flex min-h-[220px] flex-col justify-between rounded-[24px] border border-[rgba(22,48,48,0.07)] bg-paper p-5 transition-transform duration-200 hover:-translate-y-1"
                  key={bold}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-display t-h2 font-semibold leading-none text-ink-soft/20">
                      0{index + 1}
                    </span>
                    <span className="grid h-10 w-10 place-items-center rounded-full border border-[rgba(22,48,48,0.12)] bg-white font-display t-h4 font-semibold leading-none text-coral-deep">
                      x
                    </span>
                  </div>
                  <div className="t-body font-medium leading-[1.7] text-ink">
                    They <b className="font-semibold">{bold}</b> {rest}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-7 hidden overflow-hidden max-[620px]:block">
              <div className="flex w-max animate-[marquee-left_18s_linear_infinite] gap-3.5">
                {[...mistakes, ...mistakes].map(([bold, rest], index) => {
                  const itemIndex = index % mistakes.length;

                  return (
                    <div
                      className="flex min-h-[190px] w-[78vw] flex-none flex-col justify-between rounded-[24px] border border-[rgba(22,48,48,0.07)] bg-paper p-5"
                      key={`${bold}-${index}`}
                      aria-hidden={index >= mistakes.length}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="font-display t-h2 font-semibold leading-none text-ink-soft/20">
                          0{itemIndex + 1}
                        </span>
                        <span className="grid h-10 w-10 place-items-center rounded-full border border-[rgba(22,48,48,0.12)] bg-white font-display t-h4 font-semibold leading-none text-coral-deep">
                          x
                        </span>
                      </div>
                      <div className="t-body font-medium leading-[1.7] text-ink">
                        They <b className="font-semibold">{bold}</b> {rest}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div
            className={`${shadowCard} mt-5 overflow-hidden rounded-[32px] bg-ink p-[1px] text-white`}
          >
            <div className="grid items-center gap-8 rounded-[31px] border border-white/10 bg-ink p-9 md:grid-cols-[minmax(0,0.52fr)_minmax(0,0.48fr)] max-[620px]:p-6 max-[620px]:px-[18px]">
              <h3 className="t-h2 text-white">
                The reality is simple:{" "}
                <em className="not-italic text-white">
                  a hernia does not heal on its own.
                </em>
              </h3>
              <p className="t-body leading-[1.8] text-white/75">
                Delaying often makes the condition harder to manage, not easier.
                The earlier it is diagnosed, the{" "}
                <span className="font-semibold text-white underline decoration-coral underline-offset-4">
                  simpler the options
                </span>{" "}
                tend to be - and the sooner you stop organising your day around
                discomfort.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
