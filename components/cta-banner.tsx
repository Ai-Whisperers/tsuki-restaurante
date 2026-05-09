interface CtaProps {
  title: string;
  subtitle?: string;
  buttonText: string;
  buttonHref: string;
}

export default function CtaBanner({
  title,
  subtitle,
  buttonText,
  buttonHref,
}: CtaProps) {
  return (
    <section className="section-padding bg-[var(--color-surface)]">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] p-10 md:p-16 text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-[var(--font-heading)] font-bold text-white mb-4">
              {title}
            </h2>
            {subtitle && (
              <p className="text-[var(--color-primary-light)] mb-8">{subtitle}</p>
            )}
            <a
              href={buttonHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 bg-gold text-[var(--color-primary-dark)] font-semibold rounded-lg hover:bg-[var(--color-accent-light)] transition-all"
            >
              {buttonText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
