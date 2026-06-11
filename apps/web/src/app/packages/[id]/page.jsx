"use client";
import { packages as staticPackages } from "@/data/packages";
import { useState, useEffect } from "react";
import {
  Phone,
  Star,
  Moon,
  Shield,
  Award,
  ChevronLeft,
  Check,
  MapPin,
  Plane,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";

export default function PackageDetailPage({ params }) {
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allPackages, setAllPackages] = useState([]);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [openDay, setOpenDay] = useState(0);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    departure: "",
    adults: "2",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
  fetch(`/api/packages/${params.id}`)
    .then((r) => (r.ok ? r.json() : Promise.reject()))
    .then((data) => {
      if (data.package) {
        setPkg(data.package);
      } else {
        const fallbackPackage = staticPackages.find(
          (item) => String(item.id) === String(params.id)
        );
        setPkg(fallbackPackage || null);
      }
    })
    .catch(() => {
      const fallbackPackage = staticPackages.find(
        (item) => String(item.id) === String(params.id)
      );
      setPkg(fallbackPackage || null);
    })
    .finally(() => setLoading(false));

  fetch("/api/packages")
    .then((r) => (r.ok ? r.json() : Promise.reject()))
    .then((data) => {
      if (data.packages && data.packages.length > 0) {
        setAllPackages(data.packages);
      } else {
        setAllPackages(staticPackages);
      }
    })
    .catch(() => {
      setAllPackages(staticPackages);
    });
}, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div
          className="w-8 h-8 border-2 border-[#8B2070] border-t-transparent rounded-full"
          style={{ animation: "spin 0.8s linear infinite" }}
        />
        <style
          jsx
          global
        >{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <p className="text-gray-500 text-lg mb-4">Package not found.</p>
        <a href="/#packages" className="text-[#8B2070] font-semibold underline">
          ← Back to Packages
        </a>
      </div>
    );
  }

  const hotelImages = Array.isArray(pkg.hotel_images) ? pkg.hotel_images : [];
  const includes = Array.isArray(pkg.includes) ? pkg.includes : [];
  const itinerary = Array.isArray(pkg.itinerary) ? pkg.itinerary : [];
  const departures = Array.isArray(pkg.departures) ? pkg.departures : [];
  const otherPackages = allPackages.filter((p) => p.id !== pkg.id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: form.name,
          email: form.email,
          phone: form.phone,
          package_name: pkg.title,
          departure: form.departure,
          adults: parseInt(form.adults) || 1,
          children: 0,
          message: form.message,
        }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitError("Something went wrong. Please try again or call us.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      {/* HEADER */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="bg-[#1a1a2e] rounded-lg p-2">
              <span className="text-[#d4af37] font-bold text-xl tracking-wide">
                I'TIMAAR
              </span>
            </div>
          </a>
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Phone size={16} className="text-[#c0392b]" />
              <span className="font-semibold">+44 20 1234 5678</span>
            </div>
            <button
              onClick={() => setShowEnquiry(true)}
              className="bg-[#c0392b] text-white px-4 py-2 rounded text-sm font-semibold hover:bg-[#a93226] transition-colors"
            >
              Enquire Now
            </button>
          </div>
          <a href="tel:+442012345678" className="md:hidden text-[#c0392b]">
            <Phone size={22} />
          </a>
        </div>
      </header>

      {/* HERO IMAGE */}
      <div className="relative h-64 md:h-[420px] w-full overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        {/* Back button */}
        <a
          href="/#packages"
          className="absolute top-4 left-4 flex items-center gap-1 bg-white/20 backdrop-blur text-white text-sm font-semibold px-3 py-1.5 rounded-full hover:bg-white/30 transition-colors"
        >
          <ChevronLeft size={16} /> Back
        </a>
        {/* Tag */}
        <span className="absolute top-4 right-4 bg-[#8B2070] text-white text-xs font-bold px-3 py-1 rounded-full">
          {pkg.tag}
        </span>
        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-5">
          <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
            <Moon size={11} className="fill-white" /> {pkg.total_nights} Nights
          </span>
          <h1 className="text-white text-xl md:text-3xl font-bold leading-tight">
            {pkg.title}
          </h1>
          <div className="flex gap-0.5 mt-1">
            {Array.from({ length: pkg.stars }).map((_, i) => (
              <Star
                key={i}
                size={13}
                className="fill-[#f5a623] text-[#f5a623]"
              />
            ))}
          </div>
        </div>
      </div>

      {/* PRICE BAR */}
      <div className="bg-[#1a1a2e] px-4 py-4 flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-xs">Starting from</p>
          <p className="text-white text-2xl font-extrabold">
            {pkg.price}{" "}
            <span className="text-gray-400 text-sm font-normal">
              per person
            </span>
          </p>
        </div>
        <div className="flex gap-2">
          <a
            href="tel:+442012345678"
            className="flex items-center gap-1.5 border-2 border-[#d4af37] text-[#d4af37] px-4 py-2 rounded-xl text-xs font-bold"
          >
            <Phone size={13} /> Call Us
          </a>
          <button
            onClick={() => setShowEnquiry(true)}
            className="bg-[#c8961a] text-white px-4 py-2 rounded-xl text-xs font-bold"
          >
            Enquire Now
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
        {/* DESCRIPTION */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            About This Package
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            {pkg.description}
          </p>
        </div>

        {/* HOTELS */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Your Hotels</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Makkah */}
            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              {hotelImages[0] && (
                <img
                  src={hotelImages[0]}
                  alt="Makkah Hotel"
                  className="w-full h-36 object-cover"
                />
              )}
              <div className="p-4">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-base">🕋</span>
                  <p className="text-xs text-gray-400 font-medium">Makkah</p>
                </div>
                <p className="font-bold text-[#8B2070] text-sm leading-snug">
                  {pkg.makkah_hotel}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {pkg.makkah_nights} nights
                </p>
                <div className="flex gap-0.5 mt-1.5">
                  {Array.from({ length: pkg.stars }).map((_, i) => (
                    <Star
                      key={i}
                      size={10}
                      className="fill-[#f5a623] text-[#f5a623]"
                    />
                  ))}
                </div>
              </div>
            </div>
            {/* Madinah */}
            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              {hotelImages[1] && (
                <img
                  src={hotelImages[1]}
                  alt="Madinah Hotel"
                  className="w-full h-36 object-cover"
                />
              )}
              <div className="p-4">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-base">🕌</span>
                  <p className="text-xs text-gray-400 font-medium">Madinah</p>
                </div>
                <p className="font-bold text-[#8B2070] text-sm leading-snug">
                  {pkg.madinah_hotel}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {pkg.madinah_nights} nights
                </p>
                <div className="flex gap-0.5 mt-1.5">
                  {Array.from({ length: pkg.stars }).map((_, i) => (
                    <Star
                      key={i}
                      size={10}
                      className="fill-[#f5a623] text-[#f5a623]"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* WHAT'S INCLUDED */}
        {includes.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              What's Included
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {includes.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#f3e8f5] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check
                      size={11}
                      className="text-[#8B2070]"
                      strokeWidth={3}
                    />
                  </div>
                  <p className="text-sm text-gray-700 leading-snug">{item}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ITINERARY */}
        {itinerary.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Itinerary</h2>
            <div className="space-y-2">
              {itinerary.map((item, i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-xl overflow-hidden"
                >
                  <button
                    className="w-full flex items-center justify-between px-4 py-3.5 text-left bg-white hover:bg-gray-50 transition-colors"
                    onClick={() => setOpenDay(openDay === i ? null : i)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="bg-[#8B2070] text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                        {item.day}
                      </span>
                      <span className="font-semibold text-gray-800 text-sm">
                        {item.title}
                      </span>
                    </div>
                    {openDay === i ? (
                      <ChevronUp
                        size={16}
                        className="text-[#8B2070] shrink-0"
                      />
                    ) : (
                      <ChevronDown
                        size={16}
                        className="text-gray-400 shrink-0"
                      />
                    )}
                  </button>
                  {openDay === i && (
                    <div className="px-4 pb-4 pt-1 text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50">
                      {item.desc}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* OTHER PACKAGES */}
        {otherPackages.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Other Packages
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {otherPackages.slice(0, 3).map((other) => (
                <a
                  key={other.id}
                  href={`/packages/${other.id}`}
                  className="group block rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="relative">
                    <img
                      src={other.image}
                      alt={other.title}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 bg-[#8B2070] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {other.tag}
                    </span>
                  </div>
                  <div className="p-3">
                    <span className="inline-flex items-center gap-1 bg-[#f3e8f5] text-[#8B2070] text-[10px] font-bold px-2 py-0.5 rounded-full mb-1.5">
                      <Moon size={9} className="fill-[#8B2070]" />
                      {other.total_nights} Nights
                    </span>
                    <p className="font-bold text-gray-900 text-xs leading-snug mb-1">
                      {other.title}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-base font-extrabold text-gray-900">
                        {other.price}
                      </span>
                      <span className="text-[#8B2070] text-xs font-bold group-hover:underline">
                        View →
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* TRUST BADGES */}
        <div className="bg-[#1a1a2e] rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-8 justify-center">
          {[
            { icon: Shield, label: "ATOL Protected" },
            { icon: Award, label: "ABTA & IATA Member" },
            { icon: Phone, label: "24/7 Support" },
          ].map((b, i) => (
            <div key={i} className="flex items-center gap-2 text-white">
              <b.icon size={18} className="text-[#d4af37]" />
              <span className="text-sm font-semibold">{b.label}</span>
            </div>
          ))}
        </div>

        {/* BOTTOM CTA */}
        <div className="flex flex-col sm:flex-row gap-3 pb-4">
          <a
            href="tel:+442012345678"
            className="flex-1 flex items-center justify-center gap-2 border-2 border-[#8B2070] text-[#8B2070] py-3.5 rounded-xl text-sm font-bold hover:bg-[#8B2070] hover:text-white transition-colors"
          >
            <Phone size={15} /> Call Our Expert
          </a>
          <button
            onClick={() => setShowEnquiry(true)}
            className="flex-1 bg-[#c8961a] hover:bg-[#b5841a] text-white py-3.5 rounded-xl text-sm font-bold transition-colors"
          >
            Enquire Now
          </button>
        </div>
      </div>

      {/* ENQUIRY MODAL */}
      {showEnquiry && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 px-0 sm:px-4">
          <div className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 text-base">
                Enquire About This Package
              </h3>
              <button
                onClick={() => setShowEnquiry(false)}
                className="text-gray-400 hover:text-gray-700"
              >
                <X size={22} />
              </button>
            </div>
            {submitted ? (
              <div className="px-5 py-10 text-center">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check
                    size={28}
                    className="text-green-600"
                    strokeWidth={2.5}
                  />
                </div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">
                  Enquiry Sent!
                </h4>
                <p className="text-gray-500 text-sm">
                  One of our experts will contact you within 24 hours.
                  JazakAllah Khair! 🤲
                </p>
                <button
                  onClick={() => {
                    setShowEnquiry(false);
                    setSubmitted(false);
                  }}
                  className="mt-6 bg-[#8B2070] text-white px-6 py-2.5 rounded-xl text-sm font-semibold"
                >
                  Close
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="px-5 py-5 space-y-3 overflow-y-auto max-h-[80vh]"
              >
                <p className="text-xs text-gray-500 mb-3">
                  Package:{" "}
                  <span className="font-semibold text-gray-800">
                    {pkg.title}
                  </span>
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-500 font-medium block mb-1">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Ahmed Ali"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#8B2070]"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-medium block mb-1">
                      Phone *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+44..."
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#8B2070]"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-medium block mb-1">
                    Email *
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="your@email.com"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#8B2070]"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-500 font-medium block mb-1">
                      Preferred Departure
                    </label>
                    <select
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#8B2070]"
                      value={form.departure}
                      onChange={(e) =>
                        setForm({ ...form, departure: e.target.value })
                      }
                    >
                      <option value="">Select...</option>
                      {departures.map((d, i) => (
                        <option key={i}>{d}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-medium block mb-1">
                      No. of Adults
                    </label>
                    <select
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#8B2070]"
                      value={form.adults}
                      onChange={(e) =>
                        setForm({ ...form, adults: e.target.value })
                      }
                    >
                      {["1", "2", "3", "4", "5", "6+"].map((n) => (
                        <option key={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-medium block mb-1">
                    Message (optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Any special requirements or questions..."
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#8B2070] resize-none"
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                  />
                </div>
                {submitError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-red-600 text-xs">
                    {submitError}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#c8961a] hover:bg-[#b5841a] text-white py-3 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <span
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full inline-block"
                      style={{ animation: "spin 0.7s linear infinite" }}
                    />
                  ) : (
                    "Send Enquiry"
                  )}
                </button>
                <p className="text-center text-[11px] text-gray-400">
                  We'll respond within 24 hours. Your info is 100% secure.
                </p>
              </form>
            )}
          </div>
        </div>
      )}

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        body { font-family: 'Inter', sans-serif; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
