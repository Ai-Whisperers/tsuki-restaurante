"use client";

import { useState, useEffect } from "react";

interface WeeklySpecial {
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

export default function MenuSemanalPage() {
  const [form, setForm] = useState<any>({
    title: "",
    subtitle: "",
    badge: "",
    validDays: "",
    item: { name: "", description: "", price: "", originalPrice: "", category: "" },
    ctaText: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/weekly")
      .then((r) => r.json())
      .then((data) => {
        if (data.weeklySpecial) {
          setForm({
            title: data.weeklySpecial.title || "",
            subtitle: data.weeklySpecial.subtitle || "",
            badge: data.weeklySpecial.badge || "",
            validDays: data.weeklySpecial.validDays || "",
            item: {
              name: data.weeklySpecial.item?.name || "",
              description: data.weeklySpecial.item?.description || "",
              price: data.weeklySpecial.item?.price || "",
              originalPrice: data.weeklySpecial.item?.originalPrice || "",
              category: data.weeklySpecial.item?.category || "",
            },
            ctaText: data.weeklySpecial.ctaText || "",
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const update = (path: string, value: string) => {
    setForm((prev: any) => {
      const next = { ...prev };
      if (path.includes(".")) {
        const [parent, child] = path.split(".");
        next[parent] = { ...next[parent], [child]: value };
      } else {
        next[path] = value;
      }
      return next;
    });
    setSaved(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.item.name || !form.item.price) {
      setError("El nombre y precio del plato son requeridos");
      return;
    }
    setError(null);
    setSaving(true);
    try {
      const res = await fetch("/api/admin/weekly", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al guardar");
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "w-full px-3 py-2 rounded-lg bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)] text-sm placeholder-[var(--color-text-muted)] focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-colors";
  const labelClass = "block text-sm font-medium text-[var(--color-text)] mb-1.5";

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-[var(--color-text-muted)]">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-[var(--font-heading)] font-bold text-[var(--color-text)]">
          Menú Semanal
        </h1>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          Editá el Plato Especial de la Semana. Aparece en la página de inicio y en la carta.
          El precio se muestra en Gs. (Guaraníes paraguayos).
        </p>
      </div>

      {/* Status feedback */}
      {saved && (
        <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 flex items-center gap-3">
          <svg className="w-5 h-5 text-green-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm text-green-800 font-medium">Cambios guardados correctamente</span>
        </div>
      )}
      {error && (
        <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-center gap-3">
          <svg className="w-5 h-5 text-red-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span className="text-sm text-red-800 font-medium">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section: Plato */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
          <div className="px-6 py-4 bg-[var(--color-surface-alt)] border-b border-[var(--color-border)]">
            <h2 className="font-semibold text-[var(--color-text)]">Plato</h2>
          </div>
          <div className="p-6 grid gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Nombre del plato *</label>
                <input
                  type="text"
                  value={form.item.name}
                  onChange={(e) => update("item.name", e.target.value)}
                  placeholder="Ej: Pollo Encacahuatado"
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Categoría</label>
                <input
                  type="text"
                  value={form.item.category}
                  onChange={(e) => update("item.category", e.target.value)}
                  placeholder="Ej: Pollo, Carne, Mariscos"
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Descripción</label>
              <textarea
                value={form.item.description}
                onChange={(e) => update("item.description", e.target.value)}
                placeholder="Describe el plato, ingredientes principales, guarnición..."
                rows={3}
                className={inputClass}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Precio de venta *</label>
                <input
                  type="text"
                  value={form.item.price}
                  onChange={(e) => update("item.price", e.target.value)}
                  placeholder="Gs 48.000"
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Precio anterior (para mostrar descuento)</label>
                <input
                  type="text"
                  value={form.item.originalPrice}
                  onChange={(e) => update("item.originalPrice", e.target.value)}
                  placeholder="Gs 58.000"
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section: Encabezado */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
          <div className="px-6 py-4 bg-[var(--color-surface-alt)] border-b border-[var(--color-border)]">
            <h2 className="font-semibold text-[var(--color-text)]">Encabezado de sección</h2>
          </div>
          <div className="p-6 grid gap-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className={labelClass}>Título</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => update("title", e.target.value)}
                  placeholder="Especial de la Semana"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Subtítulo</label>
                <input
                  type="text"
                  value={form.subtitle}
                  onChange={(e) => update("subtitle", e.target.value)}
                  placeholder="Plato limitado — renovamos cada semana"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Etiqueta (badge)</label>
                <input
                  type="text"
                  value={form.badge}
                  onChange={(e) => update("badge", e.target.value)}
                  placeholder="Nuevo"
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section: CTA */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
          <div className="px-6 py-4 bg-[var(--color-surface-alt)] border-b border-[var(--color-border)]">
            <h2 className="font-semibold text-[var(--color-text)]">Botón de acción</h2>
          </div>
          <div className="p-6 grid gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Texto del botón</label>
                <input
                  type="text"
                  value={form.ctaText}
                  onChange={(e) => update("ctaText", e.target.value)}
                  placeholder="Pedir este Plato"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Días disponibles</label>
                <input
                  type="text"
                  value={form.validDays}
                  onChange={(e) => update("validDays", e.target.value)}
                  placeholder="Miércoles a Domingo"
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Enlace de WhatsApp (auto-generado si se deja vacío)</label>
              <input
                type="text"
                value={form.ctaHref}
                onChange={(e) => update("ctaHref", e.target.value)}
                placeholder="Se genera automáticamente"
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-gold text-[var(--color-background)] font-semibold rounded-lg hover:bg-[var(--color-accent-light)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Guardando..." : "Guardar Cambios"}
          </button>
          <a
            href="/"
            target="_blank"
            className="px-6 py-3 border border-[var(--color-border)] text-[var(--color-text-muted)] font-medium rounded-lg hover:border-gold hover:text-gold transition-all"
          >
            Ver en el sitio →
          </a>
        </div>
      </form>
    </div>
  );
}