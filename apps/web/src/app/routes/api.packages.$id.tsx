import sql from "~/api/utils/sql"; // ✅ Hapus tulisan /app-nya

export async function loader({ params }) {
  try {
    const rows = await sql`SELECT * FROM packages WHERE id = ${params.id}`;
    if (rows.length === 0)
      return Response.json({ error: "Not found" }, { status: 404 });
    return Response.json({ success: true, package: rows[0] });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function action({ request, params }) {
  try {
    if (request.method === "DELETE") {
      await sql`DELETE FROM packages WHERE id = ${params.id}`;
      return Response.json({ success: true });
    }

    if (request.method === "PATCH") {
      const body = await request.json();
      const rows = await sql`
        UPDATE packages SET
          name = ${body.name},
          description = ${body.description},
          price = ${body.price},
          duration = ${body.duration}
        WHERE id = ${params.id}
        RETURNING *
      `;
      return Response.json({ success: true, package: rows[0] });
    }

    return Response.json({ error: "Method not allowed" }, { status: 405 });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}

