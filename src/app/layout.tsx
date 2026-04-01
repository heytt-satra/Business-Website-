import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono, Geist } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";
import AppShell from "@/components/providers/AppShell";
import { getSiteUrlObject } from "@/lib/site";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-cabinet",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: getSiteUrlObject(),
  title: {
    default: "TeraIndustries - MVPs, SaaS & AI Products That Ship Fast",
    template: "%s | TeraIndustries",
  },
  description:
    "We build MVPs, SaaS platforms, websites, apps, and AI integrations. From idea to deployed product in weeks, not months.",
  icons: {
    icon: "/favicon.png?v=20260305",
    apple: "/favicon.png?v=20260305",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "TeraIndustries",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(spaceGrotesk.variable, inter.variable, jetbrainsMono.variable, "font-sans", geist.variable)}>
      <body className="antialiased">
        <LenisProvider>
          <AppShell>{children}</AppShell>
        </LenisProvider>
      </body>
    </html>
  );
}
