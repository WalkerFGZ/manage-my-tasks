import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { AppSideBar } from "@/components/layout/app-side-bar";
import { NotSignedIn } from "@/components/auth/not-signed-in";
import { ReactNode } from "react";
import { currentUser } from "@clerk/nextjs/server";

export default async function DashBoardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await currentUser();
  if (!user) return <NotSignedIn />;
  return (
    <SidebarProvider>
      <AppSideBar />
      <main className="w-full ">
        <SidebarTrigger className="cursor-pointer p-5" />
        {children}
      </main>
    </SidebarProvider>
  );
}
