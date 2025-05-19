import { Task, newTaskForm } from "@/types";

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/supabase";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const userId = searchParams.get("userId");
  const category = searchParams.get("category");

  let query = supabase
    .from("tasks")
    .select(
      `
      *,
      subtasks(*)
    `
    )
    .eq("user_id", userId);

  if (category && category !== "all") {
    query = query.eq("category", category);
  }

  const { data, error } = await query.order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const sortedData = data.map((task: Task) => ({
    ...task,
    subtasks: task.subtasks.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    ),
  }));

  return NextResponse.json(sortedData);
}

export async function POST(req: Request) {
  const { task, userId }: { task: newTaskForm; userId: string } =
    await req.json();

  const { data, error } = await supabase
    .from("tasks")
    .insert({
      user_id: userId,
      title: task.title,
      priority: task.priority,
      time: task.time,
      category: task.category,
    })
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function PUT(req: Request) {
  const { task }: { task: Task } = await req.json();

  const { data, error } = await supabase
    .from("tasks")
    .update({
      title: task.title,
      priority: task.priority,
      time: task.time,
      is_completed: task.is_completed,
    })
    .eq("id", task.id)
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE(req: Request) {
  const { taskId }: { taskId: string } = await req.json();

  const { data, error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", taskId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
