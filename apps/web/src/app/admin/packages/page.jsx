"use client";
import { useState, useEffect, useCallback } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Star,
  Moon,
  Package,
  ArrowUp,
  ArrowDown,
  X,
  Check,
  Loader,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";

const emptyPkg = {
  title: "",
  total_nights: 7,
  makkah_hotel: "",
  makkah_nights: 4,
  madinah_hotel: "",
  madinah_nights: 3,
  stars: 4,
  price: "",
  tag: "",
  image: "",
  description: "",
  includes: [],
  itinerary: [],
  departures: [],
  hotel_images: ["", ""],
  active: true,
  sort_order: 0,
};

function ItineraryEditor({ value, onChange }) {
  const addDay = () =>
    onChange([
      ...value,
      { day: `Day ${value.length + 1}`, title: "", desc: "" },
    ]);
  const removeDay = (i) => onChange(value.filter((_, idx) => idx !== i));
  const updateDay = (i, field, val) =>
    onChange(value.map((d, idx) => (idx === i ? { ...d, [field]: val } : d)));

  return (
    <div className="space-y-3">
      {value.map((day, i) => (
        <div
          key={i}
          className="bg-gray-50 rounded-xl p-3 border border-gray-100"
        >
          <div className="flex items-center gap-2 mb-2">
            <input
              className="border border-gray-200 rounded-lg px-2 py-1.5 text-xs w-20 focus:outline-none focus:border-[#8B2070]"
              placeholder="Day 1"
              value={day.day}
              onChange={(e) => updateDay(i, "day", e.target.value)}
            />
            <input
              className="flex-1 border border-gray-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-[#8B2070]"
              placeholder="Title"
              value={day.title}
              onChange={(e) => updateDay(i, "title", e.target.value)}
            />
            <button
              onClick={() => removeDay(i)}
              className="text-red-400 hover:text-red-600 p-1"
            >
              <X size={14} />
            </button>
          </div>
          <textarea
            className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-[#8B2070] resize-none"
            rows={2}
            placeholder="Day description..."
            value={day.desc}
            onChange={(e) => updateDay(i, "desc", e.target.value)}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={addDay}
        className="flex items-center gap-1.5 text-[#8B2070] text-xs font-semibold border border-dashed border-[#8B2070] px-3 py-2 rounded-lg hover:bg-[#f3e8f5] transition-colors w-full justify-center"
      >
        <Plus size={13} /> Add Day
      </button>
    </div>
  );
}

function ListEditor({ value, onChange, placeholder }) {
  const text = Array.isArray(value) ? value.join("\n") : "";
  return (
    <textarea
      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#8B2070] resize-none font-mono text-xs"
      rows={5}
      placeholder={placeholder}
      value={text}
      onChange={(e) => onChange(e.target.value.split("\n").filter(Boolean))}
    />
  );
}

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [editPkg, setEditPkg] = useState(null); // null = closed, object = editing/creating
  const [isNew, setIsNew] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchPackages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/packages?active=false");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setPackages(data.packages || []);
    } catch (err) {
      console.error(err);
      setError("Could not load packages.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  const openNew = () => {
    setIsNew(true);
    setEditPkg({ ...emptyPkg, sort_order: packages.length + 1 });
  };

  const openEdit = (pkg) => {
    setIsNew(false);
    setEditPkg({
      ...pkg,
      hotel_images:
        Array.isArray(pkg.hotel_images) && pkg.hotel_images.length >= 2
          ? pkg.hotel_images
          : [pkg.hotel_images?.[0] || "", pkg.hotel_images?.[1] || ""],
    });
  };

  const handleSave = async () => {
    if (!editPkg.title || !editPkg.price) {
      showToast("Title and price are required!", "error");
      return;
    }
    setSaving(true);
    try {
      const method = isNew ? "POST" : "PATCH";
      const url = isNew ? "/api/packages" : `/api/packages/${editPkg.id}`;
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editPkg),
      });
      if (!res.ok) throw new Error("Failed to save");
      setEditPkg(null);
      await fetchPackages();
      showToast(isNew ? "Package created!" : "Package updated!");
    } catch (err) {
      console.error(err);
      showToast("Failed to save package.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/packages/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");
      setDeleteConfirm(null);
      await fetchPackages();
      showToast("Package deleted.");
    } catch (err) {
      console.error(err);
      showToast("Failed to delete.", "error");
    }
  };

  const toggleActive = async (pkg) => {
    try {
      await fetch(`/api/packages/${pkg.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !pkg.active }),
      });
      setPackages((prev) =>
        prev.map((p) => (p.id === pkg.id ? { ...p, active: !p.active } : p)),
      );
    } catch (err) {
      console.error(err);
    }
  };

  const moveOrder = async (pkg, dir) => {
    const sorted = [...packages].sort((a, b) => a.sort_order - b.sort_order);
    const idx = sorted.findIndex((p) => p.id === pkg.id);
    const swapIdx = idx + dir;
    if (swapIdx < 0 || swapIdx >= sorted.length) return;
    const swap = sorted[swapIdx];
    await Promise.all([
      fetch(`/api/packages/${pkg.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sort_order: swap.sort_order }),
      }),
      fetch(`/api/packages/${swap.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sort_order: pkg.sort_order }),
      }),
    ]);
    await fetchPackages();
  };

  const sortedPackages = [...packages].sort(
    (a, b) => a.sort_order - b.sort_order,
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-[#1a1a2e] px-4 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <a href="/admin">
            <div className="bg-white/10 rounded-lg px-3 py-2">
              <span className="text-[#d4af37] font-bold text-lg tracking-wide">
                I'TIMAAR
              </span>
            </div>
          </a>
          <span className="text-gray-400 text-sm hidden sm:block">
            / Admin / Packages
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchPackages}
            className="text-gray-400 border border-white/20 p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <RefreshCw size={14} />
          </button>
          <button
            onClick={openNew}
            className="flex items-center gap-1.5 bg-[#8B2070] hover:bg-[#701a5a] text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"
          >
            <Plus size={15} /> New Package
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="mb-5">
          <h1 className="text-xl font-bold text-gray-900">
            Package Management
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {packages.length} packages · drag to reorder · toggle visibility per
            package
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-sm mb-4 flex items-center gap-2">
            <AlertTriangle size={15} /> {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-16">
            <div
              className="w-8 h-8 border-2 border-[#8B2070] border-t-transparent rounded-full"
              style={{ animation: "spin 0.8s linear infinite" }}
            />
          </div>
        ) : (
          <div className="space-y-3">
            {sortedPackages.map((pkg, i) => (
              <div
                key={pkg.id}
                className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all ${pkg.active ? "border-gray-100" : "border-gray-200 opacity-60"}`}
              >
                <div className="flex items-center gap-3 p-4">
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                    {pkg.image ? (
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
                        No img
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-bold text-gray-900 text-sm leading-snug">
                        {pkg.title}
                      </p>
                      {pkg.tag && (
                        <span className="bg-[#f3e8f5] text-[#8B2070] text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {pkg.tag}
                        </span>
                      )}
                      {!pkg.active && (
                        <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Hidden
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Moon size={10} /> {pkg.total_nights} nights
                      </span>
                      <span className="text-xs font-bold text-gray-900">
                        {pkg.price}
                      </span>
                      <div className="flex gap-0.5">
                        {Array.from({ length: pkg.stars }).map((_, si) => (
                          <Star
                            key={si}
                            size={9}
                            className="fill-[#f5a623] text-[#f5a623]"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      {pkg.makkah_hotel} · {pkg.madinah_hotel}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <div className="flex flex-col gap-0.5 mr-1">
                      <button
                        onClick={() => moveOrder(pkg, -1)}
                        disabled={i === 0}
                        className="text-gray-300 hover:text-gray-600 disabled:opacity-20 p-1"
                      >
                        <ArrowUp size={13} />
                      </button>
                      <button
                        onClick={() => moveOrder(pkg, 1)}
                        disabled={i === sortedPackages.length - 1}
                        className="text-gray-300 hover:text-gray-600 disabled:opacity-20 p-1"
                      >
                        <ArrowDown size={13} />
                      </button>
                    </div>
                    <button
                      onClick={() => toggleActive(pkg)}
                      className={`p-2 rounded-lg transition-colors ${pkg.active ? "text-green-600 bg-green-50 hover:bg-green-100" : "text-gray-400 bg-gray-100 hover:bg-gray-200"}`}
                      title={pkg.active ? "Hide package" : "Show package"}
                    >
                      {pkg.active ? <Eye size={15} /> : <EyeOff size={15} />}
                    </button>
                    <button
                      onClick={() => openEdit(pkg)}
                      className="p-2 rounded-lg text-[#8B2070] bg-[#f3e8f5] hover:bg-[#e8d0f0] transition-colors"
                    >
                      <Edit2 size={15} />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(pkg)}
                      className="p-2 rounded-lg text-red-500 bg-red-50 hover:bg-red-100 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {packages.length === 0 && !loading && (
              <div className="text-center py-16 text-gray-400">
                <Package size={40} className="mx-auto mb-3 opacity-30" />
                <p className="font-semibold">No packages yet</p>
                <button
                  onClick={openNew}
                  className="mt-3 bg-[#8B2070] text-white px-5 py-2 rounded-xl text-sm font-bold"
                >
                  Create First Package
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* EDIT / CREATE DRAWER */}
      {editPkg && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/40"
          onClick={() => setEditPkg(null)}
        >
          <div
            className="bg-white w-full max-w-2xl h-full overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between z-10">
              <h3 className="font-bold text-gray-900">
                {isNew ? "New Package" : "Edit Package"}
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-1.5 bg-[#8B2070] hover:bg-[#701a5a] text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors disabled:opacity-60"
                >
                  {saving ? (
                    <Loader size={14} className="animate-spin" />
                  ) : (
                    <Check size={14} />
                  )}
                  {saving ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={() => setEditPkg(null)}
                  className="text-gray-400 hover:text-gray-700 p-2"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="px-5 py-5 space-y-5">
              {/* Basic info */}
              <section>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                  Basic Info
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-500 font-medium block mb-1">
                      Package Title *
                    </label>
                    <input
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#8B2070]"
                      placeholder="e.g. Premium 5★ Umrah Package"
                      value={editPkg.title}
                      onChange={(e) =>
                        setEditPkg({ ...editPkg, title: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-gray-500 font-medium block mb-1">
                        Price *
                      </label>
                      <input
                        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#8B2070]"
                        placeholder="£1,149"
                        value={editPkg.price}
                        onChange={(e) =>
                          setEditPkg({ ...editPkg, price: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 font-medium block mb-1">
                        Tag / Badge
                      </label>
                      <input
                        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#8B2070]"
                        placeholder="Popular / Best Value / Premium"
                        value={editPkg.tag}
                        onChange={(e) =>
                          setEditPkg({ ...editPkg, tag: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-gray-500 font-medium block mb-1">
                        Total Nights
                      </label>
                      <input
                        type="number"
                        min="1"
                        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#8B2070]"
                        value={editPkg.total_nights}
                        onChange={(e) =>
                          setEditPkg({
                            ...editPkg,
                            total_nights: parseInt(e.target.value) || 7,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 font-medium block mb-1">
                        Star Rating
                      </label>
                      <select
                        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#8B2070]"
                        value={editPkg.stars}
                        onChange={(e) =>
                          setEditPkg({
                            ...editPkg,
                            stars: parseInt(e.target.value),
                          })
                        }
                      >
                        {[3, 4, 5].map((s) => (
                          <option key={s} value={s}>
                            {s} Stars
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-medium block mb-1">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#8B2070] resize-none"
                      placeholder="Brief description of the package..."
                      value={editPkg.description}
                      onChange={(e) =>
                        setEditPkg({ ...editPkg, description: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="active"
                      checked={editPkg.active}
                      onChange={(e) =>
                        setEditPkg({ ...editPkg, active: e.target.checked })
                      }
                      className="w-4 h-4 accent-[#8B2070]"
                    />
                    <label
                      htmlFor="active"
                      className="text-sm text-gray-700 font-medium"
                    >
                      Visible on website
                    </label>
                  </div>
                </div>
              </section>

              {/* Hotels */}
              <section>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                  Hotels
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                    <p className="text-xs font-semibold text-gray-700">
                      🕋 Makkah Hotel
                    </p>
                    <input
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#8B2070]"
                      placeholder="Hotel name"
                      value={editPkg.makkah_hotel}
                      onChange={(e) =>
                        setEditPkg({ ...editPkg, makkah_hotel: e.target.value })
                      }
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        className="w-20 border border-gray-200 rounded-lg px-2 py-2 text-sm focus:outline-none focus:border-[#8B2070]"
                        value={editPkg.makkah_nights}
                        onChange={(e) =>
                          setEditPkg({
                            ...editPkg,
                            makkah_nights: parseInt(e.target.value) || 0,
                          })
                        }
                      />
                      <span className="text-xs text-gray-500">nights</span>
                    </div>
                    <input
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#8B2070]"
                      placeholder="Hotel image URL"
                      value={editPkg.hotel_images[0] || ""}
                      onChange={(e) => {
                        const imgs = [...editPkg.hotel_images];
                        imgs[0] = e.target.value;
                        setEditPkg({ ...editPkg, hotel_images: imgs });
                      }}
                    />
                    {editPkg.hotel_images[0] && (
                      <img
                        src={editPkg.hotel_images[0]}
                        alt="preview"
                        className="w-full h-20 object-cover rounded-lg"
                      />
                    )}
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                    <p className="text-xs font-semibold text-gray-700">
                      🕌 Madinah Hotel
                    </p>
                    <input
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#8B2070]"
                      placeholder="Hotel name"
                      value={editPkg.madinah_hotel}
                      onChange={(e) =>
                        setEditPkg({
                          ...editPkg,
                          madinah_hotel: e.target.value,
                        })
                      }
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        className="w-20 border border-gray-200 rounded-lg px-2 py-2 text-sm focus:outline-none focus:border-[#8B2070]"
                        value={editPkg.madinah_nights}
                        onChange={(e) =>
                          setEditPkg({
                            ...editPkg,
                            madinah_nights: parseInt(e.target.value) || 0,
                          })
                        }
                      />
                      <span className="text-xs text-gray-500">nights</span>
                    </div>
                    <input
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#8B2070]"
                      placeholder="Hotel image URL"
                      value={editPkg.hotel_images[1] || ""}
                      onChange={(e) => {
                        const imgs = [...editPkg.hotel_images];
                        imgs[1] = e.target.value;
                        setEditPkg({ ...editPkg, hotel_images: imgs });
                      }}
                    />
                    {editPkg.hotel_images[1] && (
                      <img
                        src={editPkg.hotel_images[1]}
                        alt="preview"
                        className="w-full h-20 object-cover rounded-lg"
                      />
                    )}
                  </div>
                </div>
              </section>

              {/* Main image */}
              <section>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                  Main Package Image
                </h4>
                <input
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#8B2070]"
                  placeholder="https://images.unsplash.com/..."
                  value={editPkg.image}
                  onChange={(e) =>
                    setEditPkg({ ...editPkg, image: e.target.value })
                  }
                />
                {editPkg.image && (
                  <img
                    src={editPkg.image}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-xl mt-2"
                  />
                )}
              </section>

              {/* Includes */}
              <section>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                  What's Included
                </h4>
                <p className="text-xs text-gray-400 mb-2">One item per line</p>
                <ListEditor
                  value={editPkg.includes}
                  onChange={(v) => setEditPkg({ ...editPkg, includes: v })}
                  placeholder={
                    "Return flights from London Heathrow\n7 nights hotel\nUmrah visa processing\n..."
                  }
                />
              </section>

              {/* Departures */}
              <section>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Available Departures
                </h4>
                <p className="text-xs text-gray-400 mb-2">One date per line</p>
                <ListEditor
                  value={editPkg.departures}
                  onChange={(v) => setEditPkg({ ...editPkg, departures: v })}
                  placeholder={"January 2026\nFebruary 2026\nRamadan 2026\n..."}
                />
              </section>

              {/* Itinerary */}
              <section>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                  Itinerary
                </h4>
                <ItineraryEditor
                  value={
                    Array.isArray(editPkg.itinerary) ? editPkg.itinerary : []
                  }
                  onChange={(v) => setEditPkg({ ...editPkg, itinerary: v })}
                />
              </section>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={22} className="text-red-500" />
            </div>
            <h3 className="font-bold text-gray-900 text-center mb-1">
              Delete Package?
            </h3>
            <p className="text-gray-500 text-sm text-center mb-5">
              "{deleteConfirm.title}" will be permanently deleted.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 border border-gray-200 text-gray-700 py-2.5 rounded-xl text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm.id)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl text-sm font-bold transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div
          className="fixed bottom-5 right-5 z-50 px-4 py-3 rounded-xl shadow-lg text-sm font-semibold text-white flex items-center gap-2"
          style={{
            backgroundColor: toast.type === "error" ? "#ef4444" : "#059669",
          }}
        >
          {toast.type === "error" ? (
            <AlertTriangle size={15} />
          ) : (
            <Check size={15} />
          )}
          {toast.msg}
        </div>
      )}

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        body { font-family: 'Inter', sans-serif; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 0.8s linear infinite; }
      `}</style>
    </div>
  );
}
