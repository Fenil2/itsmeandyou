"use client";

import Image from "next/image";
import Link from "next/link";

export default function SupportNavbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#126e6e]/10 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-2 sm:px-6 sm:py-3">

        {/* Logo */}
        <Link href="/" className="flex items-center no-underline">
          <Image
            src="/melogo.png"
            alt="It's Me & You — Spazio di Cura"
            width={180}
            height={60}
            priority
            className="h-12 w-auto sm:h-16"
          />
        </Link>

        {/* CTA Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-[#126e6e] px-4 py-2 t-btn font-bold uppercase tracking-[0.14em] text-white shadow-[0_6px_20px_rgba(18,110,110,0.28)] transition hover:-translate-y-0.5 hover:bg-[#0d5252] sm:px-6 sm:py-2.5"
        >
          <span className="hidden sm:inline">Book Consultation</span>
          <span className="sm:hidden">Book Now</span>
        </Link>

      </div>
    </nav>
  );
}
