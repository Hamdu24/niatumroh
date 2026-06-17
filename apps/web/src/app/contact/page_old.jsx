"use client";
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
    city: "London",
    address: "142 Whitechapel High Street, London E1 7QX",
    phone: "+44 20 1234 5678",
    email: "london@itimaar.co.uk",
    hours: "Mon–Fri 9am–6pm · Sat 10am–4pm",
    emoji: "🏙️",
  },
  {
    city: "Manchester",
    address: "88 Wilmslow Road, Manchester M14 5AL",
    phone: "+44 161 234 5678",
    email: "manchester@itimaar.co.uk",
    hours: "Mon–Fri 9am–6pm · Sat 10am–4pm",
    emoji: "🏙️",
  },
  {
    city: "Birmingham",
    address: "55 Coventry Road, Birmingham B10 0TU",
    phone: "+44 121 234 5678",
    email: "birmingham@itimaar.co.uk",
    hours: "Mon–Fri 9am–6pm · Sat 10am–4pm",
    emoji: "🏙️",
  },
];

export default function ContactPage() {
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
          phone: form.phone || "N/A",
          message: `[${form.subject}] ${form.message}`,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please call us directly.");
    } finally {
      setLoading(false);
    }
  };

  const valid = form.name.trim() && form.email.trim() && form.message.trim();

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
            <a href="/about" className="hover:text-[#c0392b] transition-colors">
              About Us
            </a>
            <a href="/contact" className="text-[#8B2070] font-bold">
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
            <a href="/about" onClick={() => setMenuOpen(false)}>
              About Us
            </a>
            <a
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="text-[#8B2070] font-bold"
            >
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
      <section className="bg-[#1a1a2e] py-12 md:py-16 px-4 text-center">
        <p className="text-[#d4af37] font-semibold text-xs uppercase tracking-widest mb-3">
          Get In Touch
        </p>
        <h1 className="text-white text-3xl md:text-4xl font-bold mb-3">
          We're Here to Help 🤲
        </h1>
        <p className="text-gray-400 max-w-lg mx-auto text-sm">
          Whether you have a question about packages, need help with a booking,
          or just want to speak to an expert — we're ready.
        </p>
      </section>

      {/* QUICK CONTACT CARDS */}
      <section className="bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a
            href="tel:+442012345678"
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-shadow group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#fef3f3] flex items-center justify-center flex-shrink-0">
              <Phone size={22} className="text-[#c0392b]" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">Call Us</p>
              <p className="text-gray-500 text-xs mt-0.5">+44 20 1234 5678</p>
              <p className="text-[#c0392b] text-xs font-semibold mt-1 flex items-center gap-1">
                Call Now <ChevronRight size={11} />
              </p>
            </div>
          </a>
          <a
            href="mailto:info@itimaar.co.uk"
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 rounded-xl bg-[#f3e8f5] flex items-center justify-center flex-shrink-0">
              <Mail size={22} className="text-[#8B2070]" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">Email Us</p>
              <p className="text-gray-500 text-xs mt-0.5">info@itimaar.co.uk</p>
              <p className="text-[#8B2070] text-xs font-semibold mt-1 flex items-center gap-1">
                Send Email <ChevronRight size={11} />
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
              <p className="font-bold text-gray-900 text-sm">Book Enquiry</p>
              <p className="text-gray-500 text-xs mt-0.5">
                Get a quote in 24hrs
              </p>
              <p className="text-[#c8961a] text-xs font-semibold mt-1 flex items-center gap-1">
                Enquire Now <ChevronRight size={11} />
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
              Send Us a Message
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              We'll get back to you within 24 hours, inshAllah.
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
                  Message Sent!
                </h3>
                <p className="text-gray-500 text-sm">
                  JazakAllah Khair! We'll be in touch soon.
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
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-500 font-medium block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ahmed Ali"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8B2070] focus:ring-1 focus:ring-[#8B2070]"
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-medium block mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="+44 7700..."
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8B2070] focus:ring-1 focus:ring-[#8B2070]"
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-medium block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8B2070] focus:ring-1 focus:ring-[#8B2070]"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-medium block mb-1">
                    Subject
                  </label>
                  <select
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8B2070]"
                    value={form.subject}
                    onChange={(e) => set("subject", e.target.value)}
                  >
                    <option value="">Select a topic...</option>
                    <option>Umrah Package Enquiry</option>
                    <option>Hajj Package Enquiry</option>
                    <option>Group Booking</option>
                    <option>Visa Query</option>
                    <option>Existing Booking</option>
                    <option>General Question</option>
                    <option>Complaint / Feedback</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-medium block mb-1">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="How can we help you today?"
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
                      <Send size={14} /> Send Message
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
                <h3 className="text-white font-bold text-sm">Opening Hours</h3>
              </div>
              <div className="space-y-2">
                {[
                  { day: "Monday – Friday", hours: "9:00am – 6:00pm" },
                  { day: "Saturday", hours: "10:00am – 4:00pm" },
                  { day: "Sunday", hours: "Closed" },
                  { day: "Bank Holidays", hours: "Closed" },
                ].map((h, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-400">{h.day}</span>
                    <span
                      className={
                        h.hours === "Closed"
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
                  📞 During Hajj & Ramadan season:
                </p>
                <p className="text-gray-300 text-xs mt-1">
                  Extended hours available. Call us for details.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <Mail size={16} className="text-[#8B2070]" />
                <h3 className="font-bold text-gray-900 text-sm">
                  Email Departments
                </h3>
              </div>
              <div className="space-y-2 text-sm">
                {[
                  { dept: "General Enquiries", email: "info@itimaar.co.uk" },
                  { dept: "Hajj Packages", email: "hajj@itimaar.co.uk" },
                  { dept: "Umrah Packages", email: "umrah@itimaar.co.uk" },
                  { dept: "Visa Services", email: "visa@itimaar.co.uk" },
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
              Find Us
            </p>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              Our UK Offices
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
            <a href="/about" className="hover:text-[#d4af37]">
              About
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
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}


