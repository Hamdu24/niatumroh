import sql from "@/app/api/utils/sql";

export async function loader({ params }) {
  try {
    const { id } = params;

    const rows = await sql`
      SELECT *
      FROM enquiries
      WHERE id = ${id}
    `;

    if (rows.length === 0) {
      return Response.json(
        { error: "Enquiry not found" },
        { status: 404 }
      );
    }

    return Response.json({ enquiry: rows[0] });
  } catch (err) {
    console.error("GET /api/enquiries/:id error:", err);

    return Response.json(
      { error: "Failed to fetch enquiry" },
      { status: 500 }
    );
  }
}

export async function action({ request, params }) {
  try {
    const { id } = params;

    if (request.method === "DELETE") {
      await sql`
        DELETE FROM enquiries
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
    const status = body.status || "new";

    const rows = await sql`
      UPDATE enquiries
      SET status = ${status}
      WHERE id = ${id}
      RETURNING *
    `;

    if (rows.length === 0) {
      return Response.json(
        { error: "Enquiry not found" },
        { status: 404 }
      );
    }

    return Response.json({ enquiry: rows[0] });
  } catch (err) {
    console.error("PATCH/DELETE /api/enquiries/:id error:", err);

    return Response.json(
      { error: "Failed to update enquiry" },
      { status: 500 }
    );
  }
}