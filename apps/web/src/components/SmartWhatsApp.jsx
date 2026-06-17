"use client";

import { usePathname } from "next/navigation";
import { getWhatsAppLink } from "../utils/whatsapp";

export default function SmartWhatsApp() {
  const pathname = usePathname();

  // Logika mendeteksi halaman secara otomatis
  let pageName = "home";
  let detail = "";

  if (pathname.includes("/packages/")) {
    pageName = "detail-paket";
    // Mengambil nama paket dari URL (misal: /packages/umroh-ramadhan -> umroh-ramadhan)
    const slug = pathname.split("/").pop();
    detail = slug ? slug.replace(/-/g, " ") : "Paket Umroh";
  } else if (pathname === "/contact") {
    pageName = "contact";
  }

  const waLink = getWhatsAppLink(pageName, detail);

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        backgroundColor: "#25D366",
        color: "white",
        padding: "14px 20px",
        borderRadius: "50px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontWeight: "bold",
        textDecoration: "none",
        fontSize: "14px"
      }}
    >
      {/* Icon WA Sederhana */}
      <span style={{ fontSize: "18px" }}>💬</span>
      Chat WhatsApp
    </a>
  );
}