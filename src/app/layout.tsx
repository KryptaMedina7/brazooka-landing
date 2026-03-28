import type { Metadata } from "next";
import { Bodoni_Moda, Jost } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import "./globals.css";

const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni-moda",
  subsets: ["latin"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://brazookaspa.cl"),
  title: "Importadora Brazooka SPA | Selección Premium",
  description: "Curaduría en vaporizadores, backwoods y accesorios de alta gama. Stock garantizado, atención directa y envíos seguros a todo Chile.",
  openGraph: {
    title: "Importadora Brazooka SPA | Selección Premium",
    description: "Curaduría en vaporizadores, backwoods y accesorios de alta gama. Stock garantizado, atención directa y envíos seguros a todo Chile.",
    url: "https://brazookaspa.cl/", 
    siteName: "Brazooka SPA",
    images: [
      {
        url: "/og-image.jpeg",
        width: 1200,
        height: 630,
        alt: "Brazooka Premium Products",
      },
    ],
    locale: "es_CL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Brazooka SPA",
    "image": "https://brazookaspa.cl/logo_brazooka.png",
    "@id": "https://brazookaspa.cl/",
    "url": "https://brazookaspa.cl/",
    "telephone": "",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Santiago",
      "addressRegion": "RM",
      "addressCountry": "CL"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
      ],
      "opens": "10:00",
      "closes": "19:00"
    },
    "sameAs": [
      "https://instagram.com/importadorabrazooka_"
    ]
  };

  return (
    <html lang="es" className={`${bodoniModa.variable} ${jost.variable}`}>
      <body>
        {/* Inyectamos JSON-LD para SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main>{children}</main>
          <Footer />
          <FloatingCTA />
        </CartProvider>
      </body>
    </html>
  );
}
