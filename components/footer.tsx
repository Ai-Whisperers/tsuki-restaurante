import content from "@/content/es.json";

export default function Footer() {
  const footer = (content as any).footer || {};
  const site = (content as any).site || {};
  const links = footer.links || [];
  const nav = (content.navigation || []) as { href: string; label: string }[];

  return (
    <footer className="bg-[var(--color-surface)] border-t border-[var(--color-border)] section-padding-sm">
      <div className="container-page">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-[var(--font-heading)] font-bold text-gold mb-3">
              {site.shortName || "Tsuki"}
            </h3>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
              Auténtica cocina oriental en San Lorenzo. Sushi, wok, gyozas,
              arrolladitos y más.
            </p>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-widest text-[var(--color-text-light)] mb-3">
              Enlaces
            </h4>
            <ul className="space-y-2">
              {(
                nav.length > 0 ? nav : links
              ).map((link: { href: string; label: string }) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[var(--color-text-muted)] hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-widest text-[var(--color-text-light)] mb-3">
              Contacto
            </h4>
            <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
              <li>{site.addressShort}</li>
              <li>
                <a
                  href={`tel:${site.phone}`}
                  className="hover:text-gold transition-colors"
                >
                  {site.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-[var(--color-border)] flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-[var(--color-text-muted)]">
          <span>{footer.copyright}</span>
          <a
            href={footer.poweredByUrl || "#"}
            className="hover:text-gold transition-colors"
          >
            {footer.poweredBy}
          </a>
        </div>
      </div>
    </footer>
  );
}
