"use client";

import { useMemo, useState } from "react";
import { CheckIcon } from "./Icons";
import { Reveal } from "./Reveal";
import {
  button,
  eyebrow,
  lead,
  section,
  sectionTitle,
  shadowSoft,
  wrap,
} from "./styles";

const symptoms = [
  "A visible bulge in your abdomen or groin",
  "Pain while lifting heavy objects",
  "Discomfort while coughing or sneezing",
  "A feeling of heaviness or pressure in your stomach",
  "Swelling that appears standing, disappears lying down",
  "A post-pregnancy tummy bulge that never went away",
];

const messages = [
  "Tap the symptoms above that apply to you.",
  "Even one persistent symptom is worth checking properly.",
  "A couple of these together is a common reason patients book.",
  "That pattern is worth getting assessed - sooner is simpler.",
  "Several of these point to something that will not fade on its own.",
  "This is exactly the picture most patients ignore for too long.",
  "Please do not keep waiting on this - book a proper assessment.",
];

export function SymptomCheckSection() {
  const [selected, setSelected] = useState<number[]>([]);
  const progress = useMemo(
    () => `${(selected.length / symptoms.length) * 100}%`,
    [selected.length],
  );

  function toggle(index: number) {
    setSelected((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index],
    );
  }

  return (
    <section
      className={`${section} relative isolate overflow-hidden bg-white before:absolute before:left-[-14%] before:top-20 before:-z-10 before:h-[340px] before:w-[340px] before:rounded-full before:bg-mist before:blur-3xl before:content-[''] after:absolute after:bottom-[-18%] after:right-[-10%] after:-z-10 after:h-[420px] after:w-[420px] after:rounded-full after:bg-teal/10 after:blur-3xl after:content-['']`}
      id="check"
    >
      <div className={wrap}>
        <Reveal>
          <div className="grid items-end gap-6 md:grid-cols-[minmax(0,0.92fr)_minmax(280px,0.62fr)]">
            <div>
              <span className={eyebrow}>A 30-second self-check</span>
              <h2 className={`${sectionTitle} max-w-[18ch]`}>
                Tick what sounds like you. Most people are surprised by the
                count.
              </h2>
            </div>
            <p className={`${lead} md:ml-auto`}>
              These are the symptoms patients tell us they ignored for months -
              sometimes years. Selecting them will not diagnose anything, but it
              will tell you whether an assessment is worth your time.
            </p>
          </div>

          <div
            className={`${shadowSoft} relative mt-9 grid grid-cols-[minmax(0,1fr)_340px] items-stretch gap-0 overflow-hidden rounded-[30px] border border-[rgba(22,48,48,0.10)] bg-white max-[900px]:grid-cols-1`}
          >
            <div className="relative p-4 sm:p-6 lg:p-8">
              <div className="pointer-events-none absolute inset-4 rounded-[24px] border border-[rgba(22,48,48,0.06)]" />
              <ul className="relative grid list-none gap-3">
              {symptoms.map((symptom, index) => {
                const isSelected = selected.includes(index);

                return (
                  <li key={symptom}>
                    <button
                      className={`group flex min-h-[66px] w-full cursor-pointer select-none items-center gap-3.5 rounded-2xl border p-3.5 pr-4 text-left t-body font-medium transition-all duration-200 hover:-translate-y-0.5 hover:border-teal hover:bg-mist/70 hover:shadow-[0_14px_28px_-24px_rgba(18,110,110,0.65)] max-[620px]:min-h-[58px] ${
                      isSelected
                        ? "border-teal bg-mist shadow-[0_14px_28px_-24px_rgba(18,110,110,0.72)]"
                        : "border-[rgba(22,48,48,0.10)] bg-white"
                    }`}
                      onClick={() => toggle(index)}
                      type="button"
                    >
                      <span className="grid h-9 w-9 flex-none place-items-center rounded-xl bg-paper t-small font-semibold text-teal-deep transition-colors duration-200 group-hover:bg-white">
                        {index + 1}
                      </span>
                      <span
                        className={`grid h-7 w-7 flex-none place-items-center rounded-[9px] border-2 transition-all duration-200 ${
                          isSelected
                            ? "scale-100 border-teal bg-teal"
                            : "border-mist-deep bg-white"
                        }`}
                      >
                        <CheckIcon color="#fff" size={14} strokeWidth={3} />
                      </span>
                      <span className="text-ink">{symptom}</span>
                    </button>
                  </li>
                );
              })}
              </ul>
            </div>

            <div className="relative overflow-hidden bg-[linear-gradient(155deg,#126e6e,#0d5252)] p-7 text-white max-[900px]:rounded-none max-[620px]:p-5">
              <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-white/10" />
              <div className="pointer-events-none absolute -bottom-20 left-8 h-44 w-44 rounded-full bg-teal/30 blur-2xl" />

              <div className="sticky top-[0px] text-center max-[900px]:static">
                <div className="mx-auto grid h-[150px] w-[150px] place-items-center rounded-full border border-white/15 bg-white/10 shadow-[inset_0_0_34px_rgba(255,255,255,0.08)] max-[620px]:h-[128px] max-[620px]:w-[128px]">
                  <div className="font-display t-h1 font-semibold leading-none">
                    <span>{selected.length}</span>
                    <small className="t-h4 opacity-70">/6</small>
                  </div>
                </div>
                <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/20">
                  <i
                    className="block h-full rounded-full bg-coral transition-[width] duration-[400ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                    style={{ width: progress }}
                  />
                </div>
                <div className="my-5 min-h-[60px] t-small font-medium text-[#d5f5f5]">
                  {messages[selected.length]}
                </div>
                <a href="#book" className={`${button} w-full`}>
                  Book My Consultation
                </a>
                <div className="mt-3 t-caption opacity-60">
                  Self-check only - not a diagnosis.
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
