interface WeeklySpecialProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  item?: {
    name: string;
    description: string;
    price: string;
    originalPrice?: string;
    category?: string;
  };
  ctaText?: string;
  ctaHref?: string;
  validDays?: string;
}

export default function WeeklySpecial({
  title = "Especial de la Semana",
  subtitle = "Plato limitado — renovamos cada semana",
  badge = "Nuevo",
  item,
  ctaText = "Pedir este Plato",
  ctaHref = "https://wa.me/595974161698",
  validDays,
}: WeeklySpecialProps) {
  if (!item) return null;

  return (
    <section className="section-padding bg-[var(--color-surface)]">
      <div className="container-page max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-gold mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            {title}
          </span>
          <h2 className="text-3xl md:text-4xl font-[var(--font-heading)] font-bold text-[var(--color-text)] mb-3">
            {subtitle}
          </h2>
          {validDays && (
            <p className="text-sm text-[var(--color-text-muted)]">
              Disponible: {validDays}
            </p>
          )}
        </div>

        {/* Special card */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[var(--color-surface-alt)] via-[var(--color-surface)] to-[var(--color-background)] border border-gold/30 shadow-lg shadow-gold/10">
          {/* Gold accent stripe */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
          
          {/* Badge */}
          {badge && (
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-gold text-[var(--color-background)] text-xs font-bold uppercase tracking-wider">
                {badge}
              </span>
            </div>
          )}

          <div className="p-8 md:p-10">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left: info */}
              <div className="flex-1">
                {item.category && (
                  <span className="text-xs uppercase tracking-[0.2em] text-gold mb-3 block">
                    {item.category}
                  </span>
                )}
                <h3 className="text-2xl md:text-3xl font-[var(--font-heading)] font-bold text-[var(--color-text)] mb-4">
                  {item.name}
                </h3>
                <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
                  {item.description}
                </p>
                
                {/* Prices */}
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-3xl font-bold text-gold">{item.price}</span>
                  {item.originalPrice && (
                    <span className="text-lg text-[var(--color-text-muted)] line-through">
                      {item.originalPrice}
                    </span>
                  )}
                  {item.originalPrice && (
                    <span className="text-sm font-semibold text-green-600">
                      Ahorrá {Math.round((1 - parseInt(item.price.replace(/[^\d]/g, '')) / parseInt(item.originalPrice.replace(/[^\d]/g, ''))) * 100)}%
                    </span>
                  )}
                </div>

                {/* CTA */}
                <a
                  href={ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-[var(--color-background)] font-semibold rounded-lg hover:bg-[var(--color-accent-light)] transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                  </svg>
                  {ctaText}
                </a>
              </div>

              {/* Right: decorative */}
              <div className="w-full md:w-48 flex items-center justify-center">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gold/20 to-[var(--color-primary)]/20 flex items-center justify-center">
                    <svg className="w-16 h-16 text-gold/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.351 3.351 0 01-4.5 0m1.5-15a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                    </svg>
                  </div>
                  {/* Decorative circles */}
                  <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full border-2 border-gold/30" />
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 rounded-full bg-gold/20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}