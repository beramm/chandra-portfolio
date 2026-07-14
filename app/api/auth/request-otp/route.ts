import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { countRecentOtpRequests, createOtpCode } from "@/lib/db";
import { sendOtpEmail } from "@/lib/email";

const OTP_TTL_MINUTES = 10;
const MAX_REQUESTS_PER_HOUR = 5;

export async function POST(req: Request) {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  let email: unknown;
  try {
    ({ email } = await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Generic response regardless of whether the email matches, to avoid
  // confirming which address is the admin.
  const genericOk = NextResponse.json({ ok: true });

  if (
    typeof email !== "string" ||
    email.trim().toLowerCase() !== adminEmail.trim().toLowerCase()
  ) {
    return genericOk;
  }

  const recent = await countRecentOtpRequests(adminEmail, 60);
  if (recent >= MAX_REQUESTS_PER_HOUR) {
    return NextResponse.json(
      { error: "Too many requests. Try again later." },
      { status: 429 },
    );
  }

  const code = crypto.randomInt(0, 1_000_000).toString().padStart(6, "0");
  const expiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000);

  await createOtpCode(adminEmail, code, expiresAt);
  await sendOtpEmail(adminEmail, code);

  return genericOk;
}
