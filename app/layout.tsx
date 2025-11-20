import type { Metadata } from "next";
import { Rye } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import CookieBanner from "@/app/components/CookieBanner";

const primaryFont = Rye({
  weight: ["400"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
  preload: true,
  fallback: ["serif"]
});

// Change the title and description to your own.
export const metadata: Metadata = {
  title: "BROTHERHOOD BARBERSHOP",
  description: "Modern barbershop with classic service. Book your next cut or fade today.",
  openGraph: {
    title: "BROTHERHOOD BARBERSHOP",
    description: "Modern barbershop with classic service. Book your next cut or fade today.",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://example.com",
    siteName: "Barbershop",
    images: [
      {
        url: (process.env.NEXT_PUBLIC_BASE_URL || "https://example.com") + "/assets/og-placeholder.svg",
        width: 1200,
        height: 630,
        alt: "Barbershop — Sharp Cuts, Clean Fades"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://example.com"),
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: "/",
    languages: { "en-US": "/" }
  }
};

export default function RootLayout({
  children
}: Readonly<{children: React.ReactNode;}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Your Barbershop Name",
    "image": (process.env.NEXT_PUBLIC_BASE_URL || "https://example.com") + "/brotherhood-white.png",
    "telephone": "+1-895-345-6578",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Placeholder St",
      "addressLocality": "Your City",
      "addressRegion": "ST",
      "postalCode": "00000",
      "addressCountry": "US"
    },
    "geo": { "@type": "GeoCoordinates", "latitude": 0, "longitude": 0 },
    "url": process.env.NEXT_PUBLIC_BASE_URL || "https://example.com",
    "priceRange": "$$",
    "openingHours": [
      "Mo-Fr 09:00-18:00",
      "Sa 10:00-16:00"
    ]
  };

  return (
    <html data-editor-id="app/layout.tsx:27:5" lang="en" className={primaryFont.className} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body data-editor-id="app/layout.tsx:31:7" className="antialiased bg-neutral-950 text-neutral-100" suppressHydrationWarning>
        <script suppressHydrationWarning type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <main data-editor-id="app/layout.tsx:32:9" className="min-h-screen overflow-x-hidden" suppressHydrationWarning>
          <Header brandName="Barbershop" logoSrc="/brotherhood-white.png" />
          {children}
          <Footer address="123 Placeholder St, Your City, ST 00000" phone="+1 (895) 345-6578" email="barbershop@brotherhood.com" />
        </main>
        {process.env.VISUAL_EDITOR_ACTIVE === 'true' &&
        <script data-editor-id="app/layout.tsx:50:9" src="/editor.js" async suppressHydrationWarning />
        }
        {/* Lightweight analytics placeholder (disabled by default) */}
        {false && (
          <script
            data-editor-id="app/layout.tsx:56:11"
            dangerouslySetInnerHTML={{ __html: `/* Add your analytics snippet here when ready */` }}
            suppressHydrationWarning
          />
        )}
        <CookieBanner />
      </body>
    </html>);
}
