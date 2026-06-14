import {
  ArrowRight,
  Calendar,
  CheckCircle,
  ChevronDown,
  Clock,
  HeartHandshake,
  Menu,
  MessageCircle,
  Plane,
  Shield,
  Star,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

const staticPackages = [
  {
    id: 1,
    title: "Umroh Ramadhan",
    total_nights: 9,
    makkah_hotel: "Hotel Makkah",
    makkah_nights: 5,
    madinah_hotel: "Hotel Madinah",
    madinah_nights: 4,
    stars: 5,
    price: "25000000",
    tag: "Premium",
    image: "",
    description: "Paket umroh Ramadhan dengan layanan nyaman dan terpercaya.",
  },
];

const defaultHomepage = {
  heroTitle: "Wujudkan Perjalanan Umroh yang Nyaman dan Terpercaya",
  heroSubtitle:
    "Niat Umroh membantu jamaah merencanakan perjalanan ibadah dengan paket yang jelas, pelayanan profesional, dan pendampingan dari awal hingga kembali ke tanah air.",
  primaryButtonText: "Konsultasi via WhatsApp",
  primaryButtonLink: "https://wa.me/6285825326780",
  secondaryButtonText: "Lihat Paket Umroh",
  secondaryButtonLink: "/packages",
  aboutTitle: "Tentang Niat Umroh",
  aboutDescription:
    "Niat Umroh hadir sebagai layanan perjalanan ibadah yang berkomitmen memberikan kemudahan, kenyamanan, dan ketenangan bagi jamaah dalam menunaikan ibadah umroh.",
};

const defaultFeatures = [
  {
    title: "Perjalanan Terencana",
    description:
      "Setiap paket disusun dengan jadwal yang jelas, fasilitas transparan, dan pendampingan yang memudahkan jamaah.",
  },
  {
    title: "Pendampingan Jamaah",
    description:
      "Tim kami membantu jamaah mulai dari konsultasi, persiapan dokumen, keberangkatan, hingga kembali ke tanah air.",
  },
  {
    title: "Layanan Terpercaya",
    description:
      "Kami mengutamakan kenyamanan, kejelasan informasi, dan pelayanan yang profesional bagi setiap jamaah.",
  },
];

const defaultFaq = [
  {
    question: "Apakah bisa konsultasi dulu sebelum memilih paket?",
    answer:
      "Bisa. Jamaah dapat berkonsultasi terlebih dahulu melalui WhatsApp untuk menyesuaikan paket dengan kebutuhan, jadwal, dan anggaran.",
  },
  {
    question: "Apakah harga paket sudah termasuk hotel dan transportasi?",
    answer:
      "Setiap paket memiliki fasilitas yang berbeda. Detail hotel, jumlah malam, dan fasilitas lain dapat dilihat pada halaman paket masing-masing.",
  },
  {
    question: "Bagaimana cara mendaftar paket umroh?",
    answer:
      "Pilih paket yang diminati, isi form enquiry, atau langsung hubungi admin melalui WhatsApp untuk dibantu proses pendaftaran.",
  },
];

const testimonials = [
  {
    name: "Jamaah Niat Umroh",
    text: "Pelayanannya sangat membantu dari awal konsultasi sampai persiapan keberangkatan. Informasinya jelas dan mudah dipahami.",
  },
  {
    name: "Calon Jamaah",
    text: "Paketnya mudah dibandingkan, detail hotel dan jadwalnya jelas. Sangat memudahkan untuk memilih paket yang sesuai.",
  },
  {
    name: "Keluarga Jamaah",
    text: "Admin responsif dan sabar menjelaskan kebutuhan perjalanan. Sangat membantu untuk jamaah yang baru pertama kali umroh.",
  },
];

function formatPrice(price) {
  if (!price) return "Hubungi Admin";

  const number = Number(String(price).replace(/[^\d]/g, ""));

  if (!number) return price;

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(number);
}

function getFeatureIcon(index) {
  const icons = [Shield, Users, Star, HeartHandshake, CheckCircle, Plane];
  return icons[index % icons.length];
}

export default function HomePage() {
  const [homepage, setHomepage] = useState(defaultHomepage);
  const [packages, setPackages] = useState(staticPackages);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    fetch("/api/homepage")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        if (data.homepage) {
          setHomepage({
            ...defaultHomepage,
            ...data.homepage,
          });
        }
      })
      .catch((err) => {
        console.error("Failed to load homepage content:", err);
      });
  }, []);

  useEffect(() => {
    fetch("/api/packages")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        if (data.packages && data.packages.length > 0) {
          setPackages(data.packages.filter((item) => item.active !== false));
        }
      })
      .catch((err) => {
        console.error("Failed to load packages:", err);
      });
  }, []);

  const features =
    homepage?.features && homepage.features.length > 0
      ? homepage.features
      : defaultFeatures;

  const faq =
    homepage?.faq && homepage.faq.length > 0 ? homepage.faq : defaultFaq;

  const featuredPackages = packages.slice(0, 3);

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[#8B2070] flex items-center justify-center text-white font-bold">
              NU
            </div>
            <div>
              <p className="font-extrabold text-lg leading-none">
                Niat Umroh
              </p>
              <p className="text-xs text-gray-500">Umroh & Travel Service</p>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
            <a href="/" className="hover:text-[#8B2070]">
              Home
            </a>
            <a href="/packages" className="hover:text-[#8B2070]">
              Paket Umroh
            </a>
            <a href="/blog" className="hover:text-[#8B2070]">
              Blog
            </a>
            <a href="#about" className="hover:text-[#8B2070]">
              Tentang Kami
            </a>
            <a href="#faq" className="hover:text-[#8B2070]">
              FAQ
            </a>
          </nav>

          <a
            href={homepage?.primaryButtonLink || defaultHomepage.primaryButtonLink}
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center gap-2 bg-[#8B2070] text-white px-5 py-3 rounded-full text-sm font-bold hover:bg-[#6f1859] transition-colors"
          >
            <MessageCircle size={18} />
            WhatsApp
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="md:hidden w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="fixed inset-0 z-50 bg-white px-4 py-4 md:hidden">
            <div className="flex items-center justify-between mb-8">
              <a href="/" className="font-extrabold text-xl">
                Niat Umroh
              </a>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="flex flex-col gap-5 text-lg font-semibold">
              <a href="/" onClick={() => setMenuOpen(false)}>
                Home
              </a>
              <a href="/packages" onClick={() => setMenuOpen(false)}>
                Paket Umroh
              </a>
              <a href="/blog" onClick={() => setMenuOpen(false)}>
                Blog
              </a>
              <a href="#about" onClick={() => setMenuOpen(false)}>
                Tentang Kami
              </a>
              <a href="#faq" onClick={() => setMenuOpen(false)}>
                FAQ
              </a>
              <a
                href={
                  homepage?.primaryButtonLink || defaultHomepage.primaryButtonLink
                }
                target="_blank"
                rel="noreferrer"
                className="bg-[#8B2070] text-white px-5 py-3 rounded-full text-center mt-4"
              >
                WhatsApp
              </a>
            </nav>
          </div>
        )}
      </header>

      <section className="relative min-h-screen bg-[#1a1a2e] text-white flex items-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#2a2040] to-[#8B2070]" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#d4af37]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6 text-sm">
              <Star size={16} className="text-[#d4af37]" />
              Perjalanan ibadah lebih nyaman dan terencana
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              {homepage?.heroTitle || defaultHomepage.heroTitle}
            </h1>

            <p className="text-lg text-gray-200 leading-8 mb-8 max-w-xl">
              {homepage?.heroSubtitle || defaultHomepage.heroSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={
                  homepage?.primaryButtonLink || defaultHomepage.primaryButtonLink
                }
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#d4af37] text-[#1a1a2e] px-6 py-4 rounded-full font-extrabold hover:bg-[#c49d25] transition-colors"
              >
                <MessageCircle size={20} />
                {homepage?.primaryButtonText ||
                  defaultHomepage.primaryButtonText}
              </a>

              <a
                href={
                  homepage?.secondaryButtonLink ||
                  defaultHomepage.secondaryButtonLink
                }
                className="inline-flex items-center justify-center gap-2 bg-white text-[#1a1a2e] px-6 py-4 rounded-full font-extrabold hover:bg-gray-100 transition-colors"
              >
                {homepage?.secondaryButtonText ||
                  defaultHomepage.secondaryButtonText}
                <ArrowRight size={20} />
              </a>
            </div>
          </div>

          <div className="bg-white/10 border border-white/20 rounded-3xl p-6 backdrop-blur">
            <div className="bg-white text-gray-900 rounded-2xl p-6 shadow-2xl">
              <p className="text-sm font-bold text-[#8B2070] mb-2">
                Paket Unggulan
              </p>

              <h2 className="text-2xl font-extrabold mb-4">
                Temukan Paket Umroh Terbaik
              </h2>

              <div className="space-y-4">
                {featuredPackages.slice(0, 2).map((item) => (
                  <a
                    key={item.id}
                    href={`/packages/${item.id}`}
                    className="block border border-gray-100 rounded-2xl p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-4">
                      <div className="w-20 h-20 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <Plane size={24} />
                          </div>
                        )}
                      </div>

                      <div>
                        <p className="font-extrabold">{item.title}</p>
                        <p className="text-sm text-gray-500">
                          {item.total_nights || 7} malam
                        </p>
                        <p className="text-[#8B2070] font-extrabold mt-1">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              <a
                href="/packages"
                className="mt-5 inline-flex items-center gap-2 text-[#8B2070] font-extrabold"
              >
                Lihat semua paket
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[#8B2070] font-bold uppercase tracking-wider mb-3">
              Tentang Kami
            </p>

            <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
              {homepage?.aboutTitle || defaultHomepage.aboutTitle}
            </h2>

            <p className="text-gray-600 leading-8 text-lg">
              {homepage?.aboutDescription || defaultHomepage.aboutDescription}
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mt-8">
              <div className="bg-gray-50 rounded-2xl p-5">
                <p className="text-3xl font-extrabold text-[#8B2070]">24/7</p>
                <p className="text-sm text-gray-500">Konsultasi Jamaah</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-5">
                <p className="text-3xl font-extrabold text-[#8B2070]">100%</p>
                <p className="text-sm text-gray-500">Informasi Transparan</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-5">
                <p className="text-3xl font-extrabold text-[#8B2070]">Aman</p>
                <p className="text-sm text-gray-500">Pendampingan Nyaman</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#8B2070] to-[#1a1a2e] rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-extrabold mb-6">
              Kenapa memilih Niat Umroh?
            </h3>

            <div className="space-y-5">
              {features.map((item, index) => {
                const Icon = getFeatureIcon(index);

                return (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center flex-shrink-0">
                      <Icon size={24} className="text-[#d4af37]" />
                    </div>

                    <div>
                      <h4 className="font-extrabold mb-1">{item.title}</h4>
                      <p className="text-gray-200 text-sm leading-6">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-[#8B2070] font-bold uppercase tracking-wider mb-3">
              Paket Umroh
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
              Paket Pilihan untuk Perjalanan Ibadah Anda
            </h2>
            <p className="text-gray-600 leading-7">
              Pilih paket yang sesuai dengan kebutuhan, jadwal, dan kenyamanan
              perjalanan jamaah.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredPackages.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow"
              >
                <a href={`/packages/${item.id}`}>
                  <div className="h-56 bg-gray-100 overflow-hidden relative">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Plane size={40} />
                      </div>
                    )}

                    {item.tag && (
                      <span className="absolute top-4 left-4 bg-[#d4af37] text-[#1a1a2e] px-3 py-1 rounded-full text-xs font-extrabold">
                        {item.tag}
                      </span>
                    )}
                  </div>
                </a>

                <div className="p-6">
                  <a href={`/packages/${item.id}`}>
                    <h3 className="text-xl font-extrabold mb-2 hover:text-[#8B2070]">
                      {item.title}
                    </h3>
                  </a>

                  <p className="text-gray-500 text-sm leading-6 mb-4">
                    {item.description ||
                      "Paket umroh dengan fasilitas pilihan dan pelayanan profesional."}
                  </p>

                  <div className="space-y-2 text-sm text-gray-600 mb-5">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-[#8B2070]" />
                      {item.total_nights || 7} malam
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-[#8B2070]" />
                      Makkah {item.makkah_nights || 0} malam · Madinah{" "}
                      {item.madinah_nights || 0} malam
                    </div>

                    <div className="flex items-center gap-2">
                      <Star size={16} className="text-[#8B2070]" />
                      Hotel bintang {item.stars || 4}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400">Mulai dari</p>
                      <p className="text-lg font-extrabold text-[#8B2070]">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    <a
                      href={`/packages/${item.id}`}
                      className="bg-[#8B2070] text-white px-4 py-3 rounded-full text-sm font-bold hover:bg-[#6f1859]"
                    >
                      Detail
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href="/packages"
              className="inline-flex items-center gap-2 bg-[#1a1a2e] text-white px-6 py-4 rounded-full font-extrabold hover:bg-[#8B2070] transition-colors"
            >
              Lihat Semua Paket
              <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-[#8B2070] font-bold uppercase tracking-wider mb-3">
            Testimoni
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            Apa Kata Jamaah
          </h2>
          <p className="text-gray-600 leading-7">
            Kepercayaan jamaah menjadi alasan kami terus memberikan pelayanan
            terbaik.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-3xl p-6">
              <div className="flex gap-1 text-[#d4af37] mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={18} fill="currentColor" />
                ))}
              </div>

              <p className="text-gray-600 leading-7 mb-5">“{item.text}”</p>

              <p className="font-extrabold text-gray-900">{item.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#8B2070] font-bold uppercase tracking-wider mb-3">
              FAQ
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold">
              Pertanyaan yang Sering Diajukan
            </h2>
          </div>

          <div className="space-y-4">
            {faq.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left font-extrabold"
                >
                  {item.question}
                  <ChevronDown
                    size={20}
                    className={`transition-transform ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openFaq === index && (
                  <div className="px-5 pb-5 text-gray-600 leading-7">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1a1a2e] text-white py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-5">
            Siap Merencanakan Perjalanan Umroh?
          </h2>

          <p className="text-gray-300 leading-8 max-w-2xl mx-auto mb-8">
            Hubungi admin Niat Umroh untuk konsultasi paket, jadwal, fasilitas,
            dan kebutuhan perjalanan ibadah Anda.
          </p>

          <a
            href={homepage?.primaryButtonLink || defaultHomepage.primaryButtonLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-[#d4af37] text-[#1a1a2e] px-7 py-4 rounded-full font-extrabold hover:bg-[#c49d25]"
          >
            <MessageCircle size={20} />
            {homepage?.primaryButtonText || defaultHomepage.primaryButtonText}
          </a>
        </div>
      </section>

      <footer className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-4 gap-8">
          <div>
            <p className="font-extrabold text-xl mb-3">Niat Umroh</p>
            <p className="text-gray-500 text-sm leading-6">
              Layanan perjalanan ibadah umroh yang membantu jamaah mendapatkan
              pengalaman perjalanan yang nyaman dan terpercaya.
            </p>
          </div>

          <div>
            <p className="font-extrabold mb-3">Menu</p>
            <div className="space-y-2 text-sm text-gray-500">
              <a href="/" className="block hover:text-[#8B2070]">
                Home
              </a>
              <a href="/packages" className="block hover:text-[#8B2070]">
                Paket Umroh
              </a>
              <a href="/blog" className="block hover:text-[#8B2070]">
                Blog
              </a>
            </div>
          </div>

          <div>
            <p className="font-extrabold mb-3">Layanan</p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>Konsultasi Umroh</p>
              <p>Paket Umroh</p>
              <p>Pendampingan Jamaah</p>
            </div>
          </div>

          <div>
            <p className="font-extrabold mb-3">Kontak</p>
            <a
              href={homepage?.primaryButtonLink || defaultHomepage.primaryButtonLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-[#8B2070] font-bold"
            >
              <MessageCircle size={18} />
              WhatsApp Admin
            </a>
          </div>
        </div>

        <div className="border-t border-gray-100 py-5 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Niat Umroh. All rights reserved.
        </div>
      </footer>

      <a
        href={homepage?.primaryButtonLink || defaultHomepage.primaryButtonLink}
        target="_blank"
        rel="noreferrer"
        className="fixed right-5 bottom-5 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl hover:scale-105 transition-transform"
        aria-label="Chat WhatsApp"
      >
        <MessageCircle size={28} />
      </a>
    </main>
  );
}