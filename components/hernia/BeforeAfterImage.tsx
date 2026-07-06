"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Reveal } from "./Reveal";
import { eyebrow, section, sectionTitle, shadowCard, wrap } from "./styles";

const beforeAfterImages = [
  {
    src: "/bfaf-8.png",
    alt: "Hernia care before and after image 1",
  },
  {
    src: "/bfaf.png",
    alt: "Hernia care before and after image 2",
  },
  {
    src: "https://res.cloudinary.com/daclbrdse/image/upload/v1782805703/5_vcpte1.png",
    alt: "Hernia care before and after image 3",
  },
];

export function BeforeAfterImage() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % beforeAfterImages.length);
    }, 7000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className={`${section} bg-paper`} id="before-after-images">
      <div className={wrap}>
        <Reveal>
          <div className="text-center">
            <span className={`${eyebrow} justify-center`}>Patients Share &amp; Their Journey</span>
            <h2 className={`${sectionTitle} mx-auto`}>A clearer view of real hernia outcomes.</h2>
            <p className="mx-auto mt-4 max-w-[62ch] t-body leading-[1.7] text-ink-soft">
              See the visual results in a clean, easy-to-compare format.
            </p>
          </div>

          <div className="mt-9 flex justify-center gap-5 max-[760px]:hidden">
            {beforeAfterImages.map((image, index) => (
              <div
                className={`${shadowCard} w-full max-w-[360px] overflow-hidden rounded-[20px] border border-white/80 bg-white p-2.5`}
                key={image.src}
              >
                <div className="relative aspect-[5/5] overflow-hidden rounded-[14px] bg-mist">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 1080px) 33vw, 340px"
                    className="object-cover transition-transform duration-300 hover:scale-[1.03]"
                    priority={index === 0}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className={`${shadowCard} mt-8 hidden overflow-hidden rounded-[22px] border border-white/80 bg-white p-2.5 max-[760px]:block`}>
            <div className="overflow-hidden rounded-[16px] bg-mist">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {beforeAfterImages.map((image, index) => (
                  <div className="relative aspect-[5/5] min-w-full overflow-hidden" key={image.src}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="100vw"
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 px-1.5 pb-1 pt-3">
              <p className="t-small font-semibold text-teal-deep">
                Image {activeIndex + 1} of {beforeAfterImages.length}
              </p>
              <div className="flex gap-2">
                {beforeAfterImages.map((image, index) => (
                  <button
                    key={image.src}
                    type="button"
                    className={`h-2.5 cursor-pointer rounded-full border-0 p-0 transition-all duration-200 ${
                      index === activeIndex ? "w-8 bg-teal" : "w-2.5 bg-ink/15 hover:bg-teal/60"
                    }`}
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Show before and after image ${index + 1}`}
                    aria-current={index === activeIndex}
                  />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
