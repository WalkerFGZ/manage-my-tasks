import { Button } from "@/components/ui/button";
import CreateTaskModal from "@/components/create-task-modal";
import DailyProgressBar from "@/components/daily-progress-bar";
import { Plus } from "lucide-react";

export default function Tasks() {
  return (
    <section className="w-full px-8">
      <div className="flex flex-col">
        <div>
          <h2 className="text-3xl font-bold text-white">Tasks</h2>
          <p className="text-gray-400 mt-2">
            Manage your daily tasks and track your progress
          </p>
        </div>
        <DailyProgressBar />
      </div>

      <div className="mt-8">
        <Button className="cursor-pointer">
          <Plus /> New Task
          <CreateTaskModal />
        </Button>
      </div>

      <div>Cards</div>
    </section>
  );
}
