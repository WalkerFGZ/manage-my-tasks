import { CheckCircle, Clock, ListTodo, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full flex justify-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <ListTodo className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">My Todo</span>
          </div>
          <div className="flex items-center gap-4">user</div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full flex justify-center py-12 md:py-24 lg:py-32 ">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Organize Your Life, One Task at a Time
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    My Todo helps you manage your tasks efficiently, so you can
                    focus on what matters most.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup">
                    <Button size="lg" className="h-12">
                      Get Started for Free
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>100% Free</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>No Credit Card Required</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[450px] w-[350px] overflow-hidden rounded-xl border bg-background shadow-xl">
                  <Image
                    src="/placeholder.svg?height=900&width=700"
                    width={700}
                    height={900}
                    alt="App screenshot"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="w-full flex justify-center py-12 md:py-24 bg-muted/40"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Simple, Powerful Task Management
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Everything you need to stay organized, all in one place.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-8 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <ListTodo className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Easy Task Management</h3>
                <p className="text-center text-muted-foreground">
                  Create, edit, and organize tasks with just a few clicks.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Track Due Dates</h3>
                <p className="text-center text-muted-foreground">
                  Never miss a deadline with built-in due dates and reminders.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Boost Productivity</h3>
                <p className="text-center text-muted-foreground">
                  Stay focused on what matters with priority levels and progress
                  tracking.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full flex justify-center py-12 md:py-24 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Ready to Get Organized?
                </h2>
                <p className="max-w-[600px] md:text-xl">
                  Start managing your tasks more effectively today. Its
                  completely free!
                </p>
              </div>
              <div className="pt-4">
                <Link href="/signup">
                  <Button size="lg" variant="secondary" className="h-12">
                    Get Started Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full flex justify-center border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <div className="flex items-center gap-2">
            <ListTodo className="h-5 w-5 text-primary" />
            <span className="font-semibold">My Todo</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Made With Love By{" "}
            <a href="https://www.linkedin.com/in/afgallegoz2/">
              Andres Gallego
            </a>{" "}
            &copy; {new Date().getFullYear()} My Todo. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
