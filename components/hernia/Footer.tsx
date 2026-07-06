import Image from "next/image";
import { button, wrap } from "./styles";

export function Footer() {
  return (
    <footer className="bg-ink pb-[120px] pt-12 t-small text-[#9ecece] max-[620px]:pb-20 max-[620px]:pt-9">
      <div className={wrap}>
        <div className="mb-6 flex flex-wrap items-start justify-between gap-6 border-b border-white/10 pb-[26px]">
          <div className="flex items-center gap-[11px] font-bold">
            <div className="inline-flex items-center rounded-[10px] bg-white px-2.5 py-1.5">
              <Image
                src="/melogo.png"
                alt="It's Me & You — Spazio di Cura"
                width={120}
                height={48}
                style={{ objectFit: "contain" }}
              />
            </div>
            <small className="block t-caption font-medium tracking-[0.04em] text-[#9ecece]">Advanced Laparoscopic &amp; Hernia Surgeon</small>
          </div>
          <div className="flex max-w-[360px] flex-col items-start gap-3 text-left sm:items-end sm:text-right">
            <address className="not-italic leading-[1.7] text-[#b5e8e8]">
              40 &amp; 54, Josier St, Nungambakkam, Chennai 600034
            </address>
            <a
              href="tel:+919884000171"
              className="font-semibold text-white transition-colors hover:text-[#99e6e6]"
            >
              +91 98840 00171
            </a>
            <a href="#book" className={`${button} px-[22px] py-[11px] t-btn`}>
              Book Consultation
            </a>
          </div>
        </div>
        <p className="max-w-[80ch] leading-[1.7] text-[#7ab8b8] [&_b]:text-[#b5e8e8]">
          <b>Medical disclaimer:</b> This page is for general information and to
          help you book a consultation. It is not medical advice, diagnosis, or
          treatment, and the symptom self-check is not a diagnostic tool.
          Outcomes, benefits, and recovery vary from person to person. Always
          consult a qualified medical professional regarding your individual
          condition. Replace all placeholder figures, images, and videos with
          verified content before publishing.
        </p>
        <p className="mt-3.5 max-w-[80ch] leading-[1.7] text-[#7ab8b8]">
          Copyright 2026 Dr.Preethi Mrinalini. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
