import { Task, User } from "@/types";

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/supabase";

export async function POST(req: Request) {
  const { user, task }: { user: User; task: Task } = await req.json();

  const { data, error } = await supabase
    .from("shared_tasks")
    .insert({
      task_id: task.id,
      user_id: task.user_id,
      shared_with_id: user.id,
      shared_with_img: user.imageUrl,
      shared_with_name: user.firstName + " " + user.lastName,
    })
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
