"use client";
import Navbar from "../../components/Navbar";
import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Menu,
  X,
  Send,
  Check,
  MessageSquare,
  ChevronRight,
} from "lucide-react";

const offices = [
  {
    city: "Jakarta",
    address: "Jakarta, Indonesia",
    phone: "+62 858-2532-6780",
    email: "london@itimaar.co.uk",
    hours: "Senin–Jumat 09.00–17.00 · Sabtu 09.00–14.00",
    emoji: "🏙️",
  },
  {
    city: "Surabaya",
    address: "Surabaya, Indonesia",
    phone: "+62 858-2532-6780",
    email: "manchester@itimaar.co.uk",
    hours: "Senin–Jumat 09.00–17.00 · Sabtu 09.00–14.00",
    emoji: "🏙️",
  },
  {
    city: "Online",
    address: "Konsultasi online seluruh Indonesia",
    phone: "+62 858-2532-6780",
    email: "birmingham@itimaar.co.uk",
    hours: "Setiap hari sesuai jadwal konsultasi",
    emoji: "🏙️",
  },
];

export default function KontakPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const set = (f, v) => setForm((prev) => ({ ...prev, [f]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: form.name,
          email: form.email,
          phone: form.phone || "Tidak diisi",
          message: `[${form.subject}] ${form.message}`,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("Terjadi kendala. Silakan hubungi kami langsung melalui WhatsApp atau telepon.");
    } finally {
      setLoading(false);
    }
  };

  const valid = form.name.trim() && form.email.trim() && form.message.trim();

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      {/* HEADER */}
      <Navbar />

      {/* HERO */}
      <section className="bg-[#1a1a2e] py-12 md:py-16 px-4 text-center">
        <p className="text-[#d4af37] font-semibold text-xs uppercase tracking-widest mb-3">
          Hubungi Kami
        </p>
        <h1 className="text-white text-3xl md:text-4xl font-bold mb-3">
          Kami Siap Membantu Anda 🤲
        </h1>
        <p className="text-gray-400 max-w-lg mx-auto text-sm">
          Punya pertanyaan tentang paket umroh, jadwal keberangkatan, fasilitas, atau ingin konsultasi langsung? Tim kami siap membantu.
        </p>
      </section>

      {/* QUICK CONTACT CARDS */}
      <section className="bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a
            href="tel:+6285825326780"
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-shadow group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#fef3f3] flex items-center justify-center flex-shrink-0">
              <Phone size={22} className="text-[#c0392b]" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">Hubungi Kami</p>
              <p className="text-gray-500 text-xs mt-0.5">+62 858-2532-6780</p>
              <p className="text-[#c0392b] text-xs font-semibold mt-1 flex items-center gap-1">
                Telepon Sekarang <ChevronRight size={11} />
              </p>
            </div>
          </a>
          <a
            href="mailto:info@jejakimani.id"
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 rounded-xl bg-[#f3e8f5] flex items-center justify-center flex-shrink-0">
              <Mail size={22} className="text-[#8B2070]" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">Kirim Email</p>
              <p className="text-gray-500 text-xs mt-0.5">info@jejakimani.id</p>
              <p className="text-[#8B2070] text-xs font-semibold mt-1 flex items-center gap-1">
                Kirim Email <ChevronRight size={11} />
              </p>
            </div>
          </a>
          <a
            href="/enquiry"
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 rounded-xl bg-[#fef8ee] flex items-center justify-center flex-shrink-0">
              <MessageSquare size={22} className="text-[#c8961a]" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">Konsultasi Paket</p>
              <p className="text-gray-500 text-xs mt-0.5">
                Dapatkan respons maksimal 24 jam
              </p>
              <p className="text-[#c8961a] text-xs font-semibold mt-1 flex items-center gap-1">
                Konsultasi Sekarang <ChevronRight size={11} />
              </p>
            </div>
          </a>
        </div>
      </section>

      {/* CONTACT FORM + HOURS */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Form */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              Kirim Pesan kepada Kami
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Kami akan menghubungi Anda kembali maksimal dalam 24 jam, insyaAllah.
            </p>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check
                    size={28}
                    className="text-green-600"
                    strokeWidth={2.5}
                  />
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-2">
                  Pesan Berhasil Dikirim!
                </h3>
                <p className="text-gray-500 text-sm">
                  Jazakumullah khair. Tim kami akan segera menghubungi Anda.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({
                      name: "",
                      email: "",
                      phone: "",
                      subject: "",
                      message: "",
                    });
                  }}
                  className="mt-5 text-[#8B2070] text-sm font-semibold underline"
                >
                  Kirim pesan lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-500 font-medium block mb-1">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nama Anda"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8B2070] focus:ring-1 focus:ring-[#8B2070]"
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-medium block mb-1">
                      Nomor WhatsApp
                    </label>
                    <input
                      type="tel"
                      placeholder="+62 812..."
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8B2070] focus:ring-1 focus:ring-[#8B2070]"
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-medium block mb-1">
                    Alamat Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="emailanda@email.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8B2070] focus:ring-1 focus:ring-[#8B2070]"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-medium block mb-1">
                    Subjek
                  </label>
                  <select
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8B2070]"
                    value={form.subject}
                    onChange={(e) => set("subject", e.target.value)}
                  >
                    <option value="">Pilih topik...</option>
                    <option>Pertanyaan Paket Umroh</option>
                    <option>Pertanyaan Paket Haji</option>
                    <option>Pendaftaran Grup/Keluarga</option>
                    <option>Pertanyaan Dokumen/Visa</option>
                    <option>Pemesanan yang Sudah Ada</option>
                    <option>Pertanyaan Umum</option>
                    <option>Keluhan / Masukan</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-medium block mb-1">
                    Pesan *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Bagaimana kami bisa membantu Anda?"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8B2070] focus:ring-1 focus:ring-[#8B2070] resize-none"
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                  />
                </div>
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-xs">
                    {error}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={loading || !valid}
                  className="w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors"
                  style={{
                    backgroundColor: valid ? "#8B2070" : "#e5e7eb",
                    color: valid ? "#fff" : "#9ca3af",
                  }}
                >
                  {loading ? (
                    <span
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      style={{ animation: "spin 0.7s linear infinite" }}
                    />
                  ) : (
                    <>
                      <Send size={14} /> Kirim Pesan
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Hours + info */}
          <div className="space-y-6">
            <div className="bg-[#1a1a2e] rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={18} className="text-[#d4af37]" />
                <h3 className="text-white font-bold text-sm">Jam Layanan</h3>
              </div>
              <div className="space-y-2">
                {[
                  { day: "Senin – Jumat", hours: "09.00 – 17.00" },
                  { day: "Sabtu", hours: "09.00 – 14.00" },
                  { day: "Minggu", hours: "Tutup" },
                  { day: "Hari Libur Nasional", hours: "Tutup" },
                ].map((h, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-400">{h.day}</span>
                    <span
                      className={
                        h.hours === "Tutup"
                          ? "text-gray-500"
                          : "text-white font-semibold"
                      }
                    >
                      {h.hours}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-[#d4af37] text-xs font-semibold">
                  📞 Selama musim Ramadhan dan keberangkatan padat:
                </p>
                <p className="text-gray-300 text-xs mt-1">
                  Jam layanan dapat diperpanjang. Hubungi kami untuk informasi lebih lanjut.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <Mail size={16} className="text-[#8B2070]" />
                <h3 className="font-bold text-gray-900 text-sm">
                  Kontak Email
                </h3>
              </div>
              <div className="space-y-2 text-sm">
                {[
                  { dept: "Pertanyaan Umum", email: "info@jejakimani.id" },
                  { dept: "Paket Haji", email: "haji@jejakimani.id" },
                  { dept: "Paket Umroh", email: "umroh@jejakimani.id" },
                  { dept: "Layanan Dokumen/Visa", email: "dokumen@jejakimani.id" },
                ].map((e, i) => (
                  <div key={i}>
                    <p className="text-gray-500 text-xs">{e.dept}</p>
                    <a
                      href={`mailto:${e.email}`}
                      className="text-[#8B2070] font-semibold text-xs hover:underline"
                    >
                      {e.email}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OFFICES */}
      <section className="py-12 bg-gray-50 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-[#8B2070] font-semibold text-xs uppercase tracking-widest mb-2">
              Temukan Kami
            </p>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              Kanal Layanan Kami
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {offices.map((o, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
              >
                <p className="text-2xl mb-2">{o.emoji}</p>
                <h3 className="font-bold text-gray-900 text-sm mb-3">
                  {o.city} Office
                </h3>
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex gap-2">
                    <MapPin
                      size={12}
                      className="text-[#8B2070] shrink-0 mt-0.5"
                    />
                    <span>{o.address}</span>
                  </div>
                  <div className="flex gap-2">
                    <Phone
                      size={12}
                      className="text-[#8B2070] shrink-0 mt-0.5"
                    />
                    <a href={`tel:${o.phone}`} className="hover:text-[#8B2070]">
                      {o.phone}
                    </a>
                  </div>
                  <div className="flex gap-2">
                    <Mail
                      size={12}
                      className="text-[#8B2070] shrink-0 mt-0.5"
                    />
                    <a
                      href={`mailto:${o.email}`}
                      className="hover:text-[#8B2070] break-all"
                    >
                      {o.email}
                    </a>
                  </div>
                  <div className="flex gap-2">
                    <Clock
                      size={12}
                      className="text-[#8B2070] shrink-0 mt-0.5"
                    />
                    <span>{o.hours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
            © 2026 Jejak Imani. Seluruh hak cipta dilindungi.
          </p>
          <div className="flex gap-4">
            <a href="/" className="hover:text-[#d4af37]">
              Beranda
            </a>
            <a href="/about" className="hover:text-[#d4af37]">
              Tentang Kami
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
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}


