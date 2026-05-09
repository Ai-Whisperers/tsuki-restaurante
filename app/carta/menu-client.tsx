"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Utensils, Flame, Fish, Beef, Drumstick } from "lucide-react";

interface MenuItem {
  name: string;
  description?: string;
  price: string;
}

interface MenuCategory {
  id: string;
  name: string;
  icon?: string;
  type?: string;
  columns?: string[];
  rows?: string[][];
  items?: MenuItem[];
  notes?: string[];
}

export default function MenuPageClient({
  categories,
  whatsapp,
}: {
  categories: MenuCategory[];
  whatsapp: string;
}) {
  const [activeCat, setActiveCat] = useState(categories[0]?.id || "");
  const [openCat, setOpenCat] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && categories.find((c) => c.id === hash)) {
      setActiveCat(hash);
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [categories]);

  const catIcons: Record<string, React.ReactNode> = {
    entradas: <Utensils size={18} />,
    sopas: <Utensils size={18} />,
    salteados: <Flame size={18} />,
    carne: <Beef size={18} />,
    pollo: <Drumstick size={18} />,
    cerdo: <Drumstick size={18} />,
    mariscos: <Fish size={18} />,
    pescados: <Fish size={18} />,
    sushi: <Fish size={18} />,
  };

  return (
    <div className="section-padding bg-[var(--color-background)]">
      <div className="container-page">
        {/* Category Nav (desktop) */}
        <div className="hidden md:flex flex-wrap gap-2 mb-12 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCat(cat.id);
                document
                  .getElementById(cat.id)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCat === cat.id
                  ? "bg-gold text-[var(--color-background)]"
                  : "bg-[var(--color-surface-alt)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] border border-[var(--color-border)]"
              }`}
            >
              {catIcons[cat.id] && (
                <span className="inline-block mr-2 align-middle">
                  {catIcons[cat.id]}
                </span>
              )}
              {cat.name}
            </button>
          ))}
        </div>

        {/* Category sections */}
        <div className="space-y-12 max-w-3xl mx-auto">
          {categories.map((cat) => (
            <section
              key={cat.id}
              id={cat.id}
              className="scroll-mt-24"
            >
              {/* Mobile accordion header */}
              <button
                className="md:hidden w-full flex items-center justify-between p-4 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] mb-4"
                onClick={() => setOpenCat(openCat === cat.id ? null : cat.id)}
              >
                <span className="flex items-center gap-2 font-semibold text-[var(--color-text)]">
                  {catIcons[cat.id]}
                  {cat.name}
                </span>
                <ChevronDown
                  size={18}
                  className={`transition-transform ${
                    openCat === cat.id ? "rotate-180" : ""
                  } text-[var(--color-text-muted)]`}
                />
              </button>

              {/* Desktop heading */}
              <div className="hidden md:flex items-center gap-3 mb-6">
                <span className="text-gold">{catIcons[cat.id]}</span>
                <h2 className="text-2xl font-[var(--font-heading)] font-bold text-[var(--color-text)]">
                  {cat.name}
                </h2>
                <div className="flex-1 h-px bg-gradient-to-r from-gold/40 to-transparent ml-4" />
              </div>

              <div className={`${openCat !== cat.id && openCat !== null ? "hidden" : "block"} md:block`}>
                {/* Table-style categories */}
                {cat.type === "table" && cat.columns && cat.rows ? (
                  <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-[var(--color-surface-alt)]">
                          {cat.columns.map((col) => (
                            <th
                              key={col}
                              className="px-4 py-3 text-left text-[var(--color-text)] font-semibold whitespace-nowrap"
                            >
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[var(--color-border)]">
                        {cat.rows.map((row, i) => (
                          <tr
                            key={i}
                            className="hover:bg-[var(--color-surface-alt)]/50 transition-colors"
                          >
                            {row.map((cell, j) => (
                              <td
                                key={j}
                                className={`px-4 py-3 whitespace-nowrap ${
                                  j === 0
                                    ? "text-[var(--color-text)] font-medium"
                                    : cell
                                    ? "text-[var(--color-text-muted)]"
                                    : "text-[var(--color-text-muted)] opacity-40"
                                }`}
                              >
                                {cell || "—"}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  /* List-style categories */
                  <div className="space-y-2">
                    {cat.items?.map((item) => (
                      <div
                        key={item.name}
                        className="flex justify-between items-start gap-4 p-4 rounded-lg bg-[var(--color-surface-alt)]/30 hover:bg-[var(--color-surface-alt)]/60 transition-colors border border-transparent hover:border-[var(--color-border)]"
                      >
                        <div>
                          <h3 className="text-base font-medium text-[var(--color-text)]">
                            {item.name}
                          </h3>
                          {item.description && (
                            <p className="text-xs text-[var(--color-text-muted)] mt-1">
                              {item.description}
                            </p>
                          )}
                        </div>
                        <span className="text-sm font-semibold text-gold whitespace-nowrap shrink-0">
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Notes */}
                {cat.notes && cat.notes.length > 0 && (
                  <div className="mt-4 p-4 rounded-lg bg-[var(--color-surface-alt)]/50 border border-[var(--color-border)]">
                    {cat.notes.map((note, i) => (
                      <p
                        key={i}
                        className="text-xs text-[var(--color-text-muted)] italic"
                      >
                        * {note}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-16">
          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[var(--color-primary)] text-white font-semibold rounded-lg hover:bg-[var(--color-primary-light)] transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
            </svg>
            Pedí por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
