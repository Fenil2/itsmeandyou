"use client";

import { useEffect, useState } from "react";
import { button, wrap } from "./styles";

export function StickyBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShow(!entry.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`fixed inset-x-0 bottom-0 z-[70] border-t border-white/10 bg-ink/95 text-white backdrop-blur transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${show ? "translate-y-0" : "translate-y-[110%]"}`}>
      <div className={`${wrap} flex items-center justify-between gap-4 py-[13px]`}>
        <div>
          <span className="block t-caption font-medium text-[#99e6e6] max-[620px]:hidden">Hernia &amp; diastasis consultation - limited weekly slots</span>
        </div>
        <a href="#book" className={`${button} whitespace-nowrap px-7 py-[13px]`}>
          Book My Consultation
        </a>
      </div>
    </div>
  );
}
