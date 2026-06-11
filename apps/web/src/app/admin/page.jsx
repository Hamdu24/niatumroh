"use client";
import { useEffect, useState } from "react";
import {
  Package,
  Users,
  TrendingUp,
  Eye,
  ChevronRight,
  RefreshCw,
} from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    packages: 0,
    enquiries: 0,
    newEnquiries: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [pkgRes, enqRes] = await Promise.all([
          fetch("/api/packages?active=false"),
          fetch("/api/enquiries"),
        ]);
        const pkgData = await pkgRes.json();
        const enqData = await enqRes.json();
        setStats({
          packages: pkgData.packages?.length || 0,
          enquiries: enqData.enquiries?.length || 0,
          newEnquiries:
            enqData.enquiries?.filter((e) => e.status === "new").length || 0,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const navItems = [
    {
      href: "/admin/packages",
      icon: Package,
      label: "Manage Packages",
      desc: "Add, edit, or delete Hajj & Umrah packages",
      count: stats.packages,
      color: "#8B2070",
      bg: "#f3e8f5",
    },
    {
      href: "/admin/enquiries",
      icon: Users,
      label: "Manage Enquiries",
      desc: "View and respond to customer enquiries",
      count: stats.enquiries,
      badge: stats.newEnquiries,
      color: "#c0392b",
      bg: "#fef2f2",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-[#1a1a2e] px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a href="/">
            <div className="bg-white/10 rounded-lg px-3 py-2">
              <span className="text-[#d4af37] font-bold text-lg tracking-wide">
                I'TIMAAR
              </span>
            </div>
          </a>
          <span className="text-gray-400 text-sm hidden sm:block">/ Admin</span>
        </div>
        <a
          href="/"
          className="text-gray-400 text-xs hover:text-white flex items-center gap-1 transition-colors"
        >
          <Eye size={13} /> View Website
        </a>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your website content and customer enquiries
          </p>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            {
              label: "Total Packages",
              value: stats.packages,
              icon: Package,
              color: "#8B2070",
            },
            {
              label: "Total Enquiries",
              value: stats.enquiries,
              icon: Users,
              color: "#c0392b",
            },
            {
              label: "New Enquiries",
              value: stats.newEnquiries,
              icon: TrendingUp,
              color: "#c8961a",
            },
          ].map((s, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2"
                style={{ backgroundColor: s.color + "18" }}
              >
                <s.icon size={18} style={{ color: s.color }} />
              </div>
              {loading ? (
                <div className="h-7 bg-gray-100 rounded animate-pulse mx-auto w-8 mb-1" />
              ) : (
                <p className="text-2xl font-extrabold text-gray-900">
                  {s.value}
                </p>
              )}
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Navigation cards */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Content Management
          </h2>
          {navItems.map((item, i) => (
            <a
              key={i}
              href={item.href}
              className="group flex items-center gap-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:border-gray-200 transition-all"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: item.bg }}
              >
                <item.icon size={22} style={{ color: item.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="font-bold text-gray-900">{item.label}</p>
                  {item.badge > 0 && (
                    <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {item.badge} new
                    </span>
                  )}
                </div>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span
                  className="text-xl font-extrabold"
                  style={{ color: item.color }}
                >
                  {loading ? "—" : item.count}
                </span>
                <ChevronRight
                  size={18}
                  className="text-gray-300 group-hover:text-gray-500 transition-colors"
                />
              </div>
            </a>
          ))}
        </div>

        {/* Quick links */}
        <div className="mt-8 bg-[#1a1a2e] rounded-2xl p-5">
          <p className="text-white font-bold text-sm mb-3">Quick Links</p>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "View Homepage", href: "/" },
              { label: "View Packages", href: "/#packages" },
              { label: "About Us Page", href: "/about" },
              { label: "Contact Page", href: "/contact" },
            ].map((l, i) => (
              <a
                key={i}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 bg-white/10 hover:bg-white/20 text-gray-300 text-xs px-3 py-1.5 rounded-lg transition-colors"
              >
                <Eye size={11} /> {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        body { font-family: 'Inter', sans-serif; }
      `}</style>
    </div>
  );
}
