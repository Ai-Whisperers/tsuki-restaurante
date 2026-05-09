"use client";

import { MessageCircle } from "lucide-react";
import content from "@/content/es.json";

export default function WhatsAppFloat() {
  const site = (content.site as any) || {};
  const whatsapp = site.whatsapp || "595974161698";

  return (
    <a
      href={`https://wa.me/${whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110"
      aria-label="WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
}
