"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";
import { eyebrow, section, shadowCard, wrap } from "./styles";

export function DoctorSection() {
  return (
    <section
      className={`${section} relative overflow-hidden bg-teal-deep text-white before:absolute before:-right-[120px] before:-top-[120px] before:h-[380px] before:w-[380px] before:rounded-full before:bg-white/5`}
      id="doctor"
    >
      <div className={wrap}>
        <Reveal>
          <div className="grid items-start gap-8 rounded-[34px] border border-white/10 bg-white/5 p-6 lg:grid-cols-[minmax(0,1fr)_420px] max-[620px]:gap-7 max-[620px]:p-3.5">
            <div className="relative z-[1] max-w-[680px] py-3 max-[620px]:p-1.5">
              <span className={`${eyebrow} text-white/75`}>
                Meet your surgeon
              </span>
              <h2 className="mb-5 max-w-[12ch] t-h1 text-white [text-wrap:balance]">
                Dr. Preethi Mrinalini{" "}
              </h2>
              <div className="mb-7 inline-flex max-w-full rounded-full border border-white/10 bg-white/10 px-4 py-2 t-body font-semibold tracking-[0.04em] text-white/75 max-[620px]:rounded-2xl">
                Advanced Laparoscopic &amp; Hernia Surgeon
              </div>

              <div className="rounded-[30px] border border-white/10 bg-white/5 p-7 max-[620px]:rounded-[24px] max-[620px]:p-5">
                <p className="t-body leading-[1.8] text-white/75">
                  Over the years, Dr. Preethi Mrinalini has helped patients with
                  hernia and abdominal wall conditions understand their diagnosis
                  and explore modern treatment options - using advanced
                  laparoscopic, minimally invasive approaches focused on safety,
                  recovery and long-term outcomes.
                </p>
                <div className="my-6 h-px w-full bg-white/10" />
                <p className="t-body leading-[1.8] text-white/75">
                  Her mission is simple:{" "}
                  <b className="text-white">
                    help patients make informed decisions before their condition
                    affects their quality of life.
                  </b>
                </p>
                              <p className="relative mt-3 px-2 text-center t-caption leading-relaxed text-white/60">
                *Replace stat figures with verified, accurate numbers before
                publishing.
              </p>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[420px] lg:mr-0">
              <div className="absolute inset-4 rounded-[34px]  max-[620px]:inset-3" />
              <div
                className={`${shadowCard} relative overflow-hidden rounded-[34px] border border-white/15 bg-white/10 p-3`}
              >
                <div className="aspect-[4/5] overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(160deg,#126e6e,#42c8c8)] max-[900px]:aspect-[4/3] max-[620px]:aspect-[3.1/4]">
                  <img
                    src="https://res.cloudinary.com/dthj7fakc/image/upload/v1781681953/dr-preethi-mrinalini_wmgdmk.webp"
                    alt="Dr. Preethi Mrinalini"
                    className="h-full w-full rounded-[inherit] object-cover object-top"
                  />
                </div>
              </div>
              {/* <div className="relative mt-4 grid grid-cols-3 gap-2.5 max-[620px]:grid-cols-1">
                <StatCounter
                  value={2000}
                  suffix="+"
                  label="Patients guided"
                />
                <StatCounter
                  value={15}
                  suffix="+"
                  label="Years of experience"
                />
                <div className="flex min-h-[86px] flex-col justify-center rounded-2xl border border-white/10 bg-white/10 px-3 py-4 text-center max-[620px]:min-h-0 max-[620px]:px-4 max-[620px]:py-3.5">
                  <div className="font-display t-h3 font-semibold leading-none text-white">
                    <em className="not-italic text-white">Key</em>
                  </div>
                  <div className="mt-1.5 t-caption font-medium leading-snug tracking-[0.02em] text-white/75">
                    Laparoscopic focus
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StatCounter({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    let frame = 0;
    let start = 0;
    const duration = 1400;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        function step(timestamp: number) {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);

          setCount(Math.floor(eased * value));

          if (progress < 1) {
            frame = requestAnimationFrame(step);
          }
        }

        frame = requestAnimationFrame(step);
        observer.disconnect();
      },
      { threshold: 0.4 },
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <div className="flex min-h-[86px] flex-col justify-center rounded-2xl border border-white/10 bg-white/10 px-3 py-4 text-center max-[620px]:min-h-0 max-[620px]:px-4 max-[620px]:py-3.5">
      <div
        className="font-display t-h3 font-semibold leading-none text-white"
        ref={ref}
      >
        {count.toLocaleString("en-IN")}
        {suffix}
      </div>
      <div className="mt-1.5 t-caption font-medium leading-snug tracking-[0.02em] text-white/75">
        {label}
      </div>
    </div>
  );
}
