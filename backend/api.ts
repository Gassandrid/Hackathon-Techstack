import { db } from "./config.ts";
import { users } from "./schema.ts";

// API router for user registration
export async function registerUser(req: Request): Promise<Response> {
  try {
    // Parse JSON from request body
    const body = await req.json();

    // Validate required fields
    if (!body.name || !body.email) {
      return new Response(
        JSON.stringify({ error: "Name and email are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Insert user into the database
    const result = await db
      .insert(users)
      .values({
        name: body.name,
        email: body.email,
      })
      .returning({ id: users.id });

    // Return success response with the created user ID
    return new Response(
      JSON.stringify({
        success: true,
        message: "User registered successfully",
        userId: result[0].id,
      }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*", // Enable CORS for frontend access
        },
      },
    );
  } catch (error) {
    console.error("Registration error:", error);

    // Handle duplicate email error
    if (error.message?.includes("duplicate key")) {
      return new Response(JSON.stringify({ error: "Email already exists" }), {
        status: 409,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    // Handle other errors
    return new Response(JSON.stringify({ error: "Failed to register user" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}

// Handle preflight requests for CORS
export function handleCors(req: Request): Response {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
