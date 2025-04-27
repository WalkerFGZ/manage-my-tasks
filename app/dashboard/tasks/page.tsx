import CreateTaskModal from "@/components/tasks/create-task-modal";
import DailyProgressBar from "@/components/tasks/daily-progress-bar";
import ListCards from "@/components/tasks/list-cards";

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

      <section className="mt-8">
        <CreateTaskModal />
      </section>

      <section className="mt-6">
        <ListCards />
      </section>
    </section>
  );
}
