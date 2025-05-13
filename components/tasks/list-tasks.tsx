"use client";

import { ListTodo } from "lucide-react";
import TaskItem from "./task-item";
import type { Todo } from "@/types";
import { useTodos } from "@/hooks/use-tasks";

export default function ListTasks({ userId }: { userId: string }) {
  const { data: todos, isLoading, isError } = useTodos({ userId });

  console.log(todos, isLoading, isError);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="rounded-full bg-primary/10 p-4 mb-4">
          <ListTodo className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No Tasks Yet</h3>
        <p className="text-muted-foreground">
          You don&apos;t have any tasks yet. Create one to get started.
        </p>
      </div>
    );
  }

  return (
    <>
      {todos.map((todo: Todo) => (
        <TaskItem key={todo.id} todo={todo} />
      ))}
    </>
  );
}
