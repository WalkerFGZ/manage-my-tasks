import TaskCard from "./task-card";
import type { Todo } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { getTodo } from "@/app/dashboard/tasks/action";

export default async function ListCards() {
  const { userId } = await auth();
  if (!userId) return <div>Not Signed In</div>;
  const todos: Todo[] = await getTodo(userId);
  console.log("LIST TODOS", todos);

  if (todos.length === 0) {
    return <div>Theres no todos created</div>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ">
      {todos.map((todo) => (
        <TaskCard key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
