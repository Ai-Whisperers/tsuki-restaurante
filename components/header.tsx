"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import content from "@/content/es.json";

interface NavItem {
  href: string;
  label: string;
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const nav = (content.navigation || []) as NavItem[];
  const siteName = (content.site as any)?.shortName || "Tsuki";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--color-background)]/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container-page flex items-center justify-between h-16 md:h-20">
        <a
          href="/"
          className="text-xl md:text-2xl font-[var(--font-heading)] font-bold text-gold tracking-wide"
        >
          Tsuki
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm uppercase tracking-widest text-[var(--color-text-light)] hover:text-gold transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          className="md:hidden text-[var(--color-text)] p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[var(--color-surface)] border-t border-[var(--color-border)]">
          <div className="container-page py-4 flex flex-col gap-4">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm uppercase tracking-widest text-[var(--color-text-light)] hover:text-gold transition-colors py-2"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
