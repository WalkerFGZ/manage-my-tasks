import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { ListTodo } from "lucide-react";
import { RippleButton } from "../animate-ui/buttons/ripple";
import { SignInButton } from "@clerk/nextjs";

export function NotSignedIn() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-background to-background/80">
      <Card className="w-full max-w-md animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="p-3 rounded-full bg-primary/10 animate-in zoom-in-50 duration-500">
            <ListTodo className="w-8 h-8 text-primary" />
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">
              Welcome to Better Tasks
            </h1>
            <p className="text-muted-foreground">
              Please sign in to access your tasks and manage your productivity
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3">
            <SignInButton>
              <RippleButton
                variant="default"
                size="sm"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white cursor-pointer transition-colors"
              >
                <span>Sign In</span>
              </RippleButton>
            </SignInButton>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground text-center w-full">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
