import { Metadata } from "next";
import content from "@/content/es.json";
import OrderPageClient from "./order-client";

const c = content as any;

export const metadata: Metadata = {
  title: c.order.seo.title,
  description: c.order.seo.description,
};

export default function OrderPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-8 md:pb-16 bg-[var(--color-background)] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="container-page text-center">
          <h1 className="text-3xl md:text-5xl font-[var(--font-heading)] font-bold text-[var(--color-text)] mb-4">
            {c.order.hero.title}
          </h1>
          <p className="text-[var(--color-text-muted)] max-w-lg mx-auto">
            {c.order.hero.subtitle}
          </p>
        </div>
      </section>

      <OrderPageClient
        categories={c.menu.categories}
        whatsapp={c.site.whatsapp}
        cta={c.order.cta}
      />
    </>
  );
}
