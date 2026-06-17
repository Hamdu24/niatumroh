import sql from "~/api/utils/sql"; // ✅ Hapus tulisan /app-nya

export async function loader() {
  try {
    const rows = await sql`SELECT * FROM enquiries ORDER BY created_at DESC`;
    return Response.json({ enquiries: rows });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function action({ request }) {
  try {
    if (request.method !== "POST")
      return Response.json({ error: "Method not allowed" }, { status: 405 });

    const body = await request.json();
    const { full_name, email, phone, package_name, departure,
            adults, children, airport, budget, message } = body;

    const rows = await sql`
      INSERT INTO enquiries 
        (full_name, email, phone, package_name, departure, adults, children, airport, budget, message, status)
      VALUES 
        (${full_name}, ${email}, ${phone}, ${package_name}, ${departure},
         ${adults}, ${children}, ${airport}, ${budget}, ${message}, 'new')
      RETURNING *
    `;
    return Response.json({ success: true, enquiry: rows[0] });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

