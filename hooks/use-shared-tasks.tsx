import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Task } from "@/types";
import { User } from "@/types";
import { useAuth } from "@clerk/nextjs";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const useCreateSharedTask = () => {
  const { userId } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ user, task }: { user: User; task: Task }) => {
      const response = await fetch(`${BASE_URL}/api/shared-tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user,
          task,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create shared task");
      }

      return response.json();
    },
    onMutate: async ({ user, task }: { user: User; task: Task }) => {
      await queryClient.cancelQueries({
        queryKey: ["tasks", userId, "shared"],
      });
      await queryClient.cancelQueries({
        queryKey: ["tasks", userId, "all"],
      });
      await queryClient.cancelQueries({
        queryKey: ["tasks", userId, "work"],
      });
      await queryClient.cancelQueries({
        queryKey: ["tasks", userId, "personal"],
      });

      const tempId = crypto.randomUUID();
      const optimisticTask = {
        id: tempId,
        task_id: task.id,
        user_id: task.user_id,
        shared_by: user.id,
      };

      queryClient.setQueryData(["sharedTasks", userId], (old: Task[] = []) => [
        optimisticTask,
        ...old,
      ]);

      return { optimisticTask };
    },
    onError: (err, newTask, context) => {
      queryClient.setQueryData(["sharedTasks", userId], (old: Task[] = []) =>
        old.filter((task) => task.id !== context?.optimisticTask.id)
      );
    },
  });
};

export const useCreateSharedTaskForUser = () => {
  return useMutation({
    mutationFn: async (newTaskData: Task) => {
      const response = await fetch(`${BASE_URL}/api/shared-tasks-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task: newTaskData,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create tasks");
      }

      return response.json();
    },
  });
};
