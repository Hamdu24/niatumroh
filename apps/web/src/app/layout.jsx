import "./globals.css"; // Sesuaikan jika nama file CSS utamamu berbeda
import SmartWhatsApp from "../components/SmartWhatsApp";

export const metadata = {
  title: "NiatUmroh - Travel Umroh & Haji Plus",
  description: "Konsultasi dan Pendaftaran Paket Umroh Mudah dan Terpercaya",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        {/* {children} ini WAJIB ada, fungsinya memanggil seluruh isi halaman website kamu */}
        {children} 

        {/* Tombol WhatsApp pintar kita taruh di bawah children agar ikut melayang */}
        <SmartWhatsApp />
      </body>
    </html>
  );
}