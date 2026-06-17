import { useEffect, useState } from "react";
import { getWhatsAppLink } from "../utils/whatsapp";

export default function SmartWhatsApp() {
  const [waLink, setWaLink] = useState("");

  useEffect(() => {
    // Kode ini HANYA berjalan setelah browser benar-benar siap (Aman dari crash SSR)
    if (typeof window !== "undefined") {
      const pathname = window.location.pathname;

      let pageName = "home";
      let detail = "";

      if (pathname.includes("/packages/")) {
        pageName = "detail-paket";
        const slug = pathname.split("/").pop();
        detail = slug ? slug.replace(/-/g, " ") : "Paket Umroh";
      } else if (pathname.includes("/contact") || pathname.includes("/kontak")) {
        pageName = "contact";
      }

      // Pastikan fungsi getWhatsAppLink aman dipanggil
      try {
        const link = getWhatsAppLink(pageName, detail);
        setWaLink(link);
      } catch (error) {
        console.error("Gagal membuat link WA:", error);
      }
    }
  }, []);

  // JANGAN gunakan 'return null' di awal jika state belum siap karena bisa memotong rendering
  if (!waLink) {
    return null; 
  }

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
      <span style={{ fontSize: "18px" }}>💬</span>
      Chat WhatsApp
    </a>
  );
}