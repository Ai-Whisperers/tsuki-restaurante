import { Metadata } from "next";
import content from "@/content/es.json";
import GalleryClient from "./gallery-client";

const c = content as any;

export const metadata: Metadata = {
  title: c.gallery.seo.title,
  description: c.gallery.seo.description,
};

export default function GalleryPage() {
  return (
    <>
      <section className="pt-28 pb-16 bg-[var(--color-background)] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="container-page text-center">
          <h1 className="text-4xl md:text-5xl font-[var(--font-heading)] font-bold text-[var(--color-text)] mb-4">
            {c.gallery.hero.title}
          </h1>
          <p className="text-[var(--color-text-muted)]">
            {c.gallery.hero.subtitle}
          </p>
        </div>
      </section>

      <GalleryClient images={c.gallery.images} />
    </>
  );
}
