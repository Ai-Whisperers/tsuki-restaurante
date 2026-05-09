"use client";

import { useState } from "react";

interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

export default function GalleryClient({
  images,
}: {
  images: GalleryImage[];
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [activeCat, setActiveCat] = useState("all");

  const categories = [
    { id: "all", name: "Todas" },
    { id: "sushi", name: "Sushi" },
    { id: "entradas", name: "Entradas" },
    { id: "wok", name: "Wok" },
  ];

  const filtered =
    activeCat === "all"
      ? images
      : images.filter((img) => img.category === activeCat);

  return (
    <section className="section-padding bg-[var(--color-background)]">
      <div className="container-page">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCat(cat.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCat === cat.id
                  ? "bg-gold text-[var(--color-background)]"
                  : "bg-[var(--color-surface-alt)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] border border-[var(--color-border)]"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Gallery grid */}
        <div className="columns-2 md:columns-3 gap-3 max-w-5xl mx-auto">
          {filtered.map((img, i) => (
            <div
              key={i}
              className="break-inside-avoid mb-3"
            >
              <button
                onClick={() => setSelected(img.src)}
                className="group w-full overflow-hidden rounded-xl border border-[var(--color-border)] hover:border-gold/40 transition-all"
              >
                <div className="aspect-square bg-[var(--color-surface-alt)] flex items-center justify-center text-[var(--color-text-muted)] text-sm">
                  {/* Placeholder — replace with <img> when real images exist */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-30">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
              </button>
            </div>
          ))}
        </div>

        {images.length === 0 && (
          <p className="text-center text-[var(--color-text-muted)] py-12">
            Pronto subiremos fotos de nuestros platos.
          </p>
        )}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl"
            aria-label="Cerrar"
          >
            ✕
          </button>
          <img
            src={selected}
            alt=""
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
          />
        </div>
      )}
    </section>
  );
}
