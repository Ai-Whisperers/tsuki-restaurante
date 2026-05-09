import { Metadata } from "next";
import content from "@/content/es.json";
import MenuPageClient from "./menu-client";

const c = content as any;

export const metadata: Metadata = {
  title: c.menu.seo.title,
  description: c.menu.seo.description,
};

export default function MenuPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-[var(--color-background)] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="container-page text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-gold mb-4 block">
            Sabores que enamoran
          </span>
          <h1 className="text-4xl md:text-5xl font-[var(--font-heading)] font-bold text-[var(--color-text)] mb-4">
            {c.menu.intro.title}
          </h1>
          <p className="text-[var(--color-text-muted)] max-w-lg mx-auto">
            {c.menu.intro.subtitle}
          </p>
        </div>
      </section>

      <MenuPageClient categories={c.menu.categories} whatsapp={c.site.whatsapp} />
    </>
  );
}
