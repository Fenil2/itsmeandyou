"use client";

import {
  BoltIcon,
  CircleCheckIcon,
  HeartIcon,
  PlusIcon,
  PulseIcon,
  ShieldIcon,
} from "./Icons";
import { Reveal } from "./Reveal";
import { eyebrow, lead, section, sectionTitle, shadowSoft, wrap } from "./styles";

const benefits = [
  {
    title: "Smaller incisions",
    copy: "Minimally invasive techniques mean far less to heal from afterward.",
    icon: <PlusIcon />,
  },
  {
    title: "Less discomfort",
    copy: "A gentler experience built around your comfort, not just the procedure.",
    icon: <HeartIcon />,
  },
  {
    title: "Faster recovery",
    copy: "An emphasis on getting you back to daily life sooner.",
    icon: <BoltIcon />,
  },
  {
    title: "Early return to activity",
    copy: "Less time spent sidelined from work, family and routine.",
    icon: <PulseIcon />,
  },
  {
    title: "Better cosmetic outcomes",
    copy: "Approaches that consider how things look and feel afterward.",
    icon: <CircleCheckIcon />,
  },
  {
    title: "Reduced recurrence risk",
    copy: "Treatment chosen with the goal of lasting results.",
    icon: <ShieldIcon />,
  },
];

function ArrowLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 6 15 12 9 18" />
    </svg>
  );
}

function BenefitCard({ benefit }: { benefit: (typeof benefits)[number] }) {
  return (
    <div className={`${shadowSoft} ben rounded-[18px] border border-[rgba(22,48,48,0.12)] bg-white px-6 py-[16px] transition-[transform,box-shadow] duration-200 hover:-translate-y-1 max-[620px]:px-[18px] max-[620px]:py-5`}>
      <div className="mb-4 grid h-[46px] w-[46px] place-items-center rounded-[13px] bg-mist text-teal-deep">
        {benefit.icon}
      </div>
      <h4 className="mb-[7px] t-h5">{benefit.title}</h4>
      <p className="t-small text-ink-soft">{benefit.copy}</p>
    </div>
  );
}

export function BenefitsSection() {
  function scroll(dir: "prev" | "next") {
    const track = document.querySelector<HTMLElement>(".ben-carousel-track");
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".ben");
    const step = (card?.offsetWidth ?? 260) + 14;
    track.scrollBy({ left: dir === "next" ? step : -step, behavior: "smooth" });
  }

  return (
    <section className={`${section} bg-paper`} id="benefits">
      <div className={wrap}>
        <Reveal>
          <span className={eyebrow}>Why patients choose modern treatment</span>
          <h2 className={sectionTitle}>
            Today&apos;s options are not what most people picture.
          </h2>
          <p className={`${lead} mt-3`}>
            The first step is simply understanding which type of hernia you
            have. From there, modern approaches can offer:
          </p>

          <div className="mt-9 grid grid-cols-3 gap-[18px] max-[900px]:hidden">
            {benefits.map((benefit) => (
              <BenefitCard benefit={benefit} key={benefit.title} />
            ))}
          </div>
        </Reveal>
      </div>

      <div className="relative mt-7 hidden px-[52px] max-[900px]:block">
        <button
          className="absolute left-0 top-1/2 z-[2] grid h-10 w-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full border-[1.5px] border-[rgba(22,48,48,0.12)] bg-white text-teal-deep shadow-[0_2px_10px_rgba(0,0,0,0.08)] transition-colors hover:border-teal hover:bg-mist"
          onClick={() => scroll("prev")}
          aria-label="Previous"
        >
          <ArrowLeft />
        </button>
        <div className="ben-carousel-track flex snap-x gap-3.5 overflow-x-auto pb-3 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {benefits.map((benefit) => (
            <div className="flex-[0_0_100%] snap-start" key={benefit.title}>
              <BenefitCard benefit={benefit} />
            </div>
          ))}
        </div>
        <button
          className="absolute right-0 top-1/2 z-[2] grid h-10 w-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full border-[1.5px] border-[rgba(22,48,48,0.12)] bg-white text-teal-deep shadow-[0_2px_10px_rgba(0,0,0,0.08)] transition-colors hover:border-teal hover:bg-mist"
          onClick={() => scroll("next")}
          aria-label="Next"
        >
          <ArrowRight />
        </button>
      </div>
    </section>
  );
}
