"use client";
import { useState, useRef, useEffect } from "react";
import { packages as staticPackages } from "@/data/packages";
import {
  Phone,
  ChevronDown,
  ChevronUp,
  Star,
  Plane,
  Building2,
  Car,
  Shield,
  Award,
  Users,
  TrendingDown,
  Menu,
  X,
  Moon,
  Luggage,
} from "lucide-react";

const faqs = [
  {
    q: "What is included in the Umrah package?",
    a: "Our Umrah packages typically include return flights from the UK, hotel accommodation in both Makkah and Madinah, airport transfers, and a visa. Some packages also include guided tours and ziyarat visits.",
  },
  {
    q: "How far in advance should I book my Umrah package?",
    a: "We recommend booking at least 2–3 months in advance, especially during peak seasons like Ramadan. Early booking ensures better availability and often better pricing.",
  },
  {
    q: "Are your packages ATOL protected?",
    a: "Yes, all our packages are ATOL protected, meaning your money and travel arrangements are fully protected under UK law. We are also registered with ABTA and IATA.",
  },
  {
    q: "Can I customise my Umrah package?",
    a: "Absolutely! We offer flexible options to tailor your package to your needs — including choice of departure airport, hotel category, and length of stay.",
  },
  {
    q: "What visa services do you provide?",
    a: "We handle the complete Umrah visa application process on your behalf. Simply provide the necessary documents and we take care of the rest.",
  },
];

const features = [
  { icon: Award, value: "39+", label: "Years of Trusted Expertise" },
  {
    icon: TrendingDown,
    value: "Best Price",
    label: "Honest & Transparent Value",
  },
  {
    icon: Shield,
    value: "Fully Protected",
    label: "ATOL, ABTA & IATA Certified",
  },
  { icon: Users, value: "50,000+", label: "Happy Pilgrims Served" },
];

const testimonials = [
  {
    name: "Sister Fatima R.",
    location: "Birmingham",
    pkg: "Premium 5★ Umrah Package",
    stars: 5,
    avatar: "F",
    color: "#8B2070",
    text: "SubhanAllah, the trip was absolutely life-changing. I'timaar took care of every single detail — from the visa to the hotel transfer. Fairmont Makkah was steps away from the Haram. I could not have asked for better. Highly recommended!",
  },
  {
    name: "Brother Tariq M.",
    location: "Manchester",
    pkg: "Standard 4★ Umrah Package",
    stars: 5,
    avatar: "T",
    color: "#c0392b",
    text: "We travelled as a family of 5 and were worried about logistics, but I'timaar made it completely stress-free. The group leader was always available and the hotels were excellent. We'll definitely be booking our Hajj through them too.",
  },
  {
    name: "Sister Aisha K.",
    location: "London",
    pkg: "Budget 4★ Umrah Package",
    stars: 5,
    avatar: "A",
    color: "#1a6b4a",
    text: "I was hesitant booking with a travel agent but I'timaar gave me so much confidence. Everything was seamless — flights, hotel, visa. The Emaar Andalusia hotel was beautiful and very close to Masjid al-Haram. Truly a blessed journey!",
  },
  {
    name: "Brother Yusuf A.",
    location: "Bradford",
    pkg: "Hajj 5★ Package",
    stars: 5,
    avatar: "Y",
    color: "#c8961a",
    text: "Alhamdulillah, performing Hajj is the most spiritual experience of my life, and I'timaar made the journey itself so comfortable. The Mina tents were air-conditioned, the scholars were knowledgeable, and the team was always there for us. JazakAllah Khair!",
  },
  {
    name: "Sister Nadia H.",
    location: "Leicester",
    pkg: "Standard 4★ Umrah Package",
    stars: 5,
    avatar: "N",
    color: "#8B2070",
    text: "This was my mother's first Umrah at age 68, and I was nervous about her comfort. I'timaar went above and beyond — wheelchair assistance, ground floor room, and so much care from the team. We are eternally grateful. MashAllah!",
  },
];

export default function HomePage() {
  const [packages, setPackages] = useState(staticPackages);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const sliderRef = useRef(null);
  const testimonialRef = useRef(null);
  const [search, setSearch] = useState({
    from: "",
    type: "Umrah",
    nights: "7 Nights",
    when: "",
  });

  useEffect(() => {
  fetch("/api/packages")
    .then((r) => (r.ok ? r.json() : Promise.reject()))
    .then((data) => {
      if (data.packages && data.packages.length > 0) {
        setPackages(data.packages);
      } else {
        setPackages(staticPackages);
      }
    })
    .catch((err) => {
      console.error("Failed to load packages", err);
      setPackages(staticPackages);
    });
}, []);

  const handleSliderScroll = () => {
    if (!sliderRef.current) return;
    const scrollLeft = sliderRef.current.scrollLeft;
    const cardWidth = sliderRef.current.offsetWidth;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveSlide(index);
  };

  const scrollToSlide = (index) => {
    if (!sliderRef.current) return;
    const cardWidth = sliderRef.current.offsetWidth;
    sliderRef.current.scrollTo({ left: index * cardWidth, behavior: "smooth" });
    setActiveSlide(index);
  };

  const handleTestimonialScroll = () => {
    if (!testimonialRef.current) return;
    const index = Math.round(
      testimonialRef.current.scrollLeft / testimonialRef.current.offsetWidth,
    );
    setActiveTestimonial(index);
  };

  const scrollToTestimonial = (index) => {
    if (!testimonialRef.current) return;
    testimonialRef.current.scrollTo({
      left: index * testimonialRef.current.offsetWidth,
      behavior: "smooth",
    });
    setActiveTestimonial(index);
  };

  return (
    <div className="min-h-screen font-sans bg-white text-gray-800">
      {/* HEADER */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-[#1a1a2e] rounded-lg p-2">
              <span className="text-[#d4af37] font-bold text-xl tracking-wide">
                Jejak Imani
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
            <a href="/" className="hover:text-[#c0392b] transition-colors">
              Home
            </a>
            <a
              href="/#packages"
              className="hover:text-[#c0392b] transition-colors"
            >
              Umrah Packages
            </a>
            <a
              href="/#packages"
              className="hover:text-[#c0392b] transition-colors"
            >
              Hajj Packages
            </a>
            <a href="/about" className="hover:text-[#c0392b] transition-colors">
              About Us
            </a>
            <a
              href="/contact"
              className="hover:text-[#c0392b] transition-colors"
            >
              Contact
            </a>
            <a
              href="/blog"
              className="hover:text-[#c0392b] transition-colors"
            >
              Blog
            </a>
          </nav>

          {/* Right */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Phone size={16} className="text-[#c0392b]" />
              <span className="font-semibold">+44 20 1234 5678</span>
            </div>
            <button className="bg-[#c0392b] text-white px-4 py-2 rounded text-sm font-semibold hover:bg-[#a93226] transition-colors">
              Beat My Quote
            </button>
          </div>

          {/* Mobile: phone tap-to-call + hamburger */}
          <div className="flex items-center gap-3 md:hidden">
            <a href="tel:+442012345678" className="text-[#c0392b]">
              <Phone size={22} />
            </a>
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t px-4 py-4 flex flex-col gap-4 text-sm font-medium text-gray-700">
            <a href="/" onClick={() => setMenuOpen(false)}>
              Home
            </a>
            <a href="/#packages" onClick={() => setMenuOpen(false)}>
              Umrah Packages
            </a>
            <a href="/#packages" onClick={() => setMenuOpen(false)}>
              Hajj Packages
            </a>
            <a href="/about" onClick={() => setMenuOpen(false)}>
              About Us
            </a>
            <a href="/contact" onClick={() => setMenuOpen(false)}>
              Contact
            </a>
            <a href="/blog" onClick={() => setMenuOpen(false)}>
              Blog
            </a>
            <div className="pt-2 border-t flex flex-col gap-2">
              <a href="tel:+6281365400494" className="flex items-center gap-2">
                <Phone size={16} className="text-[#c0392b]" />
                <span>+44 20 1234 5678</span>
              </a>
              <button className="bg-[#c0392b] text-white px-4 py-2.5 rounded text-sm font-semibold w-full">
                Beat My Quote
              </button>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-4 py-14 md:py-0 min-h-[520px] md:min-h-[620px]"
        style={{
          background:
            "linear-gradient(rgba(10,10,30,0.6), rgba(10,10,30,0.7)), url('https://raw.createusercontent.com/c99fcc57-c499-4d6f-a7ab-cf0ce94a2d99/') center/cover no-repeat",
        }}
      >
        <div className="z-10 max-w-4xl mx-auto w-full">
          <p className="text-[#d4af37] font-semibold text-xs md:text-sm tracking-widest uppercase mb-3">
            Your Trusted UK Travel Partner
          </p>
          <h1 className="text-white text-2xl sm:text-3xl md:text-5xl font-bold leading-tight mb-3">
            Your Trusted Partner for
            <br className="hidden md:block" /> Hajj and Umrah Packages
          </h1>
          <p className="text-gray-300 text-sm md:text-lg mb-8 max-w-xl mx-auto">
            Book with confidence — fully protected, expert-guided pilgrimages
            from the UK
          </p>

          {/* Search Box */}
          <div className="bg-white rounded-2xl shadow-2xl p-4 text-left max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
              <div>
                <label className="text-xs text-gray-500 font-medium block mb-1">
                  Flying From
                </label>
                <select
                  className="w-full border border-gray-200 rounded-lg px-2 py-2.5 text-sm focus:outline-none focus:border-[#8B2070]"
                  value={search.from}
                  onChange={(e) =>
                    setSearch({ ...search, from: e.target.value })
                  }
                >
                  <option value="">Any Airport</option>
                  <option>London Heathrow</option>
                  <option>London Gatwick</option>
                  <option>Manchester</option>
                  <option>Birmingham</option>
                  <option>Edinburgh</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium block mb-1">
                  Type
                </label>
                <select
                  className="w-full border border-gray-200 rounded-lg px-2 py-2.5 text-sm focus:outline-none focus:border-[#8B2070]"
                  value={search.type}
                  onChange={(e) =>
                    setSearch({ ...search, type: e.target.value })
                  }
                >
                  <option>Umrah</option>
                  <option>Hajj</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium block mb-1">
                  Nights
                </label>
                <select
                  className="w-full border border-gray-200 rounded-lg px-2 py-2.5 text-sm focus:outline-none focus:border-[#8B2070]"
                  value={search.nights}
                  onChange={(e) =>
                    setSearch({ ...search, nights: e.target.value })
                  }
                >
                  <option>7 Nights</option>
                  <option>10 Nights</option>
                  <option>14 Nights</option>
                  <option>21 Nights</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium block mb-1">
                  When
                </label>
                <input
                  type="month"
                  className="w-full border border-gray-200 rounded-lg px-2 py-2.5 text-sm focus:outline-none focus:border-[#8B2070]"
                  value={search.when}
                  onChange={(e) =>
                    setSearch({ ...search, when: e.target.value })
                  }
                />
              </div>
            </div>
            <button className="w-full bg-[#c0392b] hover:bg-[#a93226] text-white font-bold py-3 rounded-xl text-sm transition-colors">
              🔍 Search Packages
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-[#1a1a2e] py-10 md:py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-center text-white text-lg md:text-3xl font-bold mb-2">
            Guiding Pilgrims With Experience, Care and Commitment
          </h2>
          <p className="text-center text-gray-400 text-xs md:text-sm mb-8">
            Trusted by thousands of UK Muslims for over 39 years
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {features.map((f, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="bg-[#d4af37] rounded-full w-11 h-11 md:w-14 md:h-14 flex items-center justify-center mb-3">
                  <f.icon size={20} className="text-[#1a1a2e]" />
                </div>
                <p className="text-white font-bold text-sm md:text-lg leading-tight">
                  {f.value}
                </p>
                <p className="text-gray-400 text-[10px] md:text-xs mt-1 leading-snug">
                  {f.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section id="packages" className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-10 px-4">
            <p className="text-[#8B2070] font-semibold text-xs uppercase tracking-widest mb-2">
              Our Packages
            </p>
            <h2 className="text-xl md:text-4xl font-bold text-gray-800">
              Find Your Perfect Hajj & Umrah Package
            </h2>
            <p className="text-gray-500 mt-2 text-sm max-w-xl mx-auto">
              Choose from our carefully curated packages, designed to make your
              spiritual journey comfortable and fulfilling.
            </p>
          </div>

          {/* Mobile: horizontal swipe slider */}
          <div className="md:hidden">
            <div
              ref={sliderRef}
              onScroll={handleSliderScroll}
              className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="flex-shrink-0 snap-start"
                  style={{ width: "100vw", padding: "0 16px" }}
                >
                  <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
                    <div className="relative">
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="w-full h-52 object-cover"
                      />
                      <span className="absolute top-3 left-3 bg-[#8B2070] text-white text-xs font-bold px-3 py-1 rounded-full">
                        {pkg.tag}
                      </span>
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <div className="mb-2">
                        <span className="inline-flex items-center gap-1 bg-[#f3e8f5] text-[#8B2070] text-xs font-bold px-3 py-1 rounded-full">
                          <Moon size={11} className="fill-[#8B2070]" />
                          {pkg.total_nights} Nights
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 text-sm mb-3 leading-snug">
                        {pkg.title}
                      </h3>
                      <div className="flex items-start gap-2 mb-3">
                        <div className="flex-1 min-w-0">
                          <div className="text-base mb-1">🕋</div>
                          <p className="text-[11px] text-gray-400 mb-0.5">
                            Hotel in Makkah
                          </p>
                          <p className="text-xs font-semibold text-[#8B2070] leading-tight mb-1">
                            {pkg.makkah_hotel}{" "}
                            <span className="text-gray-400 font-normal">
                              ({pkg.makkah_nights}N)
                            </span>
                          </p>
                          <div className="flex gap-0.5">
                            {Array.from({ length: pkg.stars }).map((_, i) => (
                              <Star
                                key={i}
                                size={9}
                                className="fill-[#f5a623] text-[#f5a623]"
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mt-5">
                          <span className="text-gray-500 font-bold text-xs">
                            +
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-base mb-1">🕌</div>
                          <p className="text-[11px] text-gray-400 mb-0.5">
                            Hotel in Madinah
                          </p>
                          <p className="text-xs font-semibold text-[#8B2070] leading-tight mb-1">
                            {pkg.madinah_hotel}{" "}
                            <span className="text-gray-400 font-normal">
                              ({pkg.madinah_nights}N)
                            </span>
                          </p>
                          <div className="flex gap-0.5">
                            {Array.from({ length: pkg.stars }).map((_, i) => (
                              <Star
                                key={i}
                                size={9}
                                className="fill-[#f5a623] text-[#f5a623]"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <hr className="border-gray-100 mb-3" />
                      <div className="flex items-center gap-2 mb-3">
                        <span>🧳</span>
                        <span className="text-xs font-semibold text-[#8B2070]">
                          Flights + Hotels + Transfer
                        </span>
                      </div>
                      <hr className="border-gray-100 mb-3" />
                      <div className="mt-auto">
                        <div className="mb-4">
                          <span className="text-xs text-gray-400">from </span>
                          <span className="text-2xl font-extrabold text-gray-900">
                            {pkg.price}
                          </span>
                          <span className="text-xs text-gray-400">
                            {" "}
                            per person
                          </span>
                        </div>
                        <div className="flex flex-col gap-2 pb-2">
                          <a
                            href={`/packages/${pkg.id}`}
                            className="w-full flex items-center justify-center bg-[#8B2070] text-white py-3 rounded-xl text-xs font-bold"
                          >
                            View Full Details →
                          </a>
                          <button className="w-full flex items-center justify-center gap-2 border-2 border-[#8B2070] text-[#8B2070] py-3 rounded-xl text-xs font-bold">
                            <Phone size={13} /> Call Our Hajj &amp; Umrah Expert
                          </button>
                          <button className="w-full bg-[#c8961a] text-white py-3 rounded-xl text-xs font-bold">
                            Enquire Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dot indicators */}
            <div className="flex justify-center gap-2 mt-4 mb-2">
              {packages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToSlide(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: activeSlide === i ? 20 : 8,
                    height: 8,
                    backgroundColor: activeSlide === i ? "#8B2070" : "#d1d5db",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Desktop: grid */}
          <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-4 gap-5 px-4">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow flex flex-col"
              >
                <div className="relative">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-48 object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-[#8B2070] text-white text-xs font-bold px-3 py-1 rounded-full">
                    {pkg.tag}
                  </span>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="mb-2">
                    <span className="inline-flex items-center gap-1 bg-[#f3e8f5] text-[#8B2070] text-xs font-bold px-3 py-1 rounded-full">
                      <Moon size={11} className="fill-[#8B2070]" />
                      {pkg.total_nights} Nights
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-base mb-3 leading-snug">
                    {pkg.title}
                  </h3>
                  <div className="flex items-start gap-2 mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="text-base mb-1">🕋</div>
                      <p className="text-[11px] text-gray-400 mb-0.5">
                        Hotel in Makkah
                      </p>
                      <p className="text-xs font-semibold text-[#8B2070] leading-tight mb-1">
                        {pkg.makkah_hotel}{" "}
                        <span className="text-gray-400 font-normal">
                          ({pkg.makkah_nights}N)
                        </span>
                      </p>
                      <div className="flex gap-0.5">
                        {Array.from({ length: pkg.stars }).map((_, i) => (
                          <Star
                            key={i}
                            size={9}
                            className="fill-[#f5a623] text-[#f5a623]"
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mt-5">
                      <span className="text-gray-500 font-bold text-xs">+</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-base mb-1">🕌</div>
                      <p className="text-[11px] text-gray-400 mb-0.5">
                        Hotel in Madinah
                      </p>
                      <p className="text-xs font-semibold text-[#8B2070] leading-tight mb-1">
                        {pkg.madinah_hotel}{" "}
                        <span className="text-gray-400 font-normal">
                          ({pkg.madinah_nights}N)
                        </span>
                      </p>
                      <div className="flex gap-0.5">
                        {Array.from({ length: pkg.stars }).map((_, i) => (
                          <Star
                            key={i}
                            size={9}
                            className="fill-[#f5a623] text-[#f5a623]"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <hr className="border-gray-100 mb-3" />
                  <div className="flex items-center gap-2 mb-3">
                    <span>🧳</span>
                    <span className="text-xs font-semibold text-[#8B2070]">
                      Flights + Hotels + Transfer
                    </span>
                  </div>
                  <hr className="border-gray-100 mb-3" />
                  <div className="mt-auto">
                    <div className="mb-4">
                      <span className="text-xs text-gray-400">from </span>
                      <span className="text-2xl font-extrabold text-gray-900">
                        {pkg.price}
                      </span>
                      <span className="text-xs text-gray-400"> per person</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <a
                        href={`/packages/${pkg.id}`}
                        className="w-full flex items-center justify-center bg-[#8B2070] text-white py-3 rounded-xl text-xs font-bold hover:bg-[#701a5a] transition-colors"
                      >
                        View Full Details →
                      </a>
                      <button className="w-full flex items-center justify-center gap-2 border-2 border-[#8B2070] text-[#8B2070] py-3 rounded-xl text-xs font-bold hover:bg-[#8B2070] hover:text-white transition-colors">
                        <Phone size={13} /> Call Our Hajj &amp; Umrah Expert
                      </button>
                      <a
  href="/enquiry"
  className="w-full flex items-center justify-center bg-[#c8961a] hover:bg-[#b5841a] text-white py-3 rounded-xl text-xs font-bold transition-colors"
>
  Enquire Now
</a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BANNER CTA */}
      <section
        className="py-14 md:py-20 px-4 text-center"
        style={{
          background:
            "linear-gradient(rgba(10,10,30,0.75), rgba(10,10,30,0.8)), url('https://raw.createusercontent.com/e9eeb71d-a49e-4ee0-b998-dfc68c349cc0/') center/cover no-repeat",
        }}
      >
        <p className="text-[#d4af37] text-xs font-semibold tracking-widest uppercase mb-3">
          Begin Your Journey
        </p>
        <h2 className="text-white text-2xl sm:text-3xl md:text-5xl font-bold mb-4">
          Peaceful Hajj And Umrah Journey
        </h2>
        <p className="text-gray-300 max-w-xl mx-auto mb-8 text-sm md:text-base">
          Let us take care of every detail so you can focus entirely on your
          worship and spiritual connection.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button className="bg-[#c0392b] hover:bg-[#a93226] text-white font-bold px-8 py-3.5 rounded-xl transition-colors">
            View All Packages
          </button>
          <button className="border-2 border-white text-white font-bold px-8 py-3.5 rounded-xl hover:bg-white hover:text-[#1a1a2e] transition-colors">
            Speak to an Expert
          </button>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-12 md:py-16 bg-white px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[#c0392b] font-semibold text-xs uppercase tracking-widest mb-2">
              Why Choose Us
            </p>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800">
              The I'timaar Difference
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "Fully ATOL Protected",
                desc: "Your money and bookings are 100% protected under UK law. Travel with complete peace of mind.",
              },
              {
                icon: Award,
                title: "Expert Guidance",
                desc: "Our experienced team includes qualified Hajj scholars who ensure your pilgrimage is spiritually rewarding.",
              },
              {
                icon: Phone,
                title: "24/7 Support",
                desc: "We are with you every step of the way — before, during, and after your journey.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="text-center p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-[#fef8ee] rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon size={24} className="text-[#d4af37]" />
                </div>
                <h3 className="font-bold text-gray-800 text-base mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section
        id="testimonials"
        className="py-12 md:py-16 bg-[#1a1a2e] overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-10 px-4">
            <p className="text-[#d4af37] font-semibold text-xs uppercase tracking-widest mb-2">
              Testimonials
            </p>
            <h2 className="text-xl md:text-4xl font-bold text-white">
              Words From Our Pilgrims
            </h2>
            <p className="text-gray-400 mt-2 text-sm max-w-xl mx-auto">
              Thousands of UK Muslims have trusted I'timaar for their sacred
              journey. Here's what they say.
            </p>
          </div>

          {/* Mobile: swipe slider */}
          <div className="md:hidden">
            <div
              ref={testimonialRef}
              onScroll={handleTestimonialScroll}
              className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 snap-start"
                  style={{ width: "100vw", padding: "0 16px" }}
                >
                  <div className="bg-white/10 backdrop-blur rounded-2xl p-5 h-full flex flex-col">
                    {/* Stars */}
                    <div className="flex gap-1 mb-3">
                      {Array.from({ length: t.stars }).map((_, s) => (
                        <Star
                          key={s}
                          size={14}
                          className="fill-[#d4af37] text-[#d4af37]"
                        />
                      ))}
                    </div>
                    {/* Quote */}
                    <p className="text-gray-200 text-sm leading-relaxed flex-1 mb-4">
                      "{t.text}"
                    </p>
                    {/* Author */}
                    <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                        style={{ backgroundColor: t.color }}
                      >
                        {t.avatar}
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">
                          {t.name}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {t.location} · {t.pkg}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToTestimonial(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: activeTestimonial === i ? 20 : 8,
                    height: 8,
                    backgroundColor:
                      activeTestimonial === i ? "#d4af37" : "#ffffff40",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Desktop: grid 3 col */}
          <div className="hidden md:grid md:grid-cols-3 gap-5 px-4">
            {testimonials.slice(0, 3).map((t, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur rounded-2xl p-6 flex flex-col hover:bg-white/15 transition-colors"
              >
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.stars }).map((_, s) => (
                    <Star
                      key={s}
                      size={14}
                      className="fill-[#d4af37] text-[#d4af37]"
                    />
                  ))}
                </div>
                <p className="text-gray-200 text-sm leading-relaxed flex-1 mb-5">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ backgroundColor: t.color }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">
                      {t.location} · {t.pkg}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: bottom 2 centered */}
          <div className="hidden md:flex justify-center gap-5 px-4 mt-5">
            {testimonials.slice(3).map((t, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur rounded-2xl p-6 flex flex-col hover:bg-white/15 transition-colors w-full max-w-sm"
              >
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.stars }).map((_, s) => (
                    <Star
                      key={s}
                      size={14}
                      className="fill-[#d4af37] text-[#d4af37]"
                    />
                  ))}
                </div>
                <p className="text-gray-200 text-sm leading-relaxed flex-1 mb-5">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ backgroundColor: t.color }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">
                      {t.location} · {t.pkg}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Overall rating */}
          <div className="flex flex-col items-center mt-8 md:mt-10 px-4">
            <div className="flex gap-1 mb-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className="fill-[#d4af37] text-[#d4af37]"
                />
              ))}
            </div>
            <p className="text-white font-bold text-lg">4.9 / 5</p>
            <p className="text-gray-400 text-xs mt-1">
              Based on 2,400+ reviews from verified pilgrims
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-12 md:py-16 bg-gray-50 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-[#c0392b] font-semibold text-xs uppercase tracking-widest mb-2">
              FAQ
            </p>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between px-4 py-4 text-left font-semibold text-gray-800 text-sm hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="pr-3 leading-snug">{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp size={18} className="text-[#c0392b] shrink-0" />
                  ) : (
                    <ChevronDown size={18} className="text-gray-400 shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        id="contact"
        className="bg-[#1a1a2e] text-gray-400 pt-10 pb-6 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8">
            {/* Brand - spans 2 cols on mobile */}
            <div className="col-span-2 md:col-span-1">
              <div className="bg-white/10 rounded-lg p-3 inline-block mb-4">
                <span className="text-[#d4af37] font-bold text-xl tracking-wide">
                  Jejak Imani
                </span>
              </div>
              <p className="text-sm leading-relaxed text-gray-400 mb-4">
                Your trusted partner for Hajj and Umrah packages from the UK.
                Serving pilgrims for over 39 years.
              </p>
              <div className="flex gap-2">
                {["ATOL", "ABTA", "IATA"].map((cert) => (
                  <span
                    key={cert}
                    className="border border-[#d4af37] text-[#d4af37] text-xs px-2 py-1 rounded font-bold"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">
                Quick Links
              </h4>
              <ul className="space-y-2 text-sm">
                {[
                  { label: "Umrah Packages", href: "/#packages" },
                  { label: "Hajj Packages 2025", href: "/#packages" },
                  { label: "About Us", href: "/about" },
                  { label: "Contact Us", href: "/contact" },
                  { label: "Enquire Now", href: "/enquiry" },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="hover:text-[#d4af37] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">
                Our Services
              </h4>
              <ul className="space-y-2 text-sm">
                {[
                  "Economy Umrah",
                  "Standard Umrah",
                  "Premium Umrah",
                  "Hajj 2025",
                  "Group Bookings",
                  "Visa Services",
                ].map((s) => (
                  <li key={s}>
                    <a
                      href="#"
                      className="hover:text-[#d4af37] transition-colors"
                    >
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">
                Contact Us
              </h4>
              <div className="space-y-3 text-sm">
                <a
                  href="tel:+442012345678"
                  className="flex items-center gap-2 hover:text-[#d4af37] transition-colors"
                >
                  <Phone size={14} className="text-[#d4af37] shrink-0" />
                  <span>+44 20 1234 5678</span>
                </a>
                <div>
                  <p className="text-gray-300 font-medium mb-1">
                    Opening Hours
                  </p>
                  <p>Mon – Fri: 9am – 6pm</p>
                  <p>Sat: 10am – 4pm</p>
                  <p>Sun: Closed</p>
                </div>
                <div>
                  <p className="text-gray-300 font-medium mb-1">Email Us</p>
                  <a
                    href="mailto:info@itimaar.co.uk"
                    className="hover:text-[#d4af37] transition-colors break-all"
                  >
                    info@itimaar.co.uk
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
            <p className="text-center md:text-left">
              © 2025 I'timaar Travel Ltd. All rights reserved. Registered in
              England & Wales.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#" className="hover:text-[#d4af37]">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-[#d4af37]">
                Terms & Conditions
              </a>
              <a href="#" className="hover:text-[#d4af37]">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
