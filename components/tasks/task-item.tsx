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
import { Todo } from "@/types";
import { priorityColors } from "@/lib/constants";

export default function TaskItem({ todo }: { todo: Todo }) {
  return (
    <Card className="py-2 text-md font-nunito hover:border-purple-400 transition-all duration-200 ease-in-out hover:scale-[1.02] delay-75">
      <CardContent>
        <Collapsible>
          <div className="flex flex-row justify-between items-center">
            <div className="w-full flex flex-row items-center gap-3">
              <div>
                <Checkbox className="cursor-pointer size-4.5" />
              </div>
              <div className="w-full flex flex-col gap-0">
                <div className="flex flex-row justify-between">
                  <label>{todo.title}</label>

                  <div className="flex flex-row gap-2">
                    <Badge
                      variant="outline"
                      className={cn(priorityColors[todo.priority], "ml-auto")}
                    >
                      {todo.priority}
                    </Badge>
                    {todo.time != null && todo.time !== "00:00:00" ? (
                      <div className="flex items-center font-medium bg-primary/5 text-primary rounded-md px-2 py-0 w-fit">
                        <Clock className="mr-1.5 h-3.5 w-3.5 text-purple-300" />
                        <span className="text-[13px] text-purple-400">
                          {formatTimeForDisplay(todo.time)}
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <span className="text-sm text-gray-300 p-0 m-0">
                  {todo.description}
                </span>
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
                className="cursor-pointer hover:bg-input rounded-sm"
              />
            </div>

            <div className="pl-4">
              <SubtaskItem />
              <SubtaskItem />
              <SubtaskItem />
              <SubtaskItem />
              <SubtaskItem />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
