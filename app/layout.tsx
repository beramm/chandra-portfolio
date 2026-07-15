import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Archivo } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://bramchandra.vercel.app",
  ),
  title: {
    default: "Bram Raiskay Chandra — AI Engineer",
    template: "%s — Bram Raiskay Chandra",
  },
  description:
    "AI Engineer in Bali, Indonesia — LLM systems on Gemini, deep learning, computer vision, and full-stack development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SplashScreen />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
          >
            Skip to content
          </a>
          <Nav />
          <div id="main" className="flex-1">
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
