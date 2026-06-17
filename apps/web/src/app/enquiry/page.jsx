"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import { Send, Phone, CheckCircle } from "lucide-react";

export default function EnquiryPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const isValid =
    form.name.trim() && form.phone.trim() && form.message.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValid) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: form.name,
          phone: form.phone,
          email: form.email,
          message: form.message,
          status: "new",
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit enquiry");
      }

      setSuccess(true);
      setForm({
        name: "",
        phone: "",
        email: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      setError("Gagal mengirim data. Silakan coba lagi atau hubungi WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Navbar />

      <section className="bg-[#1a1a2e] text-white py-16 text-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold">
          Konsultasi Paket
        </h1>
        <p className="text-gray-300 mt-3 text-sm md:text-base">
          Isi data berikut, lalu tim Jejak Imani akan menghubungi Anda.
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-12">
        {success ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
            <CheckCircle className="mx-auto text-green-600 mb-4" size={52} />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Enquiry Berhasil Dikirim
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Terima kasih. Tim kami akan segera menghubungi Anda.
            </p>
            <a
              href="/"
              className="inline-block bg-[#8B2070] text-white px-6 py-3 rounded-xl font-bold text-sm"
            >
              Kembali ke Beranda
            </a>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-4"
          >
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Nama Lengkap *
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full mt-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8B2070]"
                placeholder="Nama Anda"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">
                Nomor WhatsApp *
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="w-full mt-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8B2070]"
                placeholder="+62 812..."
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full mt-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8B2070]"
                placeholder="emailanda@email.com"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">
                Pesan *
              </label>
              <textarea
                rows={5}
                value={form.message}
                onChange={(e) => handleChange("message", e.target.value)}
                className="w-full mt-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8B2070] resize-none"
                placeholder="Saya ingin konsultasi paket umroh..."
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl p-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !isValid}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold transition"
              style={{
                backgroundColor: isValid ? "#8B2070" : "#e5e7eb",
                color: isValid ? "#fff" : "#9ca3af",
              }}
            >
              {loading ? "Mengirim..." : (
                <>
                  <Send size={16} />
                  Kirim Konsultasi
                </>
              )}
            </button>
          </form>
        )}
      </section>

      <section className="text-center pb-12 px-4">
        <p className="text-gray-500 text-sm mb-3">
          Ingin lebih cepat? Hubungi kami langsung melalui WhatsApp.
        </p>
        <a
          href="https://wa.me/6285825326780"
          className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl font-bold text-sm"
        >
          <Phone size={18} />
          Chat WhatsApp
        </a>
      </section>
    </div>
  );
}

