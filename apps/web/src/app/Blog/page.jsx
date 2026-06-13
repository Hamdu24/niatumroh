export default function BlogPage() {
  const posts = [
    {
      title: "Panduan Persiapan Umroh untuk Jamaah Pertama",
      excerpt:
        "Pelajari persiapan penting sebelum berangkat umroh, mulai dari dokumen, perlengkapan, hingga kesiapan ibadah.",
      date: "12 Juni 2026",
      href: "#",
    },
    {
      title: "Tips Memilih Paket Umroh yang Tepat",
      excerpt:
        "Kenali hal penting sebelum memilih paket umroh, seperti hotel, durasi, fasilitas, jadwal keberangkatan, dan pendamping.",
      date: "12 Juni 2026",
      href: "#",
    },
    {
      title: "Perbedaan Umroh Reguler dan Umroh Ramadhan",
      excerpt:
        "Umroh Ramadhan memiliki suasana ibadah yang lebih padat dan khusus. Pahami perbedaannya sebelum memilih paket.",
      date: "12 Juni 2026",
      href: "#",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-[#1a1a2e] text-white px-4 py-20">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[#d4af37] text-sm font-semibold uppercase tracking-wider mb-3">
            Blog
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Artikel Umroh dan Haji
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Baca panduan, tips perjalanan, dan informasi penting seputar ibadah
            Umroh dan Haji.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <article
              key={index}
              className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <div className="h-44 bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400 text-sm">Blog Image</span>
              </div>

              <div className="p-5">
                <p className="text-xs text-[#c8961a] font-semibold mb-2">
                  {post.date}
                </p>

                <h2 className="text-lg font-bold text-gray-900 mb-2">
                  {post.title}
                </h2>

                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {post.excerpt}
                </p>

                <a
                  href={post.href}
                  className="text-sm font-bold text-[#8B2070] hover:text-[#6f1859]"
                >
                  Read More
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}