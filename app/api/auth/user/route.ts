import { getUserFromSession } from "@/app/utils/auth"; // Utility to fetch user from session

export async function GET(req: Request) {
  try {
    const user = await getUserFromSession(req);

    // if (!user) {
    //   return new Response(
    //     JSON.stringify({ error: "Unauthorized" }),
    //     { status: 401 }
    //   );
    // }

    return new Response(JSON.stringify({ username: user.username }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch user" }), {
      status: 500,
    });
  }
}
