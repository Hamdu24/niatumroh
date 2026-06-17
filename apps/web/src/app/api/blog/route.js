import { createClient } from "@sanity/client";

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || "production";

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  useCdn: false,
});

export async function loader() {
  try {
    if (!projectId) {
      return Response.json(
        {
          error: "SANITY_PROJECT_ID is not configured",
        },
        { status: 500 }
      );
    }

    const posts = await client.fetch(`
      *[_type == "post" && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc) {
        _id,
        title,
        "slug": slug.current,
        "excerpt": coalesce(excerpt, description, ""),
        "publishedAt": coalesce(publishedAt, _createdAt),
        "image": mainImage.asset->url
      }
    `);

    return Response.json({ posts });
  } catch (err) {
    console.error("GET /api/blog error:", err);

    return Response.json(
      {
        error: "Failed to fetch blog posts",
        detail: err?.message || String(err),
      },
      { status: 500 }
    );
  }
}

