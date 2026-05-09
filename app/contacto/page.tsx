import { Metadata } from "next";
import content from "@/content/es.json";

const c = content as any;

export const metadata: Metadata = {
  title: c.contact.seo.title,
  description: c.contact.seo.description,
};

const iconMap: Record<string, React.ReactNode> = {
  mapPin: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  phone: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  clock: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
};

export default function ContactPage() {
  const ct = c.contact;
  return (
    <>
      <section className="pt-28 pb-16 bg-[var(--color-background)] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="container-page text-center">
          <h1 className="text-4xl md:text-5xl font-[var(--font-heading)] font-bold text-[var(--color-text)] mb-4">
            {ct.hero.title}
          </h1>
          <p className="text-[var(--color-text-muted)]">{ct.hero.subtitle}</p>
        </div>
      </section>

      <section className="section-padding bg-[var(--color-surface)]">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
            {ct.info.map((info: { icon: string; label: string; value: string }) => (
              <div
                key={info.label}
                className="p-6 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                  {iconMap[info.icon]}
                </div>
                <h3 className="text-sm uppercase tracking-wider text-[var(--color-text-muted)] mb-1">
                  {info.label}
                </h3>
                <p className="text-[var(--color-text)] font-medium">{info.value}</p>
              </div>
            ))}
          </div>

          {/* Map placeholder */}
          <div className="max-w-3xl mx-auto rounded-xl overflow-hidden border border-[var(--color-border)]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1314.5!2d-57.383!3d-25.333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x945daf004794f9f1%3A0x6e269dede854e44c!2sTsuki%20Restaurante%20Oriental!5e0!3m2!1ses!2spy!4v1"
              width="100%"
              height="350"
              style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Tsuki Restaurante Oriental"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-[var(--color-background)]">
        <div className="container-page">
          <div className="max-w-lg mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-[var(--font-heading)] font-bold text-[var(--color-text)] mb-4">
              {ct.cta.title}
            </h2>
            <p className="text-[var(--color-text-muted)] mb-8">
              {ct.cta.subtitle}
            </p>
            <a
              href={ct.cta.buttonHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[var(--color-primary)] text-white font-semibold rounded-lg hover:bg-[var(--color-primary-light)] transition-all"
            >
              {ct.cta.buttonText}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
