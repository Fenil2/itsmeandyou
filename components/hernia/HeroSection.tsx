"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon } from "./Icons";
import { button, wrap } from "./styles";

const SYMPTOM_VIDEO =
  "https://res.cloudinary.com/daclbrdse/video/upload/v1782801995/output_1hernia_squished_vmlaw3.mp4";

const BG_IMAGES = [
  "https://ik.imagekit.io/tpucbav8z/images1.jpg",
  "https://ik.imagekit.io/tpucbav8z/images2.jpg",
];

function VideoModal({ onClose }: { onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center gap-3 bg-[rgba(10,40,40,0.88)] p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        className="flex cursor-pointer items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[13px] font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
        onClick={onClose}
        aria-label="Close"
      >
        <svg viewBox="0 0 14 14" width={12} height={12} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
          <path d="M1 1l12 12M13 1L1 13" />
        </svg>
        Close
      </button>
      <div
        className="w-full max-w-[520px] overflow-hidden rounded-2xl shadow-[0_40px_100px_-20px_rgba(10,40,40,0.9)]"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={videoRef}
          src={SYMPTOM_VIDEO}
          controls
          autoPlay
          playsInline
          className="block max-h-[calc(90vh-80px)] w-full object-contain"
        />
      </div>
    </div>
  );
}

export function HeroSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);
  const [tick, setTick] = useState(0);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  const bgIndex = tick % BG_IMAGES.length;

  const toggleHeroVideo = () => {
    const video = heroVideoRef.current;

    if (!video) return;

    if (video.paused) {
      void video.play();
      setPaused(false);
      return;
    }

    video.pause();
    setPaused(true);
  };

  useEffect(() => {
    const t = setInterval(() => setTick(n => n + 1), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <section
        className="relative isolate overflow-hidden py-5 max-[900px]:py-5 max-[620px]:py-10"
        id="hero"
      >
        {/* ── Background slideshow ── */}
        <div className="absolute inset-0 -z-20 overflow-hidden">
          {BG_IMAGES.map((src, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-opacity duration-[1600ms] ease-in-out"
              style={{ opacity: i === bgIndex ? 1 : 0 }}
            >
              <div
                key={i === bgIndex ? `active-${tick}` : `idle-${i}`}
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${src})`,
                  animation: i === bgIndex
                    ? `${tick % 2 === 0 ? "kenburns-in" : "kenburns-out"} 6s ease-in-out forwards`
                    : "none",
                }}
              />
            </div>
          ))}
          {/* Light paper overlay — keeps dark text readable */}
          <div className="absolute inset-0 bg-[rgba(251,250,246,0.82)]" />
          {/* Subtle teal tint right side */}
          <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(251,250,246,0.15)_0%,rgba(18,110,110,0.06)_100%)]" />
        </div>

        <div className={`${wrap} grid grid-cols-2 items-center gap-14 max-[900px]:grid-cols-1 max-[900px]:gap-5`}>

          {/* ── Left text wrapper ──
              Desktop : flex column (badge+h1 on top, para+CTAs+trust below)
              Mobile  : display:contents → children become direct grid items
                        so we can reorder them with CSS order              */}
          <div className="flex flex-col items-start max-[900px]:contents">

            {/* ① Badge + Headline — mobile order 1 */}
            <div className="flex flex-col items-start max-[900px]:order-1 max-[900px]:w-full">
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[rgba(66,200,200,0.18)] bg-white px-4 py-2 text-[12.5px] font-bold tracking-[0.04em] text-teal-deep shadow-[0_8px_24px_-16px_rgba(18,110,110,0.5)] max-[620px]:mb-4 max-[620px]:text-[11.5px]">
                <span className="h-2 w-2 animate-[pulse-dot_2s_infinite] rounded-full bg-coral" />
                Watch before you decide what to do
              </span>
              <h1 className="mb-5 text-[clamp(30px,3.5vw,52px)] font-semibold leading-[1.06] text-ink [text-wrap:balance] max-[620px]:mb-3 max-[620px]:text-[clamp(26px,7vw,36px)]">
                Living with a Hernia is a choice you are making{" "}
                <em className="not-italic text-coral-deep">Every Single Day.</em>
              </h1>
            </div>

            {/* ③ Description + CTAs + Trust — mobile order 3 */}
            <div className="flex flex-col items-start max-[900px]:order-3 max-[900px]:w-full max-[900px]:pt-3">
              <p className="mb-8 max-w-[46ch] text-[clamp(14.5px,1.05vw,16.5px)] leading-[1.75] text-ink-soft max-[620px]:mb-6 max-[620px]:text-[14.5px]">
                The bulge, the heaviness, the pull when you lift or cough — most
                people wait months hoping it fades. It does not. A short, honest
                assessment tells you exactly what you are dealing with and what
                your real options are.
              </p>

              <div className="mb-6 flex flex-wrap items-center gap-3 max-[620px]:w-full max-[620px]:flex-col max-[620px]:gap-2.5">
                <a href="#book" className={`${button} max-[620px]:w-full max-[620px]:justify-center`}>
                  Book My Consultation
                </a>
                <button
                  className="inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-full border border-[rgba(18,110,110,0.2)] bg-transparent px-6 py-[15px] text-base font-bold text-teal-deep transition-all duration-200 hover:-translate-y-0.5 hover:border-[#126e6e] hover:bg-[#f0fafa] active:translate-y-0 max-[620px]:w-full max-[620px]:py-3 max-[620px]:text-sm"
                  onClick={() => setModalOpen(true)}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M10 8l6 4-6 4V8z" fill="currentColor" stroke="none" />
                  </svg>
                  Watch Video
                </button>
              </div>

              <div className="flex flex-wrap gap-2.5 text-[12.5px] font-semibold text-ink-soft max-[620px]:text-xs">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(22,48,48,0.09)] bg-white px-3 py-1.5 shadow-[0_4px_14px_-8px_rgba(18,110,110,0.3)]">
                  <CheckIcon color="#42c8c8" size={14} /> Minimally invasive approach
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(22,48,48,0.09)] bg-white px-3 py-1.5 shadow-[0_4px_14px_-8px_rgba(18,110,110,0.3)]">
                  <CheckIcon color="#42c8c8" size={14} /> Reports reviewed personally
                </span>
              </div>
            </div>
          </div>

          {/* ── ② Video — mobile order 2 (appears between title and description) ── */}
          <div className="w-full max-[900px]:order-2">
            <div
              className="relative overflow-hidden rounded-2xl bg-[#0d1f1f] shadow-[0_32px_80px_-24px_rgba(10,40,40,0.55)] ring-1 ring-white/10"
              style={{ aspectRatio: "16/9" }}
            >
              <video
                ref={heroVideoRef}
                src={SYMPTOM_VIDEO}
                autoPlay
                muted={muted}
                loop
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
                onPlay={() => setPaused(false)}
                onPause={() => setPaused(true)}
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(13,31,31,0.18)_0%,transparent_30%)]" />
              <button
                type="button"
                aria-label={paused ? "Play video" : "Pause video"}
                onClick={toggleHeroVideo}
                className="absolute inset-0 cursor-pointer border-0 bg-transparent p-0"
              />
              <button
                type="button"
                aria-label={muted ? "Unmute video" : "Mute video"}
                onClick={() => setMuted((current) => !current)}
                className="absolute bottom-3 right-3 z-10 flex cursor-pointer items-center gap-1.5 rounded-full border-0 bg-black/40 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-sm transition-colors hover:bg-black/55"
              >
                {muted ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6"/>
                  </svg>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 5L6 9H2v6h4l5 4V5z" />
                    <path d="M15.5 8.5a5 5 0 0 1 0 7" />
                    <path d="M18.5 5.5a9 9 0 0 1 0 13" />
                  </svg>
                )}
                {muted ? "" : ""}
              </button>
              {paused && (
                <div className="pointer-events-none absolute left-3 top-3 rounded-full px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-sm">
                  {/* Paused */}
                </div>
              )}
            </div>
            <div className="mt-3 flex items-center gap-2 text-[12.5px] text-ink-soft">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#42c8c8" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
              </svg>
              <span>2 min · Understanding your hernia — a quick watch before you decide</span>
            </div>
          </div>

        </div>
      </section>

      {modalOpen && <VideoModal onClose={() => setModalOpen(false)} />}
    </>
  );
}
