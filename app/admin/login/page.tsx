"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function requestCode(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Failed to send code");
      }
      setStep("code");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function verifyCode(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Verification failed");
      }
      router.push("/admin/projects");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-lg border border-border bg-card p-6">
        <h1 className="font-heading text-xl font-bold tracking-tight">
          Admin login
        </h1>

        {step === "email" ? (
          <form onSubmit={requestCode} className="mt-4 space-y-3">
            <label className="block text-sm text-muted-foreground">
              Admin email
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded border border-border bg-background px-3 py-2 text-foreground outline-none focus:border-accent"
                placeholder="you@example.com"
              />
            </label>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-accent px-3 py-2 text-sm font-medium text-on-accent transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Sending…" : "Send code"}
            </button>
          </form>
        ) : (
          <form onSubmit={verifyCode} className="mt-4 space-y-3">
            <p className="text-sm text-muted-foreground">
              A 6-digit code was sent to your email.
            </p>
            <input
              inputMode="numeric"
              pattern="\d{6}"
              maxLength={6}
              required
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              className="w-full rounded border border-border bg-background px-3 py-2 text-center text-lg tracking-[0.5em] text-foreground outline-none focus:border-accent"
              placeholder="••••••"
            />
            <button
              type="submit"
              disabled={loading || code.length !== 6}
              className="w-full rounded-full bg-accent px-3 py-2 text-sm font-medium text-on-accent transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Verifying…" : "Verify"}
            </button>
            <button
              type="button"
              onClick={() => setStep("email")}
              className="w-full text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Use a different email / resend
            </button>
          </form>
        )}

        {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
      </div>
    </main>
  );
}
