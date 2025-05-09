import CreateNewTask from "@/components/tasks/create-new-task";
import ListTasks from "@/components/tasks/list-tasks";
import { NotSignedIn } from "@/components/auth/not-signed-in";
import { Separator } from "@/components/ui/separator";
import { auth } from "@clerk/nextjs/server";

export default async function Tasks() {
  const { userId } = await auth();

  if (!userId) return <NotSignedIn />;

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
            <CreateNewTask />
          </section>
        </div>

        <Separator className="my-3" />

        <section className="flex flex-col gap-4">
          <ListTasks userId={userId} />
        </section>
      </div>
    </section>
  );
}
