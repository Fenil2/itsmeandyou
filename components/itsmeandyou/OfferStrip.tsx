export function OfferStrip() {
  return (
    <section id="book" className="bg-[#f4efe6] px-[clamp(20px,5vw,40px)] py-[clamp(56px,8vw,72px)] text-center">
      <div className="mb-5 inline-block rounded-full bg-[#e2f4f2] px-4 py-[5px] t-caption font-medium uppercase tracking-[0.08em] text-[#17565b]">
        Special Introductory Offer
      </div>
      <h2 className="mx-auto mb-9 max-w-[640px] font-cormorant t-h2 font-light leading-[1.2] text-[#163030]">
        Your First Session, At An <em className="italic text-[#1c8f88]">Accessible Price</em>
      </h2>
      
      <div className="mx-auto mb-8 inline-flex flex-wrap items-center justify-center gap-3 rounded-full border border-[rgba(64,188,183,0.2)] bg-white px-8 py-3 shadow-[0_4px_20px_rgba(23,86,91,0.06)]">
        {/* Price */}
        <span className="flex items-baseline gap-1">
          <span className="text-sm font-medium text-[#8a9694]">₹</span>
          <span className="text-3xl font-bold text-[#17565b]">299</span>
        </span>
        
        {/* Dot separator */}
        <span className="h-1.5 w-1.5 rounded-full bg-[#40bcb7]"></span>
        
        {/* Original price */}
        <span className="text-base font-light text-[#9a9a90] line-through">₹500</span>
        
        {/* Dot separator */}
        <span className="h-1.5 w-1.5 rounded-full bg-[#40bcb7]"></span>
        
        {/* Save Badge */}
        <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#c99a3c] to-[#e3c079] px-4 py-1 text-sm font-bold text-[#163030]">
          <span>🔥</span>
          40% OFF
        </span>
      </div>
      
      <p className="mx-auto max-w-[460px] t-small text-[#5c6b6b]">
        One 45-minute online session with a licensed therapist of your choice · Confidential &amp; secure
      </p>
    </section>
  );
}