import { NextRequest, NextResponse } from "next/server";
import { verifyRazorpaySignature } from "@/lib/razorpay";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const orderId = String(body?.razorpay_order_id ?? "");
    const paymentId = String(body?.razorpay_payment_id ?? "");
    const signature = String(body?.razorpay_signature ?? "");

    if (!orderId || !paymentId || !signature) {
      return NextResponse.json(
        { success: false, valid: false, error: "Missing payment fields" },
        { status: 400 },
      );
    }

    const valid = verifyRazorpaySignature({ orderId, paymentId, signature });
    if (!valid) {
      return NextResponse.json(
        { success: false, valid: false, error: "Signature verification failed" },
        { status: 400 },
      );
    }

    return NextResponse.json({ success: true, valid: true, paymentId });
  } catch (err) {
    console.error("Razorpay verify error:", err);
    return NextResponse.json(
      { success: false, valid: false, error: "Verification error" },
      { status: 500 },
    );
  }
}
