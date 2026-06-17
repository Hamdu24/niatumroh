"use client";
import { useState, useEffect } from "react";
import {
  Phone,
  Mail,
  User,
  Calendar,
  Plane,
  RefreshCw,
  CheckCircle,
  Clock,
  XCircle,
  Users,
} from "lucide-react";

const statusColors = {
  new: { bg: "#fef3c7", text: "#92400e", label: "New" },
  contacted: { bg: "#dbeafe", text: "#1e40af", label: "Contacted" },
  converted: { bg: "#d1fae5", text: "#065f46", label: "Converted" },
  closed: { bg: "#f3f4f6", text: "#6b7280", label: "Closed" },
};

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState(null);

  const fetchEnquiries = async () => {
    setLoading(true);
    setError(null);
    try {
      const url =
        filter === "all" ? "/api/enquiries" : `/api/enquiries?status=${filter}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setEnquiries(data.enquiries || []);
    } catch (err) {
      console.error(err);
      setError("Could not load enquiries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [filter]);

  const updateStatus = async (id, status) => {
    try {
      await fetch(`/api/enquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status } : e)),
      );
      if (selected?.id === id) setSelected((s) => ({ ...s, status }));
    } catch (err) {
      console.error(err);
    }
  };

  const counts = {
    all: enquiries.length,
    new: enquiries.filter((e) => e.status === "new").length,
    contacted: enquiries.filter((e) => e.status === "contacted").length,
    converted: enquiries.filter((e) => e.status === "converted").length,
  };

  const displayed =
    filter === "all" ? enquiries : enquiries.filter((e) => e.status === filter);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-[#1a1a2e] px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a href="/admin">
            <div className="bg-white/10 rounded-lg p-2">
              <span className="text-[#d4af37] font-bold text-lg tracking-wide">
                I'TIMAAR
              </span>
            </div>
          </a>
          <span className="text-gray-400 text-sm hidden sm:block">
            /{" "}
            <a href="/admin" className="hover:text-white transition-colors">
              Admin
            </a>{" "}
            / Enquiries
          </span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/admin/packages"
            className="text-gray-400 text-xs border border-white/20 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            📦 Packages
          </a>
          <button
            onClick={fetchEnquiries}
            className="flex items-center gap-1.5 text-gray-300 text-sm border border-white/20 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <RefreshCw size={13} /> Refresh
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-5">
          <h1 className="text-xl font-bold text-gray-900">
            Enquiry Management
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">
            All incoming Hajj &amp; Umrah booking enquiries
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { key: "all", label: "Total", icon: Users, color: "#8B2070" },
            { key: "new", label: "New", icon: Clock, color: "#d97706" },
            {
              key: "contacted",
              label: "Contacted",
              icon: Phone,
              color: "#2563eb",
            },
            {
              key: "converted",
              label: "Converted",
              icon: CheckCircle,
              color: "#059669",
            },
          ].map((s) => (
            <div
              key={s.key}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3"
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: s.color + "18" }}
              >
                <s.icon size={16} style={{ color: s.color }} />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">
                  {filter === "all" || s.key === "all"
                    ? s.key === "all"
                      ? enquiries.length
                      : enquiries.filter((e) => e.status === s.key).length
                    : s.key === filter
                      ? displayed.length
                      : enquiries.filter((e) => e.status === s.key).length}
                </p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
          {["all", "new", "contacted", "converted", "closed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-colors"
              style={{
                backgroundColor: filter === f ? "#8B2070" : "#fff",
                color: filter === f ? "#fff" : "#6b7280",
                border: filter === f ? "none" : "1px solid #e5e7eb",
              }}
            >
              {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
              {f === "new" &&
                enquiries.filter((e) => e.status === "new").length > 0 && (
                  <span className="ml-1.5 bg-white text-[#8B2070] rounded-full px-1.5 text-[10px] font-bold">
                    {enquiries.filter((e) => e.status === "new").length}
                  </span>
                )}
            </button>
          ))}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-sm mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-16">
            <div
              className="w-8 h-8 border-2 border-[#8B2070] border-t-transparent rounded-full"
              style={{ animation: "spin 0.8s linear infinite" }}
            />
          </div>
        ) : displayed.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Users size={40} className="mx-auto mb-3 opacity-30" />
            <p className="font-semibold">No enquiries yet</p>
            <p className="text-sm mt-1">
              Enquiries submitted via the website will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {displayed.map((enq) => {
              const st = statusColors[enq.status] || statusColors.new;
              return (
                <div
                  key={enq.id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelected(enq)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#f3e8f5] flex items-center justify-center flex-shrink-0">
                        <span className="text-[#8B2070] font-bold text-sm">
                          {enq.full_name?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">
                          {enq.full_name}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {timeAgo(enq.created_at)}
                        </p>
                      </div>
                    </div>
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
                      style={{ backgroundColor: st.bg, color: st.text }}
                    >
                      {st.label}
                    </span>
                  </div>

                  <div className="space-y-1.5 mb-3">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Mail size={11} className="text-gray-400 shrink-0" />{" "}
                      {enq.email}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Phone size={11} className="text-gray-400 shrink-0" />{" "}
                      {enq.phone}
                    </div>
                    {enq.package_name && (
                      <div className="flex items-center gap-2 text-xs text-[#8B2070] font-semibold">
                        <Plane size={11} className="shrink-0" />{" "}
                        {enq.package_name}
                      </div>
                    )}
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>
                        👥 {enq.adults} adult{enq.adults !== 1 ? "s" : ""}
                        {enq.children > 0 ? `, ${enq.children} child` : ""}
                      </span>
                      {enq.departure && <span>📅 {enq.departure}</span>}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-gray-50">
                    <a
                      href={`tel:${enq.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 flex items-center justify-center gap-1 border border-[#8B2070] text-[#8B2070] py-1.5 rounded-lg text-xs font-semibold hover:bg-[#8B2070] hover:text-white transition-colors"
                    >
                      <Phone size={11} /> Call
                    </a>
                    <a
                      href={`mailto:${enq.email}`}
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 flex items-center justify-center gap-1 border border-gray-200 text-gray-600 py-1.5 rounded-lg text-xs font-semibold hover:bg-gray-50 transition-colors"
                    >
                      <Mail size={11} /> Email
                    </a>
                    {enq.status === "new" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateStatus(enq.id, "contacted");
                        }}
                        className="flex-1 flex items-center justify-center gap-1 bg-blue-50 text-blue-700 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-colors"
                      >
                        <CheckCircle size={11} /> Mark Contacted
                      </button>
                    )}
                    {enq.status === "contacted" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateStatus(enq.id, "converted");
                        }}
                        className="flex-1 flex items-center justify-center gap-1 bg-green-50 text-green-700 py-1.5 rounded-lg text-xs font-semibold hover:bg-green-100 transition-colors"
                      >
                        <CheckCircle size={11} /> Converted ✓
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Detail drawer */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-end bg-black/40"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white w-full sm:max-w-md h-[85vh] sm:h-full sm:rounded-l-2xl shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between">
              <h3 className="font-bold text-gray-900">Enquiry Details</h3>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold"
              >
                ✕
              </button>
            </div>
            <div className="px-5 py-5 space-y-4">
              {/* Status */}
              <div>
                <p className="text-xs text-gray-400 font-medium mb-2">Status</p>
                <div className="flex gap-2 flex-wrap">
                  {["new", "contacted", "converted", "closed"].map((s) => {
                    const st = statusColors[s];
                    return (
                      <button
                        key={s}
                        onClick={() => updateStatus(selected.id, s)}
                        className="px-3 py-1 rounded-full text-xs font-semibold border-2 transition-all"
                        style={{
                          backgroundColor:
                            selected.status === s ? st.bg : "transparent",
                          color: st.text,
                          borderColor: st.text + "40",
                        }}
                      >
                        {st.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Contact */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                <p className="text-xs text-gray-400 font-medium">Contact</p>
                <p className="font-bold text-gray-900">{selected.full_name}</p>
                <a
                  href={`mailto:${selected.email}`}
                  className="flex items-center gap-2 text-sm text-[#8B2070]"
                >
                  <Mail size={13} /> {selected.email}
                </a>
                <a
                  href={`tel:${selected.phone}`}
                  className="flex items-center gap-2 text-sm text-[#8B2070]"
                >
                  <Phone size={13} /> {selected.phone}
                </a>
              </div>

              {/* Trip info */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                <p className="text-xs text-gray-400 font-medium">
                  Trip Details
                </p>
                {selected.package_name && (
                  <p className="text-sm">
                    <span className="text-gray-500">Package: </span>
                    <span className="font-semibold text-gray-800">
                      {selected.package_name}
                    </span>
                  </p>
                )}
                <p className="text-sm">
                  <span className="text-gray-500">Adults: </span>
                  <span className="font-semibold text-gray-800">
                    {selected.adults}
                  </span>
                </p>
                <p className="text-sm">
                  <span className="text-gray-500">Children: </span>
                  <span className="font-semibold text-gray-800">
                    {selected.children}
                  </span>
                </p>
                {selected.departure && (
                  <p className="text-sm">
                    <span className="text-gray-500">Departure: </span>
                    <span className="font-semibold text-gray-800">
                      {selected.departure}
                    </span>
                  </p>
                )}
                {selected.airport && (
                  <p className="text-sm">
                    <span className="text-gray-500">Airport: </span>
                    <span className="font-semibold text-gray-800">
                      {selected.airport}
                    </span>
                  </p>
                )}
                {selected.budget && (
                  <p className="text-sm">
                    <span className="text-gray-500">Budget: </span>
                    <span className="font-semibold text-gray-800">
                      {selected.budget}
                    </span>
                  </p>
                )}
              </div>

              {/* Message */}
              {selected.message && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-400 font-medium mb-2">
                    Message
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {selected.message}
                  </p>
                </div>
              )}

              <p className="text-xs text-gray-400 text-center">
                Submitted{" "}
                {new Date(selected.created_at).toLocaleString("en-GB")}
              </p>

              <div className="flex gap-2 pt-2">
                <a
                  href={`tel:${selected.phone}`}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#8B2070] text-white py-3 rounded-xl text-sm font-bold"
                >
                  <Phone size={14} /> Call Now
                </a>
                <a
                  href={`mailto:${selected.email}`}
                  className="flex-1 flex items-center justify-center gap-2 border-2 border-[#8B2070] text-[#8B2070] py-3 rounded-xl text-sm font-bold"
                >
                  <Mail size={14} /> Email
                </a>
              </div>
            </div>
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


