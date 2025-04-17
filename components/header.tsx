import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ListTodo } from "lucide-react";

export default async function Header() {
  return (
    <header className="sticky top-0 z-50 w-full flex justify-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <ListTodo className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">My Todo</span>
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
