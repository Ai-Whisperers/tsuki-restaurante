interface HeroProps {
  eyebrow?: string;
  headline: string;
  subheadline: string;
  ctaPrimaryText?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryText?: string;
  ctaSecondaryHref?: string;
  variant?: "dark" | "light";
}

export default function Hero({
  eyebrow,
  headline,
  subheadline,
  ctaPrimaryText,
  ctaPrimaryHref,
  ctaSecondaryText,
  ctaSecondaryHref,
  variant = "dark",
}: HeroProps) {
  const isDark = variant === "dark";

  return (
    <section
      className={`relative min-h-[90vh] flex items-center justify-center overflow-hidden ${
        isDark ? "bg-[var(--color-background)]" : "bg-[var(--color-surface)]"
      }`}
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary)]/20 via-transparent to-[var(--color-background)] z-0" />

      {/* Decorative circles */}
      <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-[var(--color-primary)]/10 blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-[var(--color-accent)]/5 blur-3xl" />

      <div className="relative z-10 container-page text-center max-w-4xl">
        {eyebrow && (
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-gold mb-6">
            {eyebrow}
          </span>
        )}
        <h1
          className={`text-4xl md:text-6xl lg:text-7xl font-[var(--font-heading)] font-bold leading-tight mb-6 ${
            isDark ? "text-[var(--color-text)]" : "text-[var(--color-text)]"
          }`}
        >
          {headline}
        </h1>
        <p
          className={`text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed ${
            isDark
              ? "text-[var(--color-text-light)]"
              : "text-[var(--color-text-muted)]"
          }`}
        >
          {subheadline}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {ctaPrimaryText && ctaPrimaryHref && (
            <a
              href={ctaPrimaryHref}
              className="inline-flex items-center justify-center px-8 py-3 bg-gold text-[var(--color-background)] font-semibold rounded-lg hover:bg-[var(--color-accent-light)] transition-all"
            >
              {ctaPrimaryText}
            </a>
          )}
          {ctaSecondaryText && ctaSecondaryHref && (
            <a
              href={ctaSecondaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 border border-gold text-gold font-semibold rounded-lg hover:bg-gold/10 transition-all"
            >
              {ctaSecondaryText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
