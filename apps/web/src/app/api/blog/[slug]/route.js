import { createClient } from "@sanity/client";

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || "production";

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  useCdn: false,
});

export async function loader({ params }) {
  try {
    if (!projectId) {
      return Response.json(
        {
          error: "SANITY_PROJECT_ID is not configured",
        },
        { status: 500 }
      );
    }

    const post = await client.fetch(
      `
      *[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current,
        "excerpt": coalesce(excerpt, description, ""),
        "publishedAt": coalesce(publishedAt, _createdAt),
        "image": mainImage.asset->url,
        body
      }
    `,
      { slug: params.slug }
    );

    if (!post) {
      return Response.json(
        {
          error: "Post not found",
        },
        { status: 404 }
      );
    }

    return Response.json({ post });
  } catch (err) {
    console.error("GET /api/blog/:slug error:", err);

    return Response.json(
      {
        error: "Failed to fetch blog post",
        detail: err?.message || String(err),
      },
      { status: 500 }
    );
  }
}