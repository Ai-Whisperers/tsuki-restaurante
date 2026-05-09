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
  const [selected, setSelected] = useState<GalleryImage | null>(null);
  const [activeCat, setActiveCat] = useState("all");

  const categories = [
    { id: "all", name: "Todas" },
    { id: "sushi", name: "Sushi" },
    { id: "entradas", name: "Entradas" },
    { id: "wok", name: "Wok" },
    { id: "mariscos", name: "Mariscos" },
    { id: "local", name: "Local" },
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
        <div className="columns-2 md:columns-3 gap-4 max-w-5xl mx-auto">
          {filtered.map((img, i) => (
            <div key={i} className="break-inside-avoid mb-4">
              <button
                onClick={() => setSelected(img)}
                className="group w-full overflow-hidden rounded-xl border border-[var(--color-border)] hover:border-gold/40 transition-all"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
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
            className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl z-10"
            aria-label="Cerrar"
          >
            ✕
          </button>
          <div className="relative max-w-3xl w-full">
            <img
              src={selected.src}
              alt={selected.alt}
              className="w-full max-h-[85vh] object-contain rounded-xl"
            />
            <p className="text-center text-sm text-[var(--color-text-muted)] mt-3">
              {selected.alt}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
