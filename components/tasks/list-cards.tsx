import { auth } from "@clerk/nextjs/server";
import { getTodo } from "@/app/dashboard/tasks/action";

export default async function ListCards() {
  const { userId } = await auth();
  if (!userId) return <div>Not Signed In</div>;
  //const todos = await getTodo(userId);
  console.log(todos);
  return (
    <div>
      <div>1</div>
    </div>
  );
}
