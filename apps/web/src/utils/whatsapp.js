export const whatsappNumber = "6285825326780";

export function buildWhatsAppLink(pkg = null, pageTitle = "") {
  let message = "";

  if (pkg) {
    message = `
Assalamu'alaikum.

Saya ingin konsultasi paket:

📌 Paket: ${pkg.title || "-"}
💰 Harga: ${pkg.price || "-"}
🕋 Durasi: ${pkg.total_nights || "-"} malam
🏨 Hotel Makkah: ${pkg.makkah_hotel || "-"}
🏨 Hotel Madinah: ${pkg.madinah_hotel || "-"}

Mohon info lengkap dan ketersediaan seat.
    `.trim();
  } else if (pageTitle) {
    message = `
Assalamu'alaikum.

Saya ingin konsultasi tentang ${pageTitle}.

Mohon informasi lengkapnya.
    `.trim();
  } else {
    message = `
Assalamu'alaikum.

Saya ingin konsultasi paket Umroh dan Haji Plus di Jejak Imani.

Mohon informasi lengkapnya.
    `.trim();
  }

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

