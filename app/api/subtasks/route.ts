import { NextResponse } from "next/server";
import { SubTask } from "@/types";
import { supabase } from "@/lib/supabase/supabase";

export async function POST(req: Request) {
  const { subtask }: { subtask: SubTask } = await req.json();

  const { data, error } = await supabase
    .from("subtasks")
    .insert({
      title: subtask.title,
      is_completed: subtask.is_completed,
      task_id: subtask.task_id,
    })
    .select();

  if (error) {
    NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function PUT(req: Request) {
  const { subtask }: { subtask: SubTask } = await req.json();

  const { data, error } = await supabase
    .from("subtasks")
    .update({
      title: subtask.title,
      is_completed: subtask.is_completed,
    })
    .eq("id", subtask.id)
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE(req: Request) {
  const { subTaskId }: { subTaskId: string } = await req.json();
  const { data, error } = await supabase
    .from("subtasks")
    .delete()
    .eq("id", subTaskId)
    .select();

  if (error) {
    NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
