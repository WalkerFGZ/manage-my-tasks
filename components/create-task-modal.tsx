import { Dialog, DialogTrigger } from "./ui/dialog";

import { Button } from "@/components/ui/button";
import CreateNewTaskForm from "./create-task-form";
import { Plus } from "lucide-react";

export default function CreateTaskModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          <Plus />
          New Task
        </Button>
      </DialogTrigger>
      <CreateNewTaskForm />
    </Dialog>
  );
}
