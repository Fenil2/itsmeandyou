// Single source of truth for the bookable services + prices.
// Imported by the booking UI (components/hernia/BookingModal.tsx) AND the
// server (app/api/razorpay/order/route.ts) so the amount charged is validated
// server-side and can never be tampered with from the client.

export type Service = { name: string; price: number; duration: number };

export const CURRENCY = "INR";

export const SERVICES: Service[] = [
  { name: "Anxiety & Stress", price: 249, duration: 30 },
  { name: "Depression", price: 249, duration: 30 },
  { name: "Relationship Issues", price: 249, duration: 30 },
  { name: "Work Stress", price: 249, duration: 30 },
  { name: "Loneliness", price: 249, duration: 30 },
];

export function getServiceByName(name: string): Service | undefined {
  return SERVICES.find((s) => s.name === name);
}
