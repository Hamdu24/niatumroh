import sql from "@/app/api/utils/sql";

export async function loader({ params }) {
  try {
    const { id } = params;

    const rows = await sql`
      SELECT *
      FROM packages
      WHERE id = ${id}
    `;

    if (rows.length === 0) {
      return Response.json(
        { error: "Package not found" },
        { status: 404 }
      );
    }

    return Response.json({ package: rows[0] });
  } catch (err) {
    console.error("GET /api/packages/:id error:", err);

    return Response.json(
      { error: "Failed to fetch package" },
      { status: 500 }
    );
  }
}

export async function action({ request, params }) {
  try {
    const { id } = params;

    if (request.method === "DELETE") {
      await sql`
        DELETE FROM packages
        WHERE id = ${id}
      `;

      return Response.json({ success: true });
    }

    if (request.method !== "PATCH") {
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

    const setClauses = [];
    const values = [];
    let index = 1;

    const addValue = (field, value, cast = "") => {
      setClauses.push(`${field} = $${index++}${cast}`);
      values.push(value);
    };

    if (title !== undefined) addValue("title", title);
    if (total_nights !== undefined) addValue("total_nights", total_nights);
    if (makkah_hotel !== undefined) addValue("makkah_hotel", makkah_hotel);
    if (makkah_nights !== undefined) addValue("makkah_nights", makkah_nights);
    if (madinah_hotel !== undefined) addValue("madinah_hotel", madinah_hotel);
    if (madinah_nights !== undefined) addValue("madinah_nights", madinah_nights);
    if (stars !== undefined) addValue("stars", stars);
    if (price !== undefined) addValue("price", price);
    if (tag !== undefined) addValue("tag", tag);
    if (image !== undefined) addValue("image", image);
    if (description !== undefined) addValue("description", description);
    if (includes !== undefined) addValue("includes", JSON.stringify(includes), "::jsonb");
    if (itinerary !== undefined) addValue("itinerary", JSON.stringify(itinerary), "::jsonb");
    if (departures !== undefined) addValue("departures", JSON.stringify(departures), "::jsonb");
    if (hotel_images !== undefined) addValue("hotel_images", JSON.stringify(hotel_images), "::jsonb");
    if (active !== undefined) addValue("active", active);
    if (sort_order !== undefined) addValue("sort_order", sort_order);

    if (setClauses.length === 0) {
      return Response.json(
        { error: "No fields to update" },
        { status: 400 }
      );
    }

    setClauses.push("updated_at = NOW()");
    values.push(id);

    const query = `
      UPDATE packages
      SET ${setClauses.join(", ")}
      WHERE id = $${index}
      RETURNING *
    `;

    const rows = await sql(query, values);

    if (rows.length === 0) {
      return Response.json(
        { error: "Package not found" },
        { status: 404 }
      );
    }

    return Response.json({ package: rows[0] });
  } catch (err) {
    console.error("PATCH/DELETE /api/packages/:id error:", err);

    return Response.json(
      { error: "Failed to update package" },
      { status: 500 }
    );
  }
}