const MAILERSEND_API_URL = "https://api.mailersend.com/v1/email";

export async function sendOtpEmail(to: string, code: string): Promise<void> {
  const token = process.env.MAILERSEND_API_TOKEN;
  const fromEmail = process.env.MAILERSEND_FROM_EMAIL;
  if (!token) throw new Error("MAILERSEND_API_TOKEN is not set");
  if (!fromEmail) throw new Error("MAILERSEND_FROM_EMAIL is not set");

  const res = await fetch(MAILERSEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: { email: fromEmail, name: "Portfolio Admin" },
      to: [{ email: to }],
      subject: "Your portfolio admin login code",
      text: `Your one-time login code is ${code}. It expires in 10 minutes. If you didn't request this, ignore this email.`,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`MailerSend error ${res.status}: ${body}`);
  }
}
