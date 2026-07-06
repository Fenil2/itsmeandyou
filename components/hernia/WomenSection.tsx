import { CheckIcon } from "./Icons";
import { Reveal } from "./Reveal";
import { lead, section, sectionTitle, softBorder, wrap } from "./styles";

const signs = [
  "Mommy pouch",
  "Weak core muscles",
  "Lower back pain",
  "Difficulty exercising",
  "Abdominal bulging",
  "Lost post-pregnancy confidence",
];

const image = (
  <div className="overflow-hidden p-6 text-center t-small font-semibold leading-normal text-[#a98778] max-[620px]:p-[19px]">
    <img
      src="https://res.cloudinary.com/dxntva1vn/image/upload/v1782744669/hernia_ygipmq.png"
      alt="Women patient"
      className="block h-full w-full rounded-[inherit] object-cover object-center"
    />
  </div>
);

export function WomenSection() {
  return (
    <section
      className={`${section} relative isolate overflow-hidden bg-white before:absolute before:left-[-14%] before:top-20 before:-z-10 before:h-[340px] before:w-[340px] before:rounded-full before:bg-mist before:blur-3xl before:content-[''] after:absolute after:bottom-[-18%] after:right-[-10%] after:-z-10 after:h-[420px] after:w-[420px] after:rounded-full after:bg-teal/10 after:blur-3xl after:content-['']`}
      id="women"
    >
      <div className={wrap}>
        <Reveal className="grid grid-cols-2 items-center gap-[46px] max-[900px]:grid-cols-1 max-[900px]:gap-[34px]">
          {/* Desktop / tablet: image in left column */}
          <div className={`${softBorder} relative flex aspect-[3.1/4] items-center justify-center overflow-hidden rounded-[22px] bg-[linear-gradient(160deg,#fcefea,#f3e4dc)] max-[900px]:mx-auto max-[900px]:max-w-[460px] max-[620px]:hidden max-[620px]:max-w-full`}>
            {image}
          </div>

          <div>
            <span className="mb-[18px] inline-block rounded-full border-2 border-teal px-3.5 py-[7px] t-caption font-bold uppercase tracking-[0.05em] text-coral-deep">
              For Women
            </span>
            <h2 className={sectionTitle}>It may not just be belly fat.</h2>
            <p className={`${lead} mt-3`}>
              Many women come to us convinced they have stubborn fat that will
              not budge after pregnancy. What they often have is{" "}
              <b>abdominal muscle separation - Diastasis Recti.</b> It affects
              confidence, posture and everyday comfort, and it rarely resolves
              with more crunches.
            </p>

            {/* Mobile: image between paragraph and signs */}
            <div className={`${softBorder} relative my-5 hidden aspect-[3.1/4] max-w-full items-center justify-center overflow-hidden rounded-[22px] bg-[linear-gradient(160deg,#fcefea,#f3e4dc)] max-[620px]:flex`}>
              {image}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2.5 max-[620px]:grid-cols-1">
              {signs.map((sign) => (
                <div className="flex items-center gap-2.5 rounded-[11px] border border-[rgba(22,48,48,0.07)] bg-paper px-3.5 py-3 t-small font-medium" key={sign}>
                  <CheckIcon color="#42c8c8" size={16} strokeWidth={2.6} /> {sign}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
