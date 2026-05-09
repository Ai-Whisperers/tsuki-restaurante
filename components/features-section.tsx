interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

interface FeaturesProps {
  title: string;
  subtitle?: string;
  items: FeatureItem[];
}

const iconMap: Record<string, React.ReactNode> = {
  utensilsCrossed: (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
  ),
  fish: (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.5 12c.94-3.5 3.89-6.5 5.5-6.5s4.56 3 5.5 6.5c-.94 3.5-3.89 6.5-5.5 6.5s-4.56-3-5.5-6.5Z" />
      <path d="M2 12c1.67-3.5 4.56-6 6.5-6" />
      <path d="M22 12c-1.67-3.5-4.56-6-6.5-6" />
      <path d="M10 12h4" />
      <circle cx="12" cy="12" r="1" />
    </svg>
  ),
  flame: (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  ),
  chefHat: (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
      <line x1="6" x2="18" y1="17" y2="17" />
    </svg>
  ),
};

export default function FeaturesSection({ title, subtitle, items }: FeaturesProps) {
  return (
    <section className="section-padding bg-[var(--color-surface)]">
      <div className="container-page">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-[var(--font-heading)] font-bold text-[var(--color-text)] mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-[var(--color-text-muted)] max-w-xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] hover:border-gold/30 transition-all group"
            >
              <div className="w-14 h-14 rounded-lg bg-gold/10 flex items-center justify-center text-gold mb-4 group-hover:bg-gold/20 transition-colors">
                {iconMap[item.icon] || null}
              </div>
              <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
