import sql from "@/app/api/utils/sql";

export async function loader() {
  try {
    const rows = await sql`
      SELECT *
      FROM enquiries
      ORDER BY created_at DESC
    `;

    return Response.json({ enquiries: rows });
  } catch (err) {
    console.error("GET /api/enquiries error:", err);

    return Response.json(
      { error: "Failed to fetch enquiries" },
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

    const fullName =
      body.full_name ||
      body.fullName ||
      body.name ||
      body.customerName ||
      "";

    const email = body.email || "";
    const phone = body.phone || body.whatsapp || "";

    const packageName =
      body.package_name ||
      body.packageName ||
      body.package ||
      body.selectedPackage ||
      "";

    const departure = body.departure || body.departureDate || "";
    const airport = body.airport || body.departureAirport || "";
    const budget = body.budget || "";
    const message = body.message || body.notes || body.specialRequirements || "";

    const adults = Number(body.adults || body.adult || 1);
    const children = Number(body.children || body.child || 0);

    if (!fullName || !email || !phone) {
      return Response.json(
        { error: "Name, email, and phone are required" },
        { status: 400 }
      );
    }

    const rows = await sql`
      INSERT INTO enquiries (
        full_name,
        email,
        phone,
        package_name,
        departure,
        adults,
        children,
        airport,
        budget,
        message,
        status
      ) VALUES (
        ${fullName},
        ${email},
        ${phone},
        ${packageName},
        ${departure},
        ${adults},
        ${children},
        ${airport},
        ${budget},
        ${message},
        'new'
      )
      RETURNING *
    `;

    return Response.json(
      {
        success: true,
        enquiry: rows[0],
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/enquiries error:", err);

    return Response.json(
      { error: "Failed to submit enquiry" },
      { status: 500 }
    );
  }
}