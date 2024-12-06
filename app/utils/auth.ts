import { cookies } from "next/headers"; // Use Next.js cookies API
import jwt from "jsonwebtoken";
import User from "@/models/User"; // Adjust the path to your User model

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

export async function getUserFromSession(req: Request) {
  try {
    const cookieStore = cookies(); // Access cookies
    const token = cookieStore.get("authToken")?.value;

    if (!token) {
      return null; // No token found
    }

    // Verify the token
    const decoded: any = jwt.verify(token, SECRET_KEY);

    // Fetch the user from the database
    const user = await User.findById(decoded.userId).select("username");
    return user;
  } catch (error) {
    console.error("Error retrieving user from session:", error);
    return null;
  }
}
