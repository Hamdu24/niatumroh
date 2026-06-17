"use client";

import Navbar from "../../components/Navbar";
import { Phone, CheckCircle, Star, Award, Users, Shield } from "lucide-react";

export default function HajiPlusPage() {
  const features = [
    {
      icon: Shield,
      title: "Aman & Terpercaya",
      desc: "Program resmi dengan layanan yang transparan dan aman untuk jamaah.",
    },
    {
      icon: Award,
      title: "Fasilitas Premium",
      desc: "Hotel dan layanan berkualitas untuk kenyamanan ibadah.",
    },
    {
      icon: Users,
      title: "Pendamping Profesional",
      desc: "Pembimbing berpengalaman selama perjalanan ibadah.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <div className="bg-[#1a1a2e] text-white py-16 text-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold">
          Paket Haji Plus
        </h1>
        <p className="text-gray-300 mt-3 text-sm md:text-base max-w-2xl mx-auto">
          Program Haji Plus dengan fasilitas lebih nyaman, pendampingan profesional, dan perjalanan yang lebih terencana.
        </p>
      </div>

      {/* FEATURES */}
      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-5">
        {features.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center"
          >
            <item.icon className="mx-auto text-[#c0392b] mb-3" size={28} />
            <h3 className="font-bold text-gray-900 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-500 text-sm">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* INFO SECTION */}
      <div className="bg-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Kenapa Memilih Haji Plus?
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Haji Plus memberikan kenyamanan lebih dengan waktu tunggu lebih singkat, fasilitas hotel lebih dekat ke Masjidil Haram dan Nabawi, serta bimbingan ibadah yang lebih intensif.
          </p>
        </div>
      </div>

      {/* CTA WHATSAPP */}
      <div className="text-center py-14 bg-gray-50">
        <h2 className="text-xl font-bold mb-2">
          Konsultasi Haji Plus Sekarang
        </h2>
        <p className="text-gray-500 text-sm mb-5">
          Dapatkan informasi lengkap mengenai paket, biaya, dan jadwal keberangkatan.
        </p>

        <a
          href="https://wa.me/6285825326780"
          className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl font-bold"
        >
          <Phone size={18} />
          Chat WhatsApp
        </a>
      </div>
    </div>
  );
}
<FloatingWhatsApp pageTitle="Paket Haji Plus" />

