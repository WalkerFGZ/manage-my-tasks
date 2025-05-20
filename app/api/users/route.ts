import { auth, clerkClient } from "@clerk/nextjs/server";

import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const { userId } = await auth();
  const client = await clerkClient();
  const query = searchParams.get("query");

  if (!query || query.length === 0) {
    return NextResponse.json({ error: "Query is required" }, { status: 400 });
  }

  try {
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userList = await client.users.getUserList({
      query: query,
      limit: 10,
    });

    return NextResponse.json(userList);
  } catch (error) {
    console.log("ERROR", error);
    return NextResponse.json(
      { error: "Error searching users" },
      { status: 500 }
    );
  }
}
