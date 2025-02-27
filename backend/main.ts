import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { checkDatabaseConnection } from "./config.ts";
import { registerUser, handleCors } from "./api.ts";

// Check database connection on startup
const isConnected = await checkDatabaseConnection();
if (!isConnected) {
  console.error("Failed to connect to database");
  Deno.exit(1);
}

console.log("Database connection successful");

// Request handler
async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const path = url.pathname;

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return handleCors(req);
  }

  // Route handling
  if (path === "/api/users" && req.method === "POST") {
    return await registerUser(req);
  }

  // Health check endpoint
  if (path === "/health") {
    return new Response(JSON.stringify({ status: "ok" }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  // Not found handler
  return new Response(JSON.stringify({ error: "Not found" }), {
    status: 404,
    headers: { "Content-Type": "application/json" },
  });
}

// Start the server
console.log("Server starting on http://localhost:8000");
await serve(handler, { port: 8000 });
