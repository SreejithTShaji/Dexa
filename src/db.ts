import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

// Postgres connection pool
const pool = new Pool({
  host: "localhost",   // If using Docker Desktop
  port: 5432,
  user: "myuser",
  password: "mypassword",
  database: "mydb",
});

export const db = drizzle(pool);
