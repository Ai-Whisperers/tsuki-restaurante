interface Category {
  id: string;
  name: string;
  priceRange: string;
}

interface MenuSectionProps {
  title: string;
  description: string;
  categories: Category[];
}

export default function MenuPreviewSection({
  title,
  description,
  categories,
}: MenuSectionProps) {
  return (
    <section className="section-padding bg-[var(--color-background)]">
      <div className="container-page">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-gold mb-4 block">
            Nuestra Carta
          </span>
          <h2 className="text-3xl md:text-4xl font-[var(--font-heading)] font-bold text-[var(--color-text)] mb-4">
            {title}
          </h2>
          <p className="text-[var(--color-text-muted)] max-w-xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`/carta#${cat.id}`}
              className="group p-6 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] hover:border-gold/40 transition-all"
            >
              <h3 className="text-lg font-semibold text-[var(--color-text)] group-hover:text-gold transition-colors mb-1">
                {cat.name}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                {cat.priceRange}
              </p>
            </a>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="/carta"
            className="inline-flex items-center justify-center px-8 py-3 bg-gold text-[var(--color-background)] font-semibold rounded-lg hover:bg-[var(--color-accent-light)] transition-all"
          >
            Ver Carta Completa
          </a>
        </div>
      </div>
    </section>
  );
}
