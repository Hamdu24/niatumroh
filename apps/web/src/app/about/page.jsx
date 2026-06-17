"use client";
import { useState } from "react";
import {
  Phone,
  Menu,
  X,
  Shield,
  Award,
  Users,
  Heart,
  Star,
  CheckCircle,
  Globe,
  BookOpen,
  Plane,
} from "lucide-react";

const milestones = [
  {
    year: "1985",
    title: "Jejak Imani Hadir",
    desc: "Berawal dari komitmen untuk membantu jamaah mendapatkan informasi perjalanan umroh yang lebih jelas, nyaman, dan mudah dipahami.",
  },
  {
    year: "1993",
    title: "Layanan Mulai Dikembangkan",
    desc: "Fokus layanan diperkuat melalui penyusunan paket, konsultasi jamaah, dan pendampingan perjalanan yang lebih tertata.",
  },
  {
    year: "2001",
    title: "Kepercayaan Jamaah Bertumbuh",
    desc: "Semakin banyak calon jamaah membutuhkan informasi paket umroh yang transparan, mudah dibandingkan, dan sesuai kebutuhan keluarga.",
  },
  {
    year: "2010",
    title: "Akses Informasi Diperluas",
    desc: "Informasi paket, jadwal, fasilitas, dan konsultasi dibuat lebih mudah dijangkau melalui kanal digital dan komunikasi langsung.",
  },
  {
    year: "2018",
    title: "Penguatan Layanan Perjalanan",
    desc: "Layanan diarahkan untuk membantu jamaah memahami pilihan penerbangan, akomodasi, transportasi, dan kebutuhan perjalanan ibadah.",
  },
  {
    year: "2024",
    title: "Komitmen Berkelanjutan",
    desc: "Jejak Imani terus berkomitmen menghadirkan pengalaman perjalanan ibadah yang lebih aman, nyaman, dan bernilai bagi jamaah.",
  },
];

const team = [
  {
    name: "Pembimbing Ibadah",
    role: "Pendamping Manasik dan Perjalanan",
    initials: "PI",
    color: "#8B2070",
    bio: "Membantu jamaah memahami rangkaian ibadah, adab perjalanan, dan persiapan spiritual sebelum berangkat ke Tanah Suci.",
  },
  {
    name: "Admin Layanan Jamaah",
    role: "Konsultasi dan Pelayanan Jamaah",
    initials: "AJ",
    color: "#c0392b",
    bio: "Siap membantu calon jamaah sejak konsultasi awal, pemilihan paket, kelengkapan informasi, hingga proses keberangkatan.",
  },
  {
    name: "Konsultan Perjalanan",
    role: "Perencanaan Paket Umroh",
    initials: "KP",
    color: "#c8961a",
    bio: "Membantu jamaah memilih paket yang sesuai dengan jadwal, kebutuhan keluarga, fasilitas hotel, dan anggaran perjalanan.",
  },
  {
    name: "Tim Dokumen",
    role: "Administrasi dan Kelengkapan Berkas",
    initials: "TD",
    color: "#1a6b4a",
    bio: "Membantu pengecekan kelengkapan dokumen jamaah agar proses persiapan perjalanan berjalan lebih tertib dan lancar.",
  },
];

const values = [
  {
    icon: Heart,
    title: "Keikhlasan",
    desc: "Kami memandang pelayanan kepada jamaah sebagai amanah. Setiap jamaah dilayani dengan perhatian, kesabaran, dan kepedulian.",
  },
  {
    icon: Shield,
    title: "Amanah",
    desc: "Kami berkomitmen menyampaikan informasi paket, fasilitas, biaya, dan jadwal secara jelas agar jamaah merasa tenang.",
  },
  {
    icon: BookOpen,
    title: "Ilmu",
    desc: "Perjalanan ibadah bukan sekadar perjalanan fisik. Jamaah perlu memahami tata cara, adab, dan makna ibadah dengan baik.",
  },
  {
    icon: Users,
    title: "Kebersamaan",
    desc: "Kami ingin menjadi bagian dari perjalanan jamaah dalam meraih ibadah yang nyaman, tertata, dan penuh keberkahan.",
  },
];

export default function AboutPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      {/* HEADER */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/">
            <div className="bg-[#1a1a2e] rounded-lg p-2">
              <span className="text-[#d4af37] font-bold text-xl tracking-wide">
                Jejak Imani
              </span>
            </div>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
            <a href="/" className="hover:text-[#c0392b] transition-colors">
              Beranda
            </a>
            <a
              href="/#packages"
              className="hover:text-[#c0392b] transition-colors"
            >
              Paket Umroh
            </a>
            <a href="/about" className="text-[#8B2070] font-bold">
              Tentang Kami
            </a>
            <a
              href="/contact"
              className="hover:text-[#c0392b] transition-colors"
            >
              Kontak
            </a>
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Phone size={16} className="text-[#c0392b]" />
              <span className="font-semibold">+62 858-2532-6780</span>
            </div>
            <a
              href="/enquiry"
              className="bg-[#c0392b] text-white px-4 py-2 rounded text-sm font-semibold hover:bg-[#a93226] transition-colors"
            >
              Konsultasi Sekarang
            </a>
          </div>
          <div className="flex items-center gap-3 md:hidden">
            <a href="tel:+6285825326780" className="text-[#c0392b]">
              <Phone size={22} />
            </a>
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t px-4 py-4 flex flex-col gap-4 text-sm font-medium text-gray-700">
            <a href="/" onClick={() => setMenuOpen(false)}>
              Beranda
            </a>
            <a href="/#packages" onClick={() => setMenuOpen(false)}>
              Paket Umroh
            </a>
            <a
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="text-[#8B2070] font-bold"
            >
              Tentang Kami
            </a>
            <a href="/contact" onClick={() => setMenuOpen(false)}>
              Kontak
            </a>
            <div className="pt-2 border-t">
              <a
                href="/enquiry"
                className="block bg-[#c0392b] text-white px-4 py-2.5 rounded text-sm font-semibold text-center"
              >
                Konsultasi Sekarang
              </a>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-4 py-16 md:py-24 min-h-[380px]"
        style={{
          background:
            "linear-gradient(rgba(10,10,30,0.7), rgba(10,10,30,0.75)), url('https://raw.createusercontent.com/e9eeb71d-a49e-4ee0-b998-dfc68c349cc0/') center/cover no-repeat",
        }}
      >
        <p className="text-[#d4af37] font-semibold text-xs tracking-widest uppercase mb-3">
          Cerita Kami
        </p>
        <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight mb-4">
          Mendampingi Perjalanan Ibadah
          <br className="hidden md:block" /> Dengan Amanah dan Kepedulian
        </h1>
        <p className="text-gray-300 max-w-xl mx-auto text-sm md:text-base">
          Jejak Imani hadir untuk membantu jamaah merencanakan perjalanan umroh dengan informasi yang jelas, layanan yang nyaman, dan pendampingan yang penuh kepedulian.
        </p>
      </section>

      {/* STATS */}
      <section className="bg-[#1a1a2e] py-10">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "Amanah", label: "Dasar Pelayanan" },
            { value: "Responsif", label: "Konsultasi Jamaah" },
            { value: "Terarah", label: "Informasi Paket" },
            { value: "Nyaman", label: "Pendampingan Ibadah" },
          ].map((s, i) => (
            <div key={i}>
              <p className="text-[#d4af37] text-2xl md:text-3xl font-extrabold">
                {s.value}
              </p>
              <p className="text-gray-400 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* OUR STORY */}
      <section className="py-14 md:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-[#8B2070] font-semibold text-xs uppercase tracking-widest mb-3">
                Siapa Kami
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Layanan Perjalanan Ibadah yang Dibangun dengan Amanah
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Jejak Imani hadir untuk membantu calon jamaah memahami dan memilih layanan perjalanan umroh dengan lebih mudah. Kami menyadari bahwa perjalanan ke Tanah Suci bukan hanya soal keberangkatan, tetapi juga tentang kesiapan hati, kenyamanan, dan ketenangan sejak proses awal.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Karena itu, kami berupaya menghadirkan informasi paket yang jelas, pilihan fasilitas yang mudah dipahami, serta komunikasi yang responsif bagi jamaah. Setiap pertanyaan, kebutuhan, dan kekhawatiran jamaah kami pandang sebagai bagian penting dari proses pelayanan.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Bagi kami, umroh adalah perjalanan ibadah yang memiliki nilai spiritual tinggi. Oleh sebab itu, Jejak Imani berkomitmen membantu jamaah merencanakan perjalanan dengan lebih tertata, amanah, dan nyaman.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://raw.createusercontent.com/c99fcc57-c499-4d6f-a7ab-cf0ce94a2d99/"
                alt="Masjid al-Haram"
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* OUR VALUES */}
      <section className="py-12 md:py-16 bg-gray-50 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[#c0392b] font-semibold text-xs uppercase tracking-widest mb-2">
              Nilai yang Menggerakkan Kami
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Nilai-Nilai Kami
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map((v, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-[#f3e8f5] flex items-center justify-center flex-shrink-0">
                  <v.icon size={22} className="text-[#8B2070]" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">
                    {v.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-14 md:py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[#8B2070] font-semibold text-xs uppercase tracking-widest mb-2">
              Perjalanan Kami
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Langkah dan Komitmen Kami
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#f3e8f5] md:-translate-x-0.5" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div
                  key={i}
                  className={`relative flex gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-[#8B2070] border-2 border-white shadow md:-translate-x-1.5 mt-1.5" />
                  {/* Content */}
                  <div
                    className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-10" : "md:pl-10"}`}
                  >
                    <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-4">
                      <span className="text-[#8B2070] font-extrabold text-sm">
                        {m.year}
                      </span>
                      <h3 className="font-bold text-gray-900 text-sm mt-1">
                        {m.title}
                      </h3>
                      <p className="text-gray-500 text-xs leading-relaxed mt-1">
                        {m.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MEET THE TEAM */}
      <section className="py-12 md:py-16 bg-gray-50 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[#c0392b] font-semibold text-xs uppercase tracking-widest mb-2">
              The People Behind I'timaar
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Tim Kami
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {team.map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3"
                  style={{ backgroundColor: t.color }}
                >
                  {t.initials}
                </div>
                <h3 className="font-bold text-gray-900 text-sm leading-snug">
                  {t.name}
                </h3>
                <p className="text-[#8B2070] text-xs font-semibold mt-0.5 mb-2">
                  {t.role}
                </p>
                <p className="text-gray-500 text-xs leading-relaxed">{t.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="py-12 bg-[#1a1a2e] px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#d4af37] font-semibold text-xs uppercase tracking-widest mb-3">
            Komitmen Layanan
          </p>
          <h2 className="text-white text-xl md:text-3xl font-bold mb-8">
            Perjalanan Ibadah Lebih Tenang
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              {
                code: "Amanah",
                desc: "Informasi paket dan fasilitas disampaikan dengan jelas agar jamaah dapat mengambil keputusan dengan tenang.",
              },
              {
                code: "Transparan",
                desc: "Detail perjalanan, jadwal, hotel, dan layanan dijelaskan secara terbuka sesuai pilihan paket yang tersedia.",
              },
              {
                code: "Peduli",
                desc: "Jamaah dibantu sejak konsultasi awal hingga proses persiapan keberangkatan dengan pelayanan yang responsif.",
              },
            ].map((c, i) => (
              <div
                key={i}
                className="bg-white/10 rounded-2xl p-5 text-center w-full sm:w-auto sm:flex-1 max-w-xs"
              >
                <div className="border-2 border-[#d4af37] text-[#d4af37] font-extrabold text-2xl px-4 py-2 rounded-xl inline-block mb-3">
                  {c.code}
                </div>
                <p className="text-gray-300 text-xs leading-relaxed">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4 bg-white text-center">
        <p className="text-[#8B2070] font-semibold text-xs uppercase tracking-widest mb-3">
          Siap Memulai Perjalanan?
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Mulai Rencanakan Umroh Anda Hari Ini
        </h2>
        <p className="text-gray-500 text-sm max-w-md mx-auto mb-8">
          Hubungi tim Jejak Imani untuk konsultasi paket, jadwal, fasilitas, dan kebutuhan perjalanan umroh Anda.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/#packages"
            className="bg-[#8B2070] hover:bg-[#701a5a] text-white font-bold px-8 py-3.5 rounded-xl transition-colors"
          >
            View Our Paket Umroh
          </a>
          <a
            href="/contact"
            className="border-2 border-[#8B2070] text-[#8B2070] font-bold px-8 py-3.5 rounded-xl hover:bg-[#8B2070] hover:text-white transition-colors"
          >
            Kontak Us
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1a1a2e] text-gray-400 pt-8 pb-5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="bg-white/10 rounded-lg p-2 inline-block">
            <span className="text-[#d4af37] font-bold text-lg tracking-wide">
              Jejak Imani
            </span>
          </div>
          <p className="text-center">
            © 2025 I'timaar Travel Ltd. All rights reserved. Registered in
            England & Wales.
          </p>
          <div className="flex gap-4">
            <a href="/" className="hover:text-[#d4af37]">
              Beranda
            </a>
            <a href="/contact" className="hover:text-[#d4af37]">
              Kontak
            </a>
            <a href="/enquiry" className="hover:text-[#d4af37]">
              Konsultasi
            </a>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        body { font-family: 'Inter', sans-serif; }
      `}</style>
    </div>
  );
}


