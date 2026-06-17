"use client";

import { buildWhatsAppLink } from "~/utils/whatsapp";

export default function WhatsAppButton({ pkg }) {
  return (
    <a
      href={buildWhatsAppLink(pkg)}
      target="_blank"
      rel="noreferrer"
      className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-xl font-bold"
    >
      Chat WhatsApp Sekarang
    </a>
  );
}

