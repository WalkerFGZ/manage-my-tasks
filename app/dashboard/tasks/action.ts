"use server";

import { TodoForm } from "@/types";
import { auth } from "@clerk/nextjs/server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export async function getTodo(userId: string) {
  const res = await fetch(`${BASE_URL}/api/todos?userId=${userId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    throw new Error("Error fetching TODOs");
  }

  return res.json();
}

export async function createTodo(todo: TodoForm) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  console.log("TODO", todo);
  const res = await fetch(`${BASE_URL}/api/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ todo, userId }),
  });

  if (!res.ok) {
    throw new Error("Error to create TODO");
  }

  return res.json();
}
