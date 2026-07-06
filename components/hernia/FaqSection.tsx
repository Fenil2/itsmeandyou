"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";
import { eyebrow, section, sectionTitle, wrap } from "./styles";

const faqs = [
  [
    "Does a hernia ever heal on its own?",
    "No. A hernia does not resolve by itself, and the discomfort or swelling usually persists. Waiting often makes the condition harder to manage over time - which is why an early, clear assessment matters.",
  ],
  [
    "I am scared of surgery. Is this consultation just a sales pitch for it?",
    "The consultation is about understanding your condition first. Dr. Preethi Mrinalini explains what type of hernia you have and your options in plain language. Surgical guidance is only discussed if it is genuinely the right step for you.",
  ],
  [
    "I think my belly is just post-pregnancy fat. Should I still come?",
    "Possibly yes. Many women assume it is stubborn fat when it is actually diastasis recti - abdominal muscle separation that will not respond to ordinary exercise. The assessment can tell the difference.",
  ],
  [
    "What should I bring to the consultation?",
    "Bring any existing scans, reports, or prescriptions related to your symptoms. They will be reviewed personally as part of your evaluation. If you do not have any, that is completely fine too.",
  ],
  [
    "What is the consultation fee, and what does it include?",
    "It includes a detailed assessment, symptom evaluation, review of your reports and scans, discussion of treatment options, recovery expectations, and surgical guidance if required.",
  ],
  [
    "Can I come for just a second opinion?",
    "Absolutely. Second opinions are welcome. Many patients book specifically to get clarity on advice they have already received elsewhere before making a decision.",
  ],
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className={`${section} bg-white`} id="faq">
      <div className={wrap}>
        <Reveal>
          <div className="text-center">
            <span className={eyebrow}>Common questions</span>
            <h2 className={`${sectionTitle} mx-auto`}>Before you book</h2>
          </div>
          <div className="mx-auto mt-10 grid max-w-[1080px] grid-cols-2 gap-3 max-[900px]:mx-0 max-[900px]:grid-cols-1">
            {faqs.map(([question, answer], index) => (
              <FaqItem
                answer={answer}
                index={index}
                isOpen={openIndex === index}
                key={question}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                question={question}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FaqItem({
  answer,
  index,
  isOpen,
  onClick,
  question,
}: {
  answer: string;
  index: number;
  isOpen: boolean;
  onClick: () => void;
  question: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[16px] transition-all duration-200 ${
        isOpen
          ? "bg-mist shadow-[0_6px_22px_-14px_rgba(18,110,110,0.5)]"
          : "bg-mist/50 hover:bg-mist"
      }`}
    >
      <button
        className="flex w-full cursor-pointer items-start gap-4 border-0 bg-transparent p-6 text-left max-[620px]:p-5"
        onClick={onClick}
      >
        <span className="mt-0.5 min-w-[28px] font-display t-small font-bold leading-none text-teal">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex-1 font-body t-body font-semibold leading-snug text-ink">
          {question}
        </span>
        <svg
          className={`mt-1 h-4 w-4 flex-none text-teal-deep transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          viewBox="0 0 16 16"
        >
          <path d="M3 6l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className="overflow-hidden transition-[max-height] duration-300" style={{ maxHeight: isOpen ? 300 : 0 }}>
        <p className="pb-6 pl-[60px] pr-6 t-small leading-relaxed text-ink-soft max-[620px]:pl-5 max-[620px]:pr-5">{answer}</p>
      </div>
    </div>
  );
}
