"use client";

import TaskItem from "./task-item";
import type { Todo } from "@/types";
import { useTodos } from "@/hooks/use-todos";

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
    return <div>Theres no todos created</div>;
  }

  return (
    <>
      {todos.map((todo: Todo) => (
        <TaskItem key={todo.id} todo={todo} />
      ))}
    </>
  );
}
