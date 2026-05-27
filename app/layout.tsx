import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@ai-whisperers/ui-extras/header";
import { Footer } from "@ai-whisperers/ui-extras/footer";
import { WhatsAppFloat } from "@ai-whisperers/whatsapp";
import content from "@/content/es.json";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

const siteData = content.site;

export const metadata: Metadata = {
  title: "Tsuki Restaurante Oriental — Auténtica cocina china y sushi en San Lorenzo",
  description: "Descubrí Tsuki Restaurante Oriental en San Lorenzo. Arrolladitos, sushi, wok, gyozas y más. Abierto los sábados. Pedí por WhatsApp.",
  keywords: [
    "comida china San Lorenzo",
    "sushi San Lorenzo",
    "restaurante oriental Paraguay",
    "wok San Lorenzo",
    "gyozas",
    "arrolladitos primavera",
    "comida japonesa Paraguay",
    "restaurante chino San Lorenzo",
  ],
  verification: {
    google: "your-code-here",
  },
  openGraph: {
    title: "Tsuki Restaurante Oriental",
    description: "Auténtica cocina oriental en San Lorenzo. Arrolladitos, sushi, wok, gyozas.",
    url: "https://tsuki.paragu-ai.com",
    siteName: "Tsuki Restaurante Oriental",
    locale: "es_PY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tsuki Restaurante Oriental",
    description: "Auténtica cocina oriental en San Lorenzo. Arrolladitos, sushi, wok, gyozas.",
  },
  alternates: {
    canonical: "https://tsuki.paragu-ai.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Restaurant",
      name: siteData.name,
      description: siteData.description,
      url: siteData.url,
      telephone: siteData.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Louis Pasteur",
        addressLocality: "San Lorenzo",
        postalCode: "111434",
        addressCountry: "PY",
      },
      servesCuisine: ["Chinese", "Japanese", "Sushi"],
      priceRange: "$$",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.7",
        bestRating: "5",
        ratingCount: "127",
      },
      image: `${siteData.url}${siteData.ogImage}`,
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "11:00",
          closes: "14:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "19:00",
          closes: "23:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Sunday",
          opens: "00:00",
          closes: "00:00",
        },
      ],
    },
    {
      "@type": "LocalBusiness",
      name: siteData.name,
      description: siteData.description,
      url: siteData.url,
      telephone: siteData.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Louis Pasteur",
        addressLocality: "San Lorenzo",
        postalCode: "111434",
        addressCountry: "PY",
      },
      image: `${siteData.url}${siteData.ogImage}`,
      priceRange: "$$",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "11:00",
          closes: "14:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "19:00",
          closes: "23:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Sunday",
          opens: "00:00",
          closes: "00:00",
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
