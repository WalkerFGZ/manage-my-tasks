import { SignInButton, SignedOut, UserButton } from "@clerk/nextjs";

import Link from "next/link";
import { ListTodo } from "lucide-react";
import { RippleButton } from "../animate-ui/buttons/ripple";
import { auth } from "@clerk/nextjs/server";

export default async function Header() {
  const { userId } = await auth();
  return (
    <header className="sticky px-8 w-full bg-background/95 backdrop-blur border-b border-transparent shadow-none">
      <div className=" flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition cursor-pointer"
        >
          <ListTodo className="h-6 w-6 text-purple-100" />
          <span className="text-xl font-bold tracking-tight text-purple-100">
            Better Tasks
          </span>
        </Link>
        <div className="flex items-center gap-2">
          {userId ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm font-medium px-3 py-1 rounded cursor-pointer text-purple-600 hover:bg-purple-100 hover:text-purple-800 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/tasks"
                className="text-sm font-medium px-3 py-1 rounded cursor-pointer text-purple-600 hover:bg-purple-100 hover:text-purple-800 transition-colors"
              >
                Tasks
              </Link>
              <UserButton />
            </>
          ) : (
            <SignedOut>
              <SignInButton mode="modal">
                <RippleButton
                  variant="default"
                  size="sm"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white cursor-pointer transition-colors"
                >
                  <span>Sign In</span>
                </RippleButton>
              </SignInButton>
            </SignedOut>
          )}
        </div>
      </div>
    </header>
  );
}
