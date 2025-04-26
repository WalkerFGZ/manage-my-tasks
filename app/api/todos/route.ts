import { NextResponse } from "next/server";
import { TodoForm } from "@/types";
import { supabase } from "@/lib/supabase/supabase";

export async function GET() {
  const { data, error } = await supabase.from("todos").select();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const { todo, userId }: { todo: TodoForm; userId: string } = await req.json();
  const { data, error } = await supabase
    .from("todos")
    .insert({
      user_id: userId,
      title: todo.title,
      description: todo.description,
      priority: todo.priority,
      time: todo.time,
    })
    .select();

  console.log("POST FUNCTION", data, error);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
