import { neon } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('❌ DATABASE_URL belum diatur di Vercel Environment Variables');
}

const sql = neon(connectionString, {
  fetchOptions: { cache: 'no-store' },
  // Timeout lebih longgar untuk serverless
  connectionTimeout: 15000,
});

export default sql;

