import { Metadata } from "next";
import content from "@/content/es.json";

const c = content as any;

export const metadata: Metadata = {
  title: c.about.seo.title,
  description: c.about.seo.description,
};

export default function AboutPage() {
  const a = c.about;
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-[var(--color-background)] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="container-page text-center">
          <h1 className="text-4xl md:text-5xl font-[var(--font-heading)] font-bold text-[var(--color-text)] mb-4">
            {a.hero.title}
          </h1>
          <p className="text-[var(--color-text-muted)]">{a.hero.subtitle}</p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-[var(--color-surface)]">
        <div className="container-page max-w-3xl">
          <div className="space-y-6 text-[var(--color-text-light)] leading-relaxed">
            {a.story.map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-[var(--color-background)]">
        <div className="container-page">
          <h2 className="text-2xl md:text-3xl font-[var(--font-heading)] font-bold text-center text-[var(--color-text)] mb-12">
            Nuestros valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {a.values.map((v: { title: string; description: string }) => (
              <div
                key={v.title}
                className="p-6 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-center"
              >
                <div className="w-12 h-1 bg-gold mx-auto mb-4 rounded-full" />
                <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">
                  {v.title}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)]">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
