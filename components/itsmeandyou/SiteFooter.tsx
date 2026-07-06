import Image from "next/image";

export function SiteFooter() {
  return (
    <>
      <footer className="grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] items-start gap-8 bg-[#17565b] px-[clamp(20px,5vw,40px)] pb-8 pt-12">
        <div>
          <div className="mb-4 inline-flex items-center rounded-[14px] bg-white px-3 py-2.5">
            <Image
              src="/melogo.png"
              alt="It's Me & You — Spazio di Cura"
              width={96}
              height={103}
              className="h-14 w-auto"
            />
          </div>
          <p className="max-w-[260px] t-small leading-[1.6] text-[rgba(250,247,242,0.55)] max-sm:max-w-none">
            A calm and compassionate space dedicated to emotional wellness, healing and personal growth.
          </p>
        </div>
        <div>
          <ul className="list-none">
            {[
              { href: "#book", label: "Book a Session" },
              { href: "#therapists", label: "Our Therapists" },
              { href: "#services", label: "Services" },
              { href: "https://itsmeandyou.in/contact/", label: "Contact Us" },
            ].map((l) => (
              <li key={l.label} className="mb-2.5">
                <a href={l.href} className="t-small text-[rgba(250,247,242,0.7)] transition-colors hover:text-[#8fd6d0]">{l.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="t-small leading-[1.9] text-[rgba(250,247,242,0.6)]">
          contact@itsmeandyou.in<br />
          Emotional Wellness Support<br />
          Safe · Compassionate · Confidential
        </div>
      </footer>
      <div className="border-t border-[rgba(143,214,208,0.18)] bg-[#123f43] px-[clamp(20px,5vw,40px)] py-4 text-center t-caption text-[rgba(250,247,242,0.45)]">
        © 2026 It&apos;s Me &amp; You — All Rights Reserved ·{" "}
        <a href="https://itsmeandyou.in" className="text-[#8fd6d0]">itsmeandyou.in</a>
      </div>
    </>
  );
}
