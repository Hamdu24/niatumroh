import sql from '../../utils/sql.js';

export async function loader({ params }) {
  try {
    const { id } = params;
    const result = await sql`
      SELECT * FROM packages WHERE id = ${id}
    `;

    if (result.length === 0) {
      return Response.json({ success: false, error: 'Package not found' }, { status: 404 });
    }

    return Response.json({ success: true, package: result[0] });
  } catch (error) {
    console.error('Package Detail Error:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}