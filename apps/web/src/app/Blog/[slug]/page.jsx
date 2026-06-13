import { PortableText } from "@portabletext/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

function formatDate(date) {
  if (!date) return "";

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

const portableComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-gray-700 leading-8 mb-5">{children}</p>
    ),
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold text-gray-900 mt-10 mb-4">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">
        {children}
      </h3>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 space-y-2 mb-6 text-gray-700">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 space-y-2 mb-6 text-gray-700">
        {children}
      </ol>
    ),
  },
};

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/blog/${slug}`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        setPost(data.post || null);
      })
      .catch((err) => {
        console.error("Failed to load blog post:", err);
        setPost(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="h-8 bg-gray-100 rounded w-2/3 mb-4 animate-pulse" />
          <div className="h-4 bg-gray-100 rounded w-1/3 mb-8 animate-pulse" />
          <div className="h-80 bg-gray-100 rounded-2xl animate-pulse" />
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="min-h-screen bg-white px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Artikel tidak ditemukan
          </h1>

          <p className="text-gray-500 mb-6">
            Artikel yang kamu cari belum tersedia atau sudah dihapus.
          </p>

          <a
            href="/blog"
            className="inline-flex bg-[#8B2070] text-white px-5 py-3 rounded-xl text-sm font-bold"
          >
            Kembali ke Blog
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-[#1a1a2e] text-white px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <a
            href="/blog"
            className="text-[#d4af37] text-sm font-semibold mb-6 inline-block"
          >
            ← Back to Blog
          </a>

          <p className="text-[#d4af37] text-sm font-semibold mb-3">
            {formatDate(post.publishedAt)}
          </p>

          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-gray-300 mt-5 leading-7">{post.excerpt}</p>
          )}
        </div>
      </section>

      {post.image && (
        <section className="max-w-4xl mx-auto px-4 -mt-8">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-[260px] md:h-[420px] object-cover rounded-2xl shadow-lg"
          />
        </section>
      )}

      <article className="max-w-3xl mx-auto px-4 py-12">
        {post.body ? (
          <PortableText value={post.body} components={portableComponents} />
        ) : (
          <p className="text-gray-600">Konten artikel belum tersedia.</p>
        )}
      </article>
    </main>
  );
}