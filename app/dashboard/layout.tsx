import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { AppSideBar } from "@/components/app-side-bar";
import { ReactNode } from "react";
import { currentUser } from "@clerk/nextjs/server";

export default async function DashBoardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await currentUser();
  console.log(user);
  if (!user) return <div>Not Signed In</div>;
  return (
    <SidebarProvider>
      <AppSideBar />
      <main className="w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
