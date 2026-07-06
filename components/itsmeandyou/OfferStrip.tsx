export function OfferStrip() {
  return (
    <section id="book" className="bg-[#f4efe6] px-[clamp(20px,5vw,40px)] py-[clamp(56px,8vw,72px)] text-center text-[#163030]">
      <div className="mb-5 inline-block rounded-full bg-[#e2f4f2] px-4 py-[5px] t-caption font-medium uppercase tracking-[0.08em] text-[#17565b]">
        Special Introductory Offer
      </div>
      <h2 className="mx-auto mb-9 max-w-[640px] font-cormorant t-h2 font-light leading-[1.2] text-[#163030]">
        Your First Session, At An <em className="italic text-[#1c8f88]">Accessible Price</em>
      </h2>
      <div className="mx-auto mb-8 inline-flex flex-wrap items-center justify-center gap-x-5 gap-y-3.5 rounded-[28px] border border-[rgba(64,188,183,0.28)] bg-[#fbfaf6] px-[clamp(24px,5vw,48px)] py-[clamp(20px,4vw,28px)]">
        <span className="t-h4 font-light text-[#9a9a90] line-through">Rs 500</span>
        <span className="t-h5 text-[#1c8f88]">to</span>
        <span className="font-cormorant t-h2 font-semibold text-[#17565b]">
          <sup className="align-top t-h4">Rs</sup>299
        </span>
        <span className="rounded-full bg-[#c99a3c] px-3 py-1 t-caption font-semibold tracking-[0.04em] text-[#163030]">SAVE 40%</span>
      </div>
      <p className="mx-auto max-w-[460px] t-small text-[#5c6b6b]">
        One 45-minute online session with a licensed therapist of your choice · Confidential &amp; secure
      </p>
    </section>
  );
}
