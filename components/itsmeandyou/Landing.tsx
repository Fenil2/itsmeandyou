// All booking CTAs point to #book, intercepted by <BookingModal /> (the form
// kept from this project). Styling is Tailwind utilities in each component.
//
// Palette sampled from the "It's Me & You — Spazio di Cura" logo:
//   cream #fbfaf6 · deep teal #17565b · bright teal #40bcb7 / #1c8f88
//   gold #c99a3c · blue #2571b4 · ink #163030

import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { OfferStrip } from "./OfferStrip";
import { Therapists } from "./Therapists";
import { Services } from "./Services";
import { HowItWorks } from "./HowItWorks";
import { Testimonials } from "./Testimonials";
import { FinalCta } from "./FinalCta";
import { SiteFooter } from "./SiteFooter";

export function Landing() {
  return (
    <div className="imy-page overflow-x-hidden bg-[#fbfaf6] font-dmsans text-[#163030] antialiased">
      <Nav />
      <Hero />
      <OfferStrip />
      <Therapists />
      <Services />
      <HowItWorks />
      <Testimonials />
      <FinalCta />
      <SiteFooter />
    </div>
  );
}
