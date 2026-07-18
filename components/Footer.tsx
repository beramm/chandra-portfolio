"use client";

import { usePathname } from "next/navigation";

const socials = [
  { href: "https://github.com/beramm", label: "GitHub" },
  { href: "https://www.linkedin.com/in/bram-raiskay-chandra-454580246/", label: "LinkedIn" },
  { href: "mailto:bramraysky232@gmail.com", label: "Email" },
];

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-muted-foreground sm:flex-row">
        <p>Bram Raiskay Chandra</p>
        <div className="flex gap-4">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="transition-colors hover:text-foreground"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
