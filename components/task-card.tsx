"use client";

import { Badge, Clock, Pencil, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import { Button } from "./ui/button";
import { Checkbox } from "@radix-ui/react-checkbox";
import { cn } from "@/lib/utils";

export default function TaskCard() {
  const task: {
    completed: boolean;
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
    time: string | null;
  } = {
    completed: false,
    title: "make bed",
    description: "make bed description",
    priority: "high",
    time: null,
  };

  const priorityColors = {
    low: "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20",
    medium: "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20",
    high: "bg-rose-500/10 text-rose-500 hover:bg-rose-500/20",
  };
  return (
    <Card className={cn("transition-all", task.completed && "opacity-60")}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-2">
            <Checkbox
              checked={false}
              onCheckedChange={() => null}
              className="mt-1"
            />
            <div>
              <CardTitle
                className={cn(
                  task.completed && "line-through text-muted-foreground"
                )}
              >
                {task.title}
              </CardTitle>
              <CardDescription className="mt-1">
                {task.description}
              </CardDescription>
            </div>
          </div>
          <Badge className={cn(priorityColors[task.priority])}>
            {task.priority}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {task.time && (
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-1 h-3 w-3" />
            {task.time}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" onClick={() => null}>
          <Pencil className="mr-1 h-3 w-3" />
          Edit
        </Button>
        <Button variant="outline" size="sm" onClick={() => null}>
          <Trash2 className="mr-1 h-3 w-3" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
