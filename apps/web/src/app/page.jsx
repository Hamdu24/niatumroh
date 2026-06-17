"use client";
import { useState, useRef, useEffect } from "react";
import { packages as staticPackages } from "./data/packages"; // ✅ Jalur yang benar dan aman
import {
  Phone,
  ChevronDown,
  ChevronUp,
  Star,
  Plane,
  Building2,
  Car,
  Shield,
  Award,
  Users,
  TrendingDown,
  Menu,
  X,
  Moon,
  Luggage,
} from "lucide-react";

const faqs = [
  {
    q: "Apa saja yang termasuk dalam paket umroh?",
    a: "Paket umroh kami umumnya mencakup tiket pesawat pulang-pergi, akomodasi hotel di Makkah dan Madinah, transportasi, serta pengurusan visa. Beberapa paket juga dapat mencakup pendampingan ibadah dan program ziarah.",
  },
  {
    q: "Kapan sebaiknya saya memesan paket umroh?",
    a: "Kami menyarankan pemesanan dilakukan minimal 2–3 bulan sebelum keberangkatan, terutama untuk musim ramai seperti Ramadhan. Pemesanan lebih awal membantu jamaah mendapatkan pilihan jadwal, hotel, dan harga yang lebih baik.",
  },
  {
    q: "Apakah paket umroh dapat disesuaikan?",
    a: "Bisa. Kami menyediakan pilihan yang fleksibel, mulai dari bandara keberangkatan, kategori hotel, jumlah malam, hingga kebutuhan khusus jamaah selama perjalanan.",
  },
  {
    q: "Bagaimana proses pengurusan visa umroh?",
    a: "Tim kami akan membantu proses pengurusan visa umroh sesuai ketentuan yang berlaku. Jamaah cukup menyiapkan dokumen yang dibutuhkan, lalu kami bantu prosesnya sampai siap digunakan.",
  },
  {
    q: "Apakah saya bisa konsultasi sebelum memilih paket?",
    a: "Tentu. Jamaah dapat berkonsultasi terlebih dahulu agar paket yang dipilih sesuai dengan kebutuhan, jadwal, kenyamanan, dan anggaran perjalanan.",
  },
];

const features = [
  { icon: Award, value: "Terpercaya", label: "Pendampingan Ibadah yang Amanah" },
  {
    icon: TrendingDown,
    value: "Harga Jelas",
    label: "Informasi Paket Transparan",
  },
  {
    icon: Shield,
    value: "Aman",
    label: "Perjalanan Nyaman & Terencana",
  },
  { icon: Users, value: "Responsif", label: "Tim Siap Membantu Jamaah" },
];

const testimonials = [
  {
    name: "Ibu Fatimah R.",
    location: "Jakarta",
    pkg: "Paket Umroh Premium 5★",
    stars: 5,
    avatar: "F",
    color: "#8B2070",
    text: "Alhamdulillah, perjalanan umroh terasa sangat berkesan. Tim Jejak Imani membantu setiap kebutuhan dengan jelas, mulai dari persiapan dokumen, hotel, hingga arahan selama perjalanan. Sangat membantu untuk jamaah yang ingin beribadah dengan tenang.",
  },
  {
    name: "Bapak Tariq M.",
    location: "Surabaya",
    pkg: "Paket Umroh Standar 4★",
    stars: 5,
    avatar: "T",
    color: "#c0392b",
    text: "Kami berangkat bersama keluarga dan awalnya khawatir dengan pengaturan perjalanan. Namun semuanya terasa lebih mudah karena informasi jelas, admin responsif, dan jadwal perjalanan tertata dengan baik.",
  },
  {
    name: "Ibu Aisyah K.",
    location: "Bandung",
    pkg: "Paket Umroh Hemat 4★",
    stars: 5,
    avatar: "A",
    color: "#1a6b4a",
    text: "Awalnya saya ragu memilih travel, tetapi penjelasan dari tim sangat membantu. Detail paket, hotel, dan proses keberangkatan dijelaskan dengan sabar. Perjalanan ibadah terasa nyaman dan penuh ketenangan.",
  },
  {
    name: "Bapak Yusuf A.",
    location: "Makassar",
    pkg: "Paket Haji 5★",
    stars: 5,
    avatar: "Y",
    color: "#c8961a",
    text: "Alhamdulillah, perjalanan ibadah menjadi pengalaman yang sangat bermakna. Pendampingan yang diberikan membuat kami lebih siap dan lebih fokus menjalankan rangkaian ibadah.",
  },
  {
    name: "Ibu Nadia H.",
    location: "Medan",
    pkg: "Paket Umroh Standar 4★",
    stars: 5,
    avatar: "N",
    color: "#8B2070",
    text: "Ini umroh pertama ibu saya, jadi kami ingin memastikan beliau nyaman. Tim sangat membantu menjelaskan kebutuhan lansia, pilihan hotel, dan proses perjalanan. Kami sangat terbantu.",
  },
];

export default function HomePage() {
  const [packages, setPackages] = useState(staticPackages);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const sliderRef = useRef(null);
  const testimonialRef = useRef(null);
  const [search, setSearch] = useState({
    from: "",
    type: "Umroh",
    nights: "7 Malam",
    when: "",
  });

  useEffect(() => {
  fetch("/api/packages")
    .then((r) => (r.ok ? r.json() : Promise.reject()))
    .then((data) => {
      if (data.packages && data.packages.length > 0) {
        setPackages(data.packages);
      } else {
        setPackages(staticPackages);
      }
    })
    .catch((err) => {
      console.error("Gagal memuat paket", err);
      setPackages(staticPackages);
    });
}, []);

  const handleSliderScroll = () => {
    if (!sliderRef.current) return;
    const scrollLeft = sliderRef.current.scrollLeft;
    const cardWidth = sliderRef.current.offsetWidth;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveSlide(index);
  };

  const scrollToSlide = (index) => {
    if (!sliderRef.current) return;
    const cardWidth = sliderRef.current.offsetWidth;
    sliderRef.current.scrollTo({ left: index * cardWidth, behavior: "smooth" });
    setActiveSlide(index);
  };

  const handleTestimonialScroll = () => {
    if (!testimonialRef.current) return;
    const index = Math.round(
      testimonialRef.current.scrollLeft / testimonialRef.current.offsetWidth,
    );
    setActiveTestimonial(index);
  };

  const scrollToTestimonial = (index) => {
    if (!testimonialRef.current) return;
    testimonialRef.current.scrollTo({
      left: index * testimonialRef.current.offsetWidth,
      behavior: "smooth",
    });
    setActiveTestimonial(index);
  };

  return (
    <div className="min-h-screen font-sans bg-white text-gray-800">
      {/* HEADER */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-[#1a1a2e] rounded-lg p-2">
              <span className="text-[#d4af37] font-bold text-xl tracking-wide">
                Jejak Imani
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
            <a href="/" className="hover:text-[#c0392b] transition-colors">
              Beranda
            </a>

            <div className="relative group">
              <a
                href="/#packages"
                className="hover:text-[#c0392b] transition-colors flex items-center gap-1"
              >
                Paket Umroh
                <ChevronDown size={14} />
              </a>

              <div className="absolute left-0 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2">
                  <a
                    href="/umroh/desember"
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#fff5f3] hover:text-[#c0392b] transition-colors"
                  >
                    Umroh Desember
                  </a>
                  <a
                    href="/umroh/januari"
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#fff5f3] hover:text-[#c0392b] transition-colors"
                  >
                    Umroh Januari
                  </a>
                  <a
                    href="/umroh/februari"
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#fff5f3] hover:text-[#c0392b] transition-colors"
                  >
                    Umroh Februari
                  </a>
                  <a
                    href="/umroh/maret"
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#fff5f3] hover:text-[#c0392b] transition-colors"
                  >
                    Umroh Maret
                  </a>
                  <a
                    href="/umroh/ramadhan"
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#fff5f3] hover:text-[#c0392b] transition-colors"
                  >
                    Umroh Ramadhan
                  </a>
                  <a
                    href="/umroh/syawal"
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#fff5f3] hover:text-[#c0392b] transition-colors"
                  >
                    Umroh Syawal
                  </a>
                </div>
              </div>
            </div>

            <a
              href="/haji-plus"
              className="hover:text-[#c0392b] transition-colors"
            >
              Paket Haji Plus
            </a>
            <a href="/about" className="hover:text-[#c0392b] transition-colors">
              Tentang Kami
            </a>
            <a 
              href="/contact"
              className="hover:text-[#c0392b] transition-colors"
            >
              Kontak
            </a>
            <a href="/galeri" className="hover:text-[#c0392b] transition-colors">
               Galeri
            </a>
            <a
              href="/blog"
              className="hover:text-[#c0392b] transition-colors"
            >
              Blog
            </a>
          </nav>

          {/* Right */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Phone size={16} className="text-[#c0392b]" />
              <span className="font-semibold">+62 813 6540 0494</span>
            </div>
            <button className="bg-[#c0392b] text-white px-4 py-2 rounded text-sm font-semibold hover:bg-[#a93226] transition-colors">
              Minta Penawaran Terbaik
            </button>
          </div>

          {/* Mobile: phone tap-to-call + hamburger */}
          <div className="flex items-center gap-3 md:hidden">
            <a href="tel:+6281365400494" className="text-[#c0392b]">
              <Phone size={22} />
            </a>
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t px-4 py-4 flex flex-col gap-4 text-sm font-medium text-gray-700">
            <a href="/" onClick={() => setMenuOpen(false)}>
              Beranda
            </a>

            <div className="border-t border-gray-100 pt-3">
              <a
                href="/#packages"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between font-semibold text-gray-800"
              >
                Paket Umroh
                <ChevronDown size={16} className="text-[#c0392b]" />
              </a>

              <div className="mt-2 pl-4 flex flex-col gap-2 text-sm text-gray-600">
                <a href="/umroh/desember" onClick={() => setMenuOpen(false)}>
                  Umroh Desember
                </a>
                <a href="/umroh/januari" onClick={() => setMenuOpen(false)}>
                  Umroh Januari
                </a>
                <a href="/umroh/februari" onClick={() => setMenuOpen(false)}>
                  Umroh Februari
                </a>
                <a href="/umroh/maret" onClick={() => setMenuOpen(false)}>
                  Umroh Maret
                </a>
                <a href="/umroh/ramadhan" onClick={() => setMenuOpen(false)}>
                  Umroh Ramadhan
                </a>
                <a href="/umroh/syawal" onClick={() => setMenuOpen(false)}>
                  Umroh Syawal
                </a>
              </div>
            </div>

            <a href="/haji-plus" onClick={() => setMenuOpen(false)}>
              Paket Haji Plus
            </a>
            <a href="/about" onClick={() => setMenuOpen(false)}>
              Tentang Kami
            </a>
            <a href="/contact" onClick={() => setMenuOpen(false)}>
              Kontak
            </a>
            <a href="/galeri" onClick={() => setMenuOpen(false)}>
               Galeri
            </a>
            <a href="/blog" onClick={() => setMenuOpen(false)}>
              Blog
            </a>
            <div className="pt-2 border-t flex flex-col gap-2">
              <a href="tel:+6281365400494" className="flex items-center gap-2">
                <Phone size={16} className="text-[#c0392b]" />
                <span>+62 813 6540 0494</span>
              </a>
              <button className="bg-[#c0392b] text-white px-4 py-2.5 rounded text-sm font-semibold w-full">
                Minta Penawaran Terbaik
              </button>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-4 py-14 md:py-0 min-h-[520px] md:min-h-[620px]"
        style={{
          background:
            "linear-gradient(rgba(10,10,30,0.6), rgba(10,10,30,0.7)), url('https://raw.createusercontent.com/c99fcc57-c499-4d6f-a7ab-cf0ce94a2d99/') center/cover no-repeat",
        }}
      >
        <div className="z-10 max-w-4xl mx-auto w-full">
          <p className="text-[#d4af37] font-semibold text-xs md:text-sm tracking-widest uppercase mb-3">
            Mitra Perjalanan Ibadah Tepercaya
          </p>
          <h1 className="text-white text-2xl sm:text-3xl md:text-5xl font-bold leading-tight mb-3">
            Mitra Tepercaya untuk
            <br className="hidden md:block" /> Paket Haji dan Umroh
          </h1>
          <p className="text-gray-300 text-sm md:text-lg mb-8 max-w-xl mx-auto">
            Rencanakan perjalanan ibadah dengan nyaman, jelas, dan didampingi
            oleh tim yang siap membantu jamaah
          </p>

          {/* Search Box */}
          <div className="bg-white rounded-2xl shadow-2xl p-4 text-left max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
              <div>
                <label className="text-xs text-gray-500 font-medium block mb-1">
                  Berangkat Dari
                </label>
                <select
                  className="w-full border border-gray-200 rounded-lg px-2 py-2.5 text-sm focus:outline-none focus:border-[#8B2070]"
                  value={search.from}
                  onChange={(e) =>
                    setSearch({ ...search, from: e.target.value })
                  }
                >
                  <option value="">Bandara Mana Saja</option>
                  <option>Jakarta (CGK)</option>
                  <option>Surabaya (SUB)</option>
                  <option>Medan (KNO)</option>
                  <option>Makassar (UPG)</option>
                  <option>Yogyakarta (YIA)</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium block mb-1">
                  Jenis Paket
                </label>
                <select
                  className="w-full border border-gray-200 rounded-lg px-2 py-2.5 text-sm focus:outline-none focus:border-[#8B2070]"
                  value={search.type}
                  onChange={(e) =>
                    setSearch({ ...search, type: e.target.value })
                  }
                >
                  <option>Umroh</option>
                  <option>Haji</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium block mb-1">
                  Durasi
                </label>
                <select
                  className="w-full border border-gray-200 rounded-lg px-2 py-2.5 text-sm focus:outline-none focus:border-[#8B2070]"
                  value={search.nights}
                  onChange={(e) =>
                    setSearch({ ...search, nights: e.target.value })
                  }
                >
                  <option>7 Malam</option>
                  <option>10 Malam</option>
                  <option>14 Malam</option>
                  <option>21 Malam</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium block mb-1">
                  Waktu
                </label>
                <input
                  type="month"
                  className="w-full border border-gray-200 rounded-lg px-2 py-2.5 text-sm focus:outline-none focus:border-[#8B2070]"
                  value={search.when}
                  onChange={(e) =>
                    setSearch({ ...search, when: e.target.value })
                  }
                />
              </div>
            </div>
            <button className="w-full bg-[#c0392b] hover:bg-[#a93226] text-white font-bold py-3 rounded-xl text-sm transition-colors">
              🔍 Cari Paket
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-[#1a1a2e] py-10 md:py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-center text-white text-lg md:text-3xl font-bold mb-2">
            Mendampingi Jamaah dengan Pelayanan, Kepedulian, dan Amanah
          </h2>
          <p className="text-center text-gray-400 text-xs md:text-sm mb-8">
            Membantu jamaah merencanakan perjalanan ibadah dengan lebih tenang dan terarah
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {features.map((f, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="bg-[#d4af37] rounded-full w-11 h-11 md:w-14 md:h-14 flex items-center justify-center mb-3">
                  <f.icon size={20} className="text-[#1a1a2e]" />
                </div>
                <p className="text-white font-bold text-sm md:text-lg leading-tight">
                  {f.value}
                </p>
                <p className="text-gray-400 text-[10px] md:text-xs mt-1 leading-snug">
                  {f.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section id="packages" className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-10 px-4">
            <p className="text-[#8B2070] font-semibold text-xs uppercase tracking-widest mb-2">
              Paket Kami
            </p>
            <h2 className="text-xl md:text-4xl font-bold text-gray-800">
              Temukan Paket Haji dan Umroh yang Sesuai
            </h2>
            <p className="text-gray-500 mt-2 text-sm max-w-xl mx-auto">
              Pilih paket yang telah disusun untuk membantu perjalanan ibadah
              Anda menjadi lebih nyaman, jelas, dan bermakna.
            </p>
          </div>

          {/* Mobile: horizontal swipe slider */}
          <div className="md:hidden">
            <div
              ref={sliderRef}
              onScroll={handleSliderScroll}
              className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="flex-shrink-0 snap-start"
                  style={{ width: "100vw", padding: "0 16px" }}
                >
                  <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
                    <div className="relative">
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="w-full h-52 object-cover"
                      />
                      <span className="absolute top-3 left-3 bg-[#8B2070] text-white text-xs font-bold px-3 py-1 rounded-full">
                        {pkg.tag}
                      </span>
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <div className="mb-2">
                        <span className="inline-flex items-center gap-1 bg-[#f3e8f5] text-[#8B2070] text-xs font-bold px-3 py-1 rounded-full">
                          <Moon size={11} className="fill-[#8B2070]" />
                          {pkg.total_nights} Malam
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 text-sm mb-3 leading-snug">
                        {pkg.title}
                      </h3>
                      <div className="flex items-start gap-2 mb-3">
                        <div className="flex-1 min-w-0">
                          <div className="text-base mb-1">🕋</div>
                          <p className="text-[11px] text-gray-400 mb-0.5">
                            Hotel di Makkah
                          </p>
                          <p className="text-xs font-semibold text-[#8B2070] leading-tight mb-1">
                            {pkg.makkah_hotel}{" "}
                            <span className="text-gray-400 font-normal">
                              ({pkg.makkah_nights}N)
                            </span>
                          </p>
                          <div className="flex gap-0.5">
                            {Array.from({ length: pkg.stars }).map((_, i) => (
                              <Star
                                key={i}
                                size={9}
                                className="fill-[#f5a623] text-[#f5a623]"
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mt-5">
                          <span className="text-gray-500 font-bold text-xs">
                            +
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-base mb-1">🕌</div>
                          <p className="text-[11px] text-gray-400 mb-0.5">
                            Hotel di Madinah
                          </p>
                          <p className="text-xs font-semibold text-[#8B2070] leading-tight mb-1">
                            {pkg.madinah_hotel}{" "}
                            <span className="text-gray-400 font-normal">
                              ({pkg.madinah_nights}N)
                            </span>
                          </p>
                          <div className="flex gap-0.5">
                            {Array.from({ length: pkg.stars }).map((_, i) => (
                              <Star
                                key={i}
                                size={9}
                                className="fill-[#f5a623] text-[#f5a623]"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <hr className="border-gray-100 mb-3" />
                      <div className="flex items-center gap-2 mb-3">
                        <span>🧳</span>
                        <span className="text-xs font-semibold text-[#8B2070]">
                          Pesawat + Hotel + Transportasi
                        </span>
                      </div>
                      <hr className="border-gray-100 mb-3" />
                      <div className="mt-auto">
                        <div className="mb-4">
                          <span className="text-xs text-gray-400">mulai dari </span>
                          <span className="text-2xl font-extrabold text-gray-900">
                            {pkg.price}
                          </span>
                          <span className="text-xs text-gray-400">
                            {" "}
                            per jamaah
                          </span>
                        </div>
                        <div className="flex flex-col gap-2 pb-2">
                          <a
                            href={`/packages/${pkg.id}`}
                            className="w-full flex items-center justify-center bg-[#8B2070] text-white py-3 rounded-xl text-xs font-bold"
                          >
                            Lihat Detail Lengkap →
                          </a>
                          <button className="w-full flex items-center justify-center gap-2 border-2 border-[#8B2070] text-[#8B2070] py-3 rounded-xl text-xs font-bold">
                            <Phone size={13} /> Hubungi Admin Haji &amp; Umroh
                          </button>
                          <button className="w-full bg-[#c8961a] text-white py-3 rounded-xl text-xs font-bold">
                            Tanya Sekarang
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dot indicators */}
            <div className="flex justify-center gap-2 mt-4 mb-2">
              {packages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToSlide(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: activeSlide === i ? 20 : 8,
                    height: 8,
                    backgroundColor: activeSlide === i ? "#8B2070" : "#d1d5db",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Desktop: grid */}
          <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-4 gap-5 px-4">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow flex flex-col"
              >
                <div className="relative">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-48 object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-[#8B2070] text-white text-xs font-bold px-3 py-1 rounded-full">
                    {pkg.tag}
                  </span>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="mb-2">
                    <span className="inline-flex items-center gap-1 bg-[#f3e8f5] text-[#8B2070] text-xs font-bold px-3 py-1 rounded-full">
                      <Moon size={11} className="fill-[#8B2070]" />
                      {pkg.total_nights} Malam
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-base mb-3 leading-snug">
                    {pkg.title}
                  </h3>
                  <div className="flex items-start gap-2 mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="text-base mb-1">🕋</div>
                      <p className="text-[11px] text-gray-400 mb-0.5">
                        Hotel di Makkah
                      </p>
                      <p className="text-xs font-semibold text-[#8B2070] leading-tight mb-1">
                        {pkg.makkah_hotel}{" "}
                        <span className="text-gray-400 font-normal">
                          ({pkg.makkah_nights}N)
                        </span>
                      </p>
                      <div className="flex gap-0.5">
                        {Array.from({ length: pkg.stars }).map((_, i) => (
                          <Star
                            key={i}
                            size={9}
                            className="fill-[#f5a623] text-[#f5a623]"
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mt-5">
                      <span className="text-gray-500 font-bold text-xs">+</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-base mb-1">🕌</div>
                      <p className="text-[11px] text-gray-400 mb-0.5">
                        Hotel di Madinah
                      </p>
                      <p className="text-xs font-semibold text-[#8B2070] leading-tight mb-1">
                        {pkg.madinah_hotel}{" "}
                        <span className="text-gray-400 font-normal">
                          ({pkg.madinah_nights}N)
                        </span>
                      </p>
                      <div className="flex gap-0.5">
                        {Array.from({ length: pkg.stars }).map((_, i) => (
                          <Star
                            key={i}
                            size={9}
                            className="fill-[#f5a623] text-[#f5a623]"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <hr className="border-gray-100 mb-3" />
                  <div className="flex items-center gap-2 mb-3">
                    <span>🧳</span>
                    <span className="text-xs font-semibold text-[#8B2070]">
                      Pesawat + Hotel + Transportasi
                    </span>
                  </div>
                  <hr className="border-gray-100 mb-3" />
                  <div className="mt-auto">
                    <div className="mb-4">
                      <span className="text-xs text-gray-400">mulai dari </span>
                      <span className="text-2xl font-extrabold text-gray-900">
                        {pkg.price}
                      </span>
                      <span className="text-xs text-gray-400"> per jamaah</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <a
                        href={`/packages/${pkg.id}`}
                        className="w-full flex items-center justify-center bg-[#8B2070] text-white py-3 rounded-xl text-xs font-bold hover:bg-[#701a5a] transition-colors"
                      >
                        Lihat Detail Lengkap →
                      </a>
                      <button className="w-full flex items-center justify-center gap-2 border-2 border-[#8B2070] text-[#8B2070] py-3 rounded-xl text-xs font-bold hover:bg-[#8B2070] hover:text-white transition-colors">
                        <Phone size={13} /> Hubungi Admin Haji &amp; Umroh
                      </button>
                      <a
  href="/enquiry"
  className="w-full flex items-center justify-center bg-[#c8961a] hover:bg-[#b5841a] text-white py-3 rounded-xl text-xs font-bold transition-colors"
>
  Tanya Sekarang
</a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BANNER CTA */}
      <section
        className="py-14 md:py-20 px-4 text-center"
        style={{
          background:
            "linear-gradient(rgba(10,10,30,0.75), rgba(10,10,30,0.8)), url('https://raw.createusercontent.com/e9eeb71d-a49e-4ee0-b998-dfc68c349cc0/') center/cover no-repeat",
        }}
      >
        <p className="text-[#d4af37] text-xs font-semibold tracking-widest uppercase mb-3">
          Mulai Perjalanan Ibadah Anda
        </p>
        <h2 className="text-white text-2xl sm:text-3xl md:text-5xl font-bold mb-4">
          Perjalanan Haji dan Umroh yang Lebih Tenang
        </h2>
        <p className="text-gray-300 max-w-xl mx-auto mb-8 text-sm md:text-base">
          Biarkan kami membantu mengatur kebutuhan perjalanan, agar Anda dapat
          lebih fokus pada ibadah dan ketenangan hati.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button className="bg-[#c0392b] hover:bg-[#a93226] text-white font-bold px-8 py-3.5 rounded-xl transition-colors">
            Lihat Semua Paket
          </button>
          <button className="border-2 border-white text-white font-bold px-8 py-3.5 rounded-xl hover:bg-white hover:text-[#1a1a2e] transition-colors">
            Konsultasi dengan Admin
          </button>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-12 md:py-16 bg-white px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[#c0392b] font-semibold text-xs uppercase tracking-widest mb-2">
              Mengapa Memilih Kami
            </p>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800">
              Keunggulan Jejak Imani
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "Perjalanan Aman dan Terencana",
                desc: "Kami membantu memastikan proses pemesanan dan perjalanan ibadah Anda berjalan jelas, aman, dan nyaman dari awal hingga akhir.",
              },
              {
                icon: Award,
                title: "Pendampingan Berpengalaman",
                desc: "Tim kami siap membantu jamaah memahami kebutuhan perjalanan, persiapan ibadah, dan detail layanan selama perjalanan.",
              },
              {
                icon: Phone,
                title: "Dukungan Responsif",
                desc: "Kami mendampingi jamaah sejak konsultasi, proses persiapan, keberangkatan, hingga kembali ke tanah air.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="text-center p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-[#fef8ee] rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon size={24} className="text-[#d4af37]" />
                </div>
                <h3 className="font-bold text-gray-800 text-base mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section
        id="testimonials"
        className="py-12 md:py-16 bg-[#1a1a2e] overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-10 px-4">
            <p className="text-[#d4af37] font-semibold text-xs uppercase tracking-widest mb-2">
              Testimoni
            </p>
            <h2 className="text-xl md:text-4xl font-bold text-white">
              Cerita dari Jamaah Kami
            </h2>
            <p className="text-gray-400 mt-2 text-sm max-w-xl mx-auto">
              Jamaah mempercayakan perjalanan ibadah mereka kepada Jejak Imani.
              Berikut pengalaman mereka.
            </p>
          </div>

          {/* Mobile: swipe slider */}
          <div className="md:hidden">
            <div
              ref={testimonialRef}
              onScroll={handleTestimonialScroll}
              className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 snap-start"
                  style={{ width: "100vw", padding: "0 16px" }}
                >
                  <div className="bg-white/10 backdrop-blur rounded-2xl p-5 h-full flex flex-col">
                    {/* Stars */}
                    <div className="flex gap-1 mb-3">
                      {Array.from({ length: t.stars }).map((_, s) => (
                        <Star
                          key={s}
                          size={14}
                          className="fill-[#d4af37] text-[#d4af37]"
                        />
                      ))}
                    </div>
                    {/* Quote */}
                    <p className="text-gray-200 text-sm leading-relaxed flex-1 mb-4">
                      "{t.text}"
                    </p>
                    {/* Author */}
                    <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                        style={{ backgroundColor: t.color }}
                      >
                        {t.avatar}
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">
                          {t.name}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {t.location} · {t.pkg}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToTestimonial(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: activeTestimonial === i ? 20 : 8,
                    height: 8,
                    backgroundColor:
                      activeTestimonial === i ? "#d4af37" : "#ffffff40",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Desktop: grid 3 col */}
          <div className="hidden md:grid md:grid-cols-3 gap-5 px-4">
            {testimonials.slice(0, 3).map((t, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur rounded-2xl p-6 flex flex-col hover:bg-white/15 transition-colors"
              >
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.stars }).map((_, s) => (
                    <Star
                      key={s}
                      size={14}
                      className="fill-[#d4af37] text-[#d4af37]"
                    />
                  ))}
                </div>
                <p className="text-gray-200 text-sm leading-relaxed flex-1 mb-5">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ backgroundColor: t.color }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">
                      {t.location} · {t.pkg}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: bottom 2 centered */}
          <div className="hidden md:flex justify-center gap-5 px-4 mt-5">
            {testimonials.slice(3).map((t, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur rounded-2xl p-6 flex flex-col hover:bg-white/15 transition-colors w-full max-w-sm"
              >
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.stars }).map((_, s) => (
                    <Star
                      key={s}
                      size={14}
                      className="fill-[#d4af37] text-[#d4af37]"
                    />
                  ))}
                </div>
                <p className="text-gray-200 text-sm leading-relaxed flex-1 mb-5">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ backgroundColor: t.color }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">
                      {t.location} · {t.pkg}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Overall rating */}
          <div className="flex flex-col items-center mt-8 md:mt-10 px-4">
            <div className="flex gap-1 mb-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className="fill-[#d4af37] text-[#d4af37]"
                />
              ))}
            </div>
            <p className="text-white font-bold text-lg">4.9 / 5</p>
            <p className="text-gray-400 text-xs mt-1">
              Berdasarkan ulasan dari jamaah yang telah menggunakan layanan kami
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-12 md:py-16 bg-gray-50 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-[#c0392b] font-semibold text-xs uppercase tracking-widest mb-2">
              FAQ
            </p>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800">
              Pertanyaan yang Sering Diajukan
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between px-4 py-4 text-left font-semibold text-gray-800 text-sm hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="pr-3 leading-snug">{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp size={18} className="text-[#c0392b] shrink-0" />
                  ) : (
                    <ChevronDown size={18} className="text-gray-400 shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        id="contact"
        className="bg-[#1a1a2e] text-gray-400 pt-10 pb-6 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8">
            {/* Brand - spans 2 cols on mobile */}
            <div className="col-span-2 md:col-span-1">
              <div className="bg-white/10 rounded-lg p-3 inline-block mb-4">
                <span className="text-[#d4af37] font-bold text-xl tracking-wide">
                  Jejak Imani
                </span>
              </div>
              <p className="text-sm leading-relaxed text-gray-400 mb-4">
                Mitra perjalanan ibadah untuk membantu jamaah merencanakan
                paket haji dan umroh dengan lebih nyaman dan terarah.
              </p>
              <div className="flex gap-2">
                {["Amanah", "Terencana", "Responsif"].map((cert) => (
                  <span
                    key={cert}
                    className="border border-[#d4af37] text-[#d4af37] text-xs px-2 py-1 rounded font-bold"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">
                Tautan Cepat
              </h4>
              <ul className="space-y-2 text-sm">
                {[
                  { label: "Paket Umroh", href: "/#packages" },
                  { label: "Paket Haji", href: "/#packages" },
                  { label: "Tentang Kami", href: "/about" },
                  { label: "Kontak", href: "/contact" },
                  { label: "Tanya Sekarang", href: "/enquiry" },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="hover:text-[#d4af37] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">
                Layanan Kami
              </h4>
              <ul className="space-y-2 text-sm">
                {[
                  "Umroh Ekonomi",
                  "Umroh Standar",
                  "Umroh Premium",
                  "Paket Haji",
                  "Pendaftaran Rombongan",
                  "Layanan Visa",
                ].map((s) => (
                  <li key={s}>
                    <a
                      href="#"
                      className="hover:text-[#d4af37] transition-colors"
                    >
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">
                Hubungi Kami
              </h4>
              <div className="space-y-3 text-sm">
                <a
                  href="tel:+6281365400494"
                  className="flex items-center gap-2 hover:text-[#d4af37] transition-colors"
                >
                  <Phone size={14} className="text-[#d4af37] shrink-0" />
                  <span>+62 813 6540 0494</span>
                </a>
                <div>
                  <p className="text-gray-300 font-medium mb-1">
                    Jam Operasional
                  </p>
                  <p>Senin – Jumat: 09.00 – 18.00</p>
                  <p>Sabtu: 10.00 – 16.00</p>
                  <p>Minggu: Tutup</p>
                </div>
                <div>
                  <p className="text-gray-300 font-medium mb-1">Email Kami</p>
                  <a
                    href="mailto:info@jejakimani.com"
                    className="hover:text-[#d4af37] transition-colors break-all"
                  >
                    info@jejakimani.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
            <p className="text-center md:text-left">
              © 2025 Jejak Imani. Seluruh hak cipta dilindungi.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#" className="hover:text-[#d4af37]">
                Kebijakan Privasi
              </a>
              <a href="#" className="hover:text-[#d4af37]">
                Syarat & Ketentuan
              </a>
              <a href="#" className="hover:text-[#d4af37]">
                Kebijakan Cookie
              </a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
          </div>
  );
}


