import sql from "~/app/api/utils/sql";

// GET ALL PACKAGES
export async function GET() {
  try {
    const data = await sql`
      SELECT * FROM packages
      ORDER BY id DESC
    `;

    return Response.json({
      success: true,
      packages: data,
    });
  } catch (err) {
    return Response.json(
      {
        success: false,
        error: err.message,
      },
      { status: 500 }
    );
  }
}

// CREATE PACKAGE
export async function POST(request) {
  try {
    const body = await request.json();

    const result = await sql`
      INSERT INTO packages (
        title,
        price,
        tag,
        image
      )
      VALUES (
        ${body.title},
        ${body.price},
        ${body.tag},
        ${body.image}
      )
      RETURNING *
    `;

    return Response.json({
      success: true,
      package: result[0],
    });
  } catch (err) {
    return Response.json(
      {
        success: false,
        error: err.message,
      },
      { status: 500 }
    );
  }
}

