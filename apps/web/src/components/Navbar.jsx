"use client";

import { useState } from "react";
import { Phone, Menu, X, ChevronDown } from "lucide-react";

const umrohMenus = [
  { label: "Umroh Desember", href: "/umroh/desember" },
  { label: "Umroh Januari", href: "/umroh/januari" },
  { label: "Umroh Februari", href: "/umroh/februari" },
  { label: "Umroh Maret", href: "/umroh/maret" },
  { label: "Umroh Ramadhan", href: "/umroh/ramadhan" },
  { label: "Umroh Syawal", href: "/umroh/syawal" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const phoneNumber = "+62 813 6540 0494";
  const phoneLink = "tel:+6281365400494";

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
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
                {umrohMenus.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#fff5f3] hover:text-[#c0392b] transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <a href="/haji-plus" className="hover:text-[#c0392b] transition-colors">
            Paket Haji Plus
          </a>
          <a href="/about" className="hover:text-[#c0392b] transition-colors">
            Tentang Kami
          </a>
          <a href="/contact" className="hover:text-[#c0392b] transition-colors">
            Kontak
          </a>
          <a href="/galeri" className="hover:text-[#c0392b] transition-colors">
            Galeri
          </a>
          <a href="/blog" className="hover:text-[#c0392b] transition-colors">
            Blog
          </a>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a
            href={phoneLink}
            className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#c0392b]"
          >
            <Phone size={16} className="text-[#c0392b]" />
            <span className="font-semibold">{phoneNumber}</span>
          </a>

          <a
            href="/enquiry"
            className="bg-[#c0392b] text-white px-4 py-2 rounded text-sm font-semibold hover:bg-[#a93226] transition-colors"
          >
            Minta Penawaran Terbaik
          </a>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <a href={phoneLink} className="text-[#c0392b]">
            <Phone size={22} />
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

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
              {umrohMenus.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
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
            <a href={phoneLink} className="flex items-center gap-2">
              <Phone size={16} className="text-[#c0392b]" />
              <span>{phoneNumber}</span>
            </a>

            <a
              href="/enquiry"
              onClick={() => setMenuOpen(false)}
              className="block bg-[#c0392b] text-white px-4 py-2.5 rounded text-sm font-semibold text-center"
            >
              Minta Penawaran Terbaik
            </a>
          </div>
        </div>
      )}
    </header>
  );
}


