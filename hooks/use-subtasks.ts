import { SubTask, Task } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAuth } from "@clerk/nextjs";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const useCreateSubTasks = () => {
  const { userId } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (subTaskData: SubTask) => {
      const response = await fetch(`${BASE_URL}/api/subtasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subtask: subTaskData,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create subtask");
      }

      return response.json();
    },

    onMutate: async (newSubTask) => {
      await queryClient.cancelQueries({ queryKey: ["tasks", userId] });

      const previousTasks = queryClient.getQueryData(["tasks", userId]);

      queryClient.setQueryData(["tasks", userId], (old: Task[]) => {
        return old.map((task) =>
          task.id === newSubTask.task_id
            ? {
                ...task,
                subtasks: task.subtasks.map((subtask) =>
                  subtask.id === newSubTask.id
                    ? { ...newSubTask, temp_task: false }
                    : subtask
                ),
              }
            : task
        );
      });

      return { previousTasks };
    },

    onError: (err, newSubTask, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(["tasks", userId], context.previousTasks);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", userId] });
    },
  });
};

export const useUpdateSubTask = () => {
  const { userId } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (subTaskData: SubTask) => {
      const response = await fetch(`${BASE_URL}/api/subtasks`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subtask: subTaskData,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update subtask");
      }

      return response.json();
    },
    onMutate: async (subTaskData: SubTask) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["tasks", userId] });

      // Snapshot the previous value
      const previousTasks = queryClient.getQueryData(["tasks", userId]);

      // Optimistically update to the new value
      queryClient.setQueryData(["tasks", userId], (old: Task[]) => {
        return old.map((task) => ({
          ...task,
          subtasks: task.subtasks.map((subtask) =>
            subtask.id === subTaskData.id ? subTaskData : subtask
          ),
        }));
      });

      // Return a context object with the snapshotted value
      return { previousTasks };
    },
    onError: (err, newSubTask, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousTasks) {
        queryClient.setQueryData(["tasks", userId], context.previousTasks);
      }
    },
    // Remove onSettled to prevent automatic refetch
  });
};
