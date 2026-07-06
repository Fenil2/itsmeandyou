"use client";

import { useState } from "react";
import Image from "next/image";

const LINKS = [
  { href: "#therapists", label: "Therapists" },
  { href: "#services", label: "Services" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#testimonials", label: "Reviews" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-[100] border-b border-[rgba(23,86,91,0.12)] bg-[#fbfaf6]/85 backdrop-blur-[16px]">
      <div className="flex items-center justify-between gap-3 px-[clamp(20px,5vw,40px)] py-2.5">
        <a
          href="#"
          className="flex items-center no-underline"
          aria-label="It's Me & You — home"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/melogo.png"
            alt="It's Me & You — Spazio di Cura"
            width={112}
            height={120}
            priority
            className="h-16 w-auto max-sm:h-12"
          />
        </a>

        {/* Desktop / tablet quick links */}
        <div className="hidden items-center gap-[clamp(16px,2.4vw,32px)] md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap t-nav font-medium tracking-[0.01em] text-[#17565b] transition-colors hover:text-[#1c8f88]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#book"
            className="whitespace-nowrap rounded-full bg-[#17565b] px-[clamp(14px,3vw,24px)] py-[9px] t-btn font-medium tracking-[0.03em] text-[#faf7f2] transition-colors hover:bg-[#1c8f88]"
          >
            Book Session
          </a>

          {/* Hamburger — mobile only */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full text-[#17565b] transition-colors hover:bg-[rgba(23,86,91,0.08)] md:hidden"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown panel */}
      <div
        className={`overflow-hidden bg-[#fbfaf6]/95 transition-[max-height] duration-300 ease-out md:hidden ${
          open ? "max-h-80 border-t border-[rgba(23,86,91,0.1)]" : "max-h-0"
        }`}
      >
        <div className="flex flex-col px-[clamp(20px,5vw,40px)] py-1">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-[rgba(23,86,91,0.08)] py-3 t-nav font-medium text-[#17565b] transition-colors last:border-0 hover:text-[#1c8f88]"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
