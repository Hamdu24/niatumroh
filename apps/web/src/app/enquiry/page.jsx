"use client";
import { useState } from "react";
import {
  Phone,
  ChevronLeft,
  Check,
  Send,
  User,
  Mail,
  PhoneCall,
  Calendar,
  Users,
  Plane,
  PoundSterling,
  MessageSquare,
  Shield,
  Award,
} from "lucide-react";
import { packages } from "@/data/packages";

const airports = [
  "London Heathrow (LHR)",
  "London Gatwick (LGW)",
  "Manchester (MAN)",
  "Birmingham (BHX)",
  "Edinburgh (EDI)",
  "Leeds Bradford (LBA)",
  "Glasgow (GLA)",
];

const budgets = [
  "Under £900 per person",
  "£900 – £1,200 per person",
  "£1,200 – £2,000 per person",
  "£2,000 – £3,500 per person",
  "£3,500+ per person",
  "Flexible / Not sure yet",
];

const departures = [
  "January 2026",
  "February 2026",
  "March 2026",
  "Ramadan 2026",
  "May 2026",
  "June 2026",
  "July 2026",
  "Hajj 2026",
  "Flexible",
];

export default function EnquiryPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    package_name: "",
    departure: "",
    adults: "2",
    children: "0",
    airport: "",
    budget: "",
    message: "",
  });

  const set = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const step1Valid =
    form.full_name.trim() && form.email.trim() && form.phone.trim();
  const step2Valid = form.adults;

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          adults: parseInt(form.adults) || 1,
          children: parseInt(form.children) || 0,
        }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white font-sans flex flex-col">
        <header className="bg-white shadow-sm px-4 py-3 flex items-center justify-between">
          <a href="/">
            <div className="bg-[#1a1a2e] rounded-lg p-2">
              <span className="text-[#d4af37] font-bold text-xl tracking-wide">
                I'TIMAAR
              </span>
            </div>
          </a>
          <a href="tel:+442012345678" className="text-[#c0392b]">
            <Phone size={20} />
          </a>
        </header>
        <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-5">
            <Check size={36} className="text-green-600" strokeWidth={2.5} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Enquiry Received! 🤲
          </h2>
          <p className="text-gray-500 text-sm max-w-sm mb-2">
            JazakAllah Khair, <strong>{form.full_name}</strong>! One of our Hajj
            &amp; Umrah experts will contact you within{" "}
            <strong>24 hours</strong>.
          </p>
          <p className="text-gray-400 text-xs mb-8">
            A confirmation has been sent to <strong>{form.email}</strong>
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
            <a
              href="/"
              className="flex-1 border-2 border-[#8B2070] text-[#8B2070] py-3 rounded-xl text-sm font-bold text-center"
            >
              Back to Home
            </a>
            <a
              href="/#packages"
              className="flex-1 bg-[#8B2070] text-white py-3 rounded-xl text-sm font-bold text-center"
            >
              View Packages
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/">
            <div className="bg-[#1a1a2e] rounded-lg p-2">
              <span className="text-[#d4af37] font-bold text-xl tracking-wide">
                I'TIMAAR
              </span>
            </div>
          </a>
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-700">
            <Phone size={15} className="text-[#c0392b]" />
            <span className="font-semibold">+44 20 1234 5678</span>
          </div>
          <a href="tel:+442012345678" className="md:hidden text-[#c0392b]">
            <Phone size={20} />
          </a>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Page title */}
        <div className="mb-6">
          <a
            href="/#packages"
            className="inline-flex items-center gap-1 text-sm text-[#8B2070] font-semibold mb-3"
          >
            <ChevronLeft size={16} /> Back to Packages
          </a>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Book Your Sacred Journey
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Fill in your details and we'll get back to you within 24 hours.
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors"
                style={{
                  backgroundColor: step >= s ? "#8B2070" : "#e5e7eb",
                  color: step >= s ? "#fff" : "#9ca3af",
                }}
              >
                {step > s ? <Check size={13} strokeWidth={3} /> : s}
              </div>
              <span
                className="text-xs font-medium hidden sm:block"
                style={{ color: step >= s ? "#8B2070" : "#9ca3af" }}
              >
                {s === 1
                  ? "Your Details"
                  : s === 2
                    ? "Trip Info"
                    : "Final Message"}
              </span>
              {s < 3 && (
                <div
                  className="flex-1 h-0.5 ml-1"
                  style={{ backgroundColor: step > s ? "#8B2070" : "#e5e7eb" }}
                />
              )}
            </div>
          ))}
        </div>

        {/* STEP 1: Personal Details */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4">
            <h2 className="font-bold text-gray-800 text-base flex items-center gap-2">
              <User size={18} className="text-[#8B2070]" /> Your Contact Details
            </h2>
            <div>
              <label className="text-xs text-gray-500 font-medium block mb-1">
                Full Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Ahmed Ali"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8B2070] focus:ring-1 focus:ring-[#8B2070]"
                value={form.full_name}
                onChange={(e) => set("full_name", e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 font-medium block mb-1">
                Email Address *
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8B2070] focus:ring-1 focus:ring-[#8B2070]"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 font-medium block mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                placeholder="+44 7700 000000"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8B2070] focus:ring-1 focus:ring-[#8B2070]"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
              />
            </div>
            <button
              onClick={() => setStep(2)}
              disabled={!step1Valid}
              className="w-full py-3.5 rounded-xl text-sm font-bold transition-colors"
              style={{
                backgroundColor: step1Valid ? "#8B2070" : "#e5e7eb",
                color: step1Valid ? "#fff" : "#9ca3af",
              }}
            >
              Continue →
            </button>
          </div>
        )}

        {/* STEP 2: Trip Info */}
        {step === 2 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4">
            <h2 className="font-bold text-gray-800 text-base flex items-center gap-2">
              <Plane size={18} className="text-[#8B2070]" /> Your Trip
              Preferences
            </h2>
            <div>
              <label className="text-xs text-gray-500 font-medium block mb-1">
                Package Interested In
              </label>
              <select
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8B2070]"
                value={form.package_name}
                onChange={(e) => set("package_name", e.target.value)}
              >
                <option value="">Any / Not sure yet</option>
                {packages.map((p) => (
                  <option key={p.id} value={p.title}>
                    {p.title} — {p.price}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 font-medium block mb-1">
                  No. of Adults *
                </label>
                <select
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8B2070]"
                  value={form.adults}
                  onChange={(e) => set("adults", e.target.value)}
                >
                  {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"].map(
                    (n) => (
                      <option key={n}>{n}</option>
                    ),
                  )}
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium block mb-1">
                  No. of Children
                </label>
                <select
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8B2070]"
                  value={form.children}
                  onChange={(e) => set("children", e.target.value)}
                >
                  {["0", "1", "2", "3", "4", "5+"].map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 font-medium block mb-1">
                Preferred Departure
              </label>
              <select
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8B2070]"
                value={form.departure}
                onChange={(e) => set("departure", e.target.value)}
              >
                <option value="">Select month...</option>
                {departures.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 font-medium block mb-1">
                Departing Airport
              </label>
              <select
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8B2070]"
                value={form.airport}
                onChange={(e) => set("airport", e.target.value)}
              >
                <option value="">Select airport...</option>
                {airports.map((a) => (
                  <option key={a}>{a}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 font-medium block mb-1">
                Budget Per Person
              </label>
              <select
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8B2070]"
                value={form.budget}
                onChange={(e) => set("budget", e.target.value)}
              >
                <option value="">Select budget...</option>
                {budgets.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-3 pt-1">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3.5 rounded-xl text-sm font-bold border-2 border-gray-200 text-gray-500 hover:border-gray-300 transition-colors"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!step2Valid}
                className="flex-1 py-3.5 rounded-xl text-sm font-bold transition-colors"
                style={{ backgroundColor: "#8B2070", color: "#fff" }}
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Message + Review + Submit */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4">
              <h2 className="font-bold text-gray-800 text-base flex items-center gap-2">
                <MessageSquare size={18} className="text-[#8B2070]" /> Anything
                Else?
              </h2>
              <div>
                <label className="text-xs text-gray-500 font-medium block mb-1">
                  Special Requirements or Questions
                </label>
                <textarea
                  rows={4}
                  placeholder="e.g. Wheelchair assistance needed, specific hotel preference, group booking, dietary requirements..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#8B2070] focus:ring-1 focus:ring-[#8B2070] resize-none"
                  value={form.message}
                  onChange={(e) => set("message", e.target.value)}
                />
              </div>
            </div>

            {/* Summary card */}
            <div className="bg-[#f3e8f5] rounded-2xl p-4 border border-[#dbb8e0]">
              <p className="text-[#8B2070] font-bold text-sm mb-3">
                📋 Your Enquiry Summary
              </p>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Name</span>
                  <span className="font-semibold text-gray-800">
                    {form.full_name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Email</span>
                  <span className="font-semibold text-gray-800 text-right max-w-[55%] break-all">
                    {form.email}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Phone</span>
                  <span className="font-semibold text-gray-800">
                    {form.phone}
                  </span>
                </div>
                {form.package_name && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Package</span>
                    <span className="font-semibold text-gray-800 text-right max-w-[55%]">
                      {form.package_name}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-500">Travellers</span>
                  <span className="font-semibold text-gray-800">
                    {form.adults} adult{form.adults !== "1" ? "s" : ""}
                    {form.children !== "0"
                      ? `, ${form.children} child${form.children !== "1" ? "ren" : ""}`
                      : ""}
                  </span>
                </div>
                {form.departure && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Departure</span>
                    <span className="font-semibold text-gray-800">
                      {form.departure}
                    </span>
                  </div>
                )}
                {form.airport && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Airport</span>
                    <span className="font-semibold text-gray-800 text-right max-w-[55%]">
                      {form.airport}
                    </span>
                  </div>
                )}
                {form.budget && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Budget</span>
                    <span className="font-semibold text-gray-800 text-right max-w-[55%]">
                      {form.budget}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-sm">
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="flex-1 py-3.5 rounded-xl text-sm font-bold border-2 border-gray-200 text-gray-500 hover:border-gray-300 transition-colors"
              >
                ← Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors"
                style={{ backgroundColor: "#c8961a", color: "#fff" }}
              >
                {loading ? (
                  <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <>
                    <Send size={14} /> Send Enquiry
                  </>
                )}
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-4 pt-2 pb-4">
              {[
                { icon: Shield, label: "ATOL Protected" },
                { icon: Award, label: "ABTA & IATA" },
                { icon: PhoneCall, label: "24hr Response" },
              ].map((b, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 text-gray-500 text-xs"
                >
                  <b.icon size={13} className="text-[#8B2070]" />
                  {b.label}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
