import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("DATABASE_URL missing");
}

const sql = databaseUrl
  ? neon(databaseUrl)
  : () => {
      throw new Error("DB not configured");
    };

export default sql;

