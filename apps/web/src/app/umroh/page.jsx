"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "../../components/Navbar"; // ✅ Jalur yang benar
import { Star, Moon, ArrowRight, Phone } from "lucide-react";

export default function UmrohPage() {
  const [packages, setPackages] = useState([]);
  const [activeMonth, setActiveMonth] = useState("all");

  const months = [
    "all",
    "desember",
    "januari",
    "februari",
    "maret",
    "ramadhan",
    "syawal",
  ];

  <select
  value={editPkg.category || "umroh"}
  onChange={(e) =>
    setEditPkg({
      ...editPkg,
      category: e.target.value,
    })
  }
>
  <option value="umroh">Umroh</option>
  <option value="haji-plus">Haji Plus</option>
</select>

  useEffect(() => {
    fetch("/api/packages")
      .then((res) => res.json())
      .then((data) => {
        setPackages(data.packages || []);
      })
      .catch(() => setPackages([]));
  }, []);

  const filtered = useMemo(() => {
    if (activeMonth === "all") return packages;

    return packages.filter((p) => {
      const text = `${p.title} ${p.tag} ${p.description}`.toLowerCase();
      return (
        p.tag &&
        p.tag.toLowerCase() === activeMonth.toLowerCase()
        );
    });
  }, [packages, activeMonth]);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <div className="bg-[#1a1a2e] text-white py-16 text-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold">
          Paket Umroh Bulanan
        </h1>
        <p className="text-gray-300 mt-3 text-sm md:text-base">
          Pilih jadwal keberangkatan sesuai bulan yang Anda inginkan
        </p>
      </div>

      {/* FILTER BULAN */}
      <div className="flex flex-wrap justify-center gap-2 py-6 px-4">
        {months.map((m) => (
          <button
            key={m}
            onClick={() => setActiveMonth(m)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition ${
              activeMonth === m
                ? "bg-[#c0392b] text-white"
                : "bg-white text-gray-700 border"
            }`}
          >
            {m === "all" ? "Semua" : m.charAt(0).toUpperCase() + m.slice(1)}
          </button>
        ))}
      </div>

      {/* LIST PAKET */}
      <div className="max-w-7xl mx-auto px-4 pb-14 grid md:grid-cols-3 gap-5">
        {filtered.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={pkg.image}
              alt={pkg.title}
              className="h-48 w-full object-cover"
            />

            <div className="p-4">
              <span className="text-xs bg-[#f3e8f5] text-[#8B2070] px-3 py-1 rounded-full">
                <Moon size={12} className="inline mr-1" />
                {pkg.total_nights || 7} malam
              </span>

              <h3 className="font-bold text-gray-900 mt-3">
                {pkg.title}
              </h3>

              <p className="text-gray-500 text-sm mt-2">
                {pkg.description}
              </p>

              <div className="flex gap-1 mt-3">
                {Array.from({ length: pkg.stars || 4 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="text-yellow-500 fill-yellow-500"
                  />
                ))}
              </div>

              <div className="mt-4 flex justify-between items-center">
                <p className="font-bold text-gray-900">
                  Rp {pkg.price}
                </p>

                <a
                  href={`/packages/${pkg.id}`}
                  className="flex items-center gap-1 text-sm font-bold text-[#c0392b]"
                >
                  Detail <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center py-12 bg-white">
        <h2 className="text-xl font-bold mb-2">
          Butuh Bantuan Pilih Paket?
        </h2>

        <a
          href="https://wa.me/6285825326780"
          className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl font-bold mt-3"
        >
          <Phone size={18} />
          Chat WhatsApp
        </a>
      </div>
    </div>
  );
}


