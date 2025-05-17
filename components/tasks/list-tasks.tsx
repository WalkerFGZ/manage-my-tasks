"use client";

import { SubTask, Task } from "@/types";
import { useTasks, useUpdateTask } from "@/hooks/use-tasks";

import { ListTodo } from "lucide-react";
import TaskItem from "./task-item";
import { toast } from "sonner";
import { useUpdateSubTask } from "@/hooks/use-subtasks";

export default function ListTasks({ userId }: { userId: string }) {
  const { data: tasks, isLoading, isError } = useTasks({ userId });
  const updateTask = useUpdateTask();
  const updateSubTask = useUpdateSubTask();
  const handleCheckboxChange = async (task: Task) => {
    const newData = {
      ...task,
      is_completed: !task.is_completed,
    };
    try {
      await updateTask.mutateAsync(newData);
    } catch (error) {
      toast.error("Error", {
        description:
          error instanceof Error ? error.message : "Failed to update",
        duration: 5000,
        closeButton: true,
      });
    }
  };

  const handleUpdateSubTask = async (subtask: SubTask) => {
    try {
      await updateSubTask.mutateAsync(subtask);
    } catch (error) {
      toast.error("Error updating subtask", {
        description:
          error instanceof Error ? error.message : "Failed to update subtask",
        duration: 5000,
        closeButton: true,
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (tasks.length === 0) {
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
      {tasks.map((task: Task) => (
        <TaskItem
          key={task.id}
          task={task}
          handleCheckboxChange={handleCheckboxChange}
          handleUpdateSubTask={handleUpdateSubTask}
        />
      ))}
    </>
  );
}
