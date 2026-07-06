import SupportNavbar from "@/app/SupportNavbar";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — It's Me & You",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#fbfaf6] text-[#163030]">
      <SupportNavbar />
      <div className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">

          <div className="rounded-[24px] border border-[#126e6e]/10 bg-white p-8 shadow-[0_24px_70px_rgba(18,110,110,0.10)] sm:p-12">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-[#ec5a38]" />
              <h1 className="t-h1 font-bold text-[#163030]">Privacy Policy</h1>
              <p className="mt-2 t-small text-[#7a9898]">Last updated: June 2025</p>
            </div>

            <div className="space-y-6 t-body leading-7 text-[#4a6060]">
              <section>
                <h2 className="mb-2 t-h4 font-bold text-[#126e6e]">1. Information We Collect</h2>
                <p>When you submit a consultation request on this website, we collect your name, phone number, and the health concern you have shared. We may also collect your IP address and browser information automatically through standard web technologies.</p>
              </section>
              <section>
                <h2 className="mb-2 t-h4 font-bold text-[#126e6e]">2. How We Use Your Information</h2>
                <p>The information you provide is used solely to contact you regarding your consultation request and to assist in scheduling your appointment with our medical team. We do not use your personal information for marketing purposes without your explicit consent.</p>
              </section>
              <section>
                <h2 className="mb-2 t-h4 font-bold text-[#126e6e]">3. Data Sharing</h2>
                <p>We do not sell, trade, or otherwise transfer your personal information to third parties. Your data may be shared with our scheduling and CRM systems only to facilitate your consultation. These systems are bound by confidentiality obligations.</p>
              </section>
              <section>
                <h2 className="mb-2 t-h4 font-bold text-[#126e6e]">4. Data Security</h2>
                <p>We implement industry-standard security measures to protect your personal data. All form submissions are transmitted over HTTPS. However, no method of transmission over the internet is 100% secure.</p>
              </section>
              <section>
                <h2 className="mb-2 t-h4 font-bold text-[#126e6e]">5. Cookies &amp; Tracking</h2>
                <p>This website uses cookies and similar tracking technologies (Google Analytics, Google Ads, Facebook Pixel, Microsoft Clarity) to understand how visitors use our site and to improve our services. You can disable cookies in your browser settings at any time.</p>
              </section>
              <section>
                <h2 className="mb-2 t-h4 font-bold text-[#126e6e]">6. Your Rights</h2>
                <p>You have the right to request access to, correction of, or deletion of your personal information. To exercise these rights, please contact us using the details listed on our website.</p>
              </section>
              <section>
                <h2 className="mb-2 t-h4 font-bold text-[#126e6e]">7. Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact Marina&apos;s Clinic at the phone number or address listed on our website.</p>
              </section>
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/"
                className="inline-block rounded-full bg-[#126e6e] px-8 py-3 t-btn font-bold uppercase tracking-[0.14em] text-white shadow-[0_8px_24px_rgba(18,110,110,0.28)] transition hover:-translate-y-0.5 hover:bg-[#0d5252]"
              >
                Back to Home
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
