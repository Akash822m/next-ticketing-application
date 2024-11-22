
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../../../models/User";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("Missing JWT_SECRET environment variable");

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return new Response(
        JSON.stringify({ error: "Username and password are required" }),
        { status: 400 }
      );
    }

    const user = await User.findOne({ username });
    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 400 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 400 });
    }

    // Generate the JWT
    const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set the JWT as an HTTP-only cookie
    const cookieAttributes = [
      `token=${token}`,
      "HttpOnly",
      "Path=/",
      "Max-Age=3600",
      "SameSite=Strict",
      ...(process.env.NODE_ENV === "production" ? ["Secure"] : []), // Conditionally add Secure
    ].join("; ");

    return new Response(JSON.stringify({ message: "Login successful" }), {
      status: 200,
      headers: {
        "Set-Cookie": cookieAttributes,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return new Response(JSON.stringify({ error: "Login failed" }), { status: 500 });
  }
}
