import sql from '../utils/sql.js';

export async function loader() {
  try {
    const packages = await sql`
      SELECT * FROM packages 
      ORDER BY sort_order ASC, id ASC
    `;

    return Response.json({ 
      success: true, 
      packages 
    });
  } catch (error) {
    console.error('Packages Loader Error:', error);
    return Response.json({ 
      success: false, 
      error: 'Gagal mengambil data paket',
      detail: error.message 
    }, { status: 500 });
  }
}

export async function action({ request }) {
  try {
    const body = await request.json();

    const result = await sql`
      INSERT INTO packages (title, price, tag, image, description, total_nights, makkah_hotel, madinah_hotel)
      VALUES (${body.title}, ${body.price}, ${body.tag}, ${body.image}, ${body.description || ''}, 
              ${body.total_nights}, ${body.makkah_hotel}, ${body.madinah_hotel})
      RETURNING *
    `;

    return Response.json({ 
      success: true, 
      package: result[0] 
    });
  } catch (error) {
    console.error('Create Package Error:', error);
    return Response.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}

