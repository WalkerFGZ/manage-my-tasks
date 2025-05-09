"use client";

import { Plus, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { Input } from "../ui/input";
import { RippleButton } from "../animate-ui/buttons/ripple";
import { useState } from "react";

export default function NewTaskForm({
  setIsOpen,
}: {
  setIsOpen: (open: boolean) => void;
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "low",
    time: "00:00",
    category: "work",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex flex-col gap-2 font-nunito">
        <div className="flex flex-row gap-2">
          <Input
            placeholder="Task name"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          <Input
            className="max-w-32 min-w-32 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          />

          <Select
            value={formData.priority}
            onValueChange={(value) =>
              setFormData({ ...formData, priority: value })
            }
          >
            <SelectTrigger className="min-w-26">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="low">
                <span />
                Low
              </SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={formData.category}
            onValueChange={(value) =>
              setFormData({ ...formData, category: value })
            }
          >
            <SelectTrigger className="min-w-28">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="personal">Personal</SelectItem>
              <SelectItem value="work">Work</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full flex flex-row justify-center mt-4 gap-5">
          <RippleButton
            variant="destructive"
            size="sm"
            onClick={() => setIsOpen(false)}
          >
            <X className="size-5" />
            <span>Cancel</span>
          </RippleButton>

          <RippleButton
            variant="outline"
            size="sm"
            className="hover:text-purple-400"
          >
            <Plus className="size-5" />
            <span>Save Task</span>
          </RippleButton>
        </div>
      </div>

      <div></div>
    </form>
  );
}
