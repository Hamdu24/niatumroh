import sql from "@/app/api/utils/sql";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
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
    } = body;

    if (!full_name || !email || !phone) {
      return Response.json(
        { error: "Name, email and phone are required." },
        { status: 400 },
      );
    }

    const result = await sql`
      INSERT INTO enquiries (full_name, email, phone, package_name, departure, adults, children, airport, budget, message)
      VALUES (${full_name}, ${email}, ${phone}, ${package_name || null}, ${departure || null}, ${adults || 1}, ${children || 0}, ${airport || null}, ${budget || null}, ${message || null})
      RETURNING id, created_at
    `;

    return Response.json({
      success: true,
      id: result[0].id,
      created_at: result[0].created_at,
    });
  } catch (error) {
    console.error("Enquiry POST error:", error);
    return Response.json({ error: "Failed to save enquiry." }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    let rows;
    if (status) {
      rows =
        await sql`SELECT * FROM enquiries WHERE status = ${status} ORDER BY created_at DESC`;
    } else {
      rows = await sql`SELECT * FROM enquiries ORDER BY created_at DESC`;
    }

    return Response.json({ enquiries: rows });
  } catch (error) {
    console.error("Enquiry GET error:", error);
    return Response.json(
      { error: "Failed to fetch enquiries." },
      { status: 500 },
    );
  }
}
