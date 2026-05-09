"use client";

import { useState, useMemo } from "react";
import {
  Plus,
  Minus,
  ShoppingCart,
  Trash2,
  ChevronDown,
  Utensils,
  Flame,
  Fish,
  Beef,
  Drumstick,
  Send,
  AlertCircle,
  Check,
} from "lucide-react";

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

interface CartItem {
  id: string;
  name: string;
  qty: number;
  price: string;
  note?: string;
}

interface CtaContent {
  title: string;
  subtitle: string;
  buttonText: string;
  emptyText: string;
}

function parsePrice(priceStr: string): number {
  const clean = priceStr.replace(/[^0-9.]/g, "");
  return parseFloat(clean) || 0;
}

function formatPriceGs(n: number): string {
  return `Gs ${n.toLocaleString("es-PY")}`;
}

export default function OrderPageClient({
  categories,
  whatsapp,
  cta,
}: {
  categories: MenuCategory[];
  whatsapp: string;
  cta: CtaContent;
}) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCat, setActiveCat] = useState(categories[0]?.id || "");
  const [openCat, setOpenCat] = useState<string | null>(null);
  const [showCart, setShowCart] = useState(false);
  const [name, setName] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [sent, setSent] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + parsePrice(item.price) * item.qty, 0),
    [cart]
  );

  function addItem(name: string, price: string) {
    const id = `${name}::${price}`;
    setCart((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) =>
          i.id === id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { id, name, qty: 1, price }];
    });
  }

  function updateQty(id: string, delta: number) {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i))
        .filter((i) => i.qty > 0)
    );
  }

  function removeItem(id: string) {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }

  function clearCart() {
    setCart([]);
    setName("");
    setSent(false);
  }

  function buildWhatsAppMessage(): string {
    if (cart.length === 0) return "";
    const lines = ["*🧾 Pedido Tsuki Restaurante Oriental*", ""];
    cart.forEach((item) => {
      lines.push(`• ${item.name} x${item.qty} — ${item.price}`);
    });
    lines.push("");
    lines.push(`*Total: ${formatPriceGs(cartTotal)}*`);
    if (name.trim()) {
      lines.push("");
      lines.push(`*Nombre:* ${name.trim()}`);
    }
    return encodeURIComponent(lines.join("\n"));
  }

  function handleSend() {
    const msg = buildWhatsAppMessage();
    if (!msg) return;
    setSent(true);
    window.open(`https://wa.me/${whatsapp}?text=${msg}`, "_blank");
    setTimeout(() => setSent(false), 3000);
  }

  const catIcons: Record<string, React.ReactNode> = {
    entradas: <Utensils size={16} />,
    sopas: <Utensils size={16} />,
    salteados: <Flame size={16} />,
    carne: <Beef size={16} />,
    pollo: <Drumstick size={16} />,
    cerdo: <Drumstick size={16} />,
    mariscos: <Fish size={16} />,
    pescados: <Fish size={16} />,
    sushi: <Fish size={16} />,
  };

  return (
    <div className="section-padding bg-[var(--color-background)] relative">
      <div className="container-page">
        <div className="flex gap-6 lg:gap-10">
          {/* Left: Menu */}
          <div className="flex-1 min-w-0">
            {/* Category Nav */}
            <div className="flex flex-wrap gap-1.5 mb-8">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCat(cat.id);
                    document.getElementById(`order-${cat.id}`)?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeCat === cat.id
                      ? "bg-gold text-[var(--color-background)]"
                      : "bg-[var(--color-surface-alt)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] border border-[var(--color-border)]"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Category sections */}
            <div className="space-y-8 max-w-2xl">
              {categories.map((cat) => (
                <section key={cat.id} id={`order-${cat.id}`} className="scroll-mt-24">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-gold text-sm">{catIcons[cat.id]}</span>
                    <h2 className="text-base font-semibold text-[var(--color-text)]">
                      {cat.name}
                    </h2>
                    <div className="flex-1 h-px bg-gradient-to-r from-gold/20 to-transparent ml-2" />
                  </div>

                  {/* Table-style categories */}
                  {cat.type === "table" && cat.columns && cat.rows ? (
                    <div className="overflow-x-auto rounded-lg border border-[var(--color-border)] text-xs">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-[var(--color-surface-alt)]">
                            {cat.columns.map((col) => (
                              <th
                                key={col}
                                className="px-2 py-2 text-left text-[var(--color-text)] font-semibold whitespace-nowrap"
                              >
                                {col}
                              </th>
                            ))}
                            <th className="px-2 py-2 w-10"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--color-border)]">
                          {cat.rows.map((row, i) =>
                            row[0] ? (
                              <tr
                                key={i}
                                className="hover:bg-[var(--color-surface-alt)]/50 transition-colors"
                              >
                                {row.map((cell, j) => (
                                  <td
                                    key={j}
                                    className={`px-2 py-2 whitespace-nowrap ${
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
                                <td className="px-2 py-2">
                                  {row[1] && row[1].startsWith("Gs") && (
                                    <button
                                      onClick={() => addItem(`${row[0]} (Arroz Chino)`, row[1])}
                                      className="w-7 h-7 rounded-full bg-gold/20 text-gold hover:bg-gold/40 transition-all flex items-center justify-center"
                                      title="Agregar Arroz Chino"
                                    >
                                      <Plus size={14} />
                                    </button>
                                  )}
                                </td>
                              </tr>
                            ) : null
                          )}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    /* List items */
                    <div className="space-y-2">
                      {cat.items?.map((item) => {
                        const prices = item.price.includes("/")
                          ? item.price.split("/").map((p) => p.trim())
                          : [item.price];
                        const primaryPrice = prices[0];

                        return (
                          <div
                            key={item.name}
                            className="flex items-center justify-between gap-2 p-3 rounded-lg bg-[var(--color-surface-alt)]/30 hover:bg-[var(--color-surface-alt)]/60 transition-colors border border-transparent hover:border-[var(--color-border)]"
                          >
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <h3 className="text-sm font-medium text-[var(--color-text)]">
                                  {item.name}
                                </h3>
                              </div>
                              {item.description && (
                                <p className="text-xs text-[var(--color-text-muted)] mt-0.5 truncate">
                                  {item.description}
                                </p>
                              )}
                              <span className="text-xs font-semibold text-gold">
                                {item.price}
                              </span>
                            </div>
                            <button
                              onClick={() => addItem(item.name, primaryPrice)}
                              className="w-8 h-8 rounded-full bg-gold/20 text-gold hover:bg-gold/40 transition-all flex items-center justify-center shrink-0"
                              title="Agregar al pedido"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {cat.notes && cat.notes.length > 0 && (
                    <div className="mt-2 p-2 rounded bg-[var(--color-surface-alt)]/30 border border-[var(--color-border)] text-xs text-[var(--color-text-muted)] italic">
                      {cat.notes.map((note, i) => (
                        <p key={i}>* {note}</p>
                      ))}
                    </div>
                  )}
                </section>
              ))}
            </div>
          </div>

          {/* Right: Cart sidebar (desktop) */}
          <div className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-24">
              <CartSidebar
                cart={cart}
                cartTotal={cartTotal}
                name={name}
                setName={setName}
                showForm={showForm}
                setShowForm={setShowForm}
                sent={sent}
                onQtyChange={updateQty}
                onRemove={removeItem}
                onClear={clearCart}
                onSend={handleSend}
                cta={cta}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile cart FAB */}
      {cartCount > 0 && (
        <button
          onClick={() => setShowCart(true)}
          className="fixed bottom-20 right-6 z-40 w-14 h-14 bg-gold text-[var(--color-background)] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110"
          aria-label="Ver carrito"
        >
          <ShoppingCart size={22} />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--color-primary)] text-white text-xs rounded-full flex items-center justify-center font-bold">
            {cartCount}
          </span>
        </button>
      )}

      {/* Mobile cart drawer */}
      {showCart && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setShowCart(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-[var(--color-surface)] rounded-t-2xl max-h-[80vh] overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-[var(--color-text)] flex items-center gap-2">
                  <ShoppingCart size={18} />
                  Tu pedido ({cartCount})
                </h3>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-[var(--color-text-muted)]"
                >
                  ✕
                </button>
              </div>
              <CartContent
                cart={cart}
                cartTotal={cartTotal}
                name={name}
                setName={setName}
                showForm={showForm}
                setShowForm={setShowForm}
                sent={sent}
                onQtyChange={updateQty}
                onRemove={removeItem}
                onClear={clearCart}
                onSend={handleSend}
                cta={cta}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* Reusable cart sidebar/content component */
function CartSidebar({
  cart,
  cartTotal,
  name,
  setName,
  showForm,
  setShowForm,
  sent,
  onQtyChange,
  onRemove,
  onClear,
  onSend,
  cta,
}: {
  cart: CartItem[];
  cartTotal: number;
  name: string;
  setName: (v: string) => void;
  showForm: boolean;
  setShowForm: (v: boolean) => void;
  sent: boolean;
  onQtyChange: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
  onSend: () => void;
  cta: CtaContent;
}) {
  return (
    <div className="bg-[var(--color-surface-alt)] rounded-xl border border-[var(--color-border)] p-4">
      <h3 className="font-semibold text-[var(--color-text)] flex items-center gap-2 mb-4">
        <ShoppingCart size={18} />
        Tu pedido
        {cart.length > 0 && (
          <span className="text-xs text-[var(--color-text-muted)] font-normal">
            ({cart.reduce((s, i) => s + i.qty, 0)} items)
          </span>
        )}
      </h3>

      <CartContent
        cart={cart}
        cartTotal={cartTotal}
        name={name}
        setName={setName}
        showForm={showForm}
        setShowForm={setShowForm}
        sent={sent}
        onQtyChange={onQtyChange}
        onRemove={onRemove}
        onClear={onClear}
        onSend={onSend}
        cta={cta}
      />
    </div>
  );
}

function CartContent({
  cart,
  cartTotal,
  name,
  setName,
  showForm,
  setShowForm,
  sent,
  onQtyChange,
  onRemove,
  onClear,
  onSend,
  cta,
}: {
  cart: CartItem[];
  cartTotal: number;
  name: string;
  setName: (v: string) => void;
  showForm: boolean;
  setShowForm: (v: boolean) => void;
  sent: boolean;
  onQtyChange: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
  onSend: () => void;
  cta: CtaContent;
}) {
  if (cart.length === 0) {
    return (
      <div className="text-center py-8">
        <ShoppingCart size={36} className="mx-auto mb-3 text-[var(--color-text-muted)] opacity-30" />
        <p className="text-sm text-[var(--color-text-muted)]">{cta.emptyText}</p>
      </div>
    );
  }

  return (
    <>
      {/* Cart items */}
      <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-2 p-2 rounded-lg bg-[var(--color-surface)]/50 border border-[var(--color-border)]/50"
          >
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-[var(--color-text)] truncate">
                {item.name}
              </p>
              <p className="text-xs text-gold">{item.price}</p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => onQtyChange(item.id, -1)}
                className="w-6 h-6 rounded bg-[var(--color-surface-light)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] flex items-center justify-center"
              >
                <Minus size={12} />
              </button>
              <span className="w-6 text-center text-xs font-medium text-[var(--color-text)]">
                {item.qty}
              </span>
              <button
                onClick={() => onQtyChange(item.id, 1)}
                className="w-6 h-6 rounded bg-[var(--color-surface-light)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] flex items-center justify-center"
              >
                <Plus size={12} />
              </button>
              <button
                onClick={() => onRemove(item.id)}
                className="w-6 h-6 rounded text-[var(--color-text-muted)] hover:text-red-400 flex items-center justify-center ml-1"
              >
                <Trash2 size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="flex items-center justify-between py-3 border-t border-[var(--color-border)] mb-4">
        <span className="text-sm font-semibold text-[var(--color-text)]">Total</span>
        <span className="text-sm font-bold text-gold">
          {formatPriceGs(cartTotal)}
        </span>
      </div>

      {/* Name field */}
      <div className="mb-4">
        <label className="block text-xs text-[var(--color-text-muted)] mb-1">
          Tu nombre (opcional)
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ej: Juan Pérez"
          className="w-full px-3 py-2 rounded-lg bg-[var(--color-background)] border border-[var(--color-border)] text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]/50 focus:outline-none focus:border-gold/50 transition-colors"
        />
      </div>

      {/* Send button */}
      <button
        onClick={onSend}
        disabled={sent}
        className={`w-full py-3 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
          sent
            ? "bg-green-600 text-white"
            : "bg-gold text-[var(--color-background)] hover:bg-[var(--color-accent-light)]"
        }`}
      >
        {sent ? (
          <>
            <Check size={16} />
            Enviado
          </>
        ) : (
          <>
            <Send size={16} />
            {cta.buttonText}
          </>
        )}
      </button>

      <p className="text-xs text-[var(--color-text-muted)] text-center mt-2">
        Se abrirá WhatsApp con tu pedido listo para enviar
      </p>

      <button
        onClick={onClear}
        className="w-full text-xs text-[var(--color-text-muted)] hover:text-red-400 transition-colors mt-3"
      >
        Vaciar carrito
      </button>
    </>
  );
}
