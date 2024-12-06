import jwt from "jsonwebtoken";
import { cookies } from "next/headers"; // For cookies in Next.js app directory

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("Missing JWT_SECRET environment variable");

export async function GET(req) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value; // Safely retrieve the cookie value

    if (!token) {
      return new Response(JSON.stringify({ loggedIn: false }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    return new Response(JSON.stringify({ loggedIn: true, user: decoded }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Token verification failed:", error);

    return new Response(JSON.stringify({ loggedIn: false }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
}
