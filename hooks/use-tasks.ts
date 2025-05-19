import { Task, newTaskForm } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useAuth } from "@clerk/nextjs";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const useTasks = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: ["tasks", userId],
    queryFn: async () => {
      const params = new URLSearchParams({
        userId,
      });
      const res = await fetch(`/api/tasks?${params.toString()}`);
      if (!res.ok) {
        throw new Error("Failed to fetch tasks");
      }
      return res.json();
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 60,
  });
};

export const useCreateTask = () => {
  const { userId } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newTaskData: newTaskForm) => {
      const response = await fetch(`${BASE_URL}/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task: newTaskData,
          userId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create tasks");
      }

      return response.json();
    },
    onMutate: async (newTask) => {
      await queryClient.cancelQueries({ queryKey: ["tasks", userId] });

      const tempId = crypto.randomUUID();

      const optimisticTask = {
        id: tempId,
        ...newTask,
        is_completed: false,
      };

      queryClient.setQueryData(["tasks", userId], (old: []) => [
        optimisticTask,
        ...old,
      ]);

      return { optimisticTask };
    },
    onError: (err, newTask, context) => {
      queryClient.setQueryData(["tasks", userId], (old: Task[]) =>
        old.filter((task) => task.id !== context?.optimisticTask.id)
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", userId] });
    },
  });
};

export const useUpdateTask = () => {
  const { userId } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskData: Task) => {
      const response = await fetch(`${BASE_URL}/api/tasks`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task: taskData,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      return response.json();
    },
    onMutate: async (taskData: Task) => {
      await queryClient.cancelQueries({ queryKey: ["tasks", userId] });

      const previousTasks = queryClient.getQueryData<Task[]>(["tasks", userId]);

      queryClient.setQueryData(["tasks", userId], (old: Task[]) =>
        old.map((task) => (task.id === taskData.id ? taskData : task))
      );

      return { previousTasks };
    },
    onError: (err, taskData, context) => {
      queryClient.setQueryData(["tasks", userId], context?.previousTasks);
    },
  });
};

export const useDeleteTask = () => {
  const { userId } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (task_id: string) => {
      const response = await fetch(`${BASE_URL}/api/tasks`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskId: task_id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      return response.json();
    },
    onMutate: async (task_id: string) => {
      await queryClient.cancelQueries({ queryKey: ["tasks", userId] });

      const previousTasks = queryClient.getQueryData<Task[]>(["tasks", userId]);

      queryClient.setQueryData(["tasks", userId], (old: Task[]) =>
        old.filter((task) => task.id !== task_id)
      );

      return { previousTasks };
    },
    onError: (err, task_id, context) => {
      queryClient.setQueryData(["tasks", userId], context?.previousTasks);
    },
  });
};
