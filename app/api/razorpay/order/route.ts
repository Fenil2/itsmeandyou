import { NextRequest, NextResponse } from "next/server";
import { getServiceByName } from "@/lib/services";
import { createRazorpayOrder, isRazorpayConfigured, razorpayKeyId } from "@/lib/razorpay";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    if (!isRazorpayConfigured()) {
      return NextResponse.json(
        { success: false, error: "Payments are not configured" },
        { status: 503 },
      );
    }

    const body = await req.json().catch(() => ({}));
    const service = getServiceByName(String(body?.serviceName ?? ""));
    if (!service) {
      return NextResponse.json(
        { success: false, error: "Unknown service" },
        { status: 400 },
      );
    }

    // Price comes from the server-side catalog, never from the client.
    const order = await createRazorpayOrder({
      amount: Math.round(service.price * 100), // paise
      currency: "INR",
      receipt: `imy_${Date.now()}`,
      notes: { service: service.name },
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: razorpayKeyId(),
    });
  } catch (err) {
    console.error("Razorpay order error:", err);
    return NextResponse.json(
      { success: false, error: "Could not create payment order" },
      { status: 500 },
    );
  }
}
