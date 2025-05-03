import CreateTaskModal from "@/components/tasks/create-task-modal";
import { Separator } from "@/components/ui/separator";
import TaskItem from "@/components/tasks/task-item";

export default function Tasks() {
  return (
    <section className="w-full flex min-h-[calc(100%-40px)] justify-center px-8 font-inter">
      <div className="max-w-[700px] w-full min-h-[calc(100%-40px)] flex flex-col">
        <div className="flex flex-col gap-1">
          <h4 className="text-xl font-bold">Buenas noches, Andres 🌙</h4>
          <span className="text-sm text-gray-300">
            martes, 29 de abril de 2025
          </span>

          <Separator className="my-2" />

          <section className="w-full flex justify-end">
            <CreateTaskModal />
          </section>
        </div>

        <Separator className="my-2" />

        <section className="flex flex-col gap-4">
          <TaskItem />
          <TaskItem />
          <TaskItem />
        </section>
      </div>
      {/* 
      

      <section className="mt-6">
        <ListCards />
      </section> */}
    </section>
  );
}
