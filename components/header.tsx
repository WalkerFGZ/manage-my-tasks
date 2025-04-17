import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import Link from "next/link";
import { ListTodo } from "lucide-react";
import { auth } from "@clerk/nextjs/server";

export default async function Header() {
  const { userId } = await auth();
  return (
    <header className="sticky top-0 z-50 w-full flex justify-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <ListTodo className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">My Todo</span>

          {userId ? (
            <div className="ml-4 flex flex-row gap-2">
              <Link
                href="/dashboard"
                className="hover:text-gray-600 text-gray-600"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/tasks"
                className="hover:text-gray-600 text-gray-600"
              >
                Tasks
              </Link>
            </div>
          ) : null}
        </div>

        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
