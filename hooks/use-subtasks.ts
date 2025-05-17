import { SubTask, Task } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAuth } from "@clerk/nextjs";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

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
      await queryClient.cancelQueries({ queryKey: ["tasks", userId] });

      queryClient.setQueryData(["tasks", userId], (old: Task[]) =>
        old.map((task) =>
          task.subtasks.map((subtask) =>
            subtask.id === subTaskData.id ? subTaskData : subtask
          )
        )
      );
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey: ["tasks", userId] });
    },
  });
};
