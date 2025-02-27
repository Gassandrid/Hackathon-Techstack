import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// Configuration for the Postgres client
const connectionConfig = {
  max: 10, // Maximum number of connections in the pool
  idle_timeout: 30, // Max seconds a connection can be idle (optional)
  connect_timeout: 10, // Max seconds to wait for a connection (optional)
};

const client = postgres(Deno.env.get("DATABASE_URL") || "", connectionConfig);

// Initialize drizzle with the postgres client
export const db = drizzle(client);

// Health check function
export async function checkDatabaseConnection() {
  try {
    await client`SELECT 1`;
    return true;
  } catch (error) {
    console.error("Database connection error:", error);
    return false;
  }
}
