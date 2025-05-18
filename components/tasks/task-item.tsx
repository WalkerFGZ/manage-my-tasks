import { Card, CardContent } from "../ui/card";
import { ChevronsUpDown, Clock, Plus } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../animate-ui/radix/collapsible";
import { cn, formatTimeForDisplay } from "@/lib/utils";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Checkbox } from "../animate-ui/headless/checkbox";
import { Separator } from "../ui/separator";
import SubtaskItem from "./subtask-item";
import { Task } from "@/types";
import { priorityColors } from "@/lib/constants";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateTask } from "@/hooks/use-tasks";

export default function TaskItem({ task }: { task: Task }) {
  const updateTask = useUpdateTask();
  const queryClient = useQueryClient();
  const { userId } = useAuth();

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

  const handleAddNewSubTask = (taskId: string) => {
    const newSubTask = {
      id: crypto.randomUUID(),
      title: "",
      is_completed: false,
      task_id: taskId,
      temp_task: true,
      created_at: new Date(),
    };

    const previousTasks = queryClient.getQueryData<Task[]>(["tasks", userId]);
    let hasOpenSubtask: boolean = false;
    previousTasks?.map((task) => {
      task.subtasks.map((subtask) => {
        if (subtask.temp_task) {
          hasOpenSubtask = true;
        }
      });
    });

    if (hasOpenSubtask) {
      toast.info("You have an open subtask, please complete it first.", {
        duration: 5000,
        closeButton: true,
      });
      return;
    }

    queryClient.setQueryData(["tasks", userId], (old: Task[]) => {
      return old.map((task) =>
        task.id === taskId
          ? { ...task, subtasks: [newSubTask, ...task.subtasks] }
          : task
      );
    });
  };

  return (
    <Card
      className={cn(
        "py-2 text-md font-nunito hover:border-purple-400 transition-all duration-200 ease-in-out hover:scale-[1.02] delay-75",
        task.is_completed &&
          "bg-accent/20 hover:border-accent/20  opacity-60 hover:opacity-70 hover:scale-100"
      )}
    >
      <CardContent>
        <Collapsible>
          <div className="flex flex-row justify-between items-center">
            <div className="w-full flex flex-row items-center gap-3">
              <div>
                <Checkbox
                  checked={task.is_completed}
                  className="cursor-pointer size-4.5"
                  onChange={() => handleCheckboxChange(task)}
                />
              </div>
              <div className="w-full flex flex-col gap-0">
                <div className="flex flex-row justify-between">
                  <label className={cn(task.is_completed && "line-through")}>
                    {task.title}
                  </label>

                  <div className="flex flex-row gap-2">
                    <Badge
                      variant="outline"
                      className={cn(priorityColors[task.priority], "ml-auto")}
                    >
                      {task.priority}
                    </Badge>
                    {task.time != null && task.time !== "00:00:00" ? (
                      <div className="flex items-center font-medium bg-primary/5 text-primary rounded-md px-2 py-0 w-fit">
                        <Clock className="mr-1.5 h-3.5 w-3.5 text-purple-300" />
                        <span className="text-[13px] text-purple-400">
                          {formatTimeForDisplay(task.time)}
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>

            <CollapsibleTrigger asChild className="cursor-pointer">
              <Button variant="ghost" size="sm">
                <ChevronsUpDown className="h-4 w-4" />
              </Button>
            </CollapsibleTrigger>
          </div>

          <CollapsibleContent>
            <Separator className="my-2" />
            <div className="flex flex-row justify-between">
              <h4 className="text-sm text-gray-400 pb-2">Subtasks</h4>
              <Plus
                size={18}
                className="cursor-pointer hover:text-purple-500 rounded-sm transition-all duration-200 hover:scale-110"
                onClick={() => handleAddNewSubTask(task.id)}
              />
            </div>

            <div className="pl-4 pb-2 flex flex-col gap-1.5">
              {task.subtasks?.length > 0 ? (
                task.subtasks.map((subtask) => (
                  <SubtaskItem
                    key={subtask.id}
                    subtask={subtask}
                    parentCompleted={task.is_completed}
                  />
                ))
              ) : (
                <div className="text-sm text-gray-400">No subtasks yet.</div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
