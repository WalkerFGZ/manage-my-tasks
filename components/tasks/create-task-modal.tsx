import { Dialog, DialogTrigger } from "../ui/dialog";

import CreateNewTaskForm from "./create-task-form";
import { Plus } from "lucide-react";
import { RippleButton } from "../animate-ui/buttons/ripple";

export default function CreateTaskModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <RippleButton variant="outline" className="">
          <Plus className="text-purple-300" />
          New Task
        </RippleButton>
      </DialogTrigger>
      <CreateNewTaskForm />
    </Dialog>
  );
}
