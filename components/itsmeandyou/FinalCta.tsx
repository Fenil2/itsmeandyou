export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-[#e9f5f3] bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(64,188,183,0.18)_0%,transparent_70%)] px-[clamp(20px,5vw,40px)] py-[clamp(60px,9vw,96px)] text-center">
      <h2 className="mx-auto mb-4 max-w-[600px] font-cormorant t-h2 font-light leading-[1.2] text-[#163030]">
        You Deserve <em className="italic text-[#1c8f88]">Peace</em>
      </h2>
      <p className="mb-9 t-body text-[#5c6b6b]">Your healing journey starts with one small, brave step.</p>
      <div className="mb-8 flex items-baseline justify-center gap-2.5">
        <span className="t-body text-[#9a9a90] line-through">Rs 700</span>
        <span className="font-cormorant t-h2 text-[#17565b]">Rs 299</span>
      </div>
      <a
        href="#book"
        className="inline-block cursor-pointer rounded-full bg-[#17565b] px-10 py-4 text-center t-btn font-medium tracking-[0.02em] text-[#faf7f2] transition hover:-translate-y-px hover:bg-[#1c8f88]"
      >
        Book Your Session Now
      </a>
    </section>
  );
}
