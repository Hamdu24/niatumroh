import sql from "~/app/api/utils/sql";

export async function loader() {
  try {
    const rows = await sql`
      SELECT NOW() AS now
    `;

    return Response.json({
      ok: true,
      message: "Database connected",
      now: rows[0]?.now,
    });
  } catch (err) {
    console.error("DB CHECK ERROR:", err);

    return Response.json(
      {
        ok: false,
        error: err?.message || String(err),
      },
      { status: 500 }
    );
  }
}

