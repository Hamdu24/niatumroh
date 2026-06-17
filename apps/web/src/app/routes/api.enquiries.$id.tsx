import sql from "~/api/utils/sql"; // ✅ Hapus tulisan /app-nya

export async function loader({ params }) {
  try {
    const rows = await sql`SELECT * FROM enquiries WHERE id = ${params.id}`;
    if (rows.length === 0)
      return Response.json({ error: "Not found" }, { status: 404 });
    return Response.json({ enquiry: rows[0] });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function action({ request, params }) {
  try {
    if (request.method === "DELETE") {
      await sql`DELETE FROM enquiries WHERE id = ${params.id}`;
      return Response.json({ success: true });
    }

    if (request.method === "PATCH") {
      const body = await request.json();
      const rows = await sql`
        UPDATE enquiries SET status = ${body.status}
        WHERE id = ${params.id}
        RETURNING *
      `;
      return Response.json({ enquiry: rows[0] });
    }

    return Response.json({ error: "Method not allowed" }, { status: 405 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

