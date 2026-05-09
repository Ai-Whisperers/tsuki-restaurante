import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsAppFloat from "@/components/whatsapp-float";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Tsuki Restaurante Oriental — Auténtica cocina china y sushi en San Lorenzo",
  description: "Descubrí Tsuki Restaurante Oriental en San Lorenzo. Arrolladitos, sushi, wok, gyozas y más. Abierto los sábados. Pedí por WhatsApp.",
  openGraph: {
    title: "Tsuki Restaurante Oriental",
    description: "Auténtica cocina oriental en San Lorenzo. Arrolladitos, sushi, wok, gyozas.",
    url: "https://tsuki.paragu-ai.com",
    siteName: "Tsuki Restaurante Oriental",
    locale: "es_PY",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
