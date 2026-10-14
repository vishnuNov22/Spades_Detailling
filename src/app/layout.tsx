import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBar } from "@/components/layout/MobileBar";
import { BUSINESS } from "@/config/business";
import { SERVICES } from "@/data/services";

const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const display = Inter_Tight({ subsets: ["latin"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.siteUrl),
  title: { default: `${BUSINESS.fullName} | Car & Bike Detailing in Anducode, Kanyakumari`, template: `%s | ${BUSINESS.name} — The Detailing Xperts` },
  description: BUSINESS.description,
  keywords: ["car detailing Kanyakumari", "car detailing Anducode", "ceramic coating Kanyakumari", "3M underbody coating", "car foam wash", "bike foam wash", "car polishing", "headlight restoration", "interior detailing", "SPADES detailing"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website", locale: "en_IN", siteName: BUSINESS.fullName, title: `${BUSINESS.fullName} — From dust to dazzle`,
    description: BUSINESS.description, images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: BUSINESS.fullName }],
  },
  twitter: { card: "summary_large_image", title: BUSINESS.fullName, description: BUSINESS.description, images: ["/images/og.jpg"] },
};

export const viewport: Viewport = { themeColor: "#0A0A0B", colorScheme: "dark" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoWash",
  name: BUSINESS.legalName,
  description: BUSINESS.description,
  url: BUSINESS.siteUrl,
  image: `${BUSINESS.siteUrl}/images/og.jpg`,
  telephone: BUSINESS.phones[0],
  ...(BUSINESS.email ? { email: BUSINESS.email } : {}),
  address: {
    "@type": "PostalAddress",
    streetAddress: `${BUSINESS.address.line1}, ${BUSINESS.address.locality}`,
    addressLocality: BUSINESS.address.district,
    addressRegion: BUSINESS.address.region,
    postalCode: BUSINESS.address.postalCode,
    addressCountry: BUSINESS.address.country,
  },
  sameAs: [BUSINESS.social.instagram],
  makesOffer: SERVICES.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title }, ...(s.priceFrom ? { priceSpecification: { "@type": "PriceSpecification", minPrice: s.priceFrom, priceCurrency: "INR" } } : {}) })),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-IN" className={`${body.variable} ${display.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <MobileBar />
      </body>
    </html>
  );
}
