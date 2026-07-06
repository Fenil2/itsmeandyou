"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { SERVICES, CURRENCY, type Service } from "@/lib/services";

/* ─────────────────────────────────────────────────────────────
   "It's Me & You" booking flow — fields taken from the live widget:
   1. Service Selection  (Service + Employee)
   2. Date & Time        (calendar + 30-min slots)
   3. Cart               (summary)
   4. Your Information    (First/Last name, Email, Phone)
   5. Payments           (summary → checkout)
   ───────────────────────────────────────────────────────────── */

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// Monday-first week
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const DAY_NAMES = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
];

const CLINIC = "Agnes Psychological Clinic";

// Keep this list in sync with components/itsmeandyou/Therapists.tsx.
type Employee = { name: string; title: string; image: string; bio?: string };
const EMPLOYEES: Employee[] = [
  { name: "Agnes Punitha", title: "Counselling Psychologist", image: "/punitha.png", bio: "Founder & lead psychologist." },
  { name: "Mumeenul Afrin", title: "Counselling Psychologist", image: "/mumeenul.png" },
  { name: "Sakthi", title: "Counselling Psychologist", image: "/sakthi.jpeg" },
  { name: "Prabu Devan", title: "Counselling Psychologist", image: "/prabu.jpeg" },
  { name: "Shifana Banu", title: "Counselling Psychologist", image: "/shifana.jpeg" },
  { name: "Sunitha", title: "Counselor", image: "/sunitha.png" },
  { name: "Akshaya B", title: "Psychologist", image: "/akshaya.png" },
];

// 30-minute slots, 9:30 AM – 4:00 PM
const TIMES = [
  "9:30 AM - 10:00 AM", "10:00 AM - 10:30 AM",
  "10:30 AM - 11:00 AM", "11:00 AM - 11:30 AM",
  "11:30 AM - 12:00 PM", "12:00 PM - 12:30 PM",
  "12:30 PM - 1:00 PM", "1:00 PM - 1:30 PM",
  "1:30 PM - 2:00 PM", "2:00 PM - 2:30 PM",
  "2:30 PM - 3:00 PM", "3:00 PM - 3:30 PM",
  "3:30 PM - 4:00 PM",
];

function firstWeekday(year: number, month: number) {
  const d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1; // Monday-first offset
}
function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function money(n: number) {
  return `${CURRENCY}${n.toFixed(2)}`;
}

const STEPS = ["service", "datetime", "cart", "info", "payment"] as const;
type Step = (typeof STEPS)[number];

/* ── Razorpay Checkout typings + loader ── */
type RazorpaySuccess = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};
type RazorpayInstance = {
  open: () => void;
  on: (event: string, handler: (resp: { error?: { description?: string } }) => void) => void;
};
type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  order_id: string;
  prefill?: { name?: string; email?: string; contact?: string };
  notes?: Record<string, string>;
  theme?: { color?: string };
  handler: (response: RazorpaySuccess) => void;
  modal?: { ondismiss?: () => void };
};
declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

const RAZORPAY_SCRIPT = "https://checkout.razorpay.com/v1/checkout.js";

function loadRazorpayScript(): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (window.Razorpay) return Promise.resolve(true);
  return new Promise((resolve) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${RAZORPAY_SCRIPT}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve(true), { once: true });
      existing.addEventListener("error", () => resolve(false), { once: true });
      return;
    }
    const s = document.createElement("script");
    s.src = RAZORPAY_SCRIPT;
    s.async = true;
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

/* ── small icons ── */
const Chevron = ({ className = "" }: { className?: string }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 9l6 6 6-6" /></svg>
);
const Back = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
);
const Info = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" strokeLinecap="round" /></svg>
);

export function BookingModal() {
  const router = useRouter();
  const now = new Date();

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("service");

  // step 1
  const [service, setService] = useState<Service | null>(null);
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [employeeOpen, setEmployeeOpen] = useState(false);

  // step 2
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [day, setDay] = useState<number | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [bookedSlots, setBooked] = useState<string[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);

  // step 4
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "" });

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [cartExpanded, setCartExpanded] = useState(true);

  const dropdownWrap = useRef<HTMLDivElement>(null);

  function resetAll() {
    setStep("service");
    setService(null); setEmployee(null);
    setServiceOpen(false); setEmployeeOpen(false);
    setDay(null); setTime(null); setBooked([]); setSlotsLoading(false);
    setYear(now.getFullYear()); setMonth(now.getMonth());
    setForm({ firstName: "", lastName: "", email: "", phone: "" });
    setSubmitting(false); setSubmitError(""); setCartExpanded(true);
  }

  // open on any #book link
  useEffect(() => {
    function handle(e: Event) {
      const link = (e.target as HTMLElement).closest('a[href="#book"]');
      if (!link) return;
      e.preventDefault();
      resetAll();
      setOpen(true);
    }
    document.addEventListener("click", handle);
    return () => document.removeEventListener("click", handle);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [open]);

  // close dropdowns on outside click
  useEffect(() => {
    if (!serviceOpen && !employeeOpen) return;
    function onDoc(e: MouseEvent) {
      if (dropdownWrap.current && !dropdownWrap.current.contains(e.target as Node)) {
        setServiceOpen(false); setEmployeeOpen(false);
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [serviceOpen, employeeOpen]);

  // load booked slots for the selected date
  useEffect(() => {
    if (!day || !open) return;
    const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setSlotsLoading(true);
    fetch(`/api/slots?date=${dateKey}`)
      .then(r => r.json())
      .then(d => setBooked(Array.isArray(d.booked) ? d.booked : []))
      .catch(() => setBooked([]))
      .finally(() => setSlotsLoading(false));
  }, [day, month, year, open]);

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
    setDay(null); setTime(null);
  }
  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
    setDay(null); setTime(null);
  }
  function isAvailable(d: number) {
    const date = new Date(year, month, d);
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const wd = date.getDay();
    return date >= today && wd !== 0 && wd !== 6; // weekdays only
  }
  function isToday(d: number) {
    return year === now.getFullYear() && month === now.getMonth() && d === now.getDate();
  }

  const selDateObj = day ? new Date(year, month, day) : null;
  const selDayName = selDateObj ? DAY_NAMES[selDateObj.getDay()] : "";
  const dateLabel = day ? `${MONTHS[month]} ${day}, ${year}` : "";
  const stepIndex = STEPS.indexOf(step);

  const canContinue =
    step === "service" ? !!service && !!employee :
    step === "datetime" ? !!day && !!time :
    step === "cart" ? true :
    step === "info" ? !!form.firstName.trim() && !!form.lastName.trim() && form.phone.trim().length >= 8 :
    true;

  function goNext() {
    if (step === "service") setStep("datetime");
    else if (step === "datetime") setStep("cart");
    else if (step === "cart") setStep("info");
    else if (step === "info") setStep("payment");
    else if (step === "payment") confirmBooking();
  }
  function goBack() {
    const i = STEPS.indexOf(step);
    if (i > 0) setStep(STEPS[i - 1]);
  }

  // Payment step → create a Razorpay order, open Checkout, then verify + record.
  async function confirmBooking() {
    if (!service || !employee || !day || !time) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      // 1. Create the order server-side (price is validated on the server).
      const orderRes = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceName: service.name }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok || !orderData.success) {
        throw new Error(orderData.error || "Could not start payment. Please try again.");
      }

      // 2. Load the Razorpay Checkout script.
      const ready = await loadRazorpayScript();
      if (!ready || !window.Razorpay) {
        throw new Error("Could not load the payment gateway. Check your connection.");
      }

      // 3. Open Checkout.
      const rzp = new window.Razorpay({
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: CLINIC,
        description: service.name,
        order_id: orderData.orderId,
        prefill: {
          name: `${form.firstName} ${form.lastName}`.trim(),
          email: form.email,
          contact: form.phone,
        },
        notes: { service: service.name, therapist: employee.name },
        theme: { color: "#17565b" },
        handler: (response) => { finalizeBooking(response); },
        modal: {
          ondismiss: () => {
            setSubmitting(false);
            setSubmitError("Payment was cancelled. You can try again.");
          },
        },
      });
      rzp.on("payment.failed", (resp) => {
        setSubmitting(false);
        setSubmitError(resp?.error?.description || "Payment failed. Please try again.");
      });
      rzp.open();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  // After a successful payment: verify the signature server-side, then record
  // the booking and send the user to the thank-you page.
  async function finalizeBooking(payment: RazorpaySuccess) {
    if (!service || !employee || !day || !time) return;
    try {
      const verifyRes = await fetch("/api/razorpay/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payment),
      });
      const verifyData = await verifyRes.json();
      if (!verifyRes.ok || !verifyData.valid) {
        throw new Error("Payment could not be verified. Please contact support.");
      }

      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "ItsMeAndYou-Booking",
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          location: CLINIC,
          dateKey: `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
          appointmentDate: `${selDayName}, ${MONTHS[month]} ${day}, ${year}`,
          appointmentTime: time,
          symptomType: service.name,       // service booked
          hadSurgery: money(service.price), // amount
          prevConsult: employee.name,       // therapist
          pageUrl: window.location.href,
          paymentId: payment.razorpay_payment_id,
          paymentStatus: "Paid",
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      router.push("/thank-you");
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong after payment. Please contact support.",
      );
      setSubmitting(false);
    }
  }

  if (!open) return null;

  const stepTitle =
    step === "service" ? "Service Selection" :
    step === "datetime" ? "Date & Time" :
    step === "cart" ? "Cart" :
    step === "info" ? "Your Information" : "Payments";

  const blanks = firstWeekday(year, month);
  const total = daysInMonth(year, month);

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center bg-[#1c1c1e]/70 p-4 backdrop-blur-[6px] max-[560px]:p-0"
      onClick={(e) => e.target === e.currentTarget && setOpen(false)}
    >
      <div className="relative flex max-h-[92vh] w-full max-w-[540px] flex-col overflow-hidden rounded-[18px] bg-[#f2ede5] shadow-[0_40px_100px_-24px_rgba(28,28,30,0.55)] max-[560px]:h-[100dvh] max-[560px]:max-h-none max-[560px]:rounded-none">

        {/* Header */}
        <div className="flex flex-none items-center gap-3 border-b border-[#e3ddd2] bg-[#faf7f2] px-6 py-4 max-[560px]:px-4">
          {stepIndex > 0 ? (
            <button onClick={goBack} aria-label="Back"
              className="grid h-8 w-8 flex-none cursor-pointer place-items-center rounded-lg border border-[#d9d2c5] bg-white text-[#17565b] transition hover:bg-[#ecf6f4]">
              <Back />
            </button>
          ) : (
            <span className="grid h-8 w-8 flex-none place-items-center rounded-lg bg-[#e2f4f2] text-[#4aa8a1]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="3" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
            </span>
          )}
          <p className="flex-1 font-display t-h5 font-semibold text-[#17565b]">{stepTitle}</p>
          <button onClick={() => setOpen(false)} aria-label="Close"
            className="grid h-8 w-8 flex-none cursor-pointer place-items-center rounded-full text-[#8a8a8a] transition hover:bg-[#e8e2d7] hover:text-[#17565b]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M1 1l12 12M13 1L1 13" /></svg>
          </button>
        </div>

        {/* Progress */}
        <div className="flex flex-none gap-1.5 bg-[#faf7f2] px-6 pb-3 max-[560px]:px-4">
          {STEPS.map((_, i) => (
            <span key={i} className={`h-[3px] flex-1 rounded-full transition-colors ${i <= stepIndex ? "bg-[#17565b]" : "bg-[#d3e4e0]"}`} />
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 max-[560px]:px-4">

          {/* ── STEP 1 — SERVICE + EMPLOYEE ── */}
          {step === "service" && (
            <div ref={dropdownWrap} className="flex flex-col gap-6">
              {/* Service */}
              <div className="relative">
                <p className="mb-2 text-center t-body font-semibold text-[#17565b]">
                  <span className="text-[#c0392b]">*</span> Service:
                </p>
                <button type="button"
                  onClick={() => { setServiceOpen(o => !o); setEmployeeOpen(false); }}
                  className="flex w-full items-center justify-between rounded-[10px] border border-[#c6e4e0] bg-white px-4 py-3 text-left t-body transition focus:outline-none">
                  <span className={service ? "text-[#17565b]" : "text-[#92a5a4]"}>{service ? service.name : "Select Service"}</span>
                  <Chevron className={`text-[#4aa8a1] transition-transform ${serviceOpen ? "rotate-180" : ""}`} />
                </button>
                {serviceOpen && (
                  <div className="absolute z-20 mt-1.5 max-h-[240px] w-full overflow-y-auto rounded-[10px] border border-[#d6e8e5] bg-[#f7f4ee] py-1.5 shadow-[0_18px_40px_-16px_rgba(28,28,30,0.35)]">
                    <p className="px-4 py-2 t-small font-bold text-[#92a5a4]">Category</p>
                    {SERVICES.map(s => (
                      <button key={s.name} type="button"
                        onClick={() => { setService(s); setServiceOpen(false); }}
                        className={`flex w-full items-center justify-between px-4 py-2.5 text-left t-body transition hover:bg-[#e2f4f2]
                          ${service?.name === s.name ? "bg-[#e2f4f2] font-semibold text-[#17565b]" : "text-[#3d5656]"}`}>
                        <span>{s.name}</span>
                        <span className="t-small text-[#a1b7b4]">(1)</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Employee */}
              <div className="relative">
                <p className="mb-2 text-center t-body font-semibold text-[#17565b]">Employee:</p>
                <button type="button"
                  onClick={() => { setEmployeeOpen(o => !o); setServiceOpen(false); }}
                  className="flex w-full items-center justify-between rounded-[10px] border border-[#c6e4e0] bg-white px-4 py-3 text-left t-body transition focus:outline-none">
                  <span className={employee ? "text-[#17565b]" : "text-[#92a5a4]"}>{employee ? employee.name : "Select Employee"}</span>
                  <Chevron className={`text-[#4aa8a1] transition-transform ${employeeOpen ? "rotate-180" : ""}`} />
                </button>
                {employeeOpen && (
                  <div className="absolute z-20 mt-1.5 max-h-[260px] w-full overflow-y-auto rounded-[10px] border border-[#d6e8e5] bg-[#f7f4ee] py-1.5 shadow-[0_18px_40px_-16px_rgba(28,28,30,0.35)]">
                    {EMPLOYEES.map(emp => (
                      <button key={emp.name} type="button"
                        onClick={() => { setEmployee(emp); setEmployeeOpen(false); }}
                        className={`flex w-full items-start gap-3 px-3 py-2.5 text-left transition hover:bg-[#e2f4f2]
                          ${employee?.name === emp.name ? "bg-[#e2f4f2]" : ""}`}>
                        <span className="grid h-9 w-9 flex-none place-items-center overflow-hidden rounded-full bg-[#17565b]">
                          <img src={emp.image} alt={emp.name} className="h-full w-full object-cover" />
                        </span>
                        <span className="flex-1">
                          <span className={`block t-body leading-tight ${employee?.name === emp.name ? "font-semibold text-[#17565b]" : "text-[#17565b]"}`}>{emp.name}</span>
                          {emp.bio
                            ? <span className="mt-0.5 block truncate t-caption text-[#4aa8a1]">{emp.bio}</span>
                            : <span className="mt-0.5 block t-caption text-[#8a8a8a]">{emp.title}</span>}
                        </span>
                        {emp.bio && <span className="mt-0.5 flex-none text-[#92a5a4]"><Info /></span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── STEP 2 — DATE & TIME ── */}
          {step === "datetime" && (
            <div className="flex flex-col gap-5">
              {/* month / year / nav */}
              <div className="flex items-center gap-2">
                <select value={month} onChange={e => { setMonth(Number(e.target.value)); setDay(null); setTime(null); }}
                  className="flex-1 rounded-[8px] border border-[#cfe0dd] bg-white px-3 py-2 t-small text-[#17565b] outline-none">
                  {MONTHS.map((m, i) => <option key={m} value={i}>{m}</option>)}
                </select>
                <select value={year} onChange={e => { setYear(Number(e.target.value)); setDay(null); setTime(null); }}
                  className="w-[110px] rounded-[8px] border border-[#cfe0dd] bg-white px-3 py-2 t-small text-[#17565b] outline-none">
                  {[now.getFullYear(), now.getFullYear() + 1].map(y => <option key={y} value={y}>{y}</option>)}
                </select>
                <button onClick={prevMonth} className="grid h-9 w-9 cursor-pointer place-items-center rounded-[8px] border border-[#cfe0dd] bg-white text-[#17565b] transition hover:bg-[#ecf6f4]">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
                </button>
                <button onClick={nextMonth} className="grid h-9 w-9 cursor-pointer place-items-center rounded-[8px] border border-[#cfe0dd] bg-white text-[#17565b] transition hover:bg-[#ecf6f4]">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
                </button>
              </div>

              <div className="mx-auto rounded-full bg-[#e2f4f2] px-3 py-1 t-caption font-medium text-[#3f6d68]">Asia/Kolkata</div>

              {/* weekday header */}
              <div className="grid grid-cols-7 text-center">
                {DAYS.map(d => <span key={d} className="t-small font-semibold text-[#4aa8a1]">{d}</span>)}
              </div>

              {/* date grid */}
              <div className="grid grid-cols-7 gap-1.5">
                {Array.from({ length: blanks }).map((_, i) => <span key={`b${i}`} />)}
                {Array.from({ length: total }).map((_, i) => {
                  const d = i + 1;
                  const avail = isAvailable(d);
                  const sel = day === d;
                  const today = isToday(d);
                  return (
                    <button key={d} disabled={!avail}
                      onClick={() => { setDay(d); setTime(null); }}
                      className={`relative mx-auto flex h-10 w-full max-w-[46px] items-center justify-center rounded-[8px] border t-small transition
                        ${sel ? "border-[#17565b] bg-[#17565b] font-semibold text-white" : ""}
                        ${avail && !sel ? "cursor-pointer border-[#c6e4e0] bg-white text-[#17565b] hover:bg-[#e2f4f2]" : ""}
                        ${!avail ? "cursor-not-allowed border-transparent bg-[#ece7dd] text-[#c3c0b6]" : ""}`}>
                      {d}
                      {today && !sel && <span className="absolute right-1.5 top-1.5 h-1 w-1 rounded-full bg-[#4aa8a1]" />}
                    </button>
                  );
                })}
              </div>

              {/* time slots */}
              {day && (
                <div className="border-t border-[#e3ddd2] pt-5">
                  <p className="mb-4 text-center t-body font-semibold text-[#17565b]">
                    {dateLabel}{time ? ` - ${time.split(" - ")[0]}` : ""}
                  </p>
                  {slotsLoading ? (
                    <p className="py-4 text-center t-small text-[#92a5a4]">Checking availability…</p>
                  ) : (
                    <div className="grid grid-cols-2 gap-2.5">
                      {TIMES.map((t, i) => {
                        const isBooked = bookedSlots.includes(t);
                        const sel = time === t;
                        const last = i === TIMES.length - 1;
                        return (
                          <button key={t} disabled={isBooked}
                            onClick={() => setTime(t)}
                            className={`rounded-[8px] border px-2 py-2.5 t-small font-medium transition ${last ? "col-span-2 mx-auto w-1/2 max-[560px]:w-full" : ""}
                              ${isBooked ? "cursor-not-allowed border-[#e3ddd2] bg-[#ece7dd] text-[#c3c0b6]" : ""}
                              ${sel ? "border-[#0f4245] bg-[#0f4245] text-white" : ""}
                              ${!isBooked && !sel ? "cursor-pointer border-[#c6e4e0] bg-[#ecf6f4] text-[#1c8f88] hover:border-[#1c8f88]" : ""}`}>
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ── STEP 3 — CART ── */}
          {step === "cart" && service && (
            <div className="flex flex-col gap-4">
              <p className="text-center t-small leading-relaxed text-[#4a5f5f]">
                You can find below the appointment you selected for booking.
              </p>

              <div className="rounded-[12px] border border-[#e0dacd] bg-[#faf7f2] p-4">
                <button onClick={() => setCartExpanded(v => !v)}
                  className="flex w-full items-center gap-3 text-left">
                  <span className="grid h-11 w-11 flex-none place-items-center rounded-[10px] bg-[#17565b] t-h5 font-semibold text-[#faf7f2]">
                    {service.name[0]}
                  </span>
                  <span className="flex-1 t-h6 font-semibold text-[#17565b]">{service.name}</span>
                  <span className="rounded-full bg-[#e2f4f2] px-3 py-1 t-small font-semibold text-[#1c8f88]">{money(service.price)}</span>
                  <Chevron className={`text-[#92a5a4] transition-transform ${cartExpanded ? "rotate-180" : ""}`} />
                </button>

                {cartExpanded && (
                  <div className="mt-4 border-t border-[#e8e2d7] pt-4">
                    <p className="mb-2 text-center t-caption font-semibold uppercase tracking-wide text-[#92a5a4]">Service</p>
                    <div className="flex justify-between t-small text-[#3d5656]">
                      <span>{service.name} ({money(service.price)}) x 1 person</span>
                      <span>{money(service.price)}</span>
                    </div>
                    <div className="mt-2 flex justify-between t-small font-semibold text-[#17565b]">
                      <span>Service Subtotal</span><span>{money(service.price)}</span>
                    </div>
                    <div className="my-3 border-t border-dashed border-[#d9d2c5]" />
                    <div className="flex justify-between t-small font-bold text-[#17565b]">
                      <span>Total Price</span><span>{money(service.price)}</span>
                    </div>

                    <div className="mt-4 rounded-[10px] bg-[#ecf6f4] p-3.5">
                      <p className="mb-2 text-center t-caption font-semibold uppercase tracking-wide text-[#92a5a4]">Info</p>
                      <div className="grid grid-cols-2 gap-y-2 t-caption text-[#3d5656]">
                        <span>📅 {dateLabel}</span>
                        <span>🕐 {time}</span>
                        <span>👤 {employee?.name}</span>
                        <span>⏱ {service.duration}min</span>
                        <span>📍 {CLINIC}</span>
                        <span>👥 1 / 1</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => { setStep("service"); }}
                className="flex items-center gap-2 self-start rounded-full t-small font-semibold text-[#1c8f88]">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-[#e2f4f2] text-[#1c8f88]">+</span>
                Book another
              </button>
            </div>
          )}

          {/* ── STEP 4 — YOUR INFORMATION ── */}
          {step === "info" && (
            <form className="flex flex-col gap-5" onSubmit={e => { e.preventDefault(); if (canContinue) goNext(); }}>
              <div className="grid grid-cols-2 gap-4 max-[440px]:grid-cols-1">
                <div>
                  <label className="mb-1.5 block text-center t-small font-semibold text-[#17565b]">
                    <span className="text-[#c0392b]">*</span> First Name:
                  </label>
                  <input required value={form.firstName}
                    onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                    className="w-full rounded-[8px] border border-[#c6e4e0] bg-white px-3.5 py-2.5 t-small text-[#17565b] outline-none transition focus:border-[#1c8f88]" />
                </div>
                <div>
                  <label className="mb-1.5 block text-center t-small font-semibold text-[#17565b]">
                    <span className="text-[#c0392b]">*</span> Last Name:
                  </label>
                  <input required value={form.lastName}
                    onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                    className="w-full rounded-[8px] border border-[#c6e4e0] bg-white px-3.5 py-2.5 t-small text-[#17565b] outline-none transition focus:border-[#1c8f88]" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 max-[440px]:grid-cols-1">
                <div>
                  <label className="mb-1.5 block text-center t-small font-semibold text-[#17565b]">Email:</label>
                  <input type="email" placeholder="you@email.com" value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full rounded-[8px] border border-[#c6e4e0] bg-white px-3.5 py-2.5 t-small text-[#17565b] outline-none transition placeholder:text-[#a9bdbb] focus:border-[#1c8f88]" />
                </div>
                <div>
                  <label className="mb-1.5 block text-center t-small font-semibold text-[#17565b]">Phone:</label>
                  <div className="flex overflow-hidden rounded-[8px] border border-[#c6e4e0] bg-white transition focus-within:border-[#1c8f88]">
                    <span className="flex items-center gap-1 border-r border-[#e0dacd] px-2.5 t-small text-[#3d5656]">🇮🇳 <Chevron className="text-[#92a5a4]" /></span>
                    <input type="tel" placeholder="Enter phone" value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      className="flex-1 bg-transparent px-3 py-2.5 t-small text-[#17565b] outline-none placeholder:text-[#a9bdbb]" />
                  </div>
                </div>
              </div>
            </form>
          )}

          {/* ── STEP 5 — PAYMENTS ── */}
          {step === "payment" && service && (
            <div className="flex flex-col gap-5">
              <p className="text-center t-h6 font-semibold text-[#17565b]">Summary</p>
              <div className="rounded-[12px] border border-[#e0dacd] bg-[#faf7f2] p-5">
                <div className="rounded-[10px] border border-[#e8e2d7] p-4">
                  <p className="mb-2 text-center t-caption font-semibold uppercase tracking-wide text-[#92a5a4]">Services</p>
                  <div className="flex justify-between t-small font-medium text-[#17565b]">
                    <span>{service.name} ({money(service.price)}) x 1 person</span>
                    <span>{money(service.price)}</span>
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-2">
                  <div className="flex justify-between t-small font-semibold text-[#17565b]"><span>Total Amount:</span><span>{money(service.price)}</span></div>
                  <div className="flex justify-between t-small font-semibold text-[#17565b]"><span>Paying now:</span><span>{money(service.price)}</span></div>
                  <div className="flex justify-between t-small font-semibold text-[#17565b]"><span>Paying later:</span><span>{money(0)}</span></div>
                </div>
              </div>
              <p className="text-center t-small text-[#92a5a4]">You will be redirected to the payment checkout.</p>
              {submitError && (
                <p className="rounded-lg bg-red-50 px-3 py-2.5 text-center t-small font-medium text-red-600">{submitError}</p>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-none items-center justify-end gap-3 border-t border-[#e3ddd2] bg-[#faf7f2] px-6 py-4 max-[560px]:px-4">
          <button
            disabled={!canContinue || submitting}
            onClick={goNext}
            className="rounded-[8px] bg-[#17565b] px-8 py-3 t-btn font-semibold text-[#faf7f2] transition enabled:hover:bg-[#133038] disabled:cursor-not-allowed disabled:opacity-45">
            {step === "payment"
              ? (submitting ? "Processing…" : service ? `Pay ${money(service.price)}` : "Pay")
              : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
