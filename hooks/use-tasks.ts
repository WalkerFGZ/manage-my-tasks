import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { newTaskForm } from "@/types";
import { useAuth } from "@clerk/nextjs";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const useTodos = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: ["todos", userId],
    queryFn: async () => {
      const params = new URLSearchParams({
        userId,
      });
      const res = await fetch(`/api/todos?${params.toString()}`);
      if (!res.ok) {
        throw new Error("Failed to fetch todos");
      }
      return res.json();
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 60,
  });
};

export const useCreateTodo = () => {
  debugger;
  const { userId } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newTaskData: newTaskForm) => {
      const response = await fetch(`${BASE_URL}/api/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todo: newTaskData,
          userId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create todo");
      }

      return response.json();
    },
    onMutate: async (newTask) => {
      await queryClient.cancelQueries({ queryKey: ["todos", userId] });

      const tempId = crypto.randomUUID();

      const optimisticTodo = {
        id: tempId,
        ...newTask,
        is_completed: false,
      };

      queryClient.setQueryData(["todos", userId], (old: []) => [
        optimisticTodo,
        ...old,
      ]);

      return { optimisticTodo };
    },
    onError: (err, newTask, context) => {
      queryClient.setQueryData(["todos", userId], (old: [] = []) =>
        old.filter((todo) => todo?.id !== context?.optimisticTodo.id)
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos", userId] });
    },
  });
};
