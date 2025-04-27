"use client";

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Clock, Pencil, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Todo } from "@/types";
import { cn } from "@/lib/utils";
import { priorityColors } from "@/lib/constants";

export default function TaskCard({ todo }: { todo: Todo }) {
  return (
    <Card
      className={cn(
        "transition-all hover:shadow-md",
        todo.is_completed ? "opacity-60 bg-muted/40" : "border-l-4",
        todo.is_completed
          ? ""
          : todo.priority === "high"
          ? "border-l-rose-500"
          : todo.priority === "medium"
          ? "border-l-amber-500"
          : "border-l-emerald-500"
      )}
    >
      <CardHeader className="pb-2 flex flex-row items-start justify-between">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={todo.is_completed}
            onCheckedChange={() => null}
            className="mt-1"
            aria-label={`Mark ${todo.title} as ${
              todo.is_completed ? "incomplete" : "complete"
            }`}
          />
          <div className="space-y-1">
            <h3
              className={cn(
                "font-medium text-base transition-all",
                todo.is_completed && "line-through text-muted-foreground"
              )}
            >
              {todo.title}
            </h3>
            <p
              className={cn(
                "text-sm text-muted-foreground",
                todo.is_completed && "line-through"
              )}
            >
              {todo.description}
            </p>
          </div>
        </div>
        <Badge
          variant="outline"
          className={cn(priorityColors[todo.priority], "ml-auto")}
        >
          {todo.priority}
        </Badge>
      </CardHeader>

      <CardContent>
        {todo.time ? (
          <div className="flex items-center text-sm font-medium bg-primary/5 text-primary rounded-md px-2 py-1 w-fit">
            <Clock className="mr-1.5 h-3.5 w-3.5" />
            {todo.time}
          </div>
        ) : (
          // Empty div to maintain consistent spacing when no time is set
          <div className="h-[28px]"></div>
        )}
      </CardContent>

      <CardFooter className="flex justify-end ">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => null}
                className="h-8 w-8 rounded-full hover:bg-primary/10"
              >
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit task</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => null}
                className="h-8 w-8 rounded-full hover:bg-destructive/10 text-destructive"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete task</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
}
