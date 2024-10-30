// app/api/auth/login/route.ts
import bcrypt from "bcryptjs";
import User from "../../../../models/User";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    // Validate the presence of username and password
    if (!username || !password) {
      return new Response(JSON.stringify({ error: "Username and password are required" }), { status: 400 });
    }

    // Find the user in the database
    const user = await User.findOne({ username });
    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 400 });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 400 });
    }

    // Send a successful response if credentials are valid
    return new Response(JSON.stringify({ message: "Login successful" }), { status: 200 });
  } catch (error) {
    console.error("Login error:", error);
    return new Response(JSON.stringify({ error: "Login failed" }), { status: 500 });
  }
}
