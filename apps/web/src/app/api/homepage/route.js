import { createClient } from "@sanity/client";

export async function loader() {
  try {
    const projectId = process.env.SANITY_PROJECT_ID;
    const dataset = process.env.SANITY_DATASET || "production";

    if (!projectId) {
      return Response.json(
        {
          error: "SANITY_PROJECT_ID is not configured",
        },
        { status: 500 }
      );
    }

    const client = createClient({
      projectId,
      dataset,
      apiVersion: "2025-01-01",
      useCdn: false,
    });

    const homepage = await client.fetch(`
      *[_type == "homePage"] | order(_updatedAt desc)[0] {
        _id,
        heroTitle,
        heroSubtitle,
        primaryButtonText,
        primaryButtonLink,
        secondaryButtonText,
        secondaryButtonLink,
        aboutTitle,
        aboutDescription,
        features[] {
          title,
          description
        },
        faq[] {
          question,
          answer
        }
      }
    `);

    return Response.json({ homepage });
  } catch (err) {
    return Response.json(
      {
        error: "Failed to fetch homepage content",
        detail: err?.message || String(err),
      },
      { status: 500 }
    );
  }
}

