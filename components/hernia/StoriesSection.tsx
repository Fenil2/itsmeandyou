"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";
import { eyebrow, section, sectionTitle, shadowSoft, wrap } from "./styles";

const stories = [
  // {
  //   src: "https://res.cloudinary.com/dthj7fakc/video/upload/v1781681469/Postpartum_weight_gain_100__normal_️_WATCH_FULLY__._._.__Laparoscopy__Surgeon__Doctor__Pregnancy__Women_MP4_wfpgnl.mp4",
  //   caption: "Postpartum weight gain — is it always fat?",
  // },
  {
    src: "https://res.cloudinary.com/dthj7fakc/video/upload/v1781681467/A_lot_of_moms_tell_me_the_same_thing____I_still_look_pregnant..._even_years_after_delivery.___And_many_assume_it_s_just_stubborn_fat.__But_sometimes__the_rea_w2fn73.mp4",
    caption: '"I still look pregnant... even years after delivery."',
  },
  {
    src: "https://res.cloudinary.com/dthj7fakc/video/upload/v1781681467/Most_people_think_every_tummy_bulge_is_fat._But_sometimes__it_could_be_something_entirely_different._A_hernia_is_a_weakness_in_the_abdominal_wall_that_allow_gfuapm.mp4",
    caption: "Not every tummy bulge is fat — it could be a hernia.",
  },
  // {
  //   src: "https://ik.imagekit.io/tpucbav8z/marinias1_squished.mp4",
  //   caption: "Patient story: hernia care and recovery.",
  // },
  // {
  //   src: "https://ik.imagekit.io/tpucbav8z/output%201hernia_squished.mp4",
  //   caption: "Hernia treatment journey and results.",
  // },
];

function ArrowLeft() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 6 15 12 9 18" />
    </svg>
  );
}

export function StoriesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const storyVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileStoryPlaying, setMobileStoryPlaying] = useState(false);
  const shouldCenterStories = stories.length < 3;
  const showStoryArrows = stories.length > 2;

  function isMobileStoriesScreen() {
    return typeof window !== "undefined" && window.matchMedia("(max-width: 620px)").matches;
  }

  function getVisibleCount() {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth < 621) return 1;
    if (window.innerWidth < 900) return 2;
    return 3;
  }

  function getStep() {
    const el = scrollRef.current;
    const first = el?.children[0] as HTMLElement | undefined;
    const second = el?.children[1] as HTMLElement | undefined;
    if (!first) return 0;
    return second ? second.offsetLeft - first.offsetLeft : first.offsetWidth;
  }

  function handleScroll() {
    const el = scrollRef.current;
    if (!el) return;
    if (isMobileStoriesScreen() && mobileStoryPlaying) return;
    const index = Math.round(el.scrollLeft / (el.scrollWidth / stories.length));
    setActiveIndex(Math.min(index, stories.length - 1));
  }

  function goTo(index: number) {
    const el = scrollRef.current;
    if (!el) return;
    if (isMobileStoriesScreen() && mobileStoryPlaying) return;
    const maxIndex = Math.max(0, stories.length - getVisibleCount());
    const nextIndex = Math.max(0, Math.min(index, maxIndex));
    el.scrollTo({ left: getStep() * nextIndex, behavior: "smooth" });
    setActiveIndex(nextIndex);
  }

  function handleStoryPlay(index: number) {
    if (!isMobileStoriesScreen()) return;

    storyVideoRefs.current.forEach((video, videoIndex) => {
      if (video && videoIndex !== index) video.pause();
    });

    setActiveIndex(index);
    setMobileStoryPlaying(true);
  }

  function handleStoryStop() {
    if (!isMobileStoriesScreen()) return;
    setMobileStoryPlaying(false);
  }

  function moveStories(direction: "prev" | "next") {
    const visibleCount = getVisibleCount();
    const maxIndex = Math.max(0, stories.length - visibleCount);
    const nextIndex =
      direction === "next"
        ? activeIndex >= maxIndex
          ? 0
          : activeIndex + 1
        : activeIndex <= 0
          ? maxIndex
          : activeIndex - 1;
    goTo(nextIndex);
  }

  useEffect(() => {
    if (window.matchMedia("(max-width: 620px)").matches) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => {
        if (isMobileStoriesScreen() && mobileStoryPlaying) return current;

        const visibleCount = getVisibleCount();
        const maxIndex = Math.max(0, stories.length - visibleCount);
        const nextIndex = current >= maxIndex ? 0 : current + 1;
        scrollRef.current?.scrollTo({
          left: getStep() * nextIndex,
          behavior: "smooth",
        });
        return nextIndex;
      });
    }, 4500);

    return () => window.clearInterval(timer);
  }, [mobileStoryPlaying]);

  return (
    <section
      className={`${section} relative isolate overflow-hidden bg-white before:absolute before:left-[-14%] before:top-20 before:-z-10 before:h-[340px] before:w-[340px] before:rounded-full before:bg-mist before:blur-3xl before:content-[''] after:absolute after:bottom-[-18%] after:right-[-10%] after:-z-10 after:h-[420px] after:w-[420px] after:rounded-full after:bg-teal/10 after:blur-3xl after:content-['']`}
      id="stories"
    >
      <div className={wrap}>
        <Reveal>
          <span className={eyebrow}>What Doctor Say</span>
           <h2 className={sectionTitle}>
            Quick videos. Clear answers. Better decisions.
          </h2> 
          <div className="relative mt-[34px]">
            {showStoryArrows && (
              <button
                className="absolute left-0 top-1/2 z-[2] grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-[rgba(22,48,48,0.12)] bg-white text-teal-deep shadow-[0_12px_30px_rgba(22,48,48,0.14)] transition-colors hover:border-teal hover:bg-mist max-[620px]:hidden"
                onClick={() => moveStories("prev")}
                aria-label="Previous video"
              >
                <ArrowLeft />
              </button>
            )}
            <div className={`flex gap-[18px] overflow-hidden scroll-smooth max-[900px]:gap-4 max-[620px]:max-w-full max-[620px]:snap-x max-[620px]:flex-row max-[620px]:gap-3.5 ${mobileStoryPlaying ? "max-[620px]:overflow-hidden" : "max-[620px]:overflow-x-auto"} max-[620px]:pb-2.5 max-[620px]:[scrollbar-width:none] max-[620px]:[&::-webkit-scrollbar]:hidden ${shouldCenterStories ? "min-[621px]:justify-center" : ""}`} ref={scrollRef} onScroll={handleScroll}>
              {stories.map(({ src }, i) => (
                <div className={`${shadowSoft} group relative aspect-[9/13] flex-[0_0_calc((100%_-_36px)/3)] cursor-pointer overflow-hidden rounded-[18px] border border-white/10 bg-[linear-gradient(160deg,#126e6e,#42c8c8)] transition-transform duration-200 hover:-translate-y-1 max-[900px]:flex-[0_0_calc((100%_-_16px)/2)] max-[620px]:flex-[0_0_82%] max-[620px]:snap-start`} key={src}>
                  <video
                    ref={(video) => {
                      storyVideoRefs.current[i] = video;
                    }}
                    src={src}
                    controls
                    playsInline
                    className="absolute inset-0 h-full w-full rounded-[inherit] object-cover"
                    onPlay={() => handleStoryPlay(i)}
                    onPause={handleStoryStop}
                    onEnded={handleStoryStop}
                  />
                  <div className="pointer-events-none absolute left-3.5 top-3.5 flex h-6 w-6 items-center justify-center rounded-full bg-white/15 t-caption font-bold text-white backdrop-blur-sm">
                    {i + 1}
                  </div>
                </div>
              ))}
            </div>
            {showStoryArrows && (
              <button
                className="absolute right-0 top-1/2 z-[2] grid h-11 w-11 translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-[rgba(22,48,48,0.12)] bg-white text-teal-deep shadow-[0_12px_30px_rgba(22,48,48,0.14)] transition-colors hover:border-teal hover:bg-mist max-[620px]:hidden"
                onClick={() => moveStories("next")}
                aria-label="Next video"
              >
                <ArrowRight />
              </button>
            )}
          </div>
          <div className="mt-[18px] hidden justify-center gap-2.5 max-[620px]:flex">
            {stories.map((_, i) => (
              <button
                key={i}
                className={`h-2 w-2 cursor-pointer rounded-full border-0 p-0 transition-[background,transform] duration-200 ${
                  i === activeIndex
                    ? "scale-[1.4] bg-teal"
                    : "bg-[rgba(22,48,48,0.12)]"
                }`}
                onClick={() => goTo(i)}
                aria-label={`Go to video ${i + 1}`}
              />
            ))}
          </div>
          <div className="mx-auto mt-7 flex max-w-[625px] items-center gap-4 rounded-[18px] border border-teal/15 bg-mist/70 px-5 py-3 text-left max-[760px]:gap-2.5 max-[760px]:px-3.5 max-[760px]:py-2.5">
            <p className="min-w-0 flex-1 t-small font-semibold leading-[1.45] text-ink">
              For the full video and more doctor guidance, watch it on Instagram.
            </p>
            <a
              href="https://www.instagram.com/dr.preethimrinalini?igsh=YWkzdmlsc3l0aWF5"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-full bg-teal-deep px-4 py-2.5 t-caption font-extrabold leading-none text-white transition-colors hover:bg-teal max-[760px]:px-3 max-[760px]:py-2"
            >
              View full video
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
