import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader2, Share } from "lucide-react";
import { Task, User } from "@/types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UserCard from "../user/user-card";
import { useState } from "react";

export function ShareTask({ task }: { task: Task }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);

    if (query.length > 4) {
      setLoading(true);
      try {
        const searchTerm = query.toLowerCase();

        const data = await fetch(`/api/users?query=${searchTerm}`);
        const users = await data.json();

        debugger;
        const removedCurrentUser = users?.data?.filter(
          (user: User) => user.id !== task.user_id
        );

        const formatUsers = removedCurrentUser?.map((user: User) => {
          return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            imageUrl: user.imageUrl,
          };
        });

        setSearchResults(formatUsers);
      } catch (error) {
        console.error("Error searching users:", error);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm" className="p-0 h-6 cursor-pointer">
          <Share className="h-3.5 w-3.5" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="text-center">
          <AlertDialogTitle>Share Tasks with your friends</AlertDialogTitle>
          <AlertDialogDescription>
            Search Your friends by name or email (we trust that you know them)
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Miguel Angel..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full"
            autoFocus
          />

          {loading ? (
            <div className="flex justify-center items-center py-4">
              <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
              <span className="ml-2 text-gray-500">Searching users...</span>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="border rounded-md p-2 max-h-[200px] overflow-y-auto">
              {searchResults.map((user) => (
                <UserCard key={user.id} user={user} task={task} />
              ))}
            </div>
          ) : searchQuery.length > 4 ? (
            <div className="text-center text-gray-500 py-2">No users found</div>
          ) : (
            <div className="text-center text-gray-500 py-2">
              At least 4 characters are required
            </div>
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Close
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
