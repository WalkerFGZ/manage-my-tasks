import { NextResponse } from "next/server";
import { Task } from "@/types";
import { supabase } from "@/lib/supabase/supabase";

export async function POST(req: Request) {
  const { task }: { task: Task } = await req.json();

  const { data, error } = await supabase.from("tasks").insert({
    user_id: task.user_id,
    title: task.title,
    priority: task.priority,
    time: task.time,
    category: "shared",
    shared: true,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
