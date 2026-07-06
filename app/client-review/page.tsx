"use client";

import Image from "next/image";
import React from 'react'

const Review = () => {
  return (
    <div className="min-h-screen bg-[var(--vk-lime-soft)] text-[var(--vk-green-dark)]">
      <div className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-2xl">
          <div className="w-full overflow-hidden rounded-tl-[36px] rounded-br-[36px] border border-[var(--vk-green)]/10 bg-white/95 p-5 shadow-[0_24px_70px_rgba(18,110,110,0.16)] backdrop-blur sm:p-8 lg:p-10">

            {/* Logo */}
            <div className="mb-6 flex justify-center">
              <Image src="/melogo.png" alt="It's Me & You — Spazio di Cura" width={160} height={60} className="h-12 w-auto" priority />
            </div>

            <div className="mb-9 text-center sm:mb-5">
              <div className="mx-auto mb-3 h-1 w-12 rounded-full bg-[var(--vk-pink)]" />
              <h4 className="font-serif mb-4 t-h1 font-black text-[var(--vk-green-dark)]">
                Click &amp; Review
              </h4>
              <div className="mx-auto mb-4 max-w-lg t-body leading-8 text-gray-600">
                We&apos;d love to hear your feedback!<br />
                Please click any one of the buttons below to share your review.<br />
                A short review of 4 to 5 lines would be greatly appreciated.
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href="https://g.page/r/CYDkmZgU4_5OEBM/review"
                className="w-full rounded-full border-2 border-[var(--vk-pink)] bg-[var(--vk-pink)] px-5 py-3 text-center t-btn font-semibold uppercase tracking-[0.16em] text-white shadow-[0_12px_30px_rgba(18,110,110,0.24)] transition hover:-translate-y-0.5 hover:bg-[var(--vk-pink-dark)]"
              >
                Client Review
              </a>
              <a
                href="/client-feedback"
                className="w-full rounded-full border-2 border-[var(--vk-green)] bg-transparent px-5 py-3 text-center t-btn font-semibold uppercase tracking-[0.16em] text-[var(--vk-green)] transition hover:bg-[var(--vk-green)] hover:text-white"
              >
                Client Feedback
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Review
