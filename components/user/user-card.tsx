import { Task, User } from "@/types";
import {
  useCreateSharedTask,
  useCreateSharedTaskForUser,
} from "@/hooks/use-shared-tasks";

import { CheckCircle } from "lucide-react";
import Image from "next/image";
import { RippleButton } from "../animate-ui/buttons/ripple";
import { toast } from "sonner";
import { useState } from "react";
import { useUpdateTask } from "@/hooks/use-tasks";

interface UserCardProps {
  user: User;
  task: Task;
}
export default function UserCard({ user, task }: UserCardProps) {
  const [successShared, setSuccessShared] = useState(false);
  const createSharedTask = useCreateSharedTask();
  const createTask = useCreateSharedTaskForUser();
  const updateTask = useUpdateTask();
  const handleShare = async (user: User, task: Task) => {
    try {
      setSuccessShared(true);
      const sharedNewMainTask = {
        ...task,
        shared: true,
        category: "shared",
        user_id: user.id,
      };
      const updatedTask = {
        ...task,
        shared: true,
        category: "shared",
      };
      await createSharedTask.mutateAsync({ user, task });
      await createTask.mutateAsync(sharedNewMainTask);
      await updateTask.mutateAsync(updatedTask);
      toast.success("Task shared successfully");
    } catch (error) {
      toast.error("Error", {
        description:
          error instanceof Error ? error.message : "Failed to create task",
        duration: 5000,
        closeButton: true,
      });
      setSuccessShared(false);
    }
  };
  return (
    <div className="flex items-center justify-between p-2 rounded-md ">
      <div className="flex items-center gap-2">
        <Image
          src={user.imageUrl}
          alt={`${user.firstName} ${user.lastName}`}
          className="w-8 h-8 rounded-full object-cover"
          width={32}
          height={32}
          quality={50}
        />
        <span className="font-medium">
          {`${user.firstName} ${user.lastName}`}
        </span>
      </div>
      {successShared ? (
        <CheckCircle className="h-4 w-4 text-green-500" />
      ) : (
        <RippleButton
          variant="ghost"
          size="sm"
          className="hover:text-purple-500"
          onClick={() => handleShare(user, task)}
        >
          Share
        </RippleButton>
      )}
    </div>
  );
}
