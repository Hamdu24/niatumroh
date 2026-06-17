"use client";
import { useEffect, useMemo, useState } from "react";
import { packages } from "../../data/packages";
import { Phone, Star, Moon, Plane, ArrowRight, CheckCircle } from "lucide-react";

const pageTitle = "Umroh Januari";
const pageSubtitle = "Awali tahun dengan perjalanan ibadah umroh yang nyaman, jelas, dan sesuai kebutuhan jamaah bersama Jejak Imani.";
const filterKeyword = "januari";

function formatPrice(price) {
  if (!price) return "Hubungi Admin";
  const raw = String(price);
  const numeric = Number(raw.replace(/[^\d]/g, ""));
  if (!numeric) return raw;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(numeric);
}

export default function UmrohLandingPage() {
  const [packages, setPackages] = useState(staticPackages);
  const whatsappNumber = "6281365400494";
  const whatsappText = encodeURIComponent(`Assalamu'alaikum, saya ingin konsultasi tentang ${pageTitle}.`);

  useEffect(() => {
    fetch("/api/packages")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        if (data.packages && data.packages.length > 0) {
          setPackages(data.packages);
        } else {
          setPackages(staticPackages);
        }
      })
      .catch(() => setPackages(staticPackages));
  }, []);

  const filteredPackages = useMemo(() => {
    const keyword = filterKeyword.toLowerCase();
    const result = packages.filter((pkg) => {
      const text = [
        pkg.title,
        pkg.tag,
        pkg.description,
        ...(Array.isArray(pkg.departures) ? pkg.departures : []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return text.includes(keyword);
    });

    return result.length > 0 ? result : packages;
  }, [packages]);

  return (
    <main className="min-h-screen bg-white text-gray-800 font-sans">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="bg-[#1a1a2e] rounded-lg p-2">
            <span className="text-[#d4af37] font-bold text-xl tracking-wide">
              Jejak Imani
            </span>
          </a>
          <div className="flex items-center gap-3">
            <a href="/" className="hidden sm:inline text-sm font-semibold text-gray-700 hover:text-[#c0392b]">
              Beranda
            </a>
            <a href="tel:+6281365400494" className="text-[#c0392b]">
              <Phone size={22} />
            </a>
          </div>
        </div>
      </header>

      <section
        className="relative px-4 py-16 md:py-24 text-center"
        style={{
          background:
            "linear-gradient(rgba(10,10,30,0.72), rgba(10,10,30,0.82)), url('https://raw.createusercontent.com/e9eeb71d-a49e-4ee0-b998-dfc68c349cc0/') center/cover no-repeat",
        }}
      >
        <p className="text-[#d4af37] font-semibold text-xs tracking-widest uppercase mb-3">
          Paket Umroh Januari
        </p>
        <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">
          {pageTitle}
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
          {pageSubtitle}
        </p>
        <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="#packages"
            className="bg-[#c0392b] hover:bg-[#a93226] text-white px-7 py-3.5 rounded-xl font-bold text-sm"
          >
            Lihat Paket
          </a>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`}
            target="_blank"
            rel="noreferrer"
            className="border-2 border-white text-white px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-white hover:text-[#1a1a2e] transition-colors"
          >
            Konsultasi WhatsApp
          </a>
        </div>
      </section>

      <section className="bg-[#1a1a2e] py-8 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          {[
            "Jadwal keberangkatan lebih terencana",
            "Pilihan hotel dan fasilitas jelas",
            "Admin siap bantu konsultasi jamaah",
          ].map((item) => (
            <div key={item} className="flex items-center justify-center gap-2 text-white text-sm font-semibold">
              <CheckCircle size={18} className="text-[#d4af37]" />
              {item}
            </div>
          ))}
        </div>
      </section>

      <section id="packages" className="py-12 md:py-16 bg-gray-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-[#8B2070] font-semibold text-xs uppercase tracking-widest mb-2">
              Pilihan Paket
            </p>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
              Paket yang Tersedia
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Pilih paket yang paling sesuai dengan kebutuhan, jadwal, dan kenyamanan perjalanan ibadah Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredPackages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-shadow flex flex-col">
                <div className="relative">
                  <img src={pkg.image} alt={pkg.title} className="w-full h-48 object-cover" />
                  {pkg.tag && (
                    <span className="absolute top-3 left-3 bg-[#8B2070] text-white text-xs font-bold px-3 py-1 rounded-full">
                      {pkg.tag}
                    </span>
                  )}
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <span className="inline-flex items-center gap-1 bg-[#f3e8f5] text-[#8B2070] text-xs font-bold px-3 py-1 rounded-full mb-3 w-fit">
                    <Moon size={11} className="fill-[#8B2070]" />
                    {pkg.total_nights || 7} Malam
                  </span>
                  <h3 className="font-bold text-gray-900 text-base mb-2 leading-snug">
                    {pkg.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4">
                    {pkg.description || "Paket perjalanan ibadah dengan fasilitas yang disiapkan untuk kenyamanan jamaah."}
                  </p>
                  <div className="space-y-1.5 text-xs text-gray-600 mb-4">
                    <p>🕋 {pkg.makkah_hotel || "Hotel Makkah"} {pkg.makkah_nights ? `(${pkg.makkah_nights} malam)` : ""}</p>
                    <p>🕌 {pkg.madinah_hotel || "Hotel Madinah"} {pkg.madinah_nights ? `(${pkg.madinah_nights} malam)` : ""}</p>
                    <p className="flex items-center gap-1">
                      {Array.from({ length: pkg.stars || 4 }).map((_, i) => (
                        <Star key={i} size={10} className="fill-[#f5a623] text-[#f5a623]" />
                      ))}
                    </p>
                  </div>
                  <div className="mt-auto">
                    <p className="text-xs text-gray-400">mulai dari</p>
                    <p className="text-xl font-extrabold text-gray-900 mb-4">
                      {formatPrice(pkg.price)}
                    </p>
                    <a
                      href={`/packages/${pkg.id}`}
                      className="w-full flex items-center justify-center gap-2 bg-[#8B2070] text-white py-3 rounded-xl text-xs font-bold hover:bg-[#701a5a] transition-colors"
                    >
                      Lihat Detail <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 px-4 text-center bg-white">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          Ingin Dibantu Memilih Paket?
        </h2>
        <p className="text-gray-500 text-sm max-w-xl mx-auto mb-7">
          Hubungi admin Jejak Imani untuk menyesuaikan paket dengan jadwal, anggaran, dan kebutuhan jamaah.
        </p>
        <a
          href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] text-white px-7 py-3.5 rounded-xl font-bold text-sm"
        >
          <Phone size={18} /> Chat WhatsApp
        </a>
      </section>
    </main>
  );
}


