import sql from "@/app/api/utils/sql";

export async function loader({ request }) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get("active") !== "false";

    let rows;

    if (activeOnly) {
      rows = await sql`
        SELECT *
        FROM packages
        WHERE active = true
        ORDER BY sort_order ASC, id ASC
      `;
    } else {
      rows = await sql`
        SELECT *
        FROM packages
        ORDER BY sort_order ASC, id ASC
      `;
    }

    return Response.json({ packages: rows });
  } catch (err) {
    console.error("GET /api/packages error:", err);

    return Response.json(
      { error: "Failed to fetch packages" },
      { status: 500 }
    );
  }
}

export async function action({ request }) {
  try {
    if (request.method !== "POST") {
      return Response.json(
        { error: "Method not allowed" },
        { status: 405 }
      );
    }

    const body = await request.json();

    const {
      title,
      total_nights,
      makkah_hotel,
      makkah_nights,
      madinah_hotel,
      madinah_nights,
      stars,
      price,
      tag,
      image,
      description,
      includes,
      itinerary,
      departures,
      hotel_images,
      active,
      sort_order,
    } = body;

    if (!title) {
      return Response.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    const rows = await sql`
      INSERT INTO packages (
        title,
        total_nights,
        makkah_hotel,
        makkah_nights,
        madinah_hotel,
        madinah_nights,
        stars,
        price,
        tag,
        image,
        description,
        includes,
        itinerary,
        departures,
        hotel_images,
        active,
        sort_order
      ) VALUES (
        ${title},
        ${total_nights || 7},
        ${makkah_hotel || ""},
        ${makkah_nights || 0},
        ${madinah_hotel || ""},
        ${madinah_nights || 0},
        ${stars || 4},
        ${price || ""},
        ${tag || ""},
        ${image || ""},
        ${description || ""},
        ${JSON.stringify(includes || [])}::jsonb,
        ${JSON.stringify(itinerary || [])}::jsonb,
        ${JSON.stringify(departures || [])}::jsonb,
        ${JSON.stringify(hotel_images || [])}::jsonb,
        ${active !== false},
        ${sort_order || 0}
      )
      RETURNING *
    `;

    return Response.json({ package: rows[0] }, { status: 201 });
  } catch (err) {
    console.error("POST /api/packages error:", err);

    return Response.json(
      { error: "Failed to create package" },
      { status: 500 }
    );
  }
}