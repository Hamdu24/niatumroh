"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar"; // ✅ Jalur yang benar
import { Camera, PlayCircle } from "lucide-react";

export default function GaleriPage() {
  const [activeTab, setActiveTab] = useState("foto");

  const photos = [
    "https://images.unsplash.com/photo-1526772662000-3f88f10405ff",
    "https://images.unsplash.com/photo-1520975916090-3105956dac38",
    "https://images.unsplash.com/photo-1548013146-72479768bada",
    "https://images.unsplash.com/photo-1504198453319-5ce911bafcde",
    "https://images.unsplash.com/photo-1485738422979-f5c462d49f74",
    "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1"
  ];

  const videos = [
    "https://www.youtube.com/embed/1t5C6k8s8f0",
    "https://www.youtube.com/embed/ysz5S6PUM-U"
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* NAVBAR GLOBAL */}
      <Navbar />

      {/* HERO */}
      <div className="bg-[#1a1a2e] text-white py-16 text-center">
        <h1 className="text-3xl md:text-5xl font-bold">
          Galeri Jejak Imani
        </h1>
        <p className="text-gray-300 mt-3 text-sm md:text-base">
          Momen perjalanan ibadah jamaah di Tanah Suci
        </p>
      </div>

      {/* TAB */}
      <div className="flex justify-center gap-3 mt-8">
        <button
          onClick={() => setActiveTab("foto")}
          className={`px-5 py-2 rounded-full text-sm font-bold ${
            activeTab === "foto"
              ? "bg-[#c0392b] text-white"
              : "bg-white text-gray-700"
          }`}
        >
          <Camera size={16} className="inline mr-1" />
          Foto Jamaah
        </button>

        <button
          onClick={() => setActiveTab("video")}
          className={`px-5 py-2 rounded-full text-sm font-bold ${
            activeTab === "video"
              ? "bg-[#c0392b] text-white"
              : "bg-white text-gray-700"
          }`}
        >
          <PlayCircle size={16} className="inline mr-1" />
          Video Perjalanan
        </button>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* FOTO */}
        {activeTab === "foto" && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="galeri"
                className="rounded-xl object-cover h-40 md:h-52 w-full hover:scale-105 transition"
              />
            ))}
          </div>
        )}

        {/* VIDEO */}
        {activeTab === "video" && (
          <div className="grid md:grid-cols-2 gap-5">
            {videos.map((vid, i) => (
              <iframe
                key={i}
                className="w-full h-64 rounded-xl"
                src={vid}
                title="video"
                allowFullScreen
              />
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="text-center py-12 bg-white">
        <h2 className="text-xl font-bold mb-2">
          Siap Menjadi Bagian Perjalanan Ini?
        </h2>
        <a
          href="https://wa.me/6285825326780"
          className="inline-block mt-3 bg-[#25D366] text-white px-6 py-3 rounded-xl font-bold"
        >
          Chat WhatsApp Sekarang
        </a>
      </div>

    </div>
  );
}

