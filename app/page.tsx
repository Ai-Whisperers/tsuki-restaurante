import { Metadata } from "next";
import content from "@/content/es.json";
import Hero from "@/components/hero";
import FeaturesSection from "@/components/features-section";
import MenuPreviewSection from "@/components/menu-preview-section";
import CtaBanner from "@/components/cta-banner";

const c = content as any;

export const metadata: Metadata = {
  title: c.home.seo.title,
  description: c.home.seo.description,
};

export default function HomePage() {
  const h = c.home;

  return (
    <>
      <Hero
        eyebrow={h.hero.eyebrow}
        headline={h.hero.headline}
        subheadline={h.hero.subheadline}
        ctaPrimaryText={h.hero.ctaPrimaryText}
        ctaPrimaryHref={h.hero.ctaPrimaryHref}
        ctaSecondaryText={h.hero.ctaSecondaryText}
        ctaSecondaryHref={h.hero.ctaSecondaryHref}
        variant="dark"
      />

      <FeaturesSection
        title={h.features.title}
        subtitle={h.features.subtitle}
        items={h.features.items}
      />

      <MenuPreviewSection
        title={h.menuSection.title}
        description={h.menuSection.description}
        categories={h.menuSection.categories}
      />

      {/* Hours section */}
      <section className="section-padding bg-[var(--color-surface)]">
        <div className="container-page text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-gold mb-4 block">
            Horarios
          </span>
          <h2 className="text-3xl md:text-4xl font-[var(--font-heading)] font-bold text-[var(--color-text)] mb-8">
            {h.hours.title}
          </h2>
          <div className="inline-block max-w-md mx-auto">
            {h.hours.schedule.map((s: { day: string; hours: string }) => (
              <div
                key={s.day}
                className="flex justify-between items-center gap-8 py-3 border-b border-[var(--color-border)] last:border-0"
              >
                <span className="font-semibold text-[var(--color-text)]">
                  {s.day}
                </span>
                <span className="text-[var(--color-text-muted)]">{s.hours}</span>
              </div>
            ))}
          </div>
          {h.hours.note && (
            <p className="mt-6 text-sm text-[var(--color-text-muted)] italic">
              {h.hours.note}
            </p>
          )}
        </div>
      </section>

      <section className="section-padding bg-[var(--color-background)]">
        <div className="container-page text-center">
          <div className="max-w-xl mx-auto">
            <a
              href={`https://wa.me/${c.site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-[var(--color-primary)] text-white font-semibold rounded-xl hover:bg-[var(--color-primary-light)] transition-all text-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                <path d="M9 10a.5.5 0 0 0 0 1" />
                <path d="M14 10a.5.5 0 0 0 0 1" />
                <path d="M9.5 13.5c.5.5 1.5 1 2.5 1s2-.5 2.5-1" />
              </svg>
              Pedí por WhatsApp
            </a>
            <p className="mt-4 text-sm text-[var(--color-text-muted)]">
              Louis Pasteur, San Lorenzo — {c.site.phone}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
