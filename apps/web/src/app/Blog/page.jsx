import { useEffect, useState } from "react";

const fallbackPosts = [
  {
    title: "Panduan Persiapan Umroh untuk Jamaah Pertama",
    slug: "panduan-persiapan-umroh",
    excerpt:
      "Pelajari persiapan penting sebelum berangkat umroh, mulai dari dokumen, perlengkapan, hingga kesiapan ibadah.",
    publishedAt: "2026-06-12",
    image: "",
  },
];

function formatDate(date) {
  if (!date) return "";

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export default function BlogPage() {
  const [posts, setPosts] = useState(fallbackPosts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        if (data.posts && data.posts.length > 0) {
          setPosts(data.posts);
        } else {
          setPosts(fallbackPosts);
        }
      })
      .catch((err) => {
        console.error("Failed to load blog posts:", err);
        setPosts(fallbackPosts);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-80 bg-gray-100 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <article
                key={post.slug || post._id}
                className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <a href={`/blog/${post.slug}`}>
                  <div className="h-44 bg-gray-100 overflow-hidden">
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-400 text-sm">
                          Blog Image
                        </span>
                      </div>
                    )}
                  </div>
                </a>

                <div className="p-5">
                  <p className="text-xs text-[#c8961a] font-semibold mb-2">
                    {formatDate(post.publishedAt)}
                  </p>

                  <a href={`/blog/${post.slug}`}>
                    <h2 className="text-lg font-bold text-gray-900 mb-2 hover:text-[#8B2070] transition-colors">
                      {post.title}
                    </h2>
                  </a>

                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {post.excerpt || "Artikel belum memiliki ringkasan."}
                  </p>

                  <a
                    href={`/blog/${post.slug}`}
                    className="text-sm font-bold text-[#8B2070] hover:text-[#6f1859]"
                  >
                    Read More
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

