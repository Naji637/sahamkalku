import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServiceWorkerRegistration } from "./ServiceWorkerRegistration";

export const metadata: Metadata = {
  title: {
    default: "Kalkulator Saham IDX - Graham Number, Dividen & DCA Indonesia",
    template: "%s | SahamTools",
  },
  description:
    "Kalkulator investasi saham Bursa Efek Indonesia (IDX/BEI) terlengkap untuk menghitung Harga Wajar Graham Number, Dividen Yield & Netto, serta simulasi DCA Average Down dengan format Rupiah presisi.",
  keywords: [
    "kalkulator saham",
    "kalkulator graham number",
    "kalkulator dividen saham",
    "kalkulator dca saham",
    "average down saham",
    "harga wajar saham idx",
    "margin of safety saham",
    "dividen yield ihsg",
    "bursa efek indonesia",
  ],
  authors: [{ name: "SahamTools Research Team" }],
  creator: "SahamTools",
  publisher: "SahamTools",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Kalkulator Saham IDX - Graham Number, Dividen & DCA",
    description:
      "Hitung harga wajar saham Graham Number, dividen yield bersih, dan rata-rata pembelian DCA saham Indonesia secara akurat dan gratis.",
    type: "website",
    locale: "id_ID",
    siteName: "SahamTools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kalkulator Saham IDX - Graham Number, Dividen & DCA",
    description:
      "Hitung harga wajar saham Graham Number, dividen yield bersih, dan rata-rata pembelian DCA saham Indonesia secara akurat dan gratis.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Kalkulator Saham IDX",
  url: "https://sahamtools",
  applicationCategory: "FinanceApplication",
  operatingSystem: "All",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "IDR",
  },
  featureList: [
    "Graham Number Intrinsic Value Calculator",
    "Indonesian Stock Dividend Yield & Tax Calculator",
    "Dollar Cost Averaging (DCA) Multi-Row Lot Calculator",
    "Margin of Safety Analysis for IDX Stocks",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body
        suppressHydrationWarning
        className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-emerald-500 selection:text-white flex flex-col font-sans"
      >
        {/* Next.js Managed AdSense Script */}
        <Script
          id="adsense-script"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />

        {/* Structured Data JSON-LD inside Body */}
        <script
          id="schema-web-app"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdData),
          }}
        />

        <ServiceWorkerRegistration />
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
