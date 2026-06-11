import sql from "@/app/api/utils/sql";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const rows = await sql`SELECT * FROM packages WHERE id = ${id}`;
    if (rows.length === 0) {
      return Response.json({ error: "Package not found" }, { status: 404 });
    }
    return Response.json({ package: rows[0] });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Failed to fetch package" }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
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
    let idx = 1;

    if (title !== undefined) {
      setClauses.push(`title = $${idx++}`);
      values.push(title);
    }
    if (total_nights !== undefined) {
      setClauses.push(`total_nights = $${idx++}`);
      values.push(total_nights);
    }
    if (makkah_hotel !== undefined) {
      setClauses.push(`makkah_hotel = $${idx++}`);
      values.push(makkah_hotel);
    }
    if (makkah_nights !== undefined) {
      setClauses.push(`makkah_nights = $${idx++}`);
      values.push(makkah_nights);
    }
    if (madinah_hotel !== undefined) {
      setClauses.push(`madinah_hotel = $${idx++}`);
      values.push(madinah_hotel);
    }
    if (madinah_nights !== undefined) {
      setClauses.push(`madinah_nights = $${idx++}`);
      values.push(madinah_nights);
    }
    if (stars !== undefined) {
      setClauses.push(`stars = $${idx++}`);
      values.push(stars);
    }
    if (price !== undefined) {
      setClauses.push(`price = $${idx++}`);
      values.push(price);
    }
    if (tag !== undefined) {
      setClauses.push(`tag = $${idx++}`);
      values.push(tag);
    }
    if (image !== undefined) {
      setClauses.push(`image = $${idx++}`);
      values.push(image);
    }
    if (description !== undefined) {
      setClauses.push(`description = $${idx++}`);
      values.push(description);
    }
    if (includes !== undefined) {
      setClauses.push(`includes = $${idx++}`);
      values.push(JSON.stringify(includes));
    }
    if (itinerary !== undefined) {
      setClauses.push(`itinerary = $${idx++}`);
      values.push(JSON.stringify(itinerary));
    }
    if (departures !== undefined) {
      setClauses.push(`departures = $${idx++}`);
      values.push(JSON.stringify(departures));
    }
    if (hotel_images !== undefined) {
      setClauses.push(`hotel_images = $${idx++}`);
      values.push(JSON.stringify(hotel_images));
    }
    if (active !== undefined) {
      setClauses.push(`active = $${idx++}`);
      values.push(active);
    }
    if (sort_order !== undefined) {
      setClauses.push(`sort_order = $${idx++}`);
      values.push(sort_order);
    }

    if (setClauses.length === 0) {
      return Response.json({ error: "No fields to update" }, { status: 400 });
    }

    values.push(id);
    const query = `UPDATE packages SET ${setClauses.join(", ")} WHERE id = $${idx} RETURNING *`;
    const rows = await sql(query, values);

    if (rows.length === 0) {
      return Response.json({ error: "Package not found" }, { status: 404 });
    }
    return Response.json({ package: rows[0] });
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Failed to update package" },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await sql`DELETE FROM packages WHERE id = ${id}`;
    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Failed to delete package" },
      { status: 500 },
    );
  }
}
