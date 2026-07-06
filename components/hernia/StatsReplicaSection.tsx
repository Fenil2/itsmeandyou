"use client";

import { useEffect, useRef, useState } from "react";
import { section } from "./styles";

const stats = [
  { value: 5000, suffix: "+", label: "Happy Patients" },
  { value: 1000, suffix: "+", label: "Online Appointments" },
  { value: 12, suffix: "+", label: "Years Of Experience" },
  { value: 15, suffix: "+", label: "Doctors and Staff" },
];

export function StatsReplicaSection() {
  return (
    <section className={`bg-[#51bec4] text-white ${section}`}>
      <div className="mx-auto grid max-w-[1440px] grid-cols-4 items-start px-[72px] text-center max-[900px]:grid-cols-2 max-[900px]:gap-y-12 max-[620px]:px-5 max-[620px]:gap-y-9">
        {stats.map((stat) => (
          <StatCounter key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
}

function StatCounter({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setCount(value);
      return;
    }

    let frame = 0;
    let start = 0;
    const duration = 1400;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        function step(timestamp: number) {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);

          setCount(Math.floor(eased * value));

          if (progress < 1) {
            frame = requestAnimationFrame(step);
          } else {
            setCount(value);
          }
        }

        frame = requestAnimationFrame(step);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <div className="min-w-0">
      <div
        className="font-display t-h1 font-semibold leading-none"
        ref={ref}
      >
        {count.toLocaleString("en-IN")}
        {suffix}
      </div>
      <div className="mt-4 font-body t-h5 font-semibold leading-tight max-[620px]:mt-3">
        {label}
      </div>
    </div>
  );
}
