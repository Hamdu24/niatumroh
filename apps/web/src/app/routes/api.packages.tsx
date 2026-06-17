import sql from "~/api/utils/sql";

export async function loader() {
  try {
    const rows = await sql`SELECT * FROM packages ORDER BY created_at DESC`;
    return Response.json({ success: true, packages: rows });
  } catch (err) {
    console.error(err);
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function action({ request }) {
  try {
    const body = await request.json();

    if (request.method === "POST") {
      const { name, description, price, duration } = body;
      const rows = await sql`
        INSERT INTO packages (name, description, price, duration)
        VALUES (${name}, ${description}, ${price}, ${duration})
        RETURNING *
      `;
      return Response.json({ success: true, package: rows[0] });
    }

    return Response.json({ error: "Method not allowed" }, { status: 405 });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}

