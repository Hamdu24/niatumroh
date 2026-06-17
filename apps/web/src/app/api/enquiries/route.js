import sql from '../utils/sql.js';

export async function loader() {
  try {
    const enquiries = await sql`
      SELECT * FROM enquiries 
      ORDER BY created_at DESC
    `;

    return Response.json({ 
      success: true, 
      enquiries 
    });
  } catch (error) {
    console.error('Enquiries Loader Error:', error);
    return Response.json({ 
      success: false, 
      error: 'Gagal mengambil data enquiry',
      detail: error.message 
    }, { status: 500 });
  }
}

export async function action({ request }) {
  try {
    const body = await request.json();

    const result = await sql`
      INSERT INTO enquiries (
        full_name, email, phone, package_name, departure, 
        adults, children, airport, budget, message, status
      )
      VALUES (
        ${body.full_name || body.name}, 
        ${body.email || ''}, 
        ${body.phone}, 
        ${body.package_name || ''},
        ${body.departure || ''},
        ${body.adults || 1},
        ${body.children || 0},
        ${body.airport || ''},
        ${body.budget || ''},
        ${body.message || ''},
        'new'
      )
      RETURNING *
    `;

    return Response.json({ 
      success: true, 
      enquiry: result[0] 
    });
  } catch (error) {
    console.error('Create Enquiry Error:', error);
    return Response.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}

