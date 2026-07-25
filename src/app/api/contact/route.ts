import { NextResponse } from "next/server";
import { Resend } from "resend";
import { EMAIL } from "@/lib/data";
import { rateLimit, clientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("❌ RESEND_API_KEY is missing");

    return NextResponse.json(
      { error: "RESEND_API_KEY is missing." },
      { status: 500 }
    );
  }

  // Rate limit: max 3 requests/minute/IP
  const rl = rateLimit(`contact:${clientIp(req)}`, 3, 60_000);

  if (!rl.ok) {
    return NextResponse.json(
      {
        error: "Too many requests. Please wait a moment.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rl.retryAfter),
        },
      }
    );
  }

  let data: Record<string, unknown>;

  try {
    data = await req.json();
  } catch (err) {
    console.error("Invalid JSON:", err);

    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  const subject = String(data.subject ?? "").trim();
  const message = String(data.message ?? "").trim();
  const visitorType = String(data.visitorType ?? "").trim();
  const honeypot = String(data.company ?? "").trim();

  // Honeypot
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { error: "All fields are required." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Invalid email address." },
      { status: 400 }
    );
  }

  if (visitorType && !["recruiter", "client", "collaborator", "other"].includes(visitorType)) {
    return NextResponse.json(
      { error: "Invalid visitor type." },
      { status: 400 }
    );
  }

  if (
    name.length > 200 ||
    subject.length > 300 ||
    message.length > 5000
  ) {
    return NextResponse.json(
      { error: "Input too long." },
      { status: 400 }
    );
  }

  const resend = new Resend(apiKey);

  try {
    const result = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: EMAIL,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: `
        <h2>New Portfolio Contact</h2>

        <p><strong>Name:</strong> ${esc(name)}</p>
        <p><strong>Email:</strong> ${esc(email)}</p>
        <p><strong>Subject:</strong> ${esc(subject)}</p>
        ${visitorType ? `<p><strong>Contacting as:</strong> ${esc(visitorType)}</p>` : ""}

        <hr>

        <p style="white-space:pre-wrap">${esc(message)}</p>
      `,
    });

    console.log("========== RESEND RESPONSE ==========");
    console.dir(result, { depth: null });
    console.log("=====================================");

    if (result.error) {
      console.error("Resend returned an error:");
      console.dir(result.error, { depth: null });

      return NextResponse.json(
        {
          error: result.error.message,
          resend: result.error,
        },
        { status: 500 }
      );
    }

    console.log("Email sent successfully:", result.data);

    return NextResponse.json({
      ok: true,
      id: result.data?.id,
    });
  } catch (err) {
    console.error("========== RESEND EXCEPTION ==========");
    console.error(err);
    console.log("======================================");

    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
