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
    title: "I'timaar Founded",
    desc: "Started as a small family-run travel agency in East London, serving the local Muslim community.",
  },
  {
    year: "1993",
    title: "ATOL & ABTA Accredited",
    desc: "Received full ATOL and ABTA accreditation, cementing our commitment to fully protected travel.",
  },
  {
    year: "2001",
    title: "10,000 Pilgrims Served",
    desc: "A proud milestone — over 10,000 UK Muslims had trusted I'timaar for their sacred journey.",
  },
  {
    year: "2010",
    title: "Expanded to 6 UK Cities",
    desc: "Opened offices in London, Manchester, Birmingham, Bradford, Leicester and Edinburgh.",
  },
  {
    year: "2018",
    title: "IATA Certified",
    desc: "Became IATA certified, allowing us to offer the very best airline fares directly to our customers.",
  },
  {
    year: "2024",
    title: "50,000+ Happy Pilgrims",
    desc: "Alhamdulillah — over 50,000 UK Muslims have completed Hajj or Umrah through I'timaar.",
  },
];

const team = [
  {
    name: "Sheikh Abdullah Hussain",
    role: "Head of Hajj & Umrah Guidance",
    initials: "AH",
    color: "#8B2070",
    bio: "Over 25 years of experience guiding pilgrims. A qualified Islamic scholar who has performed Hajj 18 times.",
  },
  {
    name: "Sister Maryam Khan",
    role: "Head of Customer Care",
    initials: "MK",
    color: "#c0392b",
    bio: "15 years at I'timaar, ensuring every pilgrim feels supported from first enquiry to safe return home.",
  },
  {
    name: "Brother Omar Siddiq",
    role: "Senior Travel Consultant",
    initials: "OS",
    color: "#c8961a",
    bio: "Specialist in bespoke and group packages. Personally performed Umrah 12 times and Hajj 4 times.",
  },
  {
    name: "Sister Fatima Patel",
    role: "Visa & Documentation Lead",
    initials: "FP",
    color: "#1a6b4a",
    bio: "Expert in Saudi visa regulations with a 99.8% visa approval rate for I'timaar customers.",
  },
];

const values = [
  {
    icon: Heart,
    title: "Sincerity (Ikhlas)",
    desc: "We serve you as an act of worship. Every pilgrim is treated with the same care we would give our own family.",
  },
  {
    icon: Shield,
    title: "Trust (Amanah)",
    desc: "Your money and journey are in safe hands — ATOL, ABTA and IATA certified for your complete peace of mind.",
  },
  {
    icon: BookOpen,
    title: "Knowledge (Ilm)",
    desc: "Our team includes qualified Islamic scholars to ensure your journey is spiritually correct and fulfilling.",
  },
  {
    icon: Users,
    title: "Community (Ummah)",
    desc: "We are proud to serve the British Muslim community and give back through charitable initiatives each year.",
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
                I'TIMAAR
              </span>
            </div>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
            <a href="/" className="hover:text-[#c0392b] transition-colors">
              Home
            </a>
            <a
              href="/#packages"
              className="hover:text-[#c0392b] transition-colors"
            >
              Packages
            </a>
            <a href="/about" className="text-[#8B2070] font-bold">
              About Us
            </a>
            <a
              href="/contact"
              className="hover:text-[#c0392b] transition-colors"
            >
              Contact
            </a>
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Phone size={16} className="text-[#c0392b]" />
              <span className="font-semibold">+44 20 1234 5678</span>
            </div>
            <a
              href="/enquiry"
              className="bg-[#c0392b] text-white px-4 py-2 rounded text-sm font-semibold hover:bg-[#a93226] transition-colors"
            >
              Enquire Now
            </a>
          </div>
          <div className="flex items-center gap-3 md:hidden">
            <a href="tel:+442012345678" className="text-[#c0392b]">
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
              Home
            </a>
            <a href="/#packages" onClick={() => setMenuOpen(false)}>
              Packages
            </a>
            <a
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="text-[#8B2070] font-bold"
            >
              About Us
            </a>
            <a href="/contact" onClick={() => setMenuOpen(false)}>
              Contact
            </a>
            <div className="pt-2 border-t">
              <a
                href="/enquiry"
                className="block bg-[#c0392b] text-white px-4 py-2.5 rounded text-sm font-semibold text-center"
              >
                Enquire Now
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
          Our Story
        </p>
        <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight mb-4">
          39 Years Guiding Pilgrims
          <br className="hidden md:block" /> With Heart & Honour
        </h1>
        <p className="text-gray-300 max-w-xl mx-auto text-sm md:text-base">
          Since 1985, I'timaar has been the trusted partner of UK Muslims on
          their most sacred journey — Hajj and Umrah.
        </p>
      </section>

      {/* STATS */}
      <section className="bg-[#1a1a2e] py-10">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "1985", label: "Established" },
            { value: "50,000+", label: "Pilgrims Served" },
            { value: "39+", label: "Years Experience" },
            { value: "4.9★", label: "Average Rating" },
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
                Who We Are
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                A Family Business Built on Faith
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                I'timaar was founded in 1985 by Haji Mohammed Iqbal, a devoted
                Muslim who saw the struggles UK pilgrims faced when trying to
                book Hajj and Umrah. His vision was simple: treat every pilgrim
                as family, handle every detail with care, and make the journey
                to the Holy Land accessible for all.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Nearly four decades later, that same spirit lives on. Today,
                I'timaar is run by Haji Mohammed's children and grandchildren —
                a true family business — supported by a dedicated team of travel
                consultants, Islamic scholars, and visa specialists.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                We are fully ATOL, ABTA and IATA accredited, meaning your money
                and your journey are 100% protected. But more than that, we
                understand the spiritual weight of this journey — and we treat
                it with the reverence it deserves.
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
              What Drives Us
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Our Values
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
              Our Journey
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              39 Years of Milestones
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
              Meet Our Team
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
            Fully Accredited
          </p>
          <h2 className="text-white text-xl md:text-3xl font-bold mb-8">
            You're in Safe Hands
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              {
                code: "ATOL",
                desc: "Air Travel Organiser's Licence — your money is 100% protected by UK law.",
              },
              {
                code: "ABTA",
                desc: "Association of British Travel Agents — the highest standard of UK travel.",
              },
              {
                code: "IATA",
                desc: "International Air Transport Association — direct access to the best fares.",
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
          Ready to Begin?
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Start Your Sacred Journey Today
        </h2>
        <p className="text-gray-500 text-sm max-w-md mx-auto mb-8">
          Speak to one of our experts and let us plan the pilgrimage of a
          lifetime for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/#packages"
            className="bg-[#8B2070] hover:bg-[#701a5a] text-white font-bold px-8 py-3.5 rounded-xl transition-colors"
          >
            View Our Packages
          </a>
          <a
            href="/contact"
            className="border-2 border-[#8B2070] text-[#8B2070] font-bold px-8 py-3.5 rounded-xl hover:bg-[#8B2070] hover:text-white transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1a1a2e] text-gray-400 pt-8 pb-5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="bg-white/10 rounded-lg p-2 inline-block">
            <span className="text-[#d4af37] font-bold text-lg tracking-wide">
              I'TIMAAR
            </span>
          </div>
          <p className="text-center">
            © 2025 I'timaar Travel Ltd. All rights reserved. Registered in
            England & Wales.
          </p>
          <div className="flex gap-4">
            <a href="/" className="hover:text-[#d4af37]">
              Home
            </a>
            <a href="/contact" className="hover:text-[#d4af37]">
              Contact
            </a>
            <a href="/enquiry" className="hover:text-[#d4af37]">
              Enquire
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


