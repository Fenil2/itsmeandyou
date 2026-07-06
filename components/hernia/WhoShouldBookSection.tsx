"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "./Reveal";
import { eyebrow, section, sectionTitle, wrap } from "./styles";

const cards = [
  ["+", "You have hernia symptoms", "A bulge, heaviness, or pain you have been brushing off."],
  ["Rx", "You were advised surgery", "And you want to truly understand it before deciding."],
  ["W", "You have diastasis recti signs", "Especially women after pregnancy with a bulge that stayed."],
  ["2nd", "You want a second opinion", "A fresh, specialist perspective on what you have been told."],
  ["?", "You want clarity first", "Answers before any treatment decision - no pressure."],
  ["Now", "You have been waiting too long", "Ready to stop hoping it will fade and actually find out."],
];

export function WhoShouldBookSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const rafRef = useRef<number>(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const mq = window.matchMedia("(max-width: 900px)");

    function tick() {
      if (!pausedRef.current) {
        posRef.current += 0.6;
        const half = track!.scrollWidth / 2;
        if (half > 0 && posRef.current >= half) posRef.current = 0;
        track!.style.transform = `translateX(-${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    function start() {
      posRef.current = 0;
      track!.style.transform = "translateX(0)";
      rafRef.current = requestAnimationFrame(tick);
    }

    function stop() {
      cancelAnimationFrame(rafRef.current);
    }

    const parent = track.parentElement!;
    const pause = () => { pausedRef.current = true; };
    const resume = () => { pausedRef.current = false; };
    parent.addEventListener("mouseenter", pause);
    parent.addEventListener("touchstart", pause, { passive: true });
    parent.addEventListener("mouseleave", resume);
    parent.addEventListener("touchend", resume);

    if (mq.matches) start();
    mq.addEventListener("change", (e) => (e.matches ? start() : stop()));

    return () => {
      stop();
      parent.removeEventListener("mouseenter", pause);
      parent.removeEventListener("touchstart", pause);
      parent.removeEventListener("mouseleave", resume);
      parent.removeEventListener("touchend", resume);
    };
  }, []);

  return (
    <section className={`${section} bg-paper`} id="who">
      <div className={wrap}>
        <Reveal>
          {/* Header */}
          <div className="grid grid-cols-2 items-end gap-10 max-[900px]:grid-cols-1 max-[900px]:gap-3">
            <div>
              <span className={eyebrow}>Who should book this</span>
              <h2 className={sectionTitle}>This consultation is for you if...</h2>
            </div>
          </div>

          {/* Desktop: bento grid — row pattern narrow|wide, wide|narrow, narrow|wide */}
          <div className="mt-8 grid grid-cols-3 gap-3.5 max-[900px]:hidden">
            {cards.map(([icon, title, copy], i) => {
              const wide = [1, 2, 5].includes(i);
              return (
                <div
                  className={`${wide ? "col-span-2" : "col-span-1"} ${i % 2 === 0 ? "bg-white" : "bg-mist"} flex flex-col justify-between rounded-[20px] p-6`}
                  key={title}
                >
                  <div>
                    <span className="inline-flex items-center rounded-full bg-[rgba(18,110,110,0.10)] px-3 py-1 t-caption font-bold text-teal">
                      {icon}
                    </span>
                    <b className={`mt-4 block font-semibold leading-snug text-ink ${wide ? "t-h5" : "t-h6"}`}>
                      {title}
                    </b>
                    <p className="mt-1.5 t-small leading-relaxed text-ink-soft">{copy}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>

      {/* Mobile + tablet: JS-driven marquee */}
      <div className="mt-7 hidden overflow-hidden max-[900px]:block">
        <div className="flex w-max gap-3.5 will-change-transform" ref={trackRef}>
          {[...cards, ...cards].map(([icon, title, copy], i) => (
            <div className="w-60 flex-none rounded-2xl border border-[rgba(22,48,48,0.12)] bg-white px-[22px] py-6 max-[620px]:px-4 max-[620px]:py-[18px]" key={i}>
              <span className="mb-3 inline-flex items-center rounded-full bg-[rgba(18,110,110,0.10)] px-3 py-1 t-caption font-bold text-teal">
                {icon}
              </span>
              <b className="mb-1 mt-3 block t-h6 font-semibold">{title}</b>
              <p className="t-small text-ink-soft">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
