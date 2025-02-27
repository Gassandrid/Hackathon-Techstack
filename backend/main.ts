export function add(a: number, b: number): number {
  return a + b;
}

import { checkDatabaseConnection, db } from "./config.ts";

// Example usage in your main.ts or route handlers
const isConnected = await checkDatabaseConnection();
if (!isConnected) {
  console.error("Failed to connect to database");
  Deno.exit(1);
}

// Example query
try {
  const result = await db.query.yourTable.findMany();
  // Handle result
} catch (error) {
  console.error("Query error:", error);
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log("Add 2 + 3 =", add(2, 3));
}
