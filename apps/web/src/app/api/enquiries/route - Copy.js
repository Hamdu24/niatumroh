import sql from "~/app/api/utils/sql";

// GET ALL ENQUIRIES
export async function GET() {
  try {
    const data = await sql`
      SELECT * FROM enquiries
      ORDER BY created_at DESC
    `;

    return Response.json({
      success: true,
      enquiries: data,
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

// CREATE ENQUIRY
export async function POST(request) {
  try {
    const body = await request.json();

    const result = await sql`
      INSERT INTO enquiries (
        full_name,
        phone,
        email,
        message
      )
      VALUES (
        ${body.full_name},
        ${body.phone},
        ${body.email},
        ${body.message}
      )
      RETURNING *
    `;

    return Response.json({
      success: true,
      enquiry: result[0],
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

