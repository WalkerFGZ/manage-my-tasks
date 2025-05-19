"use client";

import { Card, CardContent } from "../ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../animate-ui/radix/collapsible";
import { Plus, X } from "lucide-react";

import NewTaskForm from "./new-task-form";
import { RippleButton } from "../animate-ui/buttons/ripple";
import { newTaskForm } from "@/types";
import { toast } from "sonner";
import { useCreateTask } from "@/hooks/use-tasks";
import { useState } from "react";

export default function CreateNewTask() {
  const [isOpen, setIsOpen] = useState(false);
  const createTask = useCreateTask();

  const handleSubmit = async (e: React.FormEvent, newTaskData: newTaskForm) => {
    debugger;
    try {
      await createTask.mutateAsync(newTaskData);
    } catch (error) {
      toast.error("Error", {
        description:
          error instanceof Error ? error.message : "Failed to create task",
        duration: 5000,
        closeButton: true,
      });
    }
  };

  return (
    <div className="w-full">
      <Card className="w-full">
        <CardContent>
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleContent>
              <NewTaskForm setIsOpen={setIsOpen} handleSubmit={handleSubmit} />
            </CollapsibleContent>

            <CollapsibleTrigger asChild hidden={isOpen}>
              <div className="w-full flex flex-row justify-center gap-2">
                <RippleButton
                  variant="destructive"
                  size="sm"
                  className="hidden"
                >
                  <X className="size-5" />
                  <span>Cancel</span>
                </RippleButton>

                <RippleButton
                  variant="outline"
                  size="sm"
                  className=" hover:text-purple-500"
                >
                  <Plus className="size-5" />
                  <span>New Task</span>
                </RippleButton>
              </div>
            </CollapsibleTrigger>
          </Collapsible>
        </CardContent>
      </Card>
    </div>
  );
}
