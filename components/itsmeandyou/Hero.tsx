"use client";

import { useEffect, useRef } from "react";

const TRUST = [
  { num: "50+", label: "Therapists Across India" },
  { num: "1000+", label: "Sessions Completed" },
  { num: "4.9+", label: "Client Rating" },
];

const btnPrimary =
  "inline-block cursor-pointer rounded-full bg-[#17565b] px-9 py-[15px] text-center t-btn font-medium tracking-[0.02em] text-[#faf7f2] transition hover:-translate-y-px hover:bg-[#1c8f88] max-sm:basis-full";
const btnGhost =
  "inline-block cursor-pointer rounded-full border border-[rgba(23,86,91,0.28)] bg-transparent px-9 py-[15px] text-center t-btn text-[#17565b] transition hover:-translate-y-px hover:border-[#1c8f88] hover:text-[#1c8f88] max-sm:basis-full";

export function Hero() {
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  useEffect(() => {
    const unmute = () => {
      videoRefs.current.forEach((video) => {
        if (!video) return;
        video.muted = false;
        video.volume = 1;
        void video.play();
      });
      removeListeners();
    };

    const events = ["pointerdown", "keydown", "touchstart", "scroll"] as const;
    const removeListeners = () => {
      events.forEach((evt) => window.removeEventListener(evt, unmute));
    };

    // Try to autoplay with sound immediately. Browsers only allow this when the
    // user has already engaged with the site; otherwise the promise rejects and
    // we fall back to unmuting on the first interaction.
    let unmutedAutoplayWorked = false;
    Promise.all(
      videoRefs.current.map((video) => {
        if (!video) return Promise.resolve();
        video.muted = false;
        video.volume = 1;
        return video.play();
      }),
    )
      .then(() => {
        unmutedAutoplayWorked = true;
      })
      .catch(() => {
        // Blocked by autoplay policy: re-mute so the video at least plays,
        // then wait for a user gesture to turn the sound on.
        videoRefs.current.forEach((video) => {
          if (!video) return;
          video.muted = true;
          void video.play();
        });
        if (!unmutedAutoplayWorked) {
          events.forEach((evt) =>
            window.addEventListener(evt, unmute, { once: true, passive: true }),
          );
        }
      });

    return removeListeners;
  }, []);

  return (
    <section className="relative grid min-h-[100svh] place-items-center overflow-hidden bg-[#fbfaf6] px-[clamp(20px,5vw,40px)] pb-[clamp(56px,9vw,80px)] pt-[clamp(100px,16vw,128px)]">
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-12 lg:grid-cols-2">
        {/* Left Content */}
        <div className="text-center lg:text-left">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[rgba(28,143,136,0.3)] bg-[rgba(64,188,183,0.12)] px-[18px] py-1.5 t-caption font-medium uppercase tracking-[0.08em] text-[#17565b]">
            Online Therapy &amp; Counselling · India
          </div>
          
          <h1 className="mb-7 max-w-[820px] font-cormorant t-h1 font-light leading-[1.12] tracking-[-0.01em] text-[#163030] mx-auto lg:mx-0">
            A Gentle Space For <em className="italic text-[#1c8f88]">Healing</em> &amp; Inner Peace
          </h1>
          
          <p className="mb-8 max-w-[520px] t-body font-light leading-[1.7] text-[#5c6b6b] mx-auto lg:mx-0">
            Professional therapy and emotional support designed to help you heal, grow and
            rediscover balance through compassionate care.
          </p>

          {/* Video - visible on mobile only */}
          <div className="mb-8 flex items-center justify-center lg:hidden">
            <div className="w-full max-w-[400px] overflow-hidden rounded-2xl shadow-[0_20px_60px_-20px_rgba(23,86,91,0.4)]">
              <video
                ref={(el) => {
                  videoRefs.current[0] = el;
                }}
                src="/itsvideo.mp4"
                className="h-full w-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                controls
                poster="/images/hero-poster.jpg"
              >
                <source src="/itsvideo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 lg:justify-start max-sm:mx-auto max-sm:w-full max-sm:max-w-[340px]">
            <a href="#book" className={btnPrimary}>Book at Rs 299</a>
            <a href="#therapists" className={btnGhost}>Meet Our Therapists</a>
          </div>
          
          <div className="mt-4 flex flex-wrap justify-center gap-x-10 gap-y-6 lg:justify-start max-[380px]:gap-x-6">
            {TRUST.map((t) => (
              <div className="flex flex-col items-center gap-1" key={t.label}>
                <span className="font-cormorant t-h3 font-semibold text-[#b0821f]">{t.num}</span>
                <span className="t-caption uppercase tracking-[0.04em] text-[#7c8a89]">{t.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Video - visible on desktop only */}
        <div className="relative hidden items-center justify-center lg:flex">
          <div className="w-full max-w-[560px] overflow-hidden rounded-2xl shadow-[0_20px_60px_-20px_rgba(23,86,91,0.4)]">
            <video
              ref={(el) => {
                videoRefs.current[1] = el;
              }}
              src="https://res.cloudinary.com/dvj4ktxgl/video/upload/v1783771781/vslits_n3laze.mp4"
              className="h-full w-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              controls
              poster="/images/hero-poster.jpg"
            >
              <source src="https://res.cloudinary.com/dvj4ktxgl/video/upload/v1783771781/vslits_n3laze.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}