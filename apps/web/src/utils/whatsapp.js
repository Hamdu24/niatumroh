export const getWhatsAppLink = (pageName, detail = "") => {
  const phoneNumber = "628119701339"; // 👈 GANTI DENGAN NOMOR WA KAMU (Awal 628)
  let message = "Assalamu'alaikum Admin NiatUmroh, saya ingin bertanya mengenai layanan Anda.";

  if (pageName === "home") {
    message = "Assalamu'alaikum Admin, saya sedang melihat-lihat website NiatUmroh dan ingin tanya-tanya seputar konsultasi Umroh/Haji.";
  } else if (pageName === "detail-paket") {
    message = `Assalamu'alaikum Admin, saya tertarik dan ingin bertanya lebih lanjut mengenai paket *${detail}*. Mohon info ketersediaan slotnya ya.`;
  } else if (pageName === "contact") {
    message = "Assalamu'alaikum Admin, saya sedang di halaman Kontak dan ingin mendaftar/berkonsultasi langsung.";
  }

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
};