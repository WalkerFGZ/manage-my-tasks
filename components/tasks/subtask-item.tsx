import { Check, Edit, Trash } from "lucide-react";

import { Checkbox } from "../animate-ui/headless/checkbox";
import { Input } from "../ui/input";
import { SubTask } from "@/types";
import { useState } from "react";

export default function SubtaskItem({
  subtask,
  handleUpdateSubTask,
}: {
  subtask: SubTask;
  handleUpdateSubTask: (subtask: SubTask) => void;
}) {
  const [title, setTitle] = useState(subtask.title);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditSubTask = (
    subTask: SubTask,
    isCompleted: boolean = false
  ) => {
    const updatedSubTask = {
      ...subTask,
      title: title,
      is_completed: isCompleted,
    };

    handleUpdateSubTask(updatedSubTask);
    setIsEditing(!isEditing);
  };

  console.log(isEditing);
  return (
    <div className="w-full flex flex-row items-center justify-between gap-3 text-sm  rounded-sm">
      <div className="w-full flex flex-row items-center gap-3">
        <Checkbox
          className="cursor-pointer size-4"
          checked={subtask.is_completed}
          onChange={() => {
            handleEditSubTask(subtask, !subtask.is_completed);
          }}
        />
        {isEditing ? (
          <Input
            className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 m-0 h-6 text-sm"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        ) : (
          <label>{title}</label>
        )}
      </div>

      {isEditing ? (
        <Check
          className="cursor-pointer size-5 text hover:text-purple-500 rounded-sm hover:scale-110 transition-all duration-300"
          onClick={() => handleEditSubTask(subtask)}
        />
      ) : (
        <div className="flex flex-row items-center gap-3">
          <Edit
            className="cursor-pointer size-4 text hover:text-purple-500 rounded-sm hover:scale-110 transition-all duration-300"
            onClick={() => handleEditSubTask(subtask)}
          />
          <Trash className="cursor-pointer size-4 hover:text-red-500 rounded-2xl hover:scale-110 transition-all duration-300" />
        </div>
      )}
    </div>
  );
}
