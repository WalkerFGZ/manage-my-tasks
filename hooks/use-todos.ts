import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { TodoForm } from "@/types";
import { useAuth } from "@clerk/nextjs";

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
    staleTime: 1000 * 60,
  });
};

export const useCreateTodo = () => {
  debugger;
  const { userId } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (todo: TodoForm) => {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todo, userId }),
      });

      if (!res.ok) {
        throw new Error("Failed to create todo");
      }

      return res.json();
    },
    onSuccess: () => {
      // Invalidate and refetch todos after successful creation
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
