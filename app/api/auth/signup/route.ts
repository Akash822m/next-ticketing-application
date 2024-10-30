// app/api/auth/signup/route.ts
import bcrypt from "bcryptjs";
import User from "../../../../models/User";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json(); // Parse JSON body here

    if (!username || !password) {
      return new Response(JSON.stringify({ error: "Username and password are required" }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });

    await user.save();
    return new Response(JSON.stringify({ message: "User created" }), { status: 201 });
  } catch (error) {
    console.error("Signup error:", error);
    return new Response(JSON.stringify({ error: "Failed to create user" }), { status: 500 });
  }
}
