import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navigation from "@/components/Navigation";
import { Footer } from "@/components/Shell";
import { siteUrl } from "@/lib/content";
import { MotionProvider } from "@/components/Motion";
import "./globals.css";
const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(
    siteUrl || "https://tera-industries-frontiers.dotingpecan4.chatgpt.site",
  ),
  title: {
    default: "TERA INDUSTRIES. Engineering the Next Era of Civilization",
    template: "%s | TERA INDUSTRIES",
  },
  description:
    "Explore the connected frontiers of intelligence, energy, matter, life, and space. A fictional, concept-stage industrial research vision.",
  icons: { icon: "/icon.svg" },
  openGraph: {
    siteName: "TERA INDUSTRIES",
    type: "website",
    images: ["/media/social.jpg"],
  },
  twitter: { card: "summary_large_image", images: ["/media/social.jpg"] },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={body.variable}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <MotionProvider>
          <Navigation />
          <main id="main">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
